document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('calc-search');
    const sections = document.querySelectorAll('.calc-section');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        sections.forEach(section => {
            const links = section.querySelectorAll('.tool-link');
            let hasVisibleLink = false;

            links.forEach(link => {
                const text = link.textContent.toLowerCase();
                const tags = link.getAttribute('data-tags')?.toLowerCase() || "";

                if (text.includes(query) || tags.includes(query)) {
                    link.classList.remove('hidden');
                    hasVisibleLink = true;
                } else {
                    link.classList.add('hidden');
                }
            });

            // Toggle whole section visibility
            section.style.display = hasVisibleLink ? 'block' : 'none';
        });
    });
});
