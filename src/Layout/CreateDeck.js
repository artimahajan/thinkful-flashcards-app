// Create Deck	/decks/new	Allows the user to create a new deck
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api";

export default function CreateDeck() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDeck = {
      name: deckName,
      description: deckDescription,
    };
    createDeck(newDeck).then((deck) => {
      setDeckName("");
      setDeckDescription("");

      navigate(`/decks/${deck.id}`);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Deck</h1>
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
      <Link to={`/`} type="cancel" className="btn btn-secondary">
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary mx-2">
        Submit
      </button>
    </form>
  );
}