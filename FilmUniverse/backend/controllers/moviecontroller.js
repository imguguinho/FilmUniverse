const Movie = require('../models/movie');
const Rating = require('../models/rating');
const axios = require('axios');

// Obtener película por ID
exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate('ratings', 'value review createdAt')
      .populate('comments', 'content createdAt');
    
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Buscar películas
exports.searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    
    // Buscar en base de datos local
    const localResults = await Movie.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { overview: { $regex: query, $options: 'i' } }
      ]
    }).limit(10);
    
    // Si no hay resultados locales, buscar en TMDB
    if (localResults.length === 0) {
      const tmdbResults = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}&language=es`
      );
      
      // Mapear resultados de TMDB a nuestro esquema
      const movies = tmdbResults.data.results.map(movie => ({
        tmdbId: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        genres: movie.genre_ids
      }));
      
      return res.json(movies);
    }
    
    res.json(localResults);
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Calificar película
exports.rateMovie = async (req, res) => {
  try {
    const { movieId, value, review } = req.body;
    const userId = req.user.id;
    
    // Verificar si la película existe
    let movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    
    // Crear o actualizar rating
    let rating = await Rating.findOneAndUpdate(
      { user: userId, movie: movieId },
      { value, review },
      { new: true, upsert: true }
    );
    
    // Actualizar promedio de ratings de la película
    const ratings = await Rating.find({ movie: movieId });
    const average = ratings.reduce((acc, curr) => acc + curr.value, 0) / ratings.length;
    
    movie.averageRating = average;
    movie.ratingCount = ratings.length;
    await movie.save();
    
    res.json(rating);
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};