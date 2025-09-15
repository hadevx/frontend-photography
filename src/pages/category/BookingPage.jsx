import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout";
import { useGetPlanByIdQuery } from "../../redux/queries/planApi";
import { useGetAlltimesQuery } from "../../redux/queries/timeApi";
import { useCreateOrderMutation } from "../../redux/queries/orderApi";
import { toast } from "react-toastify";

const BookingPage = () => {
  const { planId } = useParams();
  const { data: plan } = useGetPlanByIdQuery(planId);
  const { data: times } = useGetAlltimesQuery();
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [people, setPeople] = useState(1);
  const [notes, setNotes] = useState("");
  const [slotsForDate, setSlotsForDate] = useState([]);
  const [location, setLocation] = useState(""); // selected option
  const [customLocation, setCustomLocation] = useState(""); // if "Other" is selected

  // Update slots when date changes
  useEffect(() => {
    if (!selectedDate || !times) return;
    const slots = times
      .find((t) => new Date(t.date).toISOString().split("T")[0] === selectedDate)
      ?.times.filter((s) => !s.reserved);
    setSlotsForDate(slots || []);
    setSelectedSlot("");
  }, [selectedDate, times]);

  // Toggle add-ons
  const toggleAddOn = (addOn) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOn) ? prev.filter((a) => a._id !== addOn._id) : [...prev, addOn]
    );
  };

  // Total price
  const addOnsPrice = selectedAddOns.reduce((acc, a) => acc + a.price, 0);
  const totalPrice = plan ? plan.price * people + addOnsPrice : 0;

  // Down payment (20%)
  const downPayment = totalPrice * 0.2;

  console.log(selectedDate);
  console.log(selectedSlot);

  const handleBooking = async () => {
    try {
      const finalLocation = location === "Other" ? customLocation : location;
      // Find the selected slot object
      const selectedSlotObj = slotsForDate.find((s) => s._id === selectedSlot);
      // Prepare payload for backend
      const payload = {
        plan: plan._id,
        bookingDate: selectedDate,
        slot: {
          startTime: selectedSlotObj.startTime,
          endTime: selectedSlotObj.endTime,
        },
        addOns: selectedAddOns.map((a) => a._id),
        numberOfPeople: people,
        notes,
        location: finalLocation,
        price: totalPrice,
        downPayment,
      };

      const res = await createOrder(payload).unwrap(); // RTK Query call
      console.log("Booking created:", res);

      // Optionally navigate to a order page
      navigate(`/order/${res._id}`);
      toast.success("Booking confirmed!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  if (!plan || !times) return <Layout>Loading...</Layout>;

  const availableDates = times.map((t) => t.date);

  return (
    <Layout>
      <section className="py-16 px-6 max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Book Your Session</h2>

        {/* Plan Info */}
        <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
          <p className="text-gray-600 mb-1">{plan.description}</p>
          <p className="text-blue-600 font-bold">{plan.discountedPrice.toFixed(3)} KD</p>
        </div>

        {/* Date selection */}
        <div>
          <label className="block font-semibold mb-1">Choose Date</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}>
            <option value="">Select a date</option>
            {availableDates.map((d) => {
              const isoDate = new Date(d).toISOString().split("T")[0];
              return (
                <option key={d} value={isoDate}>
                  {new Date(d).toLocaleDateString()}
                </option>
              );
            })}
          </select>
        </div>

        {/* Time Slot selection */}
        {selectedDate && (
          <div>
            <label className="block font-semibold mb-1">Choose Time Slot</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}>
              <option value="">Select a time</option>
              {slotsForDate.map((slot) => (
                <option key={slot._id} value={slot._id}>
                  {slot.startTime} - {slot.endTime}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Location */}
        <div>
          <label className="block font-semibold mb-1">Select Location</label>
          <select
            className="w-full border rounded px-3 py-2"
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
              className="w-full border rounded px-3 py-2 mt-2"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
            />
          )}
        </div>

        {/* Add-ons */}
        {plan.addOns?.length > 0 && (
          <div className="space-y-2">
            <p className="font-semibold">Add-ons</p>
            {plan.addOns.map((add) => (
              <div key={add._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedAddOns.includes(add)}
                  onChange={() => toggleAddOn(add)}
                  className="h-4 w-4"
                />
                <span>
                  {add.name} (+{add.price.toFixed(3)} KD)
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Number of People */}
        <div className="flex items-center gap-4 mt-4">
          <span className="font-semibold">Number of People:</span>
          <button
            className="px-3 py-1 border rounded"
            onClick={() => setPeople((p) => Math.max(1, p - 1))}>
            -
          </button>
          <span className="text-lg font-bold">{people}</span>
          <button className="px-3 py-1 border rounded" onClick={() => setPeople((p) => p + 1)}>
            +
          </button>
        </div>

        {/* Notes */}
        <div>
          <label className="block font-semibold mb-1">Notes (Optional)</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Total + Down Payment + Confirm */}
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-lg font-bold">Total: {totalPrice.toFixed(3)} KD</p>
          <p className="text-md font-medium text-gray-700">
            Down Payment (20%): {downPayment.toFixed(3)} KD
          </p>
          <button
            onClick={handleBooking}
            disabled={
              !selectedDate ||
              !selectedSlot ||
              !location ||
              (location === "Other" && !customLocation)
            }
            className={`w-full py-3 rounded font-semibold text-white transition ${
              selectedDate && selectedSlot && location && (location !== "Other" || customLocation)
                ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}>
            Confirm Booking
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default BookingPage;
