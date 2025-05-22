import MemoryGame from "./MemoryGame.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-gray-700 mb-6">Jogo da Memória Ásia e África</h1>
        <MemoryGame />
      </div>
    </div>
  );
}

export default App;
