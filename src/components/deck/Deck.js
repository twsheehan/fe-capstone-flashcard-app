import React from "react";
import { NavLink } from "react-router-dom";
import DeckDeleteButton from "./DeckDeleteButton";

function Deck({ deck }) {
  return (
    <div className="card">
      <div className="cardBody">
        <h4>{deck.name}</h4>
        <h5>{deck.cards.length}</h5>
        <p>{deck.description}</p>
        <NavLink to={`/decks/${deck.id}`}>
          <button>View</button>
        </NavLink>
        <NavLink to={`/decks/${deck.id}/study`}>
          <button>Study</button>
        </NavLink>
        <DeckDeleteButton deck={deck} />
      </div>
    </div>
  );
}

export default Deck;
