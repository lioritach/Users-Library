import { useState } from "react";

export const useFilters = (users) => {
  const [filter, setFilter] = useState(null);
  let filteredUsers = users;

  const applyFilters = (state) => {
    setFilter(state);
  };

  if (filter && users.length) {
    filteredUsers = users.filter((user) => {
      if (
        filter.name &&
        !user.name.first.toLowerCase().includes(filter.name.toLowerCase())
      ) {
        return false;
      }

      if (filter.email !== "" && user.email.toLowerCase() !== filter.email) {
        return false;
      }

      if (filter.id !== "" && user.id.value.toLowerCase() !== filter.id) {
        return false;
      }

      if (
        filter.location !== "" &&
        user.location.country.toLowerCase() !== filter.location
      ) {
        return false;
      }

      return true;
    });
  }

  return {
    filteredUsers,
    applyFilters,
  };
};
