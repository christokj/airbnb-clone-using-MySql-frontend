import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
// import { UserContext } from './UserContext.jsx';

function BookingWidget({ place }) {
  const [check_in, setCheck_in] = useState("");
  const [check_out, setCheck_out] = useState("");
  const [number_of_guests, setNumber_of_guests] = useState("1");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (check_in && check_out) {
    numberOfNights = differenceInCalendarDays(
      new Date(check_out),
      new Date(check_in)
    );
  }
  async function bookThisPlace() {
    await axios.post("/bookings", {
      check_in,
      check_out,
      number_of_guests,
      name,
      phone,
      place: place.title,
      price: numberOfNights * place.price,
    });
    // const bookingId = response.data._id;
    // setRedirect(`/account/bookings/${bookingId}`);
    alert("Place booked");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white p-4 rounded-xl mt-4">
      <div className="text-xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4 ">
            <label>Check in: </label>
            <input
              type="date"
              value={check_in}
              onChange={(ev) => setCheck_in(ev.target.value)}
            />
          </div>
          <div className="py-4 px-4">
            <label>Check out: </label>
            <input
              type="date"
              value={check_out}
              onChange={(ev) => setCheck_out(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="py-4 px-4 border-t">
            <label>Number of guests: </label>
            <input
              type="number"
              value={number_of_guests}
              onChange={(ev) => setNumber_of_guests(ev.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Fullname:</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label>Phone number:</label>
              <input
                type="tel"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <button onClick={bookThisPlace} className="primary mt-2">
        Book
        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}

export default BookingWidget;
