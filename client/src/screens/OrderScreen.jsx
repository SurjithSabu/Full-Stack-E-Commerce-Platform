// client/src/screens/OrderScreen.jsx
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

  return isLoading ? (
    <h2>Loading...</h2>
  ) : error ? (
    <div className="text-red-500">{error?.data?.message || error.error}</div>
  ) : (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-6">Order {order._id}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="md:col-span-8 space-y-6">
          
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">Shipping</h2>
            <p><strong>Name: </strong> {order.user.name}</p>
            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`} className="text-blue-600">{order.user.email}</a></p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div className="bg-green-100 text-green-700 p-2 rounded mt-2">Delivered on {order.deliveredAt}</div>
            ) : (
              <div className="bg-red-100 text-red-700 p-2 rounded mt-2">Not Delivered</div>
            )}
          </div>

          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <p><strong>Method: </strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <div className="bg-green-100 text-green-700 p-2 rounded mt-2">Paid on {order.paidAt}</div>
            ) : (
              <div className="bg-red-100 text-red-700 p-2 rounded mt-2">Not Paid</div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <p>Order is empty</p>
            ) : (
              <div className="space-y-3">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <Link to={`/product/${item.product}`} className="text-blue-600 hover:underline">
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-gray-700">
                      {item.qty} x ${item.price} = <strong>${(item.qty * item.price).toFixed(2)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="md:col-span-4">
          <div className="border border-gray-200 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between"><span>Items</span><span>${order.itemsPrice}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${order.shippingPrice}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${order.taxPrice}</span></div>
              <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span>${order.totalPrice}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;