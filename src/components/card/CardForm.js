import React from "react";
import { useNavigate } from "react-router-dom";

function CardForm({ onChange, onSubmit, card, deckId, add }) {
  const navigate = useNavigate();

  if (!card) {
    return <p>Loading...</p>; // or some loading indicator
  }

  return (
    <form name="createCard" onSubmit={onSubmit}>
      <div>
        <label htmlFor="front">Front</label>
        <textarea
          type="textarea"
          name="front"
          id="front"
          placeholder="Front side of card"
          required={true}
          onChange={onChange}
          value={card.front || ""}
        />
      </div>
      <div>
        <label htmlFor="back">Back</label>
        <textarea
          type="textarea"
          name="back"
          id="back"
          placeholder="Back side of card"
          required={true}
          onChange={onChange}
          value={card.back || ""}
        />
      </div>
      <button
        type="button"
        onClick={() => {
          navigate(`/decks/${deckId}`);
        }}
      >
        {add ? "Done" : "Cancel"}
      </button>
      <button
        type="submit"
        onClick={() => {
          if (add) {
            window.location.reload();
          }
        }}
      >
        {add ? "Save" : "Submit"}
      </button>
    </form>
  );
}

export default CardForm;
