'use client';

import { useState } from 'react';
import Camera from '@/components/Camera';
import ResultsList from '@/components/ResultsList';

export default function Home() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

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
        throw new Error(errorData.error || 'Failed to process image');
      }

      const { code } = await processResponse.json();
      
      const response = await fetch(`/api/barbie?code=${code}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to find Barbie');
      }
      
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setScanning(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        <h1 className="text-3xl font-bold my-4 text-center">Barbie Scanner</h1>
        
        <div>
          <Camera onCapture={handleCapture} />
        </div>

        {scanning && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent mb-4"></div>
              <p className="text-lg font-medium">Scanning...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {result && <ResultsList results={result} />}
      </div>
    </main>
  );
}
