import { CartProvider as Provider } from '@/app/context/CartContext';

const CartProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider>{children}</Provider>
);

export default CartProvider;
