import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Helper function to convert 12-hour time format (AM/PM) to 24-hour time
function convertTo24Hour(timeString) {
  const [time, modifier] = timeString.split(" "); // Split the time and AM/PM
  let [hours, minutes] = time.split(":").map(num => parseInt(num));

  // Adjust the hours based on AM/PM
  if (modifier === "PM" && hours !== 12) hours += 12; // Convert PM to 24-hour
  if (modifier === "AM" && hours === 12) hours = 0; // Convert 12 AM to 0 (midnight)

  return hours * 60 + minutes; // Return the time in minutes for easier comparison
}

// Function to check if the time is between 8:00 PM and 6:00 AM
function isBetween8PMAnd6AM(timeString) {
  const timeInMinutes = convertTo24Hour(timeString);

  // Time range: 8:00 PM (20:00) to 6:00 AM (06:00)
  const start = 20 * 60; // 8:00 PM in minutes (20:00)
  const end = 6 * 60;   // 6:00 AM in minutes (06:00)

  // Check if the time falls within the range
  return timeInMinutes >= start || timeInMinutes < end; // Time is valid if it's after 8 PM or before 6 AM
}

const MyAppointments = () => {
  const { backendUrl, token, getAllAgentsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const navigate = useNavigate();

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getAllAgentsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment payment",
      description: "Appointment payment",
      order_id: order.id,
      reciept: order.reciept,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } });
          if (data.success) {
            getUserAppointments();
            navigate('/my-appointments');
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } });

      if (data.success) {
        initPay(data.order);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  // Modify appointments before rendering
  const modifiedAppointments = appointments.map((item) => {
    if (isBetween8PMAnd6AM(item.slotTime)) {
      // Increment the fee by 100 if it's between 8:00 PM and 6:00 AM
      item.agentData.fees += 100;
    }
    return item;
  });

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment</p>

      <div>
        {modifiedAppointments.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
            <div>
              <img className='w-32 bg-indigo-50' src={item.agentData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.agentData.name}</p>
              <p>{item.agentData.speciality}</p>
              <div className='flex flex-row'>
                <p>Final Fees:</p>
                <p>{item.agentData.fees}</p>
              </div>
              <p>{item.slotTime}</p>
              <div className='flex flex-row gap-28'>
                <div>
                  <p className='text-zinc-700 font-medium mt-1'>Address: Agent</p>
                  <p className='text-xs'>{item.agentData.address.line1}</p>
                  <p className='text-xs'>{item.agentData.address.line2}</p>
                </div>
                <p className='pt-5'>To</p>
                <div>
                  <p className='text-zinc-700 font-medium mt-1'>Address: Customer</p>
                  <p className='text-xs'>{item.address.line1}</p>
                  <p className='text-xs'>{item.address.line2}</p>
                </div>
              </div>

              <p className='text-sm mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
              {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>}
              {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 text-red-500'>Appointment Cancelled</button>}
              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
