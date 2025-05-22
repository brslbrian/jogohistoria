import { useState, useEffect } from "react";

const cardsData = [
  { id: 1, front: "Índia", back: "Independência do Reino Unido (1947)" },
  { id: 2, front: "Gana", back: "Primeiro país africano independente (1957)" },
  { id: 3, front: "Conferência de Bandung", back: "Cooperação afro-asiática (1955)" },
  { id: 4, front: "Argélia", back: "Independência da França (1962)" },
  { id: 5, front: "Vietnã", back: "Libertação do domínio francês (1954)" },
  { id: 6, front: "Indonésia", back: "Independência dos Países Baixos (1945)" },
];

const shuffleCards = () => {
  const duplicated = [...cardsData, ...cardsData].map((card, index) => ({
    ...card,
    uuid: `${card.id}-${index}`,
  }));
  return duplicated.sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const newCards = shuffleCards();
    setCards(newCards);
    setMatched([]);
    setFlipped([]);
    setGameWon(false);
  }, []);

  useEffect(() => {
    if (matched.length === cardsData.length * 2) {
      setTimeout(() => setGameWon(true), 500); // pequena pausa após o último par
    }
  }, [matched]);

  const handleFlip = (uuid) => {
    if (flipped.length === 2 || flipped.includes(uuid) || matched.includes(uuid)) return;

    const newFlipped = [...flipped, uuid];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const card1 = cards.find((c) => c.uuid === first);
      const card2 = cards.find((c) => c.uuid === second);

      if (card1.id === card2.id) {
        setTimeout(() => {
          setMatched((prev) => [...prev, first, second]);
          setFlipped([]);
        }, 800);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(shuffleCards());
    setMatched([]);
    setFlipped([]);
    setGameWon(false);
  };

  if (gameWon) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-4">🎉 Você ganhou! 🎉</h2>
        <button
          onClick={resetGame}
          className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow"
        >
          Jogar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
      {cards.map((card) => {
        const isFlipped = flipped.includes(card.uuid) || matched.includes(card.uuid);
        const isMatched = matched.includes(card.uuid);

        return (
          <div
            key={card.uuid}
            onClick={() => handleFlip(card.uuid)}
            className="perspective w-full"
          >
            <div
              className={`relative w-75 h-72 transition-transform duration-500 transform-style preserve-3d ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* Frente */}
              <div className="absolute w-75 h-72 backface-hidden flex items-center justify-center border border-gray-300 rounded-2xl bg-white text-gray-800 font-semibold text-lg p-4 shadow">
                {card.front}
              </div>

              {/* Verso */}
              <div
                className={`absolute w-75 h-72 backface-hidden rotate-y-180 flex items-center justify-center border rounded-2xl text-center text-lg p-4 shadow-lg ${
                  isMatched
                    ? "bg-green-200 text-green-900 border-green-400"
                    : "bg-blue-100 text-blue-900 border-blue-300"
                }`}
              >
                {card.back}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
