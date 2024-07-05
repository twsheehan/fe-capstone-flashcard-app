import React from "react";
import { NavLink } from "react-router-dom";
import DeckDeleteButton from "./DeckDeleteButton";

function Deck({ deck }) {
  return (
    <div className="deck">
      <div className="deckInfo">
        <h2>{deck.name}</h2>
        <h3>{deck.cards.length} cards</h3>
        <p>{deck.description}</p>
        <NavLink to={`/decks/${deck.id}/edit`}>
          <button>Edit</button>
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
