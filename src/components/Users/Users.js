import React from "react";
import "./Users.css";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import UserCard from "../Cards/UserCard";
import { useSelector } from "react-redux";
import { selectStatus, selectUsersData } from "../../redux/features/usersSlice";
import UsersFiltered from "../UsersFiltered/UsersFiltered";
import { useFilters } from "../../hooks/useFilters";

const Users = () => {
  useFetchUsers();
  const usersData = useSelector(selectUsersData);
  const status = useSelector(selectStatus);
  const { filteredUsers, applyFilters } = useFilters(usersData);

  console.log(usersData);

  if (status === "idle" || status === "loading") {
    return <div>Loading data ...</div>;
  }

  if (status === "success" && usersData?.length) {
    return (
      <div className="rootContainer">
        <UsersFiltered applyFilters={applyFilters} />
        <div className="usersContainer">
          {filteredUsers?.length ? (
            filteredUsers?.map((user) => <UserCard key={user?.id} {...user} />)
          ) : (
            <h3>No results</h3>
          )}
        </div>
      </div>
    );
  }

  return <h2>No users found</h2>;
};

export default Users;
