import React, { useEffect, useState } from "react";
import { listDecks } from "../../utils/api";
import Deck from "./Deck";
import { NavLink } from "react-router-dom";

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal)
      .then((data) => {
        console.log("Fetched decks:", data); // Add logging
        setDecks(data);
      })
      .catch((error) => {
        console.error("Error fetching decks:", error); // Add logging
        setError(error);
      });
    return () => abortController.abort();
  }, []);

  if (error) {
    return <p>ERROR: {error.message}</p>;
  }

  const deckList = decks.map((deck) => (
    <div key={deck.id}>
      <Deck deck={deck} />
    </div>
  ));
  console.log(decks);

  return (
    <div>
      <NavLink to="/decks/new">
        <button type="button">Create Deck</button>
      </NavLink>
      <div>{deckList}</div>
    </div>
  );
}

export default DeckList;
