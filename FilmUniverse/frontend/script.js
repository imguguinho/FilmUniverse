 // Open movie modal
        function openModal(title, year, runtime, poster, overview) {
            document.getElementById('modalMovieTitle').textContent = title;
            document.getElementById('modalYear').textContent = year;
            document.getElementById('modalRuntime').textContent = runtime;
            document.getElementById('modalPoster').src = poster;
            document.getElementById('modalOverview').textContent = overview;
            document.getElementById('movieModal').style.display = 'block';
            
            // Set rating modal title
            document.getElementById('ratingMovieTitle').textContent = title;
        }
        
        // Close movie modal
        function closeModal() {
            document.getElementById('movieModal').style.display = 'none';
        }
        
        // Open rating modal
        function openRatingModal() {
            document.getElementById('ratingModal').style.display = 'block';
        }
        
        // Close rating modal
        function closeRatingModal() {
            document.getElementById('ratingModal').style.display = 'none';
            resetStars();
        }
        
        // Set star rating
        let currentRating = 0;
        
        function setRating(rating) {
            currentRating = rating;
            const stars = document.querySelectorAll('#ratingModal .stars i');
            
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.className = 'fas fa-star';
                } else {
                    star.className = 'far fa-star';
                }
            });
            
            const ratingText = document.getElementById('ratingText');
            const texts = ['Pésima', 'Mala', 'Regular', 'Buena', 'Excelente', 'Obra maestra'];
            ratingText.textContent = texts[rating - 1] || 'Selecciona tu calificación';
        }
        
        // Reset stars
        function resetStars() {
            currentRating = 0;
            const stars = document.querySelectorAll('#ratingModal .stars i');
            stars.forEach(star => {
                star.className = 'far fa-star';
            });
            document.getElementById('ratingText').textContent = 'Selecciona tu calificación';
        }
        
        // Submit rating
        function submitRating() {
            if (currentRating > 0) {
                alert(`¡Gracias por calificar con ${currentRating} estrellas!`);
                closeRatingModal();
            } else {
                alert('Por favor selecciona una calificación');
            }
        }
        
        // Close modals when clicking outside
        window.onclick = function(event) {
            if (event.target === document.getElementById('movieModal')) {
                closeModal();
            }
            if (event.target === document.getElementById('ratingModal')) {
                closeRatingModal();
            }
        }