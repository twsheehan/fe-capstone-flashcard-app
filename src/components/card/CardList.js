import React from "react";
import Card from "./Card";

function CardList({ cards, deleteHandle }) {
  return (
    <div>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          deleteHandler={() => deleteHandle(card.id)}
        />
      ))}
    </div>
  );
}

export default CardList;
