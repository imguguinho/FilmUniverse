import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RatingModal from './RatingModal';
import { useAuth } from '../context/AuthContext';

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleRateClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      setShowModal(true);
    }
  };

  return (
    <>
      <Link to={`/pelicula/${movie._id}`} className="movie-card">
        <img 
          src={movie.posterPath ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` : '/placeholder.jpg'} 
          alt={movie.title} 
          className="movie-poster" 
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year">{new Date(movie.releaseDate).getFullYear()}</p>
          <div className="rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <i 
                  key={star} 
                  className={`fas fa-star${star <= Math.round(movie.averageRating) ? '' : '-half-alt'}`}
                />
              ))}
            </div>
            <span className="rating-count">{movie.averageRating.toFixed(1)} ({movie.ratingCount})</span>
          </div>
          <button 
            className="rate-btn" 
            onClick={handleRateClick}
          >
            <i className="fas fa-star"></i> Calificar
          </button>
        </div>
      </Link>

      {showModal && (
        <RatingModal 
          movie={movie} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
};

export default MovieCard;