import {
  Order,
  OrderItem,
  Cart,
  Variant,
  Address,
  CartItem,
  User,
  Product,
  Payment,
} from '../models/index.js';
import { processPayment } from './paymentService.js';
import { validateCoupon } from './couponService.js';
import { AppError } from '../utils/appError.js';
import sequelize from '../config/database.js';
import { getPagination, getPaginationMetadata } from '../utils/pagination.js';
import {
  sendNewOrderEmail,
  sendOrderStatusUpdate,
  sendPaymentConfirmation,
} from '../utils/message.js';

const DISCOUNTLIMMIT = 2999;
const DELIVERYFEE = 350;

const FREEDISCOUNT = ['bank_transfer', 'easypaisa'];
const FREEVALUE = 5;

interface CreateOrderData {
  address_id: number;
  payment_method: string;
  coupon_code?: string;
  screenshot?: string;
  transactionId?: string;
}

const calculateDiscount = async (
  coupon_code: string | undefined,
  total_price: number,
  delivery_fee: number,
  t: any
) => {
  let discount = 0;

  if (coupon_code) {
    const coupon = await applyCoupon(coupon_code, total_price, t);
    if (coupon) {
      const { discount_value, is_percentage, type } = coupon;

      if (is_percentage) {
        discount = (total_price * discount_value) / 100;
      } else {
        if (type === 'price') {
          discount = discount_value;
        } else if (type === 'delivery') {
          discount = Math.min(discount_value, delivery_fee);
        }
      }
    }
  }

  const order_price = total_price - discount;
  const final_price = order_price + delivery_fee;
  return { discount, final_price, delivery_fee };
};

