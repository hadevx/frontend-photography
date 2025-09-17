import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout";
import { useGetPlanByIdQuery } from "../../redux/queries/planApi";
import { useGetAlltimesQuery } from "../../redux/queries/timeApi";
import { useCreateOrderMutation } from "../../redux/queries/orderApi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DatePicker from "react-multi-date-picker";
import CustomLoader from "../../components/CustomLoader";

const BookingPage = () => {
  const { planId } = useParams();
  const { data: plan, isLoading } = useGetPlanByIdQuery(planId);
  const { data: times } = useGetAlltimesQuery();
  const [createOrder, { isLoading: loadingCreateOrder }] = useCreateOrderMutation();
  const navigate = useNavigate();

  console.log(times);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [people, setPeople] = useState(1);
  const [notes, setNotes] = useState("");
  const [slotsForDate, setSlotsForDate] = useState([]);
  const [location, setLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");

  console.log(slotsForDate);
  // Update slots when date changes
  useEffect(() => {
    if (!selectedDate || !times) return;
    const slots =
      times.find((t) => new Date(t.date).toISOString().split("T")[0] === selectedDate)?.times || [];
    setSlotsForDate(slots);
    setSelectedSlot("");
  }, [selectedDate, times]);

  const toggleAddOn = (addOn) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOn) ? prev.filter((a) => a._id !== addOn._id) : [...prev, addOn]
    );
  };

  const addOnsPrice = selectedAddOns.reduce((acc, a) => acc + a.price, 0);
  const totalPrice = plan ? plan.price * people + addOnsPrice : 0;
  const downPayment = totalPrice * 0.2;

  const handleBooking = async () => {
    try {
      const finalLocation = location === "Other" ? customLocation : location;
      const selectedSlotObj = slotsForDate.find((s) => s._id === selectedSlot);
      const payload = {
        plan: plan._id,
        bookingDate: selectedDate,
        slot: {
          startTime: selectedSlotObj.startTime,
          endTime: selectedSlotObj.endTime,
        },
        selectedAddOns: [...selectedAddOns],
        numberOfPeople: people,
        notes,
        location: finalLocation,
        price: totalPrice,
        downPayment,
      };

      const res = await createOrder(payload).unwrap();
      navigate(`/order/${res._id}`);
      toast.success("Booking confirmed!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  // Compute available dates from times array
  const availableDates = times?.map((t) => new Date(t.date)) || [];
  return (
    <Layout>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <section className="py-16 px-2 lg:px-6 max-w-3xl  mx-auto space-y-10 ">
          {/* Header */}
          {/*   <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center  space-y-3">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
              Book Your <span className="text-blue-600">Session</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Choose your preferred date, time, and add-ons to make your experience perfect.
            </p>
          </motion.div> */}

          <div className="space-y-10   p-3 rounded-lg">
            {/* Plan Card */}
            <motion.div className="p-6 bg-gradient-to-b text-center  from-gray-900 to-gray-800 text-white rounded-2xl shadow-lg border border-blue-100">
              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
              <p className=" mb-3 text-2xl">{plan.description}</p>
              <p className=" font-bold text-2xl">{plan.discountedPrice.toFixed(3)} KD</p>
            </motion.div>

            {/* Date & Time Selection */}
            <div className="flex lg:gap-6">
              <div className=" w-full lg:w-auto">
                <label className="block font-semibold mb-2">Choose Date</label>
                <DatePicker
                  value={selectedDate ? new Date(selectedDate) : null}
                  onChange={(date) => setSelectedDate(date.format("YYYY-MM-DD"))}
                  mapDays={({ date }) => {
                    const isAvailable = availableDates.some(
                      (d) =>
                        d.getFullYear() === date.year &&
                        d.getMonth() === date.month.number - 1 &&
                        d.getDate() === date.day
                    );
                    return {
                      disabled: !isAvailable,
                      style: isAvailable
                        ? { backgroundColor: "#3B82F6", color: "white", borderRadius: "6px" }
                        : {},
                    };
                  }}
                  inputClass="hidden" // hide default input
                  render={(value, openCalendar) => (
                    <button
                      type="button"
                      onClick={openCalendar}
                      className="px-4  py-2 bg-blue-600 text-white rounded-md hover:bg-gray-700 transition">
                      {selectedDate ? `Selected: ${selectedDate}` : "Select Date"}
                    </button>
                  )}
                  className="w-full"
                />
              </div>

              <div className="w-full lg:w-auto">
                <label className="block font-semibold mb-2">Choose Time Slot</label>
                <select
                  className="w-full border rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition"
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}>
                  <option value="">Select a time</option>
                  {slotsForDate.map((slot) => (
                    <option key={slot._id} value={slot._id} disabled={slot.reserved}>
                      {slot.startTime} - {slot.endTime} {slot.reserved ? "(Reserved)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block font-semibold mb-2">Select Location</label>
              <select
                className="w-full border rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition"
                value={location}
                onChange={(e) => setLocation(e.target.value)}>
                <option value="">Select a location</option>
                <option value="Webschema Studio">Webschema Studio</option>
                <option value="Other">Other</option>
              </select>
              {location === "Other" && (
                <input
                  type="text"
                  placeholder="Enter custom location"
                  className="w-full border rounded-lg px-4 py-2 mt-2 shadow-sm hover:shadow-md transition"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                />
              )}
            </div>

            {/* Add-ons */}
            {plan.addOns?.length > 0 && (
              <div className="space-y-2">
                <p className="font-semibold text-gray-700 mb-2">Add-ons</p>
                <div className="flex flex-wrap gap-3">
                  {plan.addOns.map((add) => (
                    <motion.label
                      key={add._id}
                      whileHover={{ scale: 1.05 }}
                      className={`cursor-pointer px-4 py-2 rounded-md border transition ${
                        selectedAddOns.includes(add)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
                      }`}>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedAddOns.includes(add)}
                        onChange={() => toggleAddOn(add)}
                      />
                      {add.name} (+{add.price.toFixed(3)} KD)
                    </motion.label>
                  ))}
                </div>
              </div>
            )}

            {/* People & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center gap-3  ">
                <span className="font-semibold">Number of People:</span>
                <div className="flex gap-3 items-center">
                  <button
                    className="px-3 py-1 text-lg bg-blue-600 text-white border rounded-md hover:bg-blue-800 transition"
                    onClick={() => setPeople((p) => Math.max(1, p - 1))}>
                    -
                  </button>
                  <span className="text-lg font-bold">{people}</span>
                  <button
                    className="px-3 py-1 text-lg bg-blue-600 text-white border rounded-md hover:bg-blue-800 transition"
                    onClick={() => setPeople((p) => p + 1)}>
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter your notes"
                  className="w-full border rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Total & Confirm */}
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 space-y-2 text-center">
              <p className="text-xl font-bold">Total: {totalPrice.toFixed(3)} KD</p>
              <p className="text-gray-700">Down Payment (20%): {downPayment.toFixed(3)} KD</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBooking}
                disabled={
                  !selectedDate ||
                  loadingCreateOrder ||
                  !selectedSlot ||
                  !location ||
                  (location === "Other" && !customLocation)
                }
                className={`w-full py-3 mt-3 rounded-xl font-semibold text-white transition ${
                  selectedDate &&
                  selectedSlot &&
                  location &&
                  (location !== "Other" || customLocation)
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}>
                {loadingCreateOrder ? "Creating..." : " Confirm Booking "}
              </motion.button>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BookingPage;
