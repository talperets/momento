import{ useState, useEffect } from "react";
import "./App.css";
import shuffle from "./utilities/shuffle";
import Card from "./components/Card";
import Heading from "./components/Heading";
import useAppBadge from "./hooks/useAppBadge";


function App() {
  const [cards, setCards] = useState(shuffle);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [setBadge, clearBadge] = useAppBadge()
  const [wins, setWins] = useState(0);
  
  
  useEffect(() => {
    let pickTimer;
    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        handleTurn();
      } else {
        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 500);
      }
    }
    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo]);

  useEffect(() => {
    const checkWin = cards.filter((card) => !card.matched);
    if (cards.length && checkWin.length < 1) {
      console.log("You win!");
      setBadge(wins)
      setWins(wins + 1);
      handleTurn();
      setCards(shuffle);
    }
  }, [cards, wins]);

  const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };
  const handleTurn = () => {
    clearBadge()
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };
  const handleNewGame = () => {
    setWins(0);
    handleTurn();
    setCards(shuffle);
  };
  return (
    <div>
      <Heading wins={wins} handleNewGame={handleNewGame}/>      
      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;

          return (
            <Card
              key={id}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => handleClick(card)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
