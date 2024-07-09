import React from "react";
import { NavLink } from "react-router-dom";
import DeckDeleteButton from "./DeckDeleteButton";

function Deck({ deck }) {
  return (
    <div className="deck">
      <div className="deckInfo">
        <h2>{deck.name}</h2>
        <p>{deck.cards.length} cards</p>
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
