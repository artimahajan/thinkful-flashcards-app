import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

export default function Deck() {
  const [deck, setDeck] = useState({
    id: -1,
    name: "error2",
    description: "error2",
    cards: [],
  });
  const { deckId } = useParams();
  const parsedDeckId = parseInt(deckId);
  const navigate = useNavigate();

  const fetchDeck = () => {
    readDeck(parsedDeckId).then((data) => setDeck(data));
  };

  const handleDeleteDeckButton = (id) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      deleteDeck(id).then(() => navigate("/"));
    }
  };

  const handleDeleteCardButton = (id) => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      deleteCard(id).then(fetchDeck);
    }
  };

  useEffect(fetchDeck, [parsedDeckId]);

  return (
    <div className="deck">
      <h3>{`${deck.name}`}</h3>
      <p>{`${deck.description}`}</p>
      <div className="button-row">
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
          📝 Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary mx-2">
          📖 Study
        </Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          ✚ Add Cards
        </Link>
        <button
          onClick={() => handleDeleteDeckButton(parsedDeckId)}
          className="btn btn-danger float-right"
        >
          🗑️ Delete
        </button>
      </div>
      <h2 className="mt-4">Cards</h2>
      {deck.cards.map((card, index) => (
        <div className="card" key={index}>
          <div className="row">
            <div className="col-6">
              <div className="left-column m-2">{card.front}</div>
            </div>
            <div className="col-6">
              <div className="right-column m-2">{card.back}</div>
              <button
                onClick={() => handleDeleteCardButton(card.id)}
                className="btn btn-danger float-right m-2"
              >
                🗑️ Delete
              </button>

              <Link
                to={`/decks/${deckId}/cards/${card.id}/edit`}
                className="btn btn-secondary float-right my-2"
              >
                📝 Edit
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}