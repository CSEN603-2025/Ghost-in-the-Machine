import React, { useState } from 'react';

export default function RatingFeedback() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  return (
    <div className="mt-6">
      <h4 className="text-xl font-semibold">Rate This Workshop</h4>
      <div className="flex space-x-2 my-2">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            className={`px-3 py-1 rounded ${rating >= n ? 'bg-yellow-400' : 'bg-gray-300'}`}
            onClick={() => setRating(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full h-24 p-2 border rounded"
        placeholder="Leave your feedback..."
      />
      <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded">Submit</button>
    </div>
  );
}
