import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

const AddCard = () => {
  const [deckName, setDeckName] = useState("");
  const [frontSide, setFrontSide] = useState("");
  const [backSide, setBackSide] = useState("");
  const { deckId } = useParams();
  const parsedDeckId = parseInt(deckId);

  const fetchDeck = () => {
    readDeck(parsedDeckId).then((deck) => setDeckName(deck.name));
  };
  useEffect(fetchDeck, [parsedDeckId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCard = {
      front: frontSide,
      back: backSide,
    };
    createCard(parsedDeckId, newCard);

    setFrontSide("");
    setBackSide("");
  };

  return (
    <CardForm
      handleSubmit={handleSubmit}
      heading={`${deckName}: Add Card`}
      frontSide={frontSide}
      setFrontSide={setFrontSide}
      backSide={backSide}
      setBackSide={setBackSide}
      deckId={deckId}
    />
  );
};

export default AddCard;