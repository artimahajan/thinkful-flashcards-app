import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import { Link } from "react-router-dom";

const Study = () => {
  const [flipped, setFlipped] = useState(false);
  const [isFront, setIsFront] = useState(true);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [deckName, setDeckName] = useState("");

  const navigate = useNavigate();
  const { deckId } = useParams();
  const parsedDeckId = parseInt(deckId);

  useEffect(() => {
    readDeck(parsedDeckId).then((deck) => {
      setDeckName(deck.name);
      setCards(deck.cards);
    });
  }, [parsedDeckId]);

  const showRestartPrompt = () => {
    if (
      window.confirm(
        `Restart cards?\n\nClick 'cancel' to return to the home page.`
      )
    ) {
      setCurrentCardIndex(0);
    } else {
        navigate("/");
    }
  };
  const handleFlip = () => {
    setFlipped(true);
    setIsFront(!isFront);
  };
  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      showRestartPrompt();
    }
    setFlipped(false);
    setIsFront(true);
  };

  const cardTitle =
    cards.length >= 3
      ? `Card ${currentCardIndex + 1} of ${cards.length}`
      : `Not enough cards.`;
  const cardText =
    cards.length >= 3
      ? isFront
        ? cards[currentCardIndex].front
        : cards[currentCardIndex].back
      : `You need at least 3 cards to study. There are ${cards.length} cards in this deck.`;

  return (
    <div>
      <h2>Study: {deckName}</h2>
      <div className="card">
        <h5 className="m-2">{cardTitle}</h5>
        <p className="m-2">{cardText}</p>
        <div className="button-row">
          {cards.length >= 3 ? (
            <>
              <button className="btn btn-secondary m-2" onClick={handleFlip}>
                Flip
              </button>
              {flipped && (
                <button className="btn btn-primary" onClick={handleNext}>
                  Next
                </button>
              )}
            </>
          ) : (
            <Link
              to={`/decks/${deckId}/cards/new`}
              className="btn btn-primary m-2"
            >
              ✚ Add Cards
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Study;