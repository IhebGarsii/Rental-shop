import React, { useEffect, useState } from "react";
import { getAllUser, blockUser } from "../../../apis/userApi";
import "./users.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "../../../components/loading/Loader";
function Users() {
  const { mutate: mutateBlock } = useMutation({
    mutationFn: blockUser,
    onSuccess: () => {
      toast.success("user Blocked");
    },
    onError: (error) => {
      toast.error("error in blocking the user ", error);
    },
  });

  const handleBlock = async (idUser) => {
    const confirmBlock = window.confirm(
      "Are you sure you want to block this user?"
    );
    if (confirmBlock) {
      mutateBlock(idUser);
    }
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getAllUser,
  });
  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-center">
          <Loader />
        </div>
      </div>
    );
  }
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
