// Edit Card	/decks/:deckId/cards/:cardId/edit	Allows the user to modify information on an existing card
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

export default function EditCard() {
  const [frontSide, setFrontSide] = useState("");
  const [backSide, setBackSide] = useState("");
  const { cardId, deckId } = useParams();
  const parsedCardId = parseInt(cardId);
  const parsedDeckId = parseInt(deckId);
  const navigate = useNavigate();

  useEffect(() => {
    readCard(parsedCardId).then((card) => {
      setFrontSide(card.front);
      setBackSide(card.back);
    });
  }, [parsedCardId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCard = {
      id: parsedCardId,
      front: frontSide,
      back: backSide,
      deckId: parsedDeckId,
    };
    updateCard(newCard).then(() => {
      setFrontSide("");
      setBackSide("");

      navigate(`/decks/${parsedDeckId}`);
    });
  };

  return (
    <CardForm
      handleSubmit={handleSubmit}
      heading={`Edit Card`}
      frontSide={frontSide}
      setFrontSide={setFrontSide}
      backSide={backSide}
      setBackSide={setBackSide}
      deckId={deckId}
    />
  );
}