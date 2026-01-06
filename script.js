document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('calc-search');
    const cards = document.querySelectorAll('.calc-card');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        cards.forEach(card => {
            // Check the visible text + the keywords in the data-title attribute
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const keywords = card.getAttribute('data-title').toLowerCase();

            if (title.includes(query) || description.includes(query) || keywords.includes(query)) {
                card.classList.remove('hidden-card');
            } else {
                card.classList.add('hidden-card');
            }
        });
    });
});
