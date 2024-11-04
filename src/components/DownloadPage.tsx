import React from 'react';
import { Download, FolderTree, Github, Code } from 'lucide-react';

export default function DownloadPage() {
  const projectStructure = `
flight-search/
├── src/
│   ├── api/
│   │   ├── airports.ts
│   │   └── flights.ts
│   ├── components/
│   │   ├── AirportSearch.tsx
│   │   ├── CheapestCombo.tsx
│   │   ├── FlightResults.tsx
│   │   └── SearchForm.tsx
│   ├── utils/
│   │   └── flightUtils.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── postcss.config.js
└── tailwind.config.js`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center mb-6">
              <Download className="w-8 h-8 mr-3 text-indigo-600" />
              Download Project
            </h1>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-8">
                This is a complete React + TypeScript flight search application built with modern tools and best practices.
              </p>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-8">
                <h2 className="text-xl font-semibold text-indigo-900 flex items-center mb-2">
                  <FolderTree className="w-5 h-5 mr-2" />
                  Project Structure
                </h2>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto text-sm">
                  <code>{projectStructure}</code>
                </pre>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-gray-700" />
                    Key Features
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Real-time flight search with Ryanair API integration</li>
                    <li>Airport autocomplete with comprehensive airport database</li>
                    <li>Round-trip flight combinations with best price finder</li>
                    <li>Same-day return flight highlighting</li>
                    <li>Responsive design with Tailwind CSS</li>
                    <li>TypeScript for enhanced type safety</li>
                    <li>Modern React with hooks and functional components</li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <a
                    href="https://github.com/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Create Repository & Download
                  </a>
                </div>

                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Getting Started</h3>
                  <div className="bg-gray-900 rounded-lg p-4 text-gray-100">
                    <code className="block mb-2">git clone [your-repo-url]</code>
                    <code className="block mb-2">cd flight-search</code>
                    <code className="block mb-2">npm install</code>
                    <code className="block">npm run dev</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}