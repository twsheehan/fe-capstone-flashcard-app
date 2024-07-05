import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import Breadcrumb from "../layout/Breadcrumb";
import CardForm from "./CardForm";

function CardCreateNew() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((deck) => {
        setDeck(deck);
      })
      .catch((error) => {
        return <p>`ERROR: ${error.message}`</p>;
      });
    return () => abortController.abort();
  }, [deckId]);

  const initialCardState = {
    front: "",
    back: "",
  };

  const [card, setCard] = useState({ ...initialCardState });

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
        console.log(error);
      })
      .finally(() => {
        setCard({ ...initialCardState });
      });
  };

  const breadcrumbs = [
    { link: "/", title: "Home", active: false },
    { link: `decks/${deck.id}`, title: deck.name, active: false },
    { link: "", title: "Add Card", active: true },
  ];

  return (
    <div>
      <Breadcrumb props={breadcrumbs} />
      <h2>{deck.name}: Add Card</h2>
      <CardForm
        onSubmit={onSubmit}
        onChange={changeHandler}
        cardData={card}
        deckId={deckId}
        add={true}
      />
    </div>
  );
}

export default CardCreateNew;
