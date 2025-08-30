// Catalog filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const catalogCards = document.querySelectorAll('.catalog-card');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards with animation
            catalogCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Add to cart functionality for catalog items
    const orderButtons = document.querySelectorAll('.catalog-card .btn-primary');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.catalog-card');
            const plantName = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent.replace('₹ ', '');
            
            // Create WhatsApp message
            const message = `Hi! I'm interested in ordering ${plantName} for ${price}. Please provide more details.`;
            const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            catalogCards.forEach(card => {
                const plantName = card.querySelector('h3').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                
                const matches = plantName.includes(searchTerm) || 
                               tags.some(tag => tag.includes(searchTerm));
                
                if (matches || searchTerm === '') {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0.3';
                }
            });
        });
    }

    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            const catalogGrid = document.getElementById('catalogGrid');
            const cards = Array.from(catalogCards);
            
            cards.sort((a, b) => {
                if (sortBy === 'price-low') {
                    const priceA = parseInt(a.querySelector('.price').textContent.replace(/[^\d]/g, ''));
                    const priceB = parseInt(b.querySelector('.price').textContent.replace(/[^\d]/g, ''));
                    return priceA - priceB;
                } else if (sortBy === 'price-high') {
                    const priceA = parseInt(a.querySelector('.price').textContent.replace(/[^\d]/g, ''));
                    const priceB = parseInt(b.querySelector('.price').textContent.replace(/[^\d]/g, ''));
                    return priceB - priceA;
                } else if (sortBy === 'name') {
                    const nameA = a.querySelector('h3').textContent;
                    const nameB = b.querySelector('h3').textContent;
                    return nameA.localeCompare(nameB);
                }
                return 0;
            });
            
            // Re-append sorted cards
            cards.forEach(card => catalogGrid.appendChild(card));
        });
    }
});

// Plant care tips data
const careTips = {
    'mango': {
        watering: 'Water deeply once a week during growing season',
        sunlight: 'Full sun (6-8 hours daily)',
        soil: 'Well-draining, slightly acidic soil',
        fertilizer: 'Monthly during growing season'
    },
    'lemon': {
        watering: 'Keep soil consistently moist but not waterlogged',
        sunlight: 'Full sun (6+ hours daily)',
        soil: 'Well-draining, slightly acidic soil',
        fertilizer: 'Citrus fertilizer every 6-8 weeks'
    },
    'rose': {
        watering: 'Water at base, avoid wetting leaves',
        sunlight: 'Morning sun with afternoon shade',
        soil: 'Rich, well-draining soil',
        fertilizer: 'Rose fertilizer monthly during blooming season'
    }
};

// Show care tips modal
function showCareTips(plantType) {
    const tips = careTips[plantType];
    if (tips) {
        const modal = document.createElement('div');
        modal.className = 'care-modal';
        modal.innerHTML = `
            <div class="care-modal-content">
                <h3>Care Tips for ${plantType.charAt(0).toUpperCase() + plantType.slice(1)}</h3>
                <div class="care-tips">
                    <div class="tip">
                        <strong>💧 Watering:</strong> ${tips.watering}
                    </div>
                    <div class="tip">
                        <strong>☀️ Sunlight:</strong> ${tips.sunlight}
                    </div>
                    <div class="tip">
                        <strong>🌱 Soil:</strong> ${tips.soil}
                    </div>
                    <div class="tip">
                        <strong>🌿 Fertilizer:</strong> ${tips.fertilizer}
                    </div>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="btn btn-primary">Close</button>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        `;
        
        document.body.appendChild(modal);
    }
}