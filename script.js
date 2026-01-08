document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('calc-search');
    const sections = document.querySelectorAll('.calc-section');
    const tools = document.querySelectorAll('.tool-link');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        sections.forEach(section => {
            let sectionHasMatch = false;
            const links = section.querySelectorAll('.tool-link');

            links.forEach(link => {
                const text = link.textContent.toLowerCase();
                const tags = link.getAttribute('data-tags').toLowerCase();

                if (text.includes(query) || tags.includes(query)) {
                    link.classList.remove('hidden');
                    sectionHasMatch = true;
                } else {
                    link.classList.add('hidden');
                }
            });

            // Hide the entire section if no tools inside match
            if (sectionHasMatch) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    });
});
