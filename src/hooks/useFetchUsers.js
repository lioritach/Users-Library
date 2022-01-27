import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsersData, setStatus } from "../redux/features/usersSlice";

export const useFetchUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setStatus("loading"));
      try {
        const { data } = await axios.get(
          "https://randomuser.me/api/?results=10"
        );
        dispatch(setStatus("success"));
        dispatch(getUsersData(data.results));
      } catch (err) {
        setStatus("error");
      }
    };

    fetchUsers();
  }, []);
};
