# 🚀 CodeStash

A modern, cyberpunk-themed web application for browsing, searching, and copying code snippets and scripts. Built with Next.js 15, TypeScript, and Tailwind CSS.

![CodeStash Preview](https://via.placeholder.com/1200x600/1f2937/06b6d4?text=CodeStash+Preview)

## ✨ Features

### 🎯 Core Functionality
- **Browse Code Snippets** - Explore a curated collection of useful code snippets
- **Category Filtering** - Filter snippets by category (setup, snippets, automation)
- **Advanced Search** - Full-text search with language and category filters
- **One-Click Copy** - Copy code snippets to clipboard with visual feedback
- **Markdown Documentation** - Rich documentation viewer for detailed script explanations
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### 🎨 Design & UX
- **Cyberpunk Aesthetic** - Dark theme with neon cyan, pink, and purple accents
- **Smooth Animations** - Powered by Framer Motion for fluid interactions
- **Interactive Elements** - Glowing buttons, hover effects, and animated backgrounds
- **Modern Typography** - Clean, futuristic font choices
- **Accessibility** - WCAG compliant with proper contrast ratios

### 🛠 Technical Features
- **Next.js 15 App Router** - Modern React framework with file-based routing
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **React Markdown** - Rich markdown rendering for documentation
- **SEO Optimized** - Proper meta tags and semantic HTML structure

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/codestash.git
   cd codestash
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
codestash/
├── app/                    # Next.js App Router pages
│   ├── category/[name]/    # Category filtering pages
│   ├── file/[slug]/        # Markdown documentation viewer
│   ├── search/             # Search functionality
│   ├── globals.css         # Global styles and cyberpunk theme
│   ├── layout.tsx          # Root layout with header
│   ├── page.tsx            # Homepage
│   └── not-found.tsx       # 404 error page
├── components/             # Reusable React components
│   ├── header.tsx          # Navigation header
│   ├── code-snippet-card.tsx  # Snippet display card
│   └── search-bar.tsx      # Search input component
├── lib/                    # Utility functions and data
│   ├── data.ts             # Dummy data and types
│   └── utils.ts            # Helper functions
├── public/                 # Static assets
└── README.md              # This file
\`\`\`

## 🗄️ Current Data Structure

The application currently uses dummy data defined in \`lib/data.ts\`. Each code snippet has the following structure:

\`\`\`typescript
interface CodeSnippet {
  id: number
  title: string
  language: string          // e.g., "javascript", "python", "bash"
  category: string          // e.g., "setup", "snippets", "automation"
  code: string             // The actual code content
  githubLink?: string      // Optional GitHub repository link
  markdownContent?: string // Optional documentation in markdown
}
\`\`\`

## 🔗 Database Integration (Roadmap)

### Planned Database Schema

\`\`\`sql
-- Snippets table
CREATE TABLE snippets (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  language VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  code TEXT NOT NULL,
  github_link VARCHAR(500),
  markdown_content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0
);

-- Categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7) -- Hex color code
);

-- Languages table
CREATE TABLE languages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  extension VARCHAR(10),
  color VARCHAR(7) -- Hex color code
);

-- Tags table (for more flexible categorization)
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- Snippet tags junction table
CREATE TABLE snippet_tags (
  snippet_id INTEGER REFERENCES snippets(id),
  tag_id INTEGER REFERENCES tags(id),
  PRIMARY KEY (snippet_id, tag_id)
);
\`\`\`

### Database Integration Steps

1. **Choose a Database Provider**
   - **Recommended**: Supabase (PostgreSQL with real-time features)
   - **Alternatives**: PlanetScale (MySQL), Neon (PostgreSQL), or traditional PostgreSQL

2. **Install Database Dependencies**
   \`\`\`bash
   npm install @supabase/supabase-js
   # or for other providers
   npm install @prisma/client prisma
   \`\`\`

3. **Environment Variables**
   Create a \`.env.local\` file:
   \`\`\`env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Or for other databases
   DATABASE_URL=your_database_connection_string
   \`\`\`

4. **Update Data Layer**
   Replace the dummy data in \`lib/data.ts\` with database queries:
   \`\`\`typescript
   // lib/database.ts
   import { createClient } from '@supabase/supabase-js'
   
   const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   )
   
   export async function getSnippets() {
     const { data, error } = await supabase
       .from('snippets')
       .select('*')
       .order('created_at', { ascending: false })
     
     if (error) throw error
     return data
   }
   \`\`\`

## 🎛️ Dashboard Integration (Roadmap)

### Planned Dashboard Features

- **Snippet Management** - CRUD operations for code snippets
- **Analytics Dashboard** - View counts, popular snippets, search trends
- **Category Management** - Add, edit, and organize categories
- **User Management** - Handle user accounts and permissions
- **Content Moderation** - Review and approve community submissions

### Dashboard Architecture

\`\`\`
codestash-dashboard/
├── app/
│   ├── dashboard/
│   │   ├── snippets/        # Snippet CRUD operations
│   │   ├── categories/      # Category management
│   │   ├── analytics/       # Usage statistics
│   │   └── users/          # User management
│   ├── api/                # API routes for dashboard
│   └── auth/               # Authentication pages
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   └── forms/              # Form components
└── lib/
    ├── auth.ts             # Authentication logic
    └── api.ts              # API client functions
\`\`\`

### Integration Steps

1. **Authentication Setup**
   \`\`\`bash
   npm install next-auth @auth/supabase-adapter
   \`\`\`

2. **API Routes**
   Create API endpoints for dashboard operations:
   \`\`\`typescript
   // app/api/snippets/route.ts
   export async function GET() {
     // Fetch snippets from database
   }
   
   export async function POST(request: Request) {
     // Create new snippet
   }
   \`\`\`

3. **Dashboard Components**
   Build admin interface components for managing content

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on every push

### Other Platforms

- **Netlify**: Similar to Vercel with GitHub integration
- **Railway**: Great for full-stack apps with database
- **DigitalOcean App Platform**: Scalable hosting solution

## 🛠️ Development

### Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint

### Code Style

- **ESLint** - Linting with Next.js recommended rules
- **Prettier** - Code formatting (recommended to add)
- **TypeScript** - Strict type checking enabled

### Adding New Snippets

Currently, add snippets to \`lib/data.ts\`:

\`\`\`typescript
{
  id: 9,
  title: "Your Snippet Title",
  language: "javascript",
  category: "snippets",
  code: \`your code here\`,
  githubLink: "https://github.com/...", // optional
  markdownContent: "# Documentation..." // optional
}
\`\`\`

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add amazing feature'
   \`\`\`
4. **Push to the branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add TypeScript types for new features
- Test your changes thoroughly
- Update documentation as needed
- Keep commits atomic and well-described

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Lucide React** - For beautiful icons
- **React Markdown** - For markdown rendering

## 🔮 Future Roadmap

### Phase 1: Database Integration
- [ ] Set up Supabase/PostgreSQL database
- [ ] Migrate from dummy data to database queries
- [ ] Add database seeding scripts
- [ ] Implement caching for better performance

### Phase 2: Dashboard Application
- [ ] Build admin dashboard for content management
- [ ] Add authentication and authorization
- [ ] Implement CRUD operations for snippets
- [ ] Add analytics and reporting features

### Phase 3: Community Features
- [ ] User accounts and profiles
- [ ] Community snippet submissions
- [ ] Rating and review system
- [ ] Favorite snippets functionality

### Phase 4: Advanced Features
- [ ] Syntax highlighting for code blocks
- [ ] Code execution sandbox
- [ ] API for third-party integrations
- [ ] Mobile app development

## 📞 Support

If you have any questions or need help with setup, please:

1. Check the [Issues](https://github.com/your-username/codestash/issues) page
2. Create a new issue with detailed information
3. Join our [Discord community](https://discord.gg/codestash) (coming soon)

---

**Made with ❤️ and lots of ☕ by the CodeStash team**
\`\`\`
