import { useNavigate } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function DeckDeleteButton({ deck }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    const result = window.confirm(
      `Delete this deck: ${deck.name}? \n\nYou will not be able to recover it.`
    );
    if (result) {
      deleteDeck(deck.id).then(navigate("/"));
    }
  };

  return (
    <button type="button" className="btn btn-danger" onClick={handleDelete}>
      Delete
      <i class="bi bi-trash"></i>
    </button>
  );
}

export default DeckDeleteButton;
