import { Cart, CartItem, Coupon, Product, Variant } from '../models/index.js';

export const addItemToCart = async (
  user_id: string,
  variant_id: string,
  quantity: number
) => {
  let cart = (await Cart.findOne({
    where: { user_id, status: 'active' },
  })) as any;

  if (!cart) {
    cart = await Cart.create({ user_id, status: 'active' });
  }

  const variant = (await Variant.findByPk(variant_id)) as any;
  if (!variant) {
    throw new Error('Variant not found');
  }

  const price = variant.price;

  let existingCartItem = await CartItem.findOne({
    where: { cart_id: cart.id, variant_id },
  });

  if (existingCartItem) {
    existingCartItem.quantity += quantity;
    existingCartItem.total_price = existingCartItem.calculateTotalPrice();
    await existingCartItem.save();
    return existingCartItem;
  }

  const newCartItem = await CartItem.create({
    cart_id: cart.id,
    variant_id,
    quantity,
    price,
    total_price: price * quantity,
  });

  return newCartItem;
};

export const updateCartItemQuantity = async (
  user_id: string,
  variant_id: string,
  quantity: number
) => {
  const cart = (await Cart.findOne({
    where: { user_id, status: 'active' },
  })) as any;

  if (!cart) {
    throw new Error('Cart not found');
  }

  const cartItem = await CartItem.findOne({
    where: { cart_id: cart?.id, variant_id },
  });

  if (!cartItem) {
    throw new Error('Cart item not found');
  }

  const variant = (await Variant.findByPk(variant_id)) as any;
  if (!variant) {
    throw new Error('Variant not found');
  }

  cartItem.quantity = quantity;
  cartItem.total_price = cartItem.calculateTotalPrice();
  await cartItem.save();

  return cartItem;
};

export const deleteCartItem = async (user_id: string, variant_id: string) => {
  const cart = (await Cart.findOne({
    where: { user_id, status: 'active' },
  })) as any;

  if (!cart) {
    throw new Error('Cart not found');
  }

  const cartItem = await CartItem.findOne({
    where: { cart_id: cart?.id, variant_id },
  });

  if (!cartItem) {
    throw new Error('Cart item not found');
  }

  await cartItem.destroy();
  return { message: 'Item deleted successfully' };
};

export const applyCoupon = async (user_id: string, coupon_code: string) => {
  const coupon = (await Coupon.findOne({
    where: { code: coupon_code },
  })) as any;

  if (!coupon) {
    throw new Error('Invalid coupon code');
  }

  const cart = (await Cart.findOne({
    where: { user_id, status: 'active' },
  })) as any;

  if (!cart) {
    throw new Error('Cart not found');
  }

  cart.coupon_id = coupon.id;
  await cart.save();
  return cart;
};

export const getCart = async (user_id: string) => {
  let cart = (await Cart.findOne({
    where: { user_id, status: 'active' },
    include: [
      {
        model: CartItem,
        as: 'items',
        order: [['createdAt', 'ASC']],
        include: [
          {
            model: Variant,
            as: 'Variant',
            include: [
              {
                model: Product,
                as: 'Product',
              },
            ],
          },
        ],
      },
    ],
  })) as any;

  if (!cart) {
    cart = await Cart.create({ user_id, status: 'active' });
  }

  return cart;
};
