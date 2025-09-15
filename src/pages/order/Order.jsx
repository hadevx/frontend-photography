import Layout from "../../Layout";
import { useGetOrderByIdQuery } from "../../redux/queries/orderApi";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Package, Truck, CreditCard, Mail } from "lucide-react";
import { usePDF } from "react-to-pdf";
import { useRef } from "react";
import Invoice from "../../components/Invoise";
import Badge from "../../components/Badge";
import { Copy } from "@medusajs/ui";

const Order = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const { orderId } = useParams();
  const { data: order } = useGetOrderByIdQuery(orderId);
  console.log(order);
  /*   const { toPDF, targetRef } = usePDF({
    filename: `invoice-${order?.createdAt?.substring(0, 10)}.pdf`,
  });
 */
  const calculateSubtotal = () => {
    return order?.orderItems?.reduce((total, item) => total + item.qty * item.price, 0).toFixed(3);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return (Number(subtotal) + Number(order?.shippingPrice)).toFixed(3);
  };
  /*   const handlePdf = () => {
    toPDF();
  }; */
  console.log(order?.orderItems);
  return (
    <Layout>
      <div className="container mt-[70px] mx-auto p-4   min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Order placed, Thank you &hearts;
          </h1>
          <div className="bg-white rounded-lg shadow border p-6 mb-6">
            <div className="flex  justify-between items-center mb-4">
              <div>
                <h2 className="text-sm lg:text-xl lg:flex lg:items-center lg:gap-2 font-semibold text-gray-800">
                  Id #{order?._id} <Copy content={order?._id} />
                </h2>
                <p className="text-sm text-gray-600">
                  Placed on {order?.createdAt?.substring(0, 10)}
                </p>
              </div>
              <span className="px-3 py-1  rounded-full text-xs font-medium">
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

            {/* Booking Info */}
            <div className="bg-white   space-y-2">
              <p>
                <span className="font-semibold">Booking Date:</span>{" "}
                {order?.bookingDate?.slice(0, 10)}
              </p>
              <p>
                <span className="font-semibold">Booking Time:</span> {order?.slot?.startTime} -{" "}
                {order?.slot?.endTime}
              </p>
              <p>
                <span className="font-semibold">Number of People:</span> {order?.numberOfPeople}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {order?.location}
              </p>
              {order?.notes && (
                <p>
                  <span className="font-semibold">Notes:</span> {order?.notes}
                </p>
              )}
              <p>
                <span className="font-semibold">Down payment:</span> {order?.downPayment.toFixed(3)}{" "}
                KD
              </p>
              <p>
                <span className="font-semibold">Total Price:</span>{" "}
                {(order?.downPayment + order?.price).toFixed(3)} KD
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
            <div className="grid grid-cols-2">
              <div className="">
                <div className="mb-2">
                  <p className="font-medium">Name:</p>
                  <p className="text-gray-700">{userInfo?.name}</p>
                </div>
                <div className="mb-2">
                  <p className="font-medium">Email:</p>
                  <p className="text-gray-700">{userInfo?.email}</p>
                </div>
              </div>
              <div>
                <p className="font-medium">Age:</p>
                <p className="text-gray-700">{userInfo?.age}</p>
                <div className="mb-2">
                  <p className="font-medium">Phone:</p>
                  <p className="text-gray-700">{userInfo?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            {/*     <button
              onClick={handlePdf}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Download Invoice
            </button> */}
            <Link
              to="mailto:hn98q8@hotmail.com"
              className="bg-gray-300 flex gap-3 hover:bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded transition duration-300">
              Contact us <Mail />
            </Link>
          </div>
        </div>

        {/* Hidden invoice template for PDF generation */}
        {/*     <div
          ref={targetRef}
          style={{
            position: "absolute",
            top: "-9999px",
            left: "-9999px",
            height: "auto",
            width: "auto",
          }}>
          <Invoice order={order} />
        </div> */}
      </div>
    </Layout>
  );
};

export default Order;
