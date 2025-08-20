"use client"
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const UrlList = () => {
  const [urls, setUrls] = useState(null);
  const [error, setError] = useState(false);

  React.useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get("/api/urls");
        setUrls(response.data.Urls || []);
      } catch (err) {
        console.error("Failed to fetch URLs:", err);
        setError(true);
      }
    };
    fetchUrls();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            All Shortened URLs
          </h1>
          <a
            href="http://localhost:3000"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm"
          >
            Back to Shortener
          </a>
        </div>

        {error ? (
          <p className="text-center text-red-500 text-sm">
            Failed to load URLs. Please try again later.
          </p>
        ) : urls === null ? (
          <p className="text-center text-gray-600">Loading URLs...</p>
        ) : urls.length === 0 ? (
          <p className="text-center text-gray-600">
            No URLs have been shortened yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {urls.map((url, index) => (
              <li
                key={index}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-700">
                      Original URL:
                    </span>{" "}
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline break-all"
                    >
                      {url.originalUrl}
                    </a>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-gray-700">
                      Short URL:
                    </span>{" "}
                    <Link
                      href={`http://localhost:3000/urls/${url.shortUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline break-all"
                    >
                      {`http://shorty/${url.shortUrl}`}
                    </Link>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

};
export default UrlList;
