// This file contains the JavaScript code for the blog website.
// It handles interactivity, dynamic filtering, and modal article reading.

document.addEventListener('DOMContentLoaded', () => {
    const postsList = document.getElementById('posts-list');
    const searchInput = document.getElementById('search-input');
    const categoryFilters = document.getElementById('category-filters');
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const modalBackdrop = document.getElementById('article-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeButton = modalBackdrop.querySelector('.close-button');

    const posts = [
        {
            file: 'politics-post.md',
            title: 'Zoning Headache for Broad-Based Government, United Opposition',
            category: 'Politics',
            summary: 'Political parties grapple with coalition formations ahead of the 2027 election cycle.',
            date: 'April 29, 2026',
            image: 'images/politics.svg'
        },
        {
            file: 'business-post.md',
            title: 'Farmers’ Boon as 2026 Avocado Exports Seen Rising',
            category: 'Business',
            summary: 'Global demand lifts Kenya’s avocado market even as supply chain concerns remain.',
            date: 'April 29, 2026',
            image: 'images/business.svg'
        },
        {
            file: 'sports-post.md',
            title: 'Kenya’s Sawe Becomes First Man to Run Marathon Under Two Hours',
            category: 'Sports',
            summary: 'A historic athletic milestone continues Kenya’s legacy in world-class distance running.',
            date: 'April 29, 2026',
            image: 'images/sports.svg'
        },
        {
            file: 'opinion-post.md',
            title: 'Digital Payments and Energy Innovation Shape Nairobi’s Growth',
            category: 'Opinion',
            summary: 'Nairobi’s tech economy is accelerating with mobile payments and renewable energy investments.',
            date: 'April 29, 2026',
            image: 'images/opinion.svg'
        }
    ];

    const categories = ['All', 'Politics', 'Business', 'Sports', 'Opinion'];
    let activeCategory = 'All';
    let searchTerm = '';

    const fetchPostContent = async (file) => {
        const response = await fetch(`./posts/${file}`);
        return response.ok ? response.text() : 'Content unavailable.';
    };

    const openModal = (title, content) => {
        modalTitle.textContent = title;
        modalContent.innerHTML = marked.parse(content);
        modalBackdrop.classList.add('active');
        modalBackdrop.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
        modalBackdrop.classList.remove('active');
        modalBackdrop.setAttribute('aria-hidden', 'true');
        modalContent.innerHTML = '';
    };

    const buildPostCard = async (post) => {
        const content = await fetchPostContent(post.file);
        const card = document.createElement('article');
        card.className = 'post-card';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'read-more';
        button.textContent = 'Continue reading';
        button.addEventListener('click', () => openModal(post.title, content));

        card.innerHTML = `
            <div class="post-image-wrapper">
                <img src="${post.image}" alt="${post.category} story image">
            </div>
            <header>
                <div>
                    <span class="meta">${post.category}</span>
                    <h3>${post.title}</h3>
                </div>
                <span class="meta">${post.date}</span>
            </header>
            <p>${post.summary}</p>
        `;

        card.appendChild(button);
        return card;
    };

    const renderFilters = () => {
        categoryFilters.innerHTML = '';
        categories.forEach((category) => {
            const button = document.createElement('button');
            button.className = `filter-item${activeCategory === category ? ' active' : ''}`;
            button.type = 'button';
            button.textContent = category;
            button.addEventListener('click', () => {
                activeCategory = category;
                renderFilters();
                renderPosts();
            });
            categoryFilters.appendChild(button);
        });
    };

    const filterPosts = () => {
        return posts.filter((post) => {
            const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchTerm) || post.summary.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
    };

    const renderPosts = async () => {
        postsList.innerHTML = '';
        const filteredPosts = filterPosts();
        if (!filteredPosts.length) {
            postsList.innerHTML = '<p class="no-results">No stories match your search.</p>';
            return;
        }
        for (const post of filteredPosts) {
            const card = await buildPostCard(post);
            postsList.appendChild(card);
        }
    };

    searchInput.addEventListener('input', (event) => {
        searchTerm = event.target.value.trim().toLowerCase();
        renderPosts();
    });

    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        primaryNav.classList.toggle('show');
    });

    closeButton.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (event) => {
        if (event.target === modalBackdrop) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalBackdrop.classList.contains('active')) {
            closeModal();
        }
    });

    renderFilters();
    renderPosts();
});
