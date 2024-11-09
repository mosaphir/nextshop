import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FaCoins, FaCheckCircle, FaRegClock } from "react-icons/fa";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (session?.user) {
      axios
        .get(`/api/orders?userId=${session.user.id}`)
        .then((response) => setOrders(response.data))
        .catch((err) => console.error("Failed to load orders", err));
    }
  }, [session]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold">Your Profile</h1>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Your Orders</h2>
        <ul className="space-y-4 mt-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-4">
                <FaCoins className="text-3xl text-green-500" />
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">Total: ${order.total}</p>
                  <p className="text-sm text-gray-500">Currency: {order.currency}</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:flex sm:items-center space-x-3">
                {order.status === "paid" ? (
                  <span className="text-green-500 flex items-center space-x-1">
                    <FaCheckCircle />
                    <span>Paid</span>
                  </span>
                ) : (
                  <span className="text-yellow-500 flex items-center space-x-1">
                    <FaRegClock />
                    <span>Pending</span>
                  </span>
                )}
                {order.paymentUrl && (
                  <a
                    href={order.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Complete Payment
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
