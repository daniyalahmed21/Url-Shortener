"use client";

import React from 'react';
import axios from 'axios';
import Link from 'next/link';


const ShortenUrl = () => {
  const [url, setUrl] = React.useState('');
  const [shortUrl, setShortUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleShorten = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/shorten', { originalUrl: url });
      setShortUrl(response.data.shortUrl);
      setUrl('');
    } catch (err) {
      setError('Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/urls/${shortUrl}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">URL Shortener</h1>
          <a
            href="http://localhost:3000/urls"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm"
          >
            All URLs
          </a>
        </div>
        
        <div className="space-y-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your URL"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <button
            onClick={handleShorten}
            disabled={loading}
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all disabled:bg-blue-300"
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
        )}

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <Link
              href={`http://localhost:3000/urls/${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm break-all"
            >
              {`http://localhost:3000/urls/${shortUrl}`}
            </Link>
            <button
              onClick={handleCopy}
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortenUrl;