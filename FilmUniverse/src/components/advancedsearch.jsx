import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdvancedSearch = () => {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const navigate = useNavigate();

  const genres = [
    'Acción', 'Aventura', 'Animación', 'Comedia', 'Crimen', 
    'Documental', 'Drama', 'Familiar', 'Fantasía', 'Historia', 
    'Terror', 'Música', 'Misterio', 'Romance', 'Ciencia ficción', 
    'TV Movie', 'Suspense', 'Guerra', 'Western'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (year) params.append('year', year);
    if (genre) params.append('genre', genre);
    if (rating) params.append('rating', rating);
    navigate(`/busqueda?${params.toString()}`);
  };

  return (
    <div className="advanced-search">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Buscar por título" 
          />
        </div>
        
        <div className="form-group">
          <label>Año</label>
          <input 
            type="number" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            placeholder="Filtrar por año" 
            min="1900" 
            max={new Date().getFullYear()} 
          />
        </div>
        
        <div className="form-group">
          <label>Género</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">Todos los géneros</option>
            {genres.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Rating mínimo</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">Cualquier rating</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="9">9+</option>
          </select>
        </div>
        
        <button type="submit" className="search-btn">
          <i className="fas fa-search"></i> Buscar
        </button>
      </form>
    </div>
  );
};

export default AdvancedSearch;