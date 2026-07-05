"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ImageIcon } from "lucide-react";
import { useStore } from "@/store/useStore";
import { generateId } from "@/lib/utils";
import type { UploadedImage } from "@/lib/types";

export function UploadZone() {
  const { uploadedImages, addImages, removeImage } = useStore();
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages: UploadedImage[] = acceptedFiles.map((file) => ({
        id: generateId(),
        file,
        preview: URL.createObjectURL(file),
        uploaded: false,
      }));
      addImages(newImages);
    },
    [addImages]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxSize: 10 * 1024 * 1024,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`relative cursor-pointer transition-all duration-300 rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center
          ${
            isDragActive
              ? "border-accent bg-accent/5"
              : "border-white/10 hover:border-white/20 bg-white/[0.02]"
          }`}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
            <Upload className="w-7 h-7 text-accent" />
          </div>
          <div>
            <p className="text-lg font-semibold text-white/80">
              {isDragActive ? "Drop your screenshots here" : "Drag & drop screenshots"}
            </p>
            <p className="text-sm text-white/30 mt-1">
              or click to browse — PNG, JPG, WebP (max 10MB each)
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/20">
            <span>WhatsApp</span>
            <span>•</span>
            <span>Instagram</span>
            <span>•</span>
            <span>Telegram</span>
            <span>•</span>
            <span>Messenger</span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {uploadedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <p className="text-sm text-white/40">
              {uploadedImages.length} screenshot{uploadedImages.length > 1 ? "s" : ""} uploaded
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {uploadedImages.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group aspect-[3/4] rounded-xl overflow-hidden glass-strong"
                >
                  <img
                    src={img.preview}
                    alt="Chat screenshot preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(img.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex items-center gap-1.5">
                      <ImageIcon className="w-3 h-3 text-white/60" />
                      <span className="text-xs text-white/60 truncate">
                        {img.file.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
