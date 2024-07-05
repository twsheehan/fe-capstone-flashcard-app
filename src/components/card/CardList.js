import React from "react";
import Card from "./Card";

function CardList({ cards, handleDelete }) {
  return (
    <div>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          deleteHandler={() => handleDelete(card.id)} // Use handleDelete here
        />
      ))}
    </div>
  );
}

export default CardList;
