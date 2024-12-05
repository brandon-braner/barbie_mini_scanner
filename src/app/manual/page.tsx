'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CodeInput from '@/components/CodeInput';
import ResultsList from '@/components/ResultsList';

export default function ManualSearch() {
  const router = useRouter();
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [showInput, setShowInput] = useState(true);

  const handleSubmit = async (code: string) => {
    setSearching(true);
    setError('');

    try {
      const response = await fetch(`/api/barbie?code=${code}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error('Product code not recognized. Please check the code and try again.');
      }
      
      setResult(data);
      setShowInput(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      setShowInput(false);
    } finally {
      setSearching(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
    setShowInput(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        <h1 className="text-3xl font-bold my-4 text-center">Product Code Search</h1>
        
        {showInput && (
          <div className="px-4">
            <CodeInput onSubmit={handleSubmit} />
            <button
              onClick={() => router.push('/')}
              className="w-full py-2 mt-4 text-pink-600 hover:text-pink-700 font-medium text-sm flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Scan with Camera
            </button>
          </div>
        )}

        {searching && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent mb-4"></div>
              <p className="text-lg font-medium">Searching...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="px-4">
            <div className="mt-4 bg-pink-50 p-6 rounded-lg text-center">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-pink-900 mb-2">Search Failed</h3>
              <p className="text-pink-700 mb-6">{error}</p>
              <div className="flex flex-col space-y-3">
                <p className="text-sm text-pink-600">Tips:</p>
                <ul className="text-sm text-pink-600 list-disc list-inside space-y-1">
                  <li>Double-check the product code</li>
                  <li>Make sure there are no extra spaces</li>
                  <li>Codes are case-sensitive</li>
                </ul>
              </div>
              <button
                onClick={handleReset}
                className="mt-6 w-full px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 active:bg-pink-700 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className="px-4">
            <ResultsList results={result} />
            <button
              onClick={handleReset}
              className="mt-4 w-full px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 active:bg-pink-700 transition-colors font-medium"
            >
              Search Again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
