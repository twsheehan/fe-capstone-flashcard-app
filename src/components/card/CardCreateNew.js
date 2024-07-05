import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import Breadcrumb from "../layout/Breadcrumb";
import CardForm from "./CardForm";

function CardCreateNew() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({ front: "", back: "" });

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((deck) => {
        setDeck(deck);
      })
      .catch((error) => {
        console.error(error); // Improved error handling
      });
    return () => abortController.abort();
  }, [deckId]);

  const changeHandler = ({ target }) => {
    setCard({ ...card, [target.name]: target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    createCard(deckId, card, abortController.signal)
      .then(() => {
        navigate(`/decks/${deckId}`);
      })
      .catch((error) => {
        console.error(error); // Improved error handling
      })
      .finally(() => {
        setCard({ front: "", back: "" });
      });
  };

  const breadcrumbs = [
    { link: "/", title: "Home", active: false },
    { link: `/decks/${deck.id}`, title: deck.name, active: false },
    { link: "", title: "Add Card", active: true },
  ];

  return (
    <div>
      <Breadcrumb props={breadcrumbs} />
      <h2>{deck.name}: Add Card</h2>
      <CardForm
        onChange={changeHandler}
        onSubmit={onSubmit}
        card={card}
        deckId={deckId}
        add={true}
      />
    </div>
  );
}

export default CardCreateNew;
