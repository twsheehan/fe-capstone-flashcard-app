import React from "react";
import { NavLink } from "react-router-dom";

function CardAddButton({ pathname }) {
  return (
    <NavLink to={`${pathname}/cards/new`}>
      <button>+ Add Cards</button>
    </NavLink>
  );
}

export default CardAddButton;
