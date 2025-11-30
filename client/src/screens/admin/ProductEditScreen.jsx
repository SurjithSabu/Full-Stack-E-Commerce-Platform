// client/src/screens/admin/ProductEditScreen.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 mb-10">
      <Link to="/admin/productlist" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 inline-block mb-4">
        Go Back
      </Link>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

        {loadingUpdate && <div className="text-blue-500 mb-4">Updating...</div>}
        
        {isLoading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <div className="text-red-500">{error.data?.message || error.error}</div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Count In Stock</label>
              <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"></textarea>
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditScreen;