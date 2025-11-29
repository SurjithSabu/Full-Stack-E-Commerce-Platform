// client/src/components/Product.jsx
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover object-center"
        />
      </Link>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 truncate">
            {product.name}
          </h2>
        </Link>

        {/* Rating Placeholder (We can add stars later) */}
        <div className="flex items-center mt-2 mb-2">
           <span className="text-yellow-500 font-bold">{product.rating} ★</span>
           <span className="text-gray-500 text-sm ml-2">({product.numReviews} reviews)</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900">${product.price}</h3>
      </div>
    </div>
  );
};

export default Product;