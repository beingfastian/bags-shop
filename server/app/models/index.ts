import sequelize from '../config/database.js';
import UserFactory from './user.js';
import CategoryFactroy from './category.js';
import ProductFactory from './product.js';
import CartFactory from './cart.js';
import VariantFactory from './variant.js';
import OrderFactory from './order.js';
import CouponFactory from './coupon.js';
import PaymentFactory from './payment.js';
import OrderItemFactory from './orderItem.js';
import CartItemFactory from './cartItem.js';
import AddressFactory from './shipment.js';
import VisitorFactory from './visitor.js';
import HeroImageFactory from './HeroImage.js';
import OTPFactory from './otp.js';

const User = UserFactory(sequelize);
const Category = CategoryFactroy(sequelize);
const Product = ProductFactory(sequelize);
const Cart = CartFactory(sequelize);
const Variant = VariantFactory(sequelize);
const Order = OrderFactory(sequelize);
const Coupon = CouponFactory(sequelize);
// const Order = OrderModel(sequelize);
const Payment = PaymentFactory(sequelize);
const OrderItem = OrderItemFactory(sequelize);
const Address = AddressFactory(sequelize);
const CartItem = CartItemFactory(sequelize);
const Visitor = VisitorFactory(sequelize);
const HeroImage = HeroImageFactory(sequelize);
const OTP = OTPFactory(sequelize);

// Product.associate({ Variant, Category });
// Variant.associate({ Product });

// // Order.associate({ Payment, OrderItem });
// Order.associate({ OrderItem, User, Address });
// Order.hasOne(Payment, {
//   foreignKey: 'order_id',
//   as: 'Payment',
// });
// Payment.belongsTo(Order, {
//   foreignKey: 'order_id',
//   as: 'Order',
// });

// // Payment.associate({ Order });
// // OrderItem.associate({ Order });

// Product.hasMany(Variant, { foreignKey: 'product_id', as: 'Variants' });

// Variant.hasMany(OrderItem, { foreignKey: 'variant_id', as: 'OrderItems' });
// Variant.hasOne(Product, { foreignKey: 'variant_id', as: 'Product' });

// OrderItem.belongsTo(Variant, { foreignKey: 'variant_id', as: 'Variant' });
// OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'Order' });

// Cart.associate({ CartItem, User, Coupon });
// CartItem.associate({ Cart, Variant });

Product.hasMany(Variant, { foreignKey: 'product_id', as: 'Variants' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'Category' });
Category.hasMany(Product, { foreignKey: 'category_id', as: 'Products' });

// Variant associations
Variant.belongsTo(Product, { foreignKey: 'product_id', as: 'Product' });
Variant.hasMany(OrderItem, { foreignKey: 'variant_id', as: 'OrderItems' });

// OrderItem associations
OrderItem.belongsTo(Variant, { foreignKey: 'variant_id', as: 'Variant' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'Order' });

// Order associations
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'OrderItems' });
Order.hasOne(Payment, { foreignKey: 'order_id', as: 'Payment' });
Order.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'User',
});
Order.belongsTo(Address, {
  foreignKey: 'address_id',
  as: 'Address',
});

// Payment associations
Payment.belongsTo(Order, { foreignKey: 'order_id', as: 'Order' });

// Cart associations
Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'items' });
Cart.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
// Cart.hasMany(Coupon, { foreignKey: 'cart_id', as: 'Coupons' });

// CartItem associations
CartItem.belongsTo(Cart, { foreignKey: 'cart_id', as: 'Cart' });
CartItem.belongsTo(Variant, { foreignKey: 'variant_id', as: 'Variant' });

// Coupon associations
// sequelize.sync({ force: true }); // Use force: false in production
// no use

export {
  User,
  Category,
  Product,
  Cart,
  Variant,
  Order,
  Coupon,
  Payment,
  OrderItem,
  Address,
  CartItem,
  Visitor,
  HeroImage,
  OTP,
};
