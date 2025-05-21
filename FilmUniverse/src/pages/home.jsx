import React, { useEffect, useState } from 'react';
import MovieCard from '../components/moviecard';
import axios from 'axios';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const res = await axios.get('/api/movies/popular');
        setMovies(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="home">
      <section className="welcome-section">
        <h1>Bienvenido a FilmUniverse</h1>
        <p>La red social para amantes del cine y las series.</p>
        <div className="search-bar">
          <input type="text" placeholder="Buscar películas, series, personas..." />
          <button><i className="fas fa-search"></i></button>
        </div>
      </section>

      <section className="trending-section">
        <h2>Películas populares esta semana</h2>
        <div className="movies-grid">
          {movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;