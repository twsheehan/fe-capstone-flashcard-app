import React from "react";
import { useNavigate } from "react-router-dom";

function CardForm({ onChange, onSubmit, cardData, deckId, add }) {
  const navigate = useNavigate();

  return (
    <form name="createCard" onSubmit={onSubmit}>
      <div>
        <label>Front</label>
        <textarea
          type="textarea"
          name="front"
          id="front"
          placeholder="Front side of card"
          required={true}
          onChange={onChange}
          value={cardData.front}
        />
      </div>
      <div>
        <label>Back</label>
        <textarea
          type="textarea"
          name="back"
          id="back"
          placeholder="Back side of card"
          required={true}
          onChange={onChange}
          value={cardData.back}
        />
      </div>
      <button
        onClick={() => {
          navigate(`/decks/${deckId}`);
        }}
      >
        {add ? "Done" : "Cancel"}
      </button>
      <button type="submit">{add ? "Save" : "Submit"}</button>
    </form>
  );
}

export default CardForm;
