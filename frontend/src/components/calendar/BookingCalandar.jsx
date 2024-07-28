import React from "react";
import "./bookingCalandar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);
function bookingCalandar({ car }) {
  const events = car.bookingDuration.map((booking) => {
    return {
      title: `Booking from ${new Date(
        booking.startDate
      ).toLocaleDateString()} To ${new Date(
        booking.endDate
      ).toLocaleDateString()} `,
      start: new Date(booking.startDate),
      end: new Date(booking.endDate),
    };
  });
  return (
    <div className="booking-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "1000px" }}
        views={[Views.MONTH, Views.AGENDA]}
      />
    </div>
  );
}

export default bookingCalandar;
