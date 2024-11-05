const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

// API 1 - JSONPlaceholder for testing
app.use('/api1', createProxyMiddleware({
    target: 'http://jsonplaceholder.typicode.com',
    changeOrigin: true,
    pathRewrite: { '^/api1': '/posts' },
}));

// API 2 - JSONPlaceholder for testing
app.use('/api2', createProxyMiddleware({
    target: 'http://jsonplaceholder.typicode.com',
    changeOrigin: true,
    pathRewrite: { '^/api2': '/users' },
}));

// OpenWeatherMap API
app.use('/weather', createProxyMiddleware({
    target: 'https://api.openweathermap.org',
    changeOrigin: true,
    pathRewrite: { '^/weather': '/data/2.5/weather' },
    onProxyReq: (proxyReq, req) => {
        // Add API key to the query string
        const url = new URL(proxyReq.path, 'https://api.openweathermap.org');
        url.searchParams.append('appid', 'e08051c327e607c80fa7c4d2c550696a');
        proxyReq.path = url.pathname + url.search;
    }
}));

app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
});
