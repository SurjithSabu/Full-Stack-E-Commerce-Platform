// client/src/screens/admin/ProductListScreen.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useDeleteProductMutation, useCreateProductMutation } from '../../slices/productsApiSlice';

const ProductListScreen = () => {
  const navigate = useNavigate();
  
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        refetch(); // Refresh the list to remove the deleted item
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Create a new sample product?')) {
      try {
        await createProduct();
        refetch(); // Refresh to show the new sample product
      } catch (err) {
         alert(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={createProductHandler}
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 flex items-center"
        >
          <span className="mr-2">+</span> Create Product
        </button>
      </div>

      {loadingDelete && <div className="text-red-500 mb-4">Deleting...</div>}
      {loadingCreate && <div className="text-green-500 mb-4">Creating...</div>}

      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div className="text-red-500">{error?.data?.message || error.error}</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRICE</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORY</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BRAND</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-sm text-gray-900">{product._id}</td>
                <td className="py-2 px-4 text-sm text-gray-900">{product.name}</td>
                <td className="py-2 px-4 text-sm text-gray-900">${product.price}</td>
                <td className="py-2 px-4 text-sm text-gray-900">{product.category}</td>
                <td className="py-2 px-4 text-sm text-gray-900">{product.brand}</td>
                <td className="py-2 px-4 text-right text-sm">
                  <Link
                    to={`/admin/products/${product._id}/edit`}
                    className="text-blue-600 hover:text-blue-900 mr-4 font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteHandler(product._id)}
                    className="text-red-600 hover:text-red-900 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductListScreen;