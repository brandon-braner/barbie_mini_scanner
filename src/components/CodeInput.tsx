import { useState } from 'react';

interface CodeInputProps {
  onSubmit: (code: string) => void;
}

export default function CodeInput({ onSubmit }: CodeInputProps) {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onSubmit(code.trim());
    }
  };

  return (
    <div className="w-full max-w-screen-sm mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
            Product Code
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter product code"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={!code.trim()}
          className="w-full px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 active:bg-pink-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </form>
    </div>
  );
}
