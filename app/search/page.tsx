"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { CodeSnippetCard } from "@/components/code-snippet-card"
import { SearchBar } from "@/components/search-bar"
import { codeSnippets, languages, categories } from "@/lib/data"
import { Filter, X } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Update query when URL changes
  useEffect(() => {
    const urlQuery = searchParams.get("q") || ""
    setQuery(urlQuery)
  }, [searchParams])

  // Filter snippets based on search criteria
  const filteredSnippets = useMemo(() => {
    return codeSnippets.filter((snippet) => {
      // Text search
      const matchesQuery =
        !query ||
        snippet.title.toLowerCase().includes(query.toLowerCase()) ||
        snippet.code.toLowerCase().includes(query.toLowerCase()) ||
        snippet.language.toLowerCase().includes(query.toLowerCase()) ||
        snippet.category.toLowerCase().includes(query.toLowerCase())

      // Language filter
      const matchesLanguage = selectedLanguages.length === 0 || selectedLanguages.includes(snippet.language)

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(snippet.category)

      return matchesQuery && matchesLanguage && matchesCategory
    })
  }, [query, selectedLanguages, selectedCategories])

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) => (prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]))
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setSelectedLanguages([])
    setSelectedCategories([])
  }

  const hasActiveFilters = selectedLanguages.length > 0 || selectedCategories.length > 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">Search Code Snippets</h1>

        <div className="mb-6">
          <SearchBar initialQuery={query} />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50 hover:border-gray-600/50 rounded-lg text-gray-300 hover:text-white transition-all duration-300"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-500/50 rounded-lg text-red-400 hover:text-red-300 transition-all duration-300"
            >
              <X className="h-4 w-4" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Languages */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => toggleLanguage(language)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-300 ${
                        selectedLanguages.includes(language)
                          ? "bg-cyan-600/30 text-cyan-300 border-cyan-500/50"
                          : "bg-gray-700/30 text-gray-400 border-gray-600/30 hover:bg-gray-700/50 hover:text-gray-300"
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-300 capitalize ${
                        selectedCategories.includes(category)
                          ? "bg-pink-600/30 text-pink-300 border-pink-500/50"
                          : "bg-gray-700/30 text-gray-400 border-gray-600/30 hover:bg-gray-700/50 hover:text-gray-300"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <div className="text-center text-gray-400">
          {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? "s" : ""} found
          {query && ` for "${query}"`}
        </div>
      </motion.div>

      {/* Results */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
        {filteredSnippets.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSnippets.map((snippet, index) => (
              <CodeSnippetCard key={snippet.id} snippet={snippet} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">No snippets found</h2>
            <p className="text-gray-500 mb-6">Try adjusting your search terms or filters</p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Clear all filters
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
