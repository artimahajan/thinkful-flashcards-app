// Edit Deck	/decks/:deckId/edit	Allows the user to modify information on an existing deck
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

export default function EditDeck() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const navigate = useNavigate();
  const { deckId } = useParams();
  const parsedDeckId = parseInt(deckId);

  useEffect(() => {
    readDeck(parsedDeckId).then((deck) => {
      setDeckName(deck.name);
      setDeckDescription(deck.description);
    });
  }, [parsedDeckId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDeck = {
      id: parsedDeckId,
      name: deckName,
      description: deckDescription,
    };
    updateDeck(newDeck).then(() => {
      setDeckName("");
      setDeckDescription("");

      navigate(`/decks/${parsedDeckId}`);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Deck</h1>
      <div className="form-group">
        <label htmlFor="deckName">Name</label>
        <input
          type="text"
          className="form-control"
          id="deckName"
          placeholder="Deck Name"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="deckDescription">Description</label>
        <textarea
          className="form-control"
          id="deckDescription"
          placeholder="Brief description of the deck"
          value={deckDescription}
          onChange={(e) => setDeckDescription(e.target.value)}
          rows="3"
          required
        ></textarea>
      </div>
      <Link
        to={`/decks/${parsedDeckId}`}
        type="cancel"
        className="btn btn-secondary"
      >
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary mx-2">
        Submit
      </button>
    </form>
  );
}