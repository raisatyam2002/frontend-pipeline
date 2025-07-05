import { useState } from "react";

type Mood = {
  emoji: string;
  label: string;
};

type MoodEntry = Mood & {
  message: string;
  time: string;
};

const moods: Mood[] = [
  { emoji: "😄", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😢", label: "Sad" },
  { emoji: "🤩", label: "Excited" },
  { emoji: "😠", label: "Angry" },
];

export default function App() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<MoodEntry[]>([]);

  const handleSubmit = () => {
    if (!selectedMood) return;
    const newEntry: MoodEntry = {
      ...selectedMood,
      message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setHistory([newEntry, ...history]);
    setSelectedMood(null);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#fbe9e7] to-[#f3e5f5] flex items-center justify-center px-6 py-10 font-sans">
      <div className="backdrop-blur-xl bg-white/60 border border-white/30 shadow-2xl rounded-3xl w-full max-w-xl p-8 transition-all duration-300">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-8 tracking-tight">
          ✨ How are you feeling today?
        </h1>

        <div className="flex justify-center gap-4 mb-6 text-4xl">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood)}
              className={`transition-all duration-200 ease-out hover:scale-125 active:scale-95 hover:drop-shadow-xl ${
                selectedMood?.label === mood.label
                  ? "scale-110 ring-4 ring-purple-300 rounded-full"
                  : ""
              }`}
            >
              {mood.emoji}
            </button>
          ))}
        </div>

        <textarea
          placeholder="Write a note about your mood..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full p-3 mb-4 rounded-xl border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm placeholder:text-gray-400"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2.5 rounded-xl shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.01]"
        >
          💾 Save Mood
        </button>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🕒 Mood History</h2>

          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent pr-1">
            {history.length === 0 ? (
              <div className="text-center text-gray-400 text-sm py-8">
                <div className="text-5xl mb-2">📭</div>
                Nothing logged yet...
              </div>
            ) : (
              history.map((entry, idx) => (
                <div
                  key={idx}
                  className="bg-white/70 border border-gray-200 rounded-xl px-4 py-3 shadow-sm flex items-start gap-3"
                >
                  <div className="text-2xl">{entry.emoji}</div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-700">{entry.label}</div>
                    {entry.message && <p className="text-gray-500">“{entry.message}”</p>}
                    <div className="text-xs text-gray-400 mt-1">{entry.time}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
