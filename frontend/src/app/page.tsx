import ProductList from '@/components/product/ProductList';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <ProductList />
    </div>
  );
}