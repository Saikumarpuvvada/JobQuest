import React, { useState } from 'react';

const JobMatcher = () => {
  const [resumeText, setResumeText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      setError('Please enter your skills/experience');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch(`http://localhost:5000/api/get_jobs?resume=${encodeURIComponent(resumeText)}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setResults(data || []);
    } catch (err) {
      setError('Failed to fetch job recommendations. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Job Recommendation System
          </h1>
          <p className="text-lg text-gray-600">
            Get personalized job matches based on your skills
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="mb-6">
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
              Paste your skills/experience:
            </label>
            <textarea
              id="resume"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Example: Python, React, Machine Learning, 5 years experience..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              'Find Matching Jobs'
            )}
          </button>
        </form>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Recommended Jobs ({results.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((job, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {job.Position}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    {job.Company}
                  </p>
                  <p className="text-sm text-gray-500">{job.Location}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatcher;
