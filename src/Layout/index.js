import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { readDeck } from "../utils/api";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import Breadcrumb from "./Breadcrumb";

function Layout() {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const location = useLocation();

  // Breadcrumbs
  useEffect(() => {
    const buildBreadcrumbs = async () => {
      const path = location.pathname;
      const pathParts = path.split("/").filter((part) => part !== "");

      let breadcrumbTrail = [{ url: "/", label: " 🏠 Home" }];

      let cardId;
      if (pathParts.length > 0) {
        breadcrumbTrail = breadcrumbTrail.concat(
          await Promise.all(
            pathParts.map(async (part, index) => {
              let label = part;
              const id = parseInt(part);
              part = !isNaN(id) ? "id" : part;
              let deck;
              if (id && index === 1) {
                try {
                  deck = await readDeck(id);
                } catch (e) {
                  console.log(e);
                }
              }

              switch (part) {
                case "decks":
                case "cards":
                  return undefined;
                case "new":
                  if (index === 1) {
                    label = "Create Deck";
                  } else {
                    label = "Add Card";
                  }
                  break;
                case "id":
                  if (index === 1) {
                    label = deck.name;
                  } else if (index === 3) {
                    cardId = id;
                    return undefined;
                  }
                  break;
                case "study":
                  label = "Study";
                  break;
                case "edit":
                  label = index === 4 ? `Edit Card ${cardId}` : "Edit";
                  break;
                default:
                  label = "WHO DUN THIS?";
                  break;
              }
              return {
                url: `/${pathParts.slice(0, index + 1).join("/")}`,
                label,
              };
            })
          )
        );
      }

      setBreadcrumbs(breadcrumbTrail);
    };

    buildBreadcrumbs();
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className="container">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        {/* TODO: Implement the screen starting here */}
        <Routes >
          <Route path="/" element={<Home/>} />
          <Route path="/decks/new" element={<CreateDeck/>} />
          <Route path="/decks/:deckId/study" element={<Study/>} />
          <Route path="/decks/:deckId" element={<Deck/>} />
          <Route path="/decks/:deckId/edit" element={<EditDeck/>} />
          <Route path="/decks/:deckId/cards/new" element={<AddCard/>} />
          <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
