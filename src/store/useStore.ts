"use client";

import { create } from "zustand";
import type { AnalysisResult, UploadedImage, UserProfile } from "@/lib/types";

interface AppState {
  // User
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;

  // Upload
  uploadedImages: UploadedImage[];
  addImages: (images: UploadedImage[]) => void;
  removeImage: (id: string) => void;
  clearImages: () => void;
  markImageUploaded: (id: string) => void;

  // Analysis
  isAnalyzing: boolean;
  setIsAnalyzing: (v: boolean) => void;
  currentResult: AnalysisResult | null;
  setCurrentResult: (r: AnalysisResult | null) => void;

  // History
  reportHistory: AnalysisResult[];
  setReportHistory: (r: AnalysisResult[]) => void;
  addToHistory: (r: AnalysisResult) => void;

  // UI
  isUploadModalOpen: boolean;
  setUploadModalOpen: (v: boolean) => void;
  extractedText: string;
  setExtractedText: (v: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  uploadedImages: [],
  addImages: (images) =>
    set((state) => ({
      uploadedImages: [...state.uploadedImages, ...images],
    })),
  removeImage: (id) =>
    set((state) => ({
      uploadedImages: state.uploadedImages.filter((img) => img.id !== id),
    })),
  clearImages: () => set({ uploadedImages: [] }),
  markImageUploaded: (id) =>
    set((state) => ({
      uploadedImages: state.uploadedImages.map((img) =>
        img.id === id ? { ...img, uploaded: true } : img
      ),
    })),

  isAnalyzing: false,
  setIsAnalyzing: (v) => set({ isAnalyzing: v }),
  currentResult: null,
  setCurrentResult: (r) => set({ currentResult: r }),

  reportHistory: [],
  setReportHistory: (r) => set({ reportHistory: r }),
  addToHistory: (r) =>
    set((state) => ({
      reportHistory: [r, ...state.reportHistory],
    })),

  isUploadModalOpen: false,
  setUploadModalOpen: (v) => set({ isUploadModalOpen: v }),
  extractedText: "",
  setExtractedText: (v) => set({ extractedText: v }),
}));
