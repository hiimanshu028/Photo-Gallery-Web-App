import React, { useReducer, useState, useMemo, useCallback } from 'react';
import { useFetchPhotos } from './hooks/useFetchPhotos';
import { favoritesReducer, initialFavoritesState } from './reducers/favoritesReducer';

function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [favorites, dispatch] = useReducer(favoritesReducer, initialFavoritesState);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      const matchesSearch = photo.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFavorites = showFavoritesOnly ? favorites.some(fav => fav.id === photo.id) : true;
      return matchesSearch && matchesFavorites;
    });
  }, [photos, searchTerm, showFavoritesOnly, favorites]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white gap-4">
        <svg 
          className="animate-spin h-10 w-10 text-indigo-500" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-xl font-medium tracking-wide">Loading gallery...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-red-500 text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-bold text-white">
          Photo <span className="text-indigo-500">Gallery</span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search author..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
          />
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-4 py-2 rounded font-medium whitespace-nowrap transition-colors ${
              showFavoritesOnly ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
            }`}
          >
            {showFavoritesOnly ? 'Show All' : '♥ Favorites'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {filteredPhotos.length === 0 ? (
           <div className="text-center text-gray-400 mt-12 text-lg">No photos found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => {
              const isFav = favorites.some(fav => fav.id === photo.id);
              
              return (
                <div key={photo.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 flex flex-col">
                  <div className="relative aspect-square">
                    <img
                      src={`https://picsum.photos/id/${photo.id}/400/400`}
                      alt={`By ${photo.author}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-4 flex justify-between items-center bg-gray-800 mt-auto">
                    <span className="font-medium truncate text-gray-200 mr-4">
                      {photo.author}
                    </span>
                    <button
                      onClick={() => dispatch({ type: 'TOGGLE_FAVOURITE', payload: photo })}
                      className="focus:outline-none transition-transform active:scale-90 p-2 -mr-2"
                      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={isFav ? "#ef4444" : "none"}
                        stroke={isFav ? "#ef4444" : "currentColor"}
                        strokeWidth="2"
                        className={`w-6 h-6 ${isFav ? 'text-red-500' : 'text-gray-400 hover:text-red-400 transition-colors'}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;