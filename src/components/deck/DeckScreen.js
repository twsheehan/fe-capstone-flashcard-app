import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { deleteCard, readDeck } from "../../utils/api";
import Breadcrumb from "../layout/Breadcrumb";
import DeckDeleteButton from "./DeckDeleteButton";
import CardList from "../card/CardList";

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
    return <p>`ERROR: ${error.message}`</p>;
  }

  const deleteHandler = (cardId) => {
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
      <h4>{deck.name}</h4>
      <p>{deck.description}</p>
      <div>
        <NavLink to={`${pathname}/edit`}>
          <button>Edit</button>
        </NavLink>
        <NavLink to={`${pathname}/study`}>
          <button>Study</button>
        </NavLink>
        <NavLink to={`${pathname}/cards/new`}>
          <button>Add Cards</button>
        </NavLink>
        <DeckDeleteButton deck={deck} />
      </div>
      <h3>Cards</h3>
      {deck.cards && <CardList cards={cards} handleDelete={deleteHandler} />}
    </div>
  );
}

export default DeckScreen;
