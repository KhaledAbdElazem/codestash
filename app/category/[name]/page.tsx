"use client"

import { motion } from "framer-motion"
import { CodeSnippetCard } from "@/components/code-snippet-card"
import { codeSnippets } from "@/lib/data"
import { getCategoryColor } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    name: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = decodeURIComponent(params.name)
  const filteredSnippets = codeSnippets.filter(
    (snippet) => snippet.category.toLowerCase() === categoryName.toLowerCase(),
  )

  if (filteredSnippets.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
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

        <div className="flex items-center space-x-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white capitalize">{categoryName}</h1>
          <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getCategoryColor(categoryName)}`}>
            {filteredSnippets.length} snippets
          </span>
        </div>

        <p className="text-xl text-gray-300">Browse all {categoryName} related code snippets and scripts</p>
      </motion.div>

      {/* Snippets Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredSnippets.map((snippet, index) => (
          <CodeSnippetCard key={snippet.id} snippet={snippet} index={index} />
        ))}
      </motion.div>

      {/* Empty state (shouldn't reach here due to notFound() above) */}
      {filteredSnippets.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <h2 className="text-2xl font-semibold text-gray-400 mb-4">No snippets found in this category</h2>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Browse all snippets
          </Link>
        </motion.div>
      )}
    </div>
  )
}
