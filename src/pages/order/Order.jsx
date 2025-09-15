import Layout from "../../Layout";
import { useGetOrderByIdQuery } from "../../redux/queries/orderApi";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Package, Truck, CreditCard, Mail, CheckCircle2 } from "lucide-react";
import Badge from "../../components/Badge";
import { Copy } from "@medusajs/ui";
import { motion } from "framer-motion";

const Order = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { orderId } = useParams();
  const { data: order } = useGetOrderByIdQuery(orderId);

  const calculateSubtotal = () => {
    return order?.orderItems?.reduce((total, item) => total + item.qty * item.price, 0).toFixed(3);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return (Number(subtotal) + Number(order?.shippingPrice)).toFixed(3);
  };

  return (
    <Layout>
      <div className="container mt-[70px] mx-auto p-4 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* ✅ Success Header */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="flex flex-col items-center text-center">
            <CheckCircle2 className="w-20 h-20 text-green-500 mb-4" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">Successfully Reserved!</h1>
            <p className="text-gray-600 mt-2">
              Thank you for booking your session. Your order details are below.
            </p>
          </motion.div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-2xl shadow-lg border p-6 space-y-4">
            <div className="flex  flex-col md:flex-row gap-2 lg:justify-between md:items-center mb-4">
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-gray-800 flex items-center gap-2">
                  Order ID: #{order?._id} <Copy content={order?._id} />
                </h2>
                <p className="text-gray-500 text-sm">
                  Placed on {order?.createdAt?.substring(0, 10)}
                </p>
              </div>
              <span>
                {order?.isDelivered ? (
                  <Badge variant="success">
                    Delivered on {order?.deliveredAt?.substring(0, 10)}
                  </Badge>
                ) : order?.isCanceled ? (
                  <Badge variant="danger">Canceled</Badge>
                ) : (
                  <Badge variant="pending">Processing</Badge>
                )}
              </span>
            </div>

            {/* Booking Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50  rounded-lg">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Booking Date:</span>{" "}
                  {order?.bookingDate?.slice(0, 10)}
                </p>
                <p>
                  <span className="font-semibold">Time Slot:</span> {order?.slot?.startTime} -{" "}
                  {order?.slot?.endTime}
                </p>
                <p>
                  <span className="font-semibold">People:</span> {order?.numberOfPeople}
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Location:</span> {order?.location}
                </p>
                {order?.notes && (
                  <p>
                    <span className="font-semibold">Notes:</span> {order?.notes}
                  </p>
                )}
                <p>
                  <span className="font-semibold">Down Payment:</span>{" "}
                  {order?.downPayment.toFixed(3)} KD
                </p>
                <p>
                  <span className="font-semibold">Total Price:</span>{" "}
                  {(order?.downPayment + order?.price).toFixed(3)} KD
                </p>
              </div>
            </div>
          </div>

          {/* Customer Information Card */}
          <div className="bg-white rounded-2xl shadow-lg border p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-medium">Name:</p>
                <p className="text-gray-700">{userInfo?.name}</p>

                <p className="font-medium">Email:</p>
                <p className="text-gray-700">{userInfo?.email}</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Age:</p>
                <p className="text-gray-700">{userInfo?.age}</p>

                <p className="font-medium">Phone:</p>
                <p className="text-gray-700">{userInfo?.phone}</p>
              </div>
            </div>
          </div>

          {/* Contact Button */}
          {/*   <div className="flex justify-center md:justify-start">
            <Link
              to="mailto:hn98q8@hotmail.com"
              className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-5 rounded-xl transition duration-300 shadow">
              Contact Us <Mail />
            </Link>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Order;
