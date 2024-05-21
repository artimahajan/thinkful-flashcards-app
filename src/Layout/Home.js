// Home	/	Shows a list of decks with options to create, study, view, or delete a deck
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

export default function Home() {
  const [decks, setDecks] = useState([]);
  const fetchDecks = () => {
    listDecks().then((decks) => setDecks(decks));
  };

  const handleDeleteDeckButton = (id) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      deleteDeck(id).then(() => fetchDecks());
    }
  };

  useEffect(() => fetchDecks(), []);

  return (
    <>
      <Link to={`/decks/new`} className="btn btn-secondary">
        ✚ Create Deck
      </Link>
      {decks.map((deck, index) => {
        const numCards = deck.cards.length;
        return (
          <div className="card my-2" key={index}>
            <div className="card-body">
              <p className="float-right text-muted">{`${numCards} cards`}</p>
              <h4 className="card-title">{deck.name}</h4>
              <p className="card-text">{deck.description}</p>
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
                👁️ View
              </Link>
              <Link
                to={`/decks/${deck.id}/study`}
                className="btn btn-primary mx-2"
              >
                📖 Study
              </Link>
              <button
                className="btn btn-danger float-right"
                onClick={() => handleDeleteDeckButton(deck.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}