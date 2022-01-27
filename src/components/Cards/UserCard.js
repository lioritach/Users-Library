import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/features/usersSlice";
import Modal from "../Modal/Modal";
import "./UserCard.css";

const UserCard = ({ name, picture, email, id, location }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const deleteUserId = (email) => {
    dispatch(deleteUser(email));
  };

  return (
    <div className="card">
      <img
        className="image"
        src={picture?.medium}
        alt={name?.first + name?.last}
      />
      <p className="name">{`${name?.title} ${name?.first} ${name?.last}`}</p>
      <ul className="cardFooter">
        <li>Email: {email}</li>
        <li>Country: {location?.country}</li>
        <li>City: {location?.city}</li>
        <li>State: {location?.state}</li>
        <li>
          ID:{" "}
          {id?.value === null
            ? `${name?.first + name?.last}12`
            : id?.value?.trim()}
        </li>
      </ul>
      <div className="buttons">
        <button onClick={() => setShow(true)} className="button">
          Edit
        </button>
        <button className="button" onClick={() => deleteUserId(email)}>
          Delete
        </button>
        {show && <Modal closeModal={setShow} title={"Edit User"} />}
      </div>
    </div>
  );
};

export default UserCard;
