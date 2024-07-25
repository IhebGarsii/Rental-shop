import React, { useEffect, useState } from "react";
import { getAllUser, blockUser } from "../../../apis/userApi";
import "./users.css";
function Users() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBlock = async (idUser) => {
    const confirmBlock = window.confirm(
      "Are you sure you want to block this user?"
    );
    if (confirmBlock) {
      await blockUser(idUser);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);

      try {
        const user = await getAllUser();
        if (user) {
          setData(user);
          setIsLoading(false);
          console.log(user);
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
    <div className="users">
      {data &&
        data.map((user) => (
          <div key={user._id} className="user-container">
            <div className="user-left-container">
              <div className="user-left">
                <img
                  className="user-img"
                  src={`http://localhost:4000/uploads/users/${user.image}`}
                  alt=""
                />
                {user.firstName} {user.lastName}
              </div>
              <h3>
                <span>Email:</span> {user.email}
              </h3>
              <h3>
                <span>Role:</span>
                {user.roles.map((role) => (
                  <span> {role} </span>
                ))}
              </h3>
              <button
                onClick={() => handleBlock(user._id)}
                className="action-button refuse-button"
              >
                Block
              </button>
            </div>
            <h3 id="rented-lable">rented Cars:</h3>
            <div className="rented-car-list">
              {user.idCars.map((car) => (
                <span> {car.model} </span>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Users;
