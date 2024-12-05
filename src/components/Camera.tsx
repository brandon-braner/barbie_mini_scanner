'use client';

import { useRef, useEffect, useState } from 'react';

export default function Camera({ onCapture }: { onCapture: (imageData: HTMLCanvasElement | Blob) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState<string>('');
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        setError('Failed to access camera. Please ensure you have granted camera permissions.');
        console.error('Error accessing camera:', err);
      }
    }

    setupCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setShowCanvas(true);
        
        // Convert to blob and pass that
        canvas.toBlob((blob) => {
          if (blob) {
            onCapture(blob);
          }
        }, 'image/jpeg');
      }
    }
  };

  const retakePicture = () => {
    setShowCanvas(false);
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }
  
  return (
    <div ref={containerRef} className="w-full  max-w-screen-sm mx-auto flex flex-col items-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width={containerWidth}
        className={`rounded-lg shadow-md ${showCanvas ? 'hidden' : ''}`}
      />
      <canvas 
        ref={canvasRef}
        width={containerWidth}
        className={`rounded-lg shadow-md ${showCanvas ? '' : 'hidden'}`}
      />
      {hasPermission && (
        <button
          onClick={showCanvas ? retakePicture : captureImage}
          aria-label={showCanvas ? "Retake Photo" : "Take Photo"}
          className="mt-4 px-8 py-4 bg-pink-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-pink-600 active:bg-pink-700 transition-colors"
        >
          {showCanvas ? "Retake Picture" : "Take Picture"}
        </button>
      )}
    </div>
  );
}
