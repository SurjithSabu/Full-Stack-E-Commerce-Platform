// client/src/screens/ShippingScreen.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // Fill form with saved data if it exists
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    // Save to Redux
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    // Move to next step
    navigate('/payment');
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Shipping Address</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Postal Code</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;