import React from "react";
import { Route, Routes } from "react-router-dom";
import DeckList from "./components/deck/DeckList";
import DeckScreen from "./components/deck/DeckScreen";
import DeckCreateNew from "./components/deck/DeckCreateNew";
import CardCreateNew from "./components/card/CardCreateNew";
import CardEdit from "./components/card/CardEdit";
import DeckEdit from "./components/deck/DeckEdit";
import NotFound from "./components/layout/NotFound";

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DeckList />} />
      <Route path="/decks" element={<DeckList />}>
        <Route path="decks/:deckId" element={<DeckScreen />} />
        <Route path="/decks/new" element={<DeckCreateNew />} />
        <Route path="/decks/:deckId/cards/new" element={<CardCreateNew />} />
        <Route
          path="/decks/:deckId/cards/:cardId/edit"
          element={<CardEdit />}
        />
        <Route path="/decks/:deckId/edit" element={<DeckEdit />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RootRoutes;
