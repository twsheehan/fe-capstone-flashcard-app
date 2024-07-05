import React from "react";
import { NavLink } from "react-router-dom";
import DeckDeleteButton from "./DeckDeleteButton";

function Deck({ deck }) {
  return (
    <div className="card">
      <div className="cardBody">
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <NavLink to={`/decks/${deck.id}/edit`}>
          <button>Edit</button>
        </NavLink>
        <NavLink to={`/decks/${deck.id}/study`}>
          <button>Study</button>
        </NavLink>
        <NavLink to={`/decks/${deck.id}/new`}>+ Add Cards</NavLink>
        <DeckDeleteButton deck={deck} />
      </div>
    </div>
  );
}

export default Deck;
