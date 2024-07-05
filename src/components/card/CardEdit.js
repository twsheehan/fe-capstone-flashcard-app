import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";
import Breadcrumb from "../layout/Breadcrumb";
import CardForm from "./CardForm";

function CardEdit() {
  const navigate = useNavigate();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((deck) => {
        setDeck(deck);
      })
      .catch((error) => {
        console.log(error);
      });

    readCard(cardId, abortController.signal)
      .then((card) => {
        setCard(card);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deckId, cardId]);

  const changeHandler = ({ target }) => {
    setCard({ ...card, [target.name]: target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateCard(card, abortController.signal)
      .then(() => {
        navigate(`/decks/${deckId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const breadcrumbs = [
    { link: "/", title: "Home", active: false },
    { link: `/decks/${deckId}`, title: deck.name, active: false },
    { link: "", title: `Edit Card ${cardId}`, active: true },
  ];

  return (
    <div>
      <Breadcrumb props={breadcrumbs} />
      <h3>Edit Card</h3>
      <CardForm
        onSubmit={submitHandler}
        onChange={changeHandler}
        card={card}
        deckId={deckId}
        add={false}
      />
    </div>
  );
}

export default CardEdit;
