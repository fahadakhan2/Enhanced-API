import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface PodcastSummary {
  id: number;
  title: string;
  textContent: string;
  summary?: string;
}

function App() {
  const [podcasts, setPodcasts] = useState<PodcastSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPodcast, setSelectedPodcast] = useState<number | null>(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/podcast-summary');
        setPodcasts(response.data.podcastSummaries);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch podcasts. Please try again later.');
        setLoading(false);
        console.error('Error fetching podcasts:', err);
      }
    };

    fetchPodcasts();
  }, []);

  const togglePodcast = (id: number) => {
    setSelectedPodcast(selectedPodcast === id ? null : id);
  };

  if (loading) {
    return <div className="loading">Loading podcasts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="podcast-app">
      <header>
        <h1>Educational Podcasts</h1>
        <p>Browse through our collection of educational content</p>
      </header>

      <div className="podcast-grid">
        {podcasts.map(podcast => (
          <div 
            key={podcast.id} 
            className={`podcast-card ${selectedPodcast === podcast.id ? 'expanded' : ''}`}
            onClick={() => togglePodcast(podcast.id)}
          >
            <h2 className="podcast-title">{podcast.title}</h2>
            
            {selectedPodcast === podcast.id && (
              <div className="podcast-content">
                <div className="text-content">
                  {podcast.textContent.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph.trim()}</p>
                  ))}
                </div>
              </div>
            )}
            
            {selectedPodcast !== podcast.id && (
              <div className="podcast-preview">
                {podcast.textContent.substring(0, 150).trim()}...
                <span className="read-more">Click to read more</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App