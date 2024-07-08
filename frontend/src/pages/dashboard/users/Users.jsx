import React, { useEffect, useState } from "react";
import { getAllUser } from "../../../apis/userApi";

function Users() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);

      try {
        const user = await getAllUser();
        if (user) {
          setData(user);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div>
      {data &&
        data.map((user) => (
          <div className="user-container">
            <h3> {user.email} </h3>
          </div>
        ))}
    </div>
  );
}

export default Users;
