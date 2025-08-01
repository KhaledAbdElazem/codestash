"use client"

import { motion } from "framer-motion"
import { CodeSnippetCard } from "@/components/code-snippet-card"
import { SearchBar } from "@/components/search-bar"
import { codeSnippets, categories } from "@/lib/data"
import Link from "next/link"
import { Code2, Zap, Search } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          CodeStash
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Discover, browse, and copy useful code snippets and scripts for your projects
        </p>

        <div className="mb-12">
          <SearchBar placeholder="Search for code snippets, languages, or categories..." />
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300"
          >
            <Code2 className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Ready to Use</h3>
            <p className="text-gray-400">Copy and paste code snippets directly into your projects</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-pink-500/50 transition-all duration-300"
          >
            <Zap className="h-12 w-12 text-pink-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Multiple Languages</h3>
            <p className="text-gray-400">Support for JavaScript, Python, Bash, CSS, and more</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300"
          >
            <Search className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Easy Discovery</h3>
            <p className="text-gray-400">Search and filter by category, language, or content</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Browse by Category</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Link
                href={`/category/${category}`}
                className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-600/20 to-pink-600/20 hover:from-cyan-600/30 hover:to-pink-600/30 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 capitalize"
              >
                {category}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Recent Snippets */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Latest Code Snippets</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {codeSnippets.slice(0, 6).map((snippet, index) => (
            <CodeSnippetCard key={snippet.id} snippet={snippet} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/search"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-pink-600 hover:from-cyan-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            <Search className="h-5 w-5" />
            <span>View All Snippets</span>
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
