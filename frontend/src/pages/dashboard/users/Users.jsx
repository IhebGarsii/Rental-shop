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
    <div>
      {data &&
        data.map((user) => (
          <div className="user-container">
            <table className="user-table">
              {/* <thead>
                <tr>
                  <th>Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Roles</th>
                  <th>Actions</th>
                </tr>
              </thead> */}
              <tbody>
                <tr>
                  <td className="img-container">
                    <img
                      className="user-img"
                      src={`http://localhost:4000/uploads/users/${user.image}`}
                      alt=""
                    />
                    {user.firstName} {user.lastName}
                  </td>
                  <td> {user.email} </td>
                  <td>
                    {user.roles.map((role) => (
                      <span> {role} </span>
                    ))}
                  </td>

                  <td>
                    <button
                      onClick={() => handleBlock(user._id)}
                      className="action-button refuse-button"
                    >
                      Block
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}

export default Users;