export const createOrderService = async (
  user_id: number,
  user: any,
  orderData: CreateOrderData
) => {
  const {
    address_id,
    payment_method,
    coupon_code,
    screenshot,
    transactionId = '',
  } = orderData;

  const t = await sequelize.transaction();
  try {
    const address = (await Address.findOne({
      where: { id: address_id },
    })) as any;
    const cart = await fetchActiveCart(user_id, t);
    const { total_price, items } = await validateAndCalculateCart(cart, t);

    const { discount, final_price, delivery_fee } = await calculateDiscount(
      coupon_code,
      total_price,
      total_price >= DISCOUNTLIMMIT ? 0 : DELIVERYFEE,
      t
    );

    const { discount: newdiscount, final_price_after_discount } = applyDiscount(
      payment_method,
      final_price
    );

    const order = (await createOrder(
      user_id,
      address_id,
      final_price_after_discount,
      delivery_fee,
      discount + newdiscount,
      t
    )) as any;

    await createOrderItems(order.id, items, t);
    const response = await processPayment(
      payment_method,
      final_price_after_discount,
      order.id,
      screenshot,
      transactionId,
      t
    );

    sendNewOrderEmail({
      email: user?.email,
      orderId: order?.id,
      customerName: user?.display_name || user?.first_name,
      orderItems: items?.map((item) => ({
        name: item?.name,
        quantity: item?.quantity,
        price: item?.total_price,
      })),

      totalAmount: final_price_after_discount,
      shippingAddress: address?.street_address,
      paymentMethod: payment_method?.replace(/_/g, ' ').toUpperCase(),
    });

    await cart.update({ status: 'abandoned' }, { transaction: t });
    await t.commit();

    return { ...order, ...response };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const fetchActiveCart = async (user_id: number, t: any) => {
  const cart = await Cart.findOne({
    where: { user_id, status: 'active' },
    include: [{ model: CartItem, as: 'items' }],
    transaction: t,
  });

  if (!cart) throw new AppError('No active cart found for the user', 400);
  return cart;
};

const validateAndCalculateCart = async (cart: any, t: any) => {
  let total_price = 0;
  const items = [];

  for (const item of cart.items) {
    const variant = (await Variant.findByPk(item.variant_id, {
      include: [{ model: Product, as: 'Product' }],
      transaction: t,
    })) as any;
    if (!variant || variant.stock < item.quantity) {
      throw new AppError(
        `Insufficient stock for variant ID ${item.variant_id}`,
        400
      );
    }

    await variant.update(
      { stock: variant.stock - item.quantity },
      { transaction: t }
    );

    let discount = 0;

    if (variant?.discount) {
      discount = (variant.price * variant?.discount) / 100;
    }

    total_price += (variant.price - discount) * item.quantity;
    items.push({
      name: variant?.Product?.name,
      variant_id: item.variant_id,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
    });
  }

  return { total_price, items };
};

const applyCoupon = async (
  coupon_code: string,
  total_price: number,
  t: any
) => {
  const coupon = await validateCoupon(coupon_code, total_price, t);
  return coupon;
};

const createOrder = async (
  user_id: number,
  address_id: number,
  total_price: number,
  delivery_fee: number,
  discount: number,
  t: any
) => {
  return await Order.create(
    { user_id, address_id, total_price, discount, delivery_fee },
    { transaction: t }
  );
};

const createOrderItems = async (order_id: number, items: any[], t: any) => {
  for (const item of items) {
    await OrderItem.create(
      {
        order_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
      },
      { transaction: t }
    );
  }
};

export const getAllOrdersService = async ({
  status,
  name,
  page = 1,
  pageSize = 10,
  sortBy = 'createdAt', // Default sort by name
  sortOrder = 'ASC',
}: any) => {
  const { rows, count } = await Order.findAndCountAll({
    where: { ...(status ? { status } : {}) },
    include: [
      {
        model: OrderItem,
        as: 'OrderItems',
        include: [
          {
            model: Variant,
            as: 'Variant',
            include: [{ model: Product, as: 'Product' }],
          },
        ],
      },
      {
        model: User,
        as: 'User',
      },
      {
        model: Address,
        as: 'Address',
      },
      {
        model: Payment,
        as: 'Payment',
      },
    ],
    ...getPagination({ page, pageSize }),
    order: [[sortBy, sortOrder]],
  });

  return {
    data: rows,
    ...getPaginationMetadata({ page, pageSize }, count),
  };
};

export const getOrderByIdService = async (id: string) => {
  return await Order.findByPk(id, {
    include: [
      {
        model: OrderItem,
        as: 'OrderItems',
        include: [
          {
            model: Variant,
            as: 'Variant',
            include: [{ model: Product, as: 'Product' }],
          },
        ],
      },
      {
        model: User,
        as: 'User',
      },
      {
        model: Address,
        as: 'Address',
      },
      {
        model: Payment,
        as: 'Payment',
      },
    ],
  });
};

export const updateOrderStatusService = async (
  id: string,
  status: string,
  trackingId?: string
) => {
  const order = (await Order.findByPk(id, {
    include: [
      {
        model: User,
        as: 'User',
      },
      {
        model: Address,
        as: 'Address',
      },
      {
        model: Payment,
        as: 'Payment',
      },
    ],
  })) as any;
  if (!order) throw new Error('Order not found');
  order.status = status;
  order.trackingId = trackingId;

  order.update({
    status,
    ...(trackingId ? { trackingId } : {}),
  });

  sendOrderStatusUpdate({
    orderId: order?.id,
    orderDetails: order?.Payment?.amount,
    shippingInfo: order?.Address?.street_address,
    dashboardUrl: '',
    email: order?.User?.email,
    status,
    supportUrl: '',
    name:order?.User?.display_name
  });
  return await order.save();
};

export const deleteOrderService = async (id: string) => {
  const order = await Order.findByPk(id);
  if (!order) throw new Error('Order not found');
  await order.destroy();
};

export const getOrdersByBuyerService = async (
  buyerId: string,
  {
    status,
    name,
    page = 1,
    pageSize = 10,
    sortBy = 'createdAt', // Default sort by name
    sortOrder = 'ASC',
  }: any
) => {
  const { rows, count } = await Order.findAndCountAll({
    where: {
      user_id: buyerId,
      ...(status ? { status } : {}),
      // ...(name ? { 'Order.OrderItem.Variant.Product': name } : {}),
    },
    include: [
      {
        model: OrderItem,
        as: 'OrderItems',
        include: [
          {
            model: Variant,
            as: 'Variant',
            include: [{ model: Product, as: 'Product' }],
          },
        ],
      },
      {
        model: User,
        as: 'User',
      },
      {
        model: Address,
        as: 'Address',
      },
      {
        model: Payment,
        as: 'Payment',
      },
    ],
    ...getPagination({ page, pageSize }),
    order: [[sortBy, sortOrder]],
  });

  return {
    data: rows,
    ...getPaginationMetadata({ page, pageSize }, count),
  };
};

///////////

interface UnauthorizedCreateOrderData {
  variants: { variant_id: string; quantity: number }[];
  Address: any;
  coupon_code?: string;
  payment_method: string;
  screenshot: string;
}

export const createUnauthorizedOrderService = async (
  orderData: UnauthorizedCreateOrderData
) => {
  const { variants, Address, payment_method, screenshot, coupon_code } =
    orderData;

  const t = await sequelize.transaction();
  try {
    const deliveryFee = 350;
    // Validate and create the address for the user
    const address = (await createAddress(Address, t)) as any;

    // Validate variants and calculate order items
    let total_price = 0;
    const items: any[] = [];

    for (const variantData of variants) {
      const variant = (await Variant.findByPk(variantData.variant_id, {
        transaction: t,
      })) as any;
      if (!variant || variant.stock < variantData.quantity) {
        throw new AppError(
          `Insufficient stock for variant ID ${variantData.variant_id}`,
          400
        );
      }

      await variant.update(
        { stock: variant.stock - variantData.quantity },
        { transaction: t }
      );

      total_price += variant.price * variantData.quantity;

      items.push({
        variant_id: variantData.variant_id,
        quantity: variantData.quantity,
        unit_price: variant.price,
        total_price: variant.price * variantData.quantity,
      });
    }

    const { discount, final_price, delivery_fee } = await calculateDiscount(
      coupon_code,
      total_price,
      deliveryFee,
      t
    );
    // Create order
    const order = (await createOrder(
      null,
      address.id, // Use created address id
      final_price,
      delivery_fee,
      discount,
      t
    )) as any;

    await createOrderItems(order.id, items, t);
    await processPayment(
      payment_method,
      total_price - discount,
      order.id,
      screenshot,
      '', //transactionId
      t
    );
    await t.commit();
    return order;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

interface CreateAddressData {
  street_address: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code?: string;
  country: string;
  phone: string;
}

export const createAddress = async (addressData: CreateAddressData, t: any) => {
  const {
    street_address,
    address_line2,
    city,
    state,
    postal_code,
    country,
    phone,
  } = addressData;

  try {
    const newAddress = await Address.create(
      {
        street_address,
        address_line2,
        city,
        state,
        postal_code,
        country,
        phone,
      },
      { transaction: t }
    );

    return newAddress;
  } catch (error) {
    throw new AppError('Error creating address', 500);
  }
};

function applyDiscount(payment_method: string, final_price: number) {
  if (FREEDISCOUNT.includes(payment_method)) {
    const discountAmount = (final_price * FREEVALUE) / 100;
    const discountedPrice = final_price - discountAmount;
    return {
      discount: discountAmount,
      final_price_after_discount: discountedPrice,
    };
  }

  return {
    discount: 0,
    final_price_after_discount: final_price,
  };
}
