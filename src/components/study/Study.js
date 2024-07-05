import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Breadcrumb from "../layout/Breadcrumb";
import CardsLimit from "./CardsLimit";

function Study() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [error, setError] = useState(undefined);
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);

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
    return <p>ERROR: {error.message}</p>;
  }

  if (!deck) {
    return <p>Loading...</p>;
  }

  if (deck.cards && deck.cards.length <= 2) {
    return (
      <CardsLimit deckId={deckId} deck={deck} cardsCount={deck.cards.length} />
    );
  }

  const flipHandler = () => {
    setFlipped(!flipped);
  };

  const clickHandler = () => {
    if (index < deck.cards.length - 1) {
      setIndex(index + 1);
      setFlipped(false);
    } else {
      const confirmRestart = window.confirm(
        "Restart cards?\n\nClick 'cancel' to return to the home page."
      );
      if (confirmRestart) {
        setIndex(0);
        setFlipped(false);
        navigate(`/decks/${deckId}/study`);
      } else {
        navigate("/");
      }
    }
  };

  const breadcrumbs = [
    { link: "/", title: "Home", active: false },
    { link: `/decks/${deckId}`, title: deck.name, active: false },
    { link: "", title: "Study", active: true },
  ];

  return (
    <div>
      <Breadcrumb props={breadcrumbs} />
      <h2>Study: {deck.name}</h2>
      <div className="card">
        <div className="cardBody">
          <h5>
            Card {index + 1} of {deck.cards?.length || 0}
          </h5>
        </div>
        <p className="cardQuestion">
          {flipped ? deck.cards?.[index]?.back : deck.cards?.[index]?.front}
        </p>
        <button onClick={flipHandler}>Flip</button>
        {flipped && <button onClick={clickHandler}>Next</button>}
      </div>
    </div>
  );
}

export default Study;
