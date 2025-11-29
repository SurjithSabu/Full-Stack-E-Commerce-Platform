// client/src/screens/ProductScreen.jsx
import { useState } from 'react'; // <--- Import useState
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice'; // <--- Import Action

const ProductScreen = () => {
  const { id: productId } = useParams();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1); // <--- State for Quantity

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart'); // Redirect to Cart Page
  };

  return (
    <>
      <Link className='btn bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded my-3 inline-block' to='/'>
        Go Back
      </Link>

      {isLoading ? (
        <h2 className="text-center text-xl mt-10">Loading...</h2>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
           {error?.data?.message || error.error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="md:col-span-1">
            <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
          </div>

          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
            <div className="border-b border-gray-200 py-2 mb-2">
              <span className="text-yellow-500 font-bold">{product.rating} ★</span>
              <span className="text-gray-500 ml-2">({product.numReviews} reviews)</span>
            </div>
            <div className="text-xl font-bold text-gray-900 mb-4">Price: ${product.price}</div>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Status:</span>
                <span className={`font-bold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </span>
              </div>

              {/* Quantity Selector (Only show if in stock) */}
              {product.countInStock > 0 && (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Qty:</span>
                  <select
                    className="border border-gray-300 rounded p-2"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                className={`w-full py-3 rounded-lg font-bold text-white transition-colors
                  ${product.countInStock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={product.countInStock === 0}
                onClick={addToCartHandler} // <--- Connect Button
              >
                {product.countInStock > 0 ? 'Add To Cart' : 'Out Of Stock'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;