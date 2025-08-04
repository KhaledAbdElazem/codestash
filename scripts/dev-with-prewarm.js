#!/usr/bin/env node

const { spawn } = require('child_process');
const http = require('http');

console.log('🚀 Starting Next.js development server with API pre-warming...\n');

// Start the Next.js dev server
const nextProcess = spawn('npx', ['next', 'dev'], {
  stdio: 'pipe',
  shell: true
});

let serverReady = false;
let apiRoutesPreWarmed = false;

// API routes to pre-warm
const apiRoutes = [
  '/api/snippets',
  '/api/categories', 
  '/api/languages',
  '/api/snippets/1' // Include dynamic routes if any
];

// Function to make a request to pre-warm an API route
const preWarmRoute = (route) => {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: route,
      method: 'HEAD', // Use HEAD to trigger compilation without full execution
      timeout: 5000
    }, (res) => {
      console.log(`✓ Pre-warmed ${route} (${res.statusCode})`);
      resolve();
    });
    
    req.on('error', (err) => {
      console.log(`✗ Failed to pre-warm ${route}: ${err.message}`);
      resolve();
    });
    
    req.on('timeout', () => {
      console.log(`⏱️  Timeout pre-warming ${route}`);
      req.destroy();
      resolve();
    });
    
    req.end();
  });
};

// Function to pre-warm all API routes
const preWarmAllRoutes = async () => {
  if (apiRoutesPreWarmed) return;
  
  console.log('\n🔥 Pre-warming API routes...');
  apiRoutesPreWarmed = true;
  
  // Pre-warm routes sequentially to avoid overwhelming the server
  for (const route of apiRoutes) {
    await preWarmRoute(route);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log('✅ API routes pre-warming completed!\n');
};

// Handle Next.js output
nextProcess.stdout.on('data', (data) => {
  const output = data.toString();
  process.stdout.write(output);
  
  // Check if server is ready
  if (output.includes('✓ Ready in') && !serverReady) {
    serverReady = true;
    // Wait a moment for the server to fully initialize, then pre-warm
    setTimeout(preWarmAllRoutes, 2000);
  }
  
  // Also check for the Local URL indicator
  if (output.includes('Local:') && !serverReady) {
    serverReady = true;
    setTimeout(preWarmAllRoutes, 2000);
  }
});

nextProcess.stderr.on('data', (data) => {
  process.stderr.write(data);
});

nextProcess.on('close', (code) => {
  console.log(`\n👋 Next.js dev server exited with code ${code}`);
  process.exit(code);
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  nextProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  nextProcess.kill('SIGTERM');
});
