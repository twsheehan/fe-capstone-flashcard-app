import React from "react";
import { NavLink } from "react-router-dom";

function Breadcrumb({ props }) {
  return (
    <nav>
      <ol className="breadcrumb">
        {props.map((prop) =>
          prop.active === true ? (
            <li className="breadcrumbActive">{prop.title}</li>
          ) : (
            <li className="breadcrumb">
              <NavLink to={prop.link}></NavLink>
            </li>
          )
        )}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
