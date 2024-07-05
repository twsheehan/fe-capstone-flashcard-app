import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import Breadcrumb from "../layout/Breadcrumb";

function DeckEdit() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((deck) => {
        setDeck(deck);
      })
      .catch(setError);
    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <p>`ERROR: ${error.message}`</p>;
  }

  if (!deck) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const changeHandler = ({ target }) => {
    setDeck({ ...deck, [target.name]: target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateDeck(deckId, abortController.signal)
      .then((deck) => {
        updateDeck(deck, abortController.signal);
        navigate("/");
      })
      .catch(setError);
    return () => abortController.abort();
  };

  const breadcrumbs = [
    { link: "/", title: "Home", active: false },
    { link: `/decks/${deckId}`, title: deck.name, active: false },
    { link: "", title: "Edit Deck", active: true },
  ];

  return (
    <div>
      <Breadcrumb props={breadcrumbs} />
      <h2>Edit Deck</h2>
      <form name="editDeck" onSubmit={submitHandler}>
        <div className="formGroup">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={changeHandler}
            value={deck.name}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            type="textarea"
            name="description"
            onChange={changeHandler}
            value={deck.description}
          />
        </div>
        <NavLink to="/">
          <button type="button">Cancel</button>
        </NavLink>
        <button type="submit" onSubmit={submitHandler}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default DeckEdit;
