// client/src/screens/PlaceOrderScreen.jsx
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      // We will create the Order Success page (OrderScreen) in the next step
      // For now, let's just log it or go home
      console.log("Order Placed!", res);
      alert("Order Placed Successfully!");
      navigate('/'); 
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold mb-6">Place Order</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Details */}
        <div className="md:col-span-8 space-y-8">
          
          {/* Shipping Info */}
          <div className="border-b pb-4">
            <h2 className="text-2xl font-semibold mb-3">Shipping</h2>
            <p className="text-gray-700">
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          {/* Payment Info */}
          <div className="border-b pb-4">
            <h2 className="text-2xl font-semibold mb-3">Payment Method</h2>
            <p className="text-gray-700">
              <strong>Method: </strong>
              {cart.paymentMethod}
            </p>
          </div>

          {/* Order Items */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <Link to={`/product/${item._id}`} className="text-blue-600 hover:underline">
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

        {/* Right Column: Order Summary */}
        <div className="md:col-span-4">
          <div className="border border-gray-200 rounded-lg shadow-md p-4 bg-white">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Order Summary</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>${cart.itemsPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${cart.shippingPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${cart.taxPrice}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total:</span>
                <span>${cart.totalPrice}</span>
              </div>
            </div>

            {error && (
               <div className="bg-red-100 text-red-700 p-2 mt-4 rounded text-sm">
                 {error.data?.message || error.error}
               </div>
            )}

            <button
              type="button"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mt-6 transition-colors
                ${cart.cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;