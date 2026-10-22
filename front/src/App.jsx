import { useState } from "react";
import axios from "axios";

const App = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        prompt: question,
      });

      setAnswer(response.data.answer);
    } catch (err) {
      console.error("Request failed:", err);

      setError(
        err.response?.data?.error ||
          "Could not connect to the backend. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center text-4xl font-bold text-green-950 md:text-6xl">
          ChatGPT API
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label htmlFor="question" className="block font-medium text-gray-700">
            Ask a Question
          </label>

          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-800 px-4 py-3 font-semibold text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>
        </form>

        {error && (
          <p className="mt-5 rounded-lg bg-red-50 p-4 text-red-700">{error}</p>
        )}

        {answer && (
          <div className="mt-6 rounded-lg border border-gray-200 p-5">
            <h2 className="mb-3 text-xl font-semibold text-green-900">
              AI Response
            </h2>
            <p className="whitespace-pre-wrap leading-7 text-gray-800">
              {answer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
