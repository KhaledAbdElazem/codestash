"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, ExternalLink, FileText } from "lucide-react"
import Link from "next/link"
import type { CodeSnippet } from "@/lib/data"
import { copyToClipboard, getLanguageColor, getCategoryColor } from "@/lib/utils"

interface CodeSnippetCardProps {
  snippet: CodeSnippet
  index?: number
}

export function CodeSnippetCard({ snippet, index = 0 }: CodeSnippetCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    copyToClipboard(snippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const previewCode = snippet.code.split("\n").slice(0, 3).join("\n")
  const hasMoreLines = snippet.code.split("\n").length > 3

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-pink-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              {snippet.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getLanguageColor(snippet.language)}`}>
                {snippet.language}
              </span>
              <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(snippet.category)}`}>
                {snippet.category}
              </span>
            </div>
          </div>
        </div>

        {/* Code Preview */}
        <div className="bg-gray-900/80 rounded-lg p-4 mb-4 border border-gray-700/30">
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{previewCode}</code>
          </pre>
          {hasMoreLines && (
            <div className="text-xs text-gray-500 mt-2">
              {"..."} and {snippet.code.split("\n").length - 3} more lines
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex items-center space-x-2 px-3 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded-md transition-colors border border-cyan-500/30 hover:border-cyan-500/50"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="text-sm">{copied ? "Copied!" : "Copy"}</span>
            </motion.button>

            {snippet.markdownContent && (
              <Link href={`/file/${snippet.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-2 bg-pink-600/20 hover:bg-pink-600/30 text-pink-400 rounded-md transition-colors border border-pink-500/30 hover:border-pink-500/50"
                >
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">Read More</span>
                </motion.button>
              </Link>
            )}
          </div>

          {snippet.githubLink && (
            <a
              href={snippet.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm">GitHub</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
