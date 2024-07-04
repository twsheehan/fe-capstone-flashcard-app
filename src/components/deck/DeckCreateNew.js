import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createDeck } from "../../utils/api";
import Breadcrumb from "../layout/Breadcrumb";

function DeckCreateNew() {
  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const changeHandler = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createDeck(formData);
    navigate("/decks");
  };

  const breadcrumbs = [
    { link: "/", title: "Home", active: false },
    { link: "", title: "Create Deck", active: true },
  ];

  return (
    <div>
      <Breadcrumb props={breadcrumbs} />
      <h2>Create Deck</h2>
      <form name="createDeck" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="name">
            Name
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Deck Name"
              onChange={changeHandler}
              value={formData.name}
            />
          </label>
        </div>
        <div className="formGroup">
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              type="textarea"
              name="description"
              placeholder="Brief description of the deck"
              onChange={changeHandler}
              value={formData.description}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
        <NavLink to="/">
          <button>Cancel</button>
        </NavLink>
      </form>
    </div>
  );
}

export default DeckCreateNew;
