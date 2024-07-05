import React from "react";
import Card from "./Card";

function CardList({ cards, deleteHandler }) {
  return (
    <div>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          deleteHandler={() => deleteHandler(card.id)}
        />
      ))}
    </div>
  );
}

export default CardList;
