import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doctors } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";

const Appointments = () => {
  const { docId } = useParams();
  const currencySymbol = "₹";
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();

  // Fetch doctor info from doctors list locally
  useEffect(() => {
    if (doctors.length && docId) {
      const doc = doctors.find((doc) => doc._id === docId);
      setDocInfo(doc || null);
    }
  }, [docId, doctors]);

  // Generate available slots locally
  const getAvailableSlots = () => {
    if (!docInfo) return;
    setDocSlots([]);

    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;

        // Check if slot is booked in local docInfo.slots_booked
        const isSlotAvailable =
          !docInfo.slots_booked?.[slotDate]?.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);

    // Auto-select first available slot time
    if (slots.length && slots[0].length) {
      setSlotTime(slots[0][0].time);
      setSlotIndex(0);
    }
  };

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  // Local booking simulation
  const bookAppointment = () => {
    if (!slotTime) {
      toast.warning("Please select a slot time");
      return;
    }
    if (!docSlots[slotIndex] || !docSlots[slotIndex][0]) {
      toast.error("Invalid slot selected");
      return;
    }

    const date = docSlots[slotIndex][0].datetime;

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const slotDate = day + "_" + month + "_" + year;

    // Simulate booking by updating local docInfo.slots_booked object
    const newSlotsBooked = { ...docInfo.slots_booked };
    if (!newSlotsBooked[slotDate]) {
      newSlotsBooked[slotDate] = [];
    }
    if (!newSlotsBooked[slotDate].includes(slotTime)) {
      newSlotsBooked[slotDate].push(slotTime);

      setDocInfo({
        ...docInfo,
        slots_booked: newSlotsBooked,
      });

      toast.success(`Appointment booked on ${slotDate} at ${slotTime}`);
      // Optionally navigate to another page or reset selection
    } else {
      toast.error("This slot is already booked");
    }
  };

  if (!docInfo) return null;

  return (
    <div>
      {/* Doctor details */}
      <div className="sm:ml-72 sm:pl-4 mt-8">
        <div className="flex items-center gap-4">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-32 h-32 object-cover rounded-full border"
          />
          <div>
            <h2 className="text-2xl font-semibold text-[#333]">
              {docInfo.name}
            </h2>
            <p className="text-[#555] text-sm mt-1">
              {docInfo.degree} • {docInfo.speciality}
            </p>
            <p className="text-[#777] text-sm mt-1">
              {docInfo.experience} Experience
            </p>
            <p className="text-[#777] text-sm mt-1">Fees: ₹{docInfo.fees}</p>
            <p className="text-[#777] text-sm mt-1">
              Address: {docInfo.address.line1}, {docInfo.address.line2}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[#555] text-sm">{docInfo.about}</p>
        </div>
      </div>

      {/* Booking slots */}
      <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-[#5f6FFF] text-white"
                    : "border border-[#DDDDDD]"
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length > 0 &&
            docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                key={index}
                className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? "bg-[#5f6FFF] text-white"
                    : "text-[#949494] border border-[#B4B4B4]"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-[#5f6FFF] text-white text-sm font-light px-20 py-3 rounded-full my-6"
        >
          Book an appointment
        </button>
      </div>

      {/* Related doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  );
};

export default Appointments;
