"use client"

export interface CodeSnippet {
  id: number
  title: string
  language: string
  category: string
  code: string
  githubLink?: string
  markdownContent?: string
}

export const codeSnippets: CodeSnippet[] = [
  {
    id: 1,
    title: "Install NVM",
    language: "bash",
    category: "setup",
    code: "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash\nsource ~/.bashrc\nnvm --version",
    githubLink: "https://github.com/zema/scripts/nvm.sh",
    markdownContent:
      "# NVM Install\n\nThis script installs NVM (Node Version Manager) on your system.\n\n## Usage\n\n1. Run the installation script\n2. Restart your terminal or source your bashrc\n3. Verify installation with `nvm --version`\n\n## Features\n\n- Installs latest NVM version\n- Automatically configures shell profile\n- Cross-platform compatibility",
  },
  {
    id: 2,
    title: "React useState Hook",
    language: "javascript",
    category: "snippets",
    code: "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}",
    githubLink: "https://github.com/facebook/react",
  },
  {
    id: 3,
    title: "Python Virtual Environment Setup",
    language: "python",
    category: "setup",
    code: "# Create virtual environment\npython -m venv myenv\n\n# Activate on Windows\nmyenv\\Scripts\\activate\n\n# Activate on macOS/Linux\nsource myenv/bin/activate\n\n# Install packages\npip install -r requirements.txt",
    markdownContent:
      "# Python Virtual Environment\n\nA guide to setting up Python virtual environments for project isolation.\n\n## Why Virtual Environments?\n\n- Isolate project dependencies\n- Avoid version conflicts\n- Keep global Python clean\n\n## Commands\n\n### Create Environment\n```bash\npython -m venv myenv\n```\n\n### Activation\n- **Windows**: `myenv\\Scripts\\activate`\n- **macOS/Linux**: `source myenv/bin/activate`\n\n### Deactivation\n```bash\ndeactivate\n```",
  },
  {
    id: 4,
    title: "Git Workflow Automation",
    language: "bash",
    category: "automation",
    code: '#!/bin/bash\n\n# Quick git workflow script\ngit add .\necho "Enter commit message:"\nread commit_message\ngit commit -m "$commit_message"\ngit push origin main\n\necho "✅ Changes pushed successfully!"',
    githubLink: "https://github.com/git/git",
    markdownContent:
      "# Git Workflow Automation\n\nAutomate your git workflow with this simple bash script.\n\n## What it does\n\n1. Stages all changes\n2. Prompts for commit message\n3. Commits changes\n4. Pushes to main branch\n\n## Usage\n\n```bash\nchmod +x git-workflow.sh\n./git-workflow.sh\n```\n\n## Customization\n\nYou can modify the script to:\n- Push to different branches\n- Add pre-commit hooks\n- Include automated testing",
  },
  {
    id: 5,
    title: "CSS Flexbox Center",
    language: "css",
    category: "snippets",
    code: ".center-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}\n\n.centered-content {\n  text-align: center;\n  padding: 2rem;\n}",
  },
  {
    id: 6,
    title: "Docker Compose Setup",
    language: "yaml",
    category: "setup",
    code: "version: '3.8'\n\nservices:\n  web:\n    build: .\n    ports:\n      - \"3000:3000\"\n    environment:\n      - NODE_ENV=development\n    volumes:\n      - .:/app\n      - /app/node_modules\n\n  db:\n    image: postgres:13\n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: password\n    volumes:\n      - postgres_data:/var/lib/postgresql/data\n\nvolumes:\n  postgres_data:",
    markdownContent:
      "# Docker Compose Configuration\n\nA complete Docker Compose setup for a web application with PostgreSQL database.\n\n## Services\n\n### Web Service\n- Builds from current directory\n- Exposes port 3000\n- Development environment\n- Volume mounting for hot reload\n\n### Database Service\n- PostgreSQL 13\n- Persistent data storage\n- Environment variables for configuration\n\n## Usage\n\n```bash\n# Start services\ndocker-compose up -d\n\n# Stop services\ndocker-compose down\n\n# View logs\ndocker-compose logs -f\n```",
  },
  {
    id: 7,
    title: "API Fetch with Error Handling",
    language: "javascript",
    category: "snippets",
    code: "async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    \n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    \n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetch error:', error);\n    throw error;\n  }\n}\n\n// Usage\nfetchData('/api/users')\n  .then(data => console.log(data))\n  .catch(error => console.error('Failed to fetch:', error));",
  },
  {
    id: 8,
    title: "System Monitoring Script",
    language: "python",
    category: "automation",
    code: 'import psutil\nimport time\n\ndef monitor_system():\n    while True:\n        # CPU usage\n        cpu_percent = psutil.cpu_percent(interval=1)\n        \n        # Memory usage\n        memory = psutil.virtual_memory()\n        memory_percent = memory.percent\n        \n        # Disk usage\n        disk = psutil.disk_usage(\'/\')\n        disk_percent = (disk.used / disk.total) * 100\n        \n        print(f"CPU: {cpu_percent}% | Memory: {memory_percent}% | Disk: {disk_percent:.1f}%")\n        \n        # Alert if usage is high\n        if cpu_percent > 80 or memory_percent > 80:\n            print("⚠️  High resource usage detected!")\n        \n        time.sleep(5)\n\nif __name__ == "__main__":\n    monitor_system()',
    markdownContent:
      "# System Monitoring Script\n\nA Python script to monitor system resources in real-time.\n\n## Features\n\n- CPU usage monitoring\n- Memory usage tracking\n- Disk space monitoring\n- High usage alerts\n- Continuous monitoring loop\n\n## Requirements\n\n```bash\npip install psutil\n```\n\n## Usage\n\n```bash\npython monitor.py\n```\n\n## Customization\n\n- Adjust alert thresholds\n- Add email notifications\n- Log to file\n- Monitor specific processes",
  },
]

export const categories = Array.from(new Set(codeSnippets.map((snippet) => snippet.category)))

export const languages = Array.from(new Set(codeSnippets.map((snippet) => snippet.language)))
