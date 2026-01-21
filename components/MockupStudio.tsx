"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, Home, RotateCcw, Sparkles, Loader2 } from "lucide-react";
import MockupCanvas from "./MockupCanvas";
import MockupSelector from "./MockupSelector";

export default function MockupStudio() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedMockup, setSelectedMockup] = useState<string>("frame1");
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasExportRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setIsLoading(false);
      };
      reader.onerror = () => {
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleExport = async () => {
    if (!canvasExportRef.current || isExporting) return;

    setIsExporting(true);
    try {
      // Dynamically import html2canvas only when needed
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(canvasExportRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
      });

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `artdisplay-${Date.now()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
        setIsExporting(false);
      }, 'image/png');
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">ArtDisplay</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={handleExport}
              disabled={!uploadedImage || isExporting}
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="pt-20 px-6 pb-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-7rem)]">
          {/* Left sidebar - Mockup selector */}
          <div className="lg:col-span-1 overflow-y-auto">
            <MockupSelector
              selectedMockup={selectedMockup}
              onSelectMockup={setSelectedMockup}
            />
          </div>

          {/* Center - Canvas */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {!uploadedImage ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex items-center justify-center"
                >
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full max-w-2xl p-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl cursor-pointer hover:border-purple-500 dark:hover:border-purple-500 transition-colors group"
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Upload className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">
                        Upload Your Artwork
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Drag and drop or click to browse
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        Supports JPG, PNG, SVG (Max 10MB)
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="canvas"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1"
                >
                  <MockupCanvas
                    artworkImage={uploadedImage}
                    mockupType={selectedMockup}
                    exportRef={canvasExportRef}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
