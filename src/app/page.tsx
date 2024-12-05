'use client';

import { useState } from 'react';
import Camera from '@/components/Camera';
import ResultsList from '@/components/ResultsList';

export default function Home() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [showCamera, setShowCamera] = useState(true);

  const handleCapture = async (imageData: any) => {
    setScanning(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', imageData);

      const processResponse = await fetch('/api/process-image', {
        method: 'POST',
        body: formData
      });

      if (!processResponse.ok) {
        const errorData = await processResponse.json();
        throw new Error('No product code found in the image. Please make sure the code is clearly visible and try again.');
      }

      const { code } = await processResponse.json();
      
      const response = await fetch(`/api/barbie?code=${code}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error('Product code not recognized. Please try scanning again.');
      }
      
      setResult(data);
      setShowCamera(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      setShowCamera(false);
    } finally {
      setScanning(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
    setShowCamera(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        <h1 className="text-3xl font-bold my-4 text-center">Barbie Scanner</h1>
        
        {showCamera && (
          <div>
            <Camera onCapture={handleCapture} />
          </div>
        )}

        {scanning && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent mb-4"></div>
              <p className="text-lg font-medium">Scanning...</p>
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
              <h3 className="text-lg font-medium text-pink-900 mb-2">Scanning Failed</h3>
              <p className="text-pink-700 mb-6">{error}</p>
              <div className="flex flex-col space-y-3">
                <p className="text-sm text-pink-600">Tips:</p>
                <ul className="text-sm text-pink-600 list-disc list-inside space-y-1">
                  <li>Make sure the product code is clearly visible</li>
                  <li>Ensure good lighting</li>
                  <li>Hold the camera steady</li>
                  <li>Try different angles</li>
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
              Scan Again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
