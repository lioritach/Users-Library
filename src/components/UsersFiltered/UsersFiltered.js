import React, { useReducer, useState } from "react";
import Modal from "../Modal/Modal";
import "./UsersFiltered.css";

const initialState = {
  name: "",
  email: "",
  id: "",
  location: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "id":
      return { ...state, id: action.payload };
    case "location":
      return { ...state, location: action.payload };
    case "reset":
      return initialState;

    default:
      return state;
  }
};

const UsersFiltered = ({ applyFilters }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  const handleApply = () => {
    applyFilters(state);
  };

  const onReset = () => {
    dispatch({ type: "reset" });
    applyFilters(initialState);
  };

  return (
    <div>
      <div className="filteredContainer">
        <div className="fieldContainer">
          <label htmlFor="name">Search by Name</label>
          <input
            className="input"
            name="name"
            id="name"
            placeholder="Enter name"
            onChange={handleChange}
            value={state.name}
          />
        </div>

        <div className="fieldContainer">
          <label htmlFor="email">Search by Email</label>
          <input
            className="input"
            name="email"
            id="email"
            placeholder="Enter email"
            onChange={handleChange}
            value={state.email}
          />
        </div>

        <div className="fieldContainer">
          <label htmlFor="id">Search by ID</label>
          <input
            className="input"
            name="id"
            id="id"
            placeholder="Enter id"
            onChange={handleChange}
            value={state.id}
          />
        </div>

        <div className="fieldContainer">
          <label htmlFor="location">Search by location</label>
          <input
            className="input"
            name="location"
            id="location"
            placeholder="Enter location (country)"
            onChange={handleChange}
            value={state.location}
          />
        </div>
      </div>
      <div className="buttonsContainer">
        <button type="button" onClick={handleApply}>
          Apply
        </button>
        <button type="button" onClick={onReset}>
          Reset
        </button>
        <button type="button" onClick={() => setShow(true)}>
          Add user
        </button>
      </div>
      {show && <Modal closeModal={setShow} title={"Add New User"} />}
    </div>
  );
};

export default UsersFiltered;
