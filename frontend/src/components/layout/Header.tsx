import Link from 'next/link';
import CartIcon from '../cart/CartIcon';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            E-Commerce Store
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="hover:text-gray-600">
              Products
            </Link>
            <Link href="/checkout" className="hover:text-gray-600">
              <CartIcon />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}