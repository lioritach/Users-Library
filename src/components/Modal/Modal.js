import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNewUser } from "../../redux/features/usersSlice";
import "./Modal.css";
import { v4 as uuidv4 } from "uuid";

const Modal = ({ closeModal, title }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const updateFields = (
    title,
    firstname,
    lastname,
    email,
    country,
    state,
    city
  ) => {
    if (
      firstname.length === 0 ||
      lastname.length === 0 ||
      email.length === 0 ||
      country.length === 0 ||
      state.length === 0 ||
      city.length === 0
    ) {
      setError("All the fields are required!");
      return;
    }

    if (title === "Edit User") {
      if (!validateEmail(email)) {
        setError("Invalid Email");
        return;
      }
    } else if (title === "Add New User") {
      if (!validateEmail(email)) {
        setError("Invalid Email");
        return;
      }
      let newUser = {
        name: { first: firstName, last: lastName, title: "" },
        email: email,
        location: { city: city, country: country, state: state },
        id: { value: uuidv4().slice(1, 6) },
        picture: {
          medium:
            "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg",
        },
      };

      dispatch(setNewUser(newUser));
    }
    closeModal(false);
  };

  const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <h4 className="modal__title">{title}</h4>
        <div className="modal__footer">
          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              required
              name="firstname"
              id="firstname"
              placeholder="Enter firstname"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              name="lastname"
              id="lastname"
              placeholder="Enter lastname"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <input
              name="country"
              id="country"
              placeholder="Enter country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </div>

          <div>
            <label htmlFor="state">State</label>
            <input
              name="state"
              id="state"
              placeholder="Enter state"
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input
              name="city"
              id="city"
              placeholder="Enter city"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </div>
          <p>{error}</p>
          <div className="btns">
            <button
              className="btn"
              onClick={() =>
                updateFields(
                  title,
                  firstName,
                  lastName,
                  email,
                  country,
                  state,
                  city
                )
              }
            >
              Save
            </button>
            <button className="btn" onClick={() => closeModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
