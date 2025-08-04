// This file helps pre-warm API routes during development
// It will trigger compilation of API routes when the client bundle is built

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Only run in browser during development
  console.log('Pre-warming API routes...');
  
  // List of API routes to pre-warm
  const apiRoutes = [
    '/api/snippets',
    '/api/categories', 
    '/api/languages'
  ];
  
  // Function to pre-warm an API route
  const preWarmRoute = async (route) => {
    try {
      // Make a HEAD request to trigger compilation without executing the full logic
      await fetch(route, { method: 'HEAD' });
      console.log(`✓ Pre-warmed ${route}`);
    } catch (error) {
      console.log(`✗ Failed to pre-warm ${route}:`, error.message);
    }
  };
  
  // Pre-warm all routes with a small delay
  setTimeout(() => {
    apiRoutes.forEach((route, index) => {
      setTimeout(() => preWarmRoute(route), index * 100);
    });
  }, 1000); // Wait 1 second after page load to start pre-warming
}
