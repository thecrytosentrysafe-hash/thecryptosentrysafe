"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (words: string[]) => void;
}

export function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
  const [words, setWords] = useState<string[]>(Array(12).fill(""));

  if (!isOpen) return null;

  const handleInputChange = (index: number, value: string) => {
    const newWords = [...words];
    // Only allow letters, convert to lowercase
    newWords[index] = value.replace(/[^a-zA-Z]/g, "").toLowerCase();
    setWords(newWords);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if ((e.key === " " || e.key === "Enter") && words[index].length > 0 && index < 11) {
      e.preventDefault();
      const nextInput = document.getElementById(`word${index + 2}`);
      nextInput?.focus();
    } else if (e.key === "Backspace" && words[index].length === 0 && index > 0) {
      const prevInput = document.getElementById(`word${index}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (words.every((word) => word.length > 0)) {
      onConnect(words);
      setWords(Array(12).fill(""));
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center"
      style={{ display: isOpen ? "flex" : "none" }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-dark-800 w-full max-w-md mx-4 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Connect Wallet</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please enter your 12-word recovery phrase
            </p>

            <div className="grid grid-cols-3 gap-2">
              {words.map((word, index) => (
                <div key={index}>
                  <Input
                    type="text"
                    id={`word${index + 1}`}
                    value={word}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    placeholder={`Word ${index + 1}`}
                    required
                    className="w-full px-3 py-2 text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="px-4 py-2 text-sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                className="px-4 py-2 text-sm"
              >
                Connect Wallet
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
