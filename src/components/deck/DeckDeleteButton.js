import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function DeckDeleteButton({ deck }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    const result = window.confirm(
      `Delete this deck: ${deck.name}?\n\nYou will not be able to recover it.`
    );
    if (result) {
      deleteDeck(deck.id).then(navigate(0));
    }
  };

  return (
    <button type="button" className="btn btn-danger" onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeckDeleteButton;
