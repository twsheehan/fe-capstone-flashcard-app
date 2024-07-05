import React from "react";
import Breadcrumb from "../layout/Breadcrumb";

function CardsLimit({ deckId, deck, cardsCount }) {
  const breadcrumbs = [
    { link: "/", title: "Home", active: false },
    { link: `/decks/${deckId}`, title: deck.name, active: false },
    { link: "", title: "Study", active: true },
  ];

  return (
    <div>
      <Breadcrumb props={breadcrumbs} />
      <h2>{deck.name}: Study</h2>
      <h3>Not enough cards.</h3>
      <p>
        You need at least 3 cards to study. There are {cardsCount} cards in this
        deck.
      </p>
    </div>
  );
}

export default CardsLimit;
