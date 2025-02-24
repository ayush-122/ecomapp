import CartSummary from '@/components/cart/CartSummary';

export default function Checkout() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <CartSummary />
    </div>
  );
}