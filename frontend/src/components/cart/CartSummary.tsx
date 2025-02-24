'use client';

import { useCart } from '@/contexts/CartContext';

export default function CartSummary() {
  const { items, total, updateItem, removeItem, isLoading } = useCart();

  if (isLoading) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item._id} className="flex items-center justify-between py-4 border-b">
              <div>
                <h3 className="font-semibold">{item.productId.name}</h3>
                <p className="text-gray-600">${item.productId.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateItem(item._id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateItem(item._id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}