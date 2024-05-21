import React from "react";
import { Link } from "react-router-dom";

export default function CardForm({
  handleSubmit,
  heading,
  frontSide,
  backSide,
  setFrontSide,
  setBackSide,
  deckId,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <h2>{`${heading}`}</h2>
      <h5>Front</h5>
      <textarea
        value={frontSide}
        onChange={(e) => setFrontSide(e.target.value)}
        placeholder="Front side of card"
        style={{ width: "100%" }}
      />
      <h5 className="mt-2">Back</h5>
      <textarea
        value={backSide}
        onChange={(e) => setBackSide(e.target.value)}
        placeholder="Back side of card"
        style={{ width: "100%" }}
      />
      <div className="mt-2">
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          Done
        </Link>
        <button type="submit" className="btn btn-primary mx-2">
          Save
        </button>
      </div>
    </form>
  );
}