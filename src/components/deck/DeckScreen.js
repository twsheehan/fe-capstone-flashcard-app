import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { deleteCard, readDeck } from "../../utils/api";
import Breadcrumb from "../layout/Breadcrumb";
import DeckDeleteButton from "./DeckDeleteButton";
import CardList from "../card/CardList";
import CardAddButton from "../card/CardAddButton";

function DeckScreen() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((deck) => {
        setDeck(deck);
        setCards(deck.cards);
      })
      .catch(setError);
    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <p>ERROR: {error.message}</p>;
  }

  const deleteCardHandler = (cardId) => {
    const result = window.confirm(
      `Delete this card?\n\nYou will not be able to recover it.`
    );
    if (result) {
      deleteCard(cardId).then(() => {
        setCards((currentCards) =>
          currentCards.filter((card) => card.id !== cardId)
        );
      });
    }
  };

  const breadcrumbs = [
    { link: "/", title: "Home", active: false },
    { link: "", title: deck.name, active: true },
  ];

  return (
    <div>
      <Breadcrumb props={breadcrumbs} />
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <div>
        <NavLink to={`${pathname}/edit`}>
          <button>Edit</button>
        </NavLink>
        <NavLink to={`${pathname}/study`}>
          <button>Study</button>
        </NavLink>
        <CardAddButton pathname={pathname} />
        <DeckDeleteButton deck={deck} />
      </div>
      {deck.cards && (
        <CardList cards={cards} handleDelete={deleteCardHandler} />
      )}
    </div>
  );
}

export default DeckScreen;
