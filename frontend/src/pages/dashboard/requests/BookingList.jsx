import React, { useEffect, useState } from "react";
import { getBookings } from "../../../apis/bookingApi";
import Booking from "../../../components/booking/Booking";
import "./bookingList.css";
import { useQuery } from "@tanstack/react-query";
function BookingList() {
  const [filter, setFilter] = useState([]);
  const [tag, setTag] = useState("PENDING");
  const { data, setIsLoading, isError } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  useEffect(() => {
    const filterData = async () => {
      const fData = data.filter((f) => f.status === tag);
      setFilter(fData);
    };
    filterData();
  }, [tag, data]);

  return (
    <div className="booking-List-container">
      <select
        className="status-select"
        onChange={(e) => setTag(e.target.value)}
      >
        <option value="PENDING">PENDING</option>
        <option value="ACCEPTED">ACCEPTED</option>
        <option value="REFUSED">REFUSED</option>
      </select>

      {filter &&
        filter.map((booking) => (
          <div key={booking._id} className="booking-component">
            <Booking booking={booking}>
              <div className="booking-wrapperr">
                <Booking.Full />
                <Booking.AdminActions />
              </div>
            </Booking>
          </div>
        ))}
    </div>
  );
}

export default BookingList;
