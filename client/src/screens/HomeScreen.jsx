// client/src/screens/HomeScreen.jsx
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';

const HomeScreen = () => {
  // Fetch data automatically using the hook
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-4">Latest Products</h1>
      
      {isLoading ? (
        <h2 className="text-xl text-center mt-10">Loading Products...</h2>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error?.data?.message || error.error}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default HomeScreen;