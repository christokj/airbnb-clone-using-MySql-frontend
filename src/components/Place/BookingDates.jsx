import React from "react";
import { differenceInCalendarDays, format } from "date-fns";
import Lottie from "lottie-react";
import iconCalendar from "../../json/calendar V3.json";

function BookingDates({ booking, className }) {
  return (
    <div className={"flex gap-1 " + className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
      </svg>
      {differenceInCalendarDays(
        new Date(booking.check_out),
        new Date(booking.check_in),
      )}{" "}
      nights
      <div className="flex gap-1 items-center ml-2">
        <Lottie className="w-5" animationData={iconCalendar} />
        {format(new Date(booking.check_in), "dd-MM-yyyy")}
      </div>
      &rarr;
      <div className="flex gap-1 items-center">
        <Lottie className="w-5" animationData={iconCalendar} />
        {format(new Date(booking.check_out), "dd-MM-yyyy")}
      </div>
    </div>
  );
}

export default BookingDates;
