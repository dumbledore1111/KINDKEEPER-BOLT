import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Image } from 'lucide-react';
import { Button } from '../ui/Button';
import Webcam from 'react-webcam';

interface PhotoCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (photoUrl: string) => void;
}

export function PhotoCaptureModal({ isOpen, onClose, onCapture }: PhotoCaptureModalProps) {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string>('');
  const [mode, setMode] = useState<'camera' | 'gallery'>('camera');
  const [isMobile, setIsMobile] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
  }, []);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const handleCameraError = (error: unknown) => {
    console.error('Camera error:', error);
    if (webcamRef.current && webcamRef.current.video) {
      const fallbackConstraints = {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: isMobile ? "environment" : "user"
      };
      
      const stream = webcamRef.current.video.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      navigator.mediaDevices.getUserMedia({ video: fallbackConstraints })
        .then(stream => {
          if (webcamRef.current && webcamRef.current.video) {
            webcamRef.current.video.srcObject = stream;
          }
        })
        .catch(() => {
          setMode('gallery');
        });
    } else {
      setMode('gallery');
    }
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot({
        width: 1920,
        height: 1080
      });
      if (imageSrc) {
        // Convert base64 to blob and then to data URL to match gallery upload format
        fetch(imageSrc)
          .then(res => res.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result as string;
              setPreviewSrc(result);
              setIsPreview(true);
            };
            reader.readAsDataURL(blob);
          });
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewSrc(result);
        setIsPreview(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (previewSrc) {
      onCapture(previewSrc);
      onClose();
      // Reset state
      setIsPreview(false);
      setPreviewSrc('');
      setMode('camera');
    }
  };

  const handleRetake = () => {
    setIsPreview(false);
    setPreviewSrc('');
  };

  const activateCamera = async () => {
    try {
      // First stop any existing streams
      if (webcamRef.current && webcamRef.current.video) {
        const stream = webcamRef.current.video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      }

      // Request camera access with simpler constraints first
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      if (webcamRef.current && webcamRef.current.video) {
        webcamRef.current.video.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Detailed camera error:', error);
      setMode('gallery');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-50">
      <div className="container mx-auto px-4 py-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setMode('camera')}
              className={`text-xl font-semibold px-4 py-2 rounded-xl transition-colors ${
                mode === 'camera'
                  ? 'bg-[#FF6B2C] text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Camera
            </button>
            <button
              onClick={() => setMode('gallery')}
              className={`text-xl font-semibold px-4 py-2 rounded-xl transition-colors ${
                mode === 'gallery'
                  ? 'bg-[#FF6B2C] text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Gallery
            </button>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Camera View / Preview / Gallery */}
        <div className="flex-1 relative bg-black rounded-2xl overflow-hidden">
          {mode === 'camera' && !isPreview && !cameraActive && (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Button
                onClick={activateCamera}
                className="bg-[#FF6B2C] px-8 py-6 rounded-2xl"
              >
                <Camera className="w-8 h-8 mb-2" />
                <span className="text-xl">Open Camera</span>
              </Button>
              <Button
                onClick={() => setMode('gallery')}
                className="bg-slate-700 px-8 py-6 rounded-2xl"
              >
                <Image className="w-8 h-8 mb-2" />
                <span className="text-xl">Choose from Gallery</span>
              </Button>
            </div>
          )}
          
          {mode === 'camera' && !isPreview && cameraActive && (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-full object-cover"
              onUserMediaError={handleCameraError}
              imageSmoothing={true}
              mirrored={false}
            />
          )}
          
          {isPreview && (
            <img
              src={previewSrc}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          )}
          {mode === 'gallery' && !isPreview && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#FF6B2C] px-8 py-6 rounded-2xl"
                >
                  <Image className="w-8 h-8 mb-2" />
                  <span className="text-xl">Choose from Gallery</span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-6 flex justify-center gap-4">
          {mode === 'camera' && !isPreview && cameraActive && (
            <Button
              onClick={handleCapture}
              className="w-16 h-16 rounded-full bg-[#FF6B2C] flex items-center justify-center"
            >
              <Camera className="w-8 h-8" />
            </Button>
          )}
          {isPreview && (
            <>
              <Button
                onClick={handleRetake}
                className="px-8 py-4 bg-slate-700"
              >
                {mode === 'camera' ? 'Retake' : 'Choose Another'}
              </Button>
              <Button
                onClick={handleSave}
                className="px-8 py-4 bg-[#FF6B2C]"
              >
                Save
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}