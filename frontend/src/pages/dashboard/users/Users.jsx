import React, { useEffect, useState } from "react";
import { getAllUser, blockUser } from "../../../apis/userApi";
import "./users.css";
function Users() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBlock = async (idUser) => {
    console.log(idUser);
    await blockUser(idUser);
  };

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
    <div className="users">
      {data &&
        data.map((user) => (
          <div key={user._id} className="user-container">
            <div className="user-left">
              <img
                className="user-img"
                src={`http://localhost:4000/uploads/users/${user.image}`}
                alt=""
              />
              {user.firstName} {user.lastName}
            </div>
            <div className="user-middle">
              {user.email}
              {user.roles.map((role) => (
                <span> {role} </span>
              ))}
            </div>
            <div className="user-right">
              <button
                onClick={() => handleBlock(user._id)}
                className="action-button refuse-button"
              >
                Block
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Users;
