"use client"

import { motion } from "framer-motion"
import { fetchSnippetById, type CodeSnippet } from "@/lib/data"
import { getLanguageColor, getCategoryColor, copyToClipboard } from "@/lib/utils"
import { ArrowLeft, Copy, Check, ExternalLink } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"

interface FilePageProps {
  params: Promise<{
    slug: string
  }>
}

export default function FilePage({ params }: FilePageProps) {
  const [copied, setCopied] = useState(false)
  const [snippet, setSnippet] = useState<CodeSnippet | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSnippet() {
      try {
        const resolvedParams = await params
        const fetchedSnippet = await fetchSnippetById(resolvedParams.slug)
        if (fetchedSnippet && fetchedSnippet.markdownContent) {
          setSnippet(fetchedSnippet)
        } else {
          notFound()
        }
      } catch (error) {
        console.error('Failed to load snippet:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    loadSnippet()
  }, [params])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!snippet) {
    notFound()
  }

  const handleCopy = () => {
    copyToClipboard(snippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{snippet.title}</h1>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getLanguageColor(snippet.language)}`}>
                {snippet.language}
              </span>
              <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getCategoryColor(snippet.category)}`}>
                {snippet.category}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex items-center space-x-2 px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded-lg transition-colors border border-cyan-500/30 hover:border-cyan-500/50"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Copied!" : "Copy Code"}</span>
            </motion.button>

            {snippet.githubLink && (
              <a
                href={snippet.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 hover:text-white rounded-lg transition-colors border border-gray-600/50 hover:border-gray-500/50"
              >
                <ExternalLink className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Markdown Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 mb-8"
      >
        <div className="prose prose-invert prose-cyan max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-4">{children}</h1>
              ),
              h2: ({ children }) => <h2 className="text-2xl font-semibold text-cyan-300 mb-4 mt-8">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-semibold text-pink-300 mb-3 mt-6">{children}</h3>,
              p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
              code: ({ children, className }) => {
                const isBlock = className?.includes("language-")
                if (isBlock) {
                  return (
                    <code className="block bg-gray-900/80 text-gray-300 p-4 rounded-lg border border-gray-700/50 overflow-x-auto">
                      {children}
                    </code>
                  )
                }
                return <code className="bg-gray-700/50 text-cyan-300 px-2 py-1 rounded text-sm">{children}</code>
              },
              pre: ({ children }) => (
                <pre className="bg-gray-900/80 border border-gray-700/50 rounded-lg p-4 overflow-x-auto mb-4">
                  {children}
                </pre>
              ),
              ul: ({ children }) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>,
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>
              ),
              li: ({ children }) => <li className="text-gray-300">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-gray-400 mb-4">
                  {children}
                </blockquote>
              ),
            }}
          >
            {snippet.markdownContent}
          </ReactMarkdown>
        </div>
      </motion.div>

      {/* Code Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gray-900/80 border border-gray-700/50 rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Code</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="flex items-center space-x-2 px-3 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded-md transition-colors border border-cyan-500/30 hover:border-cyan-500/50"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="text-sm">{copied ? "Copied!" : "Copy"}</span>
          </motion.button>
        </div>

        <pre className="text-sm text-gray-300 overflow-x-auto">
          <code>{snippet.code}</code>
        </pre>
      </motion.div>
    </div>
  )
}
