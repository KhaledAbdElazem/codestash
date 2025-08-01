import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Success feedback could be added here
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err)
    })
}

export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    javascript: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    python: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    bash: "bg-green-500/20 text-green-400 border-green-500/30",
    css: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    yaml: "bg-red-500/20 text-red-400 border-red-500/30",
    typescript: "bg-blue-600/20 text-blue-300 border-blue-600/30",
    html: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  }

  return colors[language.toLowerCase()] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    setup: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    snippets: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    automation: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  }

  return colors[category.toLowerCase()] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
}
