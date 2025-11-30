// client/src/screens/admin/OrderListScreen.jsx
import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div className="text-red-500">{error?.data?.message || error.error}</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">USER</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">DATE</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">TOTAL</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">PAID</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">DELIVERED</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-sm text-gray-900">{order._id}</td>
                <td className="py-2 px-4 text-sm text-gray-900">{order.user && order.user.name}</td>
                <td className="py-2 px-4 text-sm text-gray-900">
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className="py-2 px-4 text-sm text-gray-900">${order.totalPrice}</td>
                <td className="py-2 px-4 text-sm">
                  {order.isPaid ? (
                    <span className="text-green-600 font-bold">✔ {order.paidAt?.substring(0, 10)}</span>
                  ) : (
                    <span className="text-red-600 font-bold">✖</span>
                  )}
                </td>
                <td className="py-2 px-4 text-sm">
                  {order.isDelivered ? (
                    <span className="text-green-600 font-bold">✔ {order.deliveredAt?.substring(0, 10)}</span>
                  ) : (
                    <span className="text-red-600 font-bold">✖</span>
                  )}
                </td>
                <td className="py-2 px-4 text-sm">
                  {/* We can add a Details button later if needed */}
                  <Link to={`/order/${order._id}`} className="text-blue-600 hover:underline">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderListScreen;