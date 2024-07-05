import React from "react";
import { NavLink } from "react-router-dom";

function Breadcrumb({ props }) {
  return (
    <nav>
      <ol className="breadcrumb">
        {props.map((prop, index) => (
          prop.active ? (
            <li key={index} className="breadcrumbActive">{prop.title}</li>
          ) : (
            <li key={index} className="breadcrumb">
              <NavLink to={prop.link}>{prop.title}</NavLink>
            </li>
          )
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
