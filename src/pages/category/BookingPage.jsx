import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout";
import { useGetPlanByIdQuery } from "../../redux/queries/planApi";
import { useGetAlltimesQuery } from "../../redux/queries/timeApi";
import { useCreateOrderMutation } from "../../redux/queries/orderApi";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import CustomLoader from "../../components/CustomLoader";

const transitionProps = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};

const BookingPage = () => {
  const { planId } = useParams();
  const { data: plan, isLoading } = useGetPlanByIdQuery(planId);
  const { data: times } = useGetAlltimesQuery();
  const [createOrder, { isLoading: loadingCreateOrder }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [people, setPeople] = useState(1);
  const [notes, setNotes] = useState("");
  const [slotsForDate, setSlotsForDate] = useState([]);
  const [location, setLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");

  // Update slots when date changes
  useEffect(() => {
    if (!selectedDate || !times) return;
    const slots =
      times.find((t) => new Date(t.date).toISOString().split("T")[0] === selectedDate)?.times || [];
    setSlotsForDate(slots);
    setSelectedSlot("");
  }, [selectedDate, times]);

  // Toggle add-ons
  const toggleAddOn = (addOn) => {
    setSelectedAddOns((prev) =>
      prev.find((a) => a._id === addOn._id)
        ? prev.filter((a) => a._id !== addOn._id)
        : [...prev, addOn]
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
        selectedAddOns,
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
        <section className="py-16 font-bold px-2 lg:px-6 max-w-3xl mx-auto space-y-10">
          {/* Plan Card */}
          <motion.div className="p-6 bg-gradient-to-b text-center from-gray-900 to-gray-800 text-white rounded-2xl shadow-lg border border-blue-100">
            <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
            <p className="mb-3 text-2xl">{plan.description}</p>
            <p className="font-bold text-2xl">{plan.discountedPrice.toFixed(3)} KD</p>
          </motion.div>

          {/* Date & Time Selection */}
          <div className="flex items-center lg:gap-6">
            <div className="w-full lg:w-auto">
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
                inputClass="hidden"
                render={(value, openCalendar) => (
                  <button
                    type="button"
                    onClick={openCalendar}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-gray-700 transition">
                    {selectedDate ? ` ${selectedDate}` : "Select Date"}
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
              <motion.div
                className="flex flex-wrap gap-3 overflow-visible max-w-[600px]"
                layout
                transition={transitionProps}>
                {plan.addOns.map((add) => {
                  const isSelected = selectedAddOns.some((a) => a._id === add._id);
                  return (
                    <motion.button
                      key={add._id}
                      onClick={() => toggleAddOn(add)}
                      layout
                      initial={false}
                      animate={{
                        backgroundColor: isSelected ? "#1d4ed8" : "rgba(255,255,255)",
                      }}
                      transition={{
                        ...transitionProps,
                        backgroundColor: { duration: 0.1 },
                      }}
                      className={`inline-flex items-center px-4 py-2 rounded-full text-base font-bold whitespace-nowrap overflow-hidden ring-1 ring-inset ${
                        isSelected ? "text-white ring-white" : "text-black ring-zinc-300"
                      }`}>
                      <motion.div
                        className="relative flex items-center flex-row-reverse gap-2"
                        animate={{
                          width: isSelected ? "auto" : "100%",
                          paddingRight: isSelected ? "1.5rem" : "0",
                        }}
                        transition={{
                          ease: [0.175, 0.885, 0.32, 1.275],
                          duration: 0.3,
                        }}>
                        <span>{add.name}</span>
                        <span className={isSelected ? "text-white" : "text-black"}>
                          (+{add.price.toFixed(3)} KD)
                        </span>
                        <AnimatePresence>
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={transitionProps}
                              className="absolute right-0">
                              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                                <Check className="w-3 h-3 text-blue-700" strokeWidth={4} />
                              </div>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          )}

          {/* People & Notes */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            <div className="flex flex-col lg:items-center gap-3">
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
                selectedDate && selectedSlot && location && (location !== "Other" || customLocation)
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}>
              {loadingCreateOrder ? "Creating..." : "Confirm Booking"}
            </motion.button>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BookingPage;
