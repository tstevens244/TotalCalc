document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('calc-search');
    const cards = document.querySelectorAll('.calc-card');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        cards.forEach(card => {
            // Get text content from title and description
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            // Check if query exists in title or description
            if (title.includes(query) || description.includes(query)) {
                card.classList.remove('hidden-card');
            } else {
                card.classList.add('hidden-card');
            }
        });
    });
});
