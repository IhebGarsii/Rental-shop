import React, { useEffect, useState } from "react";
import { getBookings } from "../../../apis/bookingApi";
import Booking from "../../../components/booking/Booking";
import "./bookingList.css";
function BookingList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [tag, setTag] = useState("ACCEPTED");

  useEffect(() => {
    const filterData = async () => {
      const fData = data.filter((f) => f.status === tag);
      setFilter(fData);
    
    };
    filterData();
  }, [tag, data]);
  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const requestsList = await getBookings();
        if (requestsList) {
          setIsLoading(false);
          setData(requestsList);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);
  return (
    <div className="booking-List-container">
      <select
        className="status-select"
        onChange={(e) => setTag(e.target.value)}
      >
        <option value="ACCEPTED">ACCEPTED</option>
        <option value="REFUSED">REFUSED</option>
        <option value="PENDING">PENDING</option>
      </select>
      {filter &&
        filter.map((book) => (
          <div key={book._id} className="booking-component">
            <Booking booking={book} />
          </div>
        ))}
    </div>
  );
}

export default BookingList;
