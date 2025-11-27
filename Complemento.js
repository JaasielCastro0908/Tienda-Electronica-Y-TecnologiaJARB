// =========================================================
// JARB - LÓGICA CENTRALIZADA (CON IMÁGENES REALES)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. BASE DE DATOS MAESTRA (ACTUALIZADA CON TUS IMÁGENES)
    const masterCatalog = [
        // --- ELECTRÓNICA Y OFERTAS ---
        { id: 'el1', name: 'Laptop Gamer Alienware m16', category: 'PC Gaming', price: 45999, image: 'Laptop Gamer Alienware m16.png', specs: 'Intel i9, 32GB RAM, RTX 4080' },
        { id: 'el2', name: 'Samsung Galaxy S24 Ultra', category: 'Celulares', price: 30999, image: 'Samsung Galaxy S24 Ultra.png', specs: 'AI Zoom, 256GB, Titanio' },
        { id: 'el3', name: 'Monitor LG UltraGear 45" OLED', category: 'PC Gaming', price: 25000, image: 'Monitor LG UltraGear 45 OLED.png', specs: '240Hz, 0.03ms, Curvo' },
        { id: 'el4', name: 'iPhone 15 Pro Max', category: 'Celulares', price: 28999, image: 'iPhone 15 Pro Max.png', specs: 'A17 Pro, 512GB, Natural Titanium' },
        { id: 'el5', name: 'iPad Pro M4 13"', category: 'Celulares', price: 26000, image: 'iPad Pro M4 13.png', specs: 'Chip M4, Pantalla OLED, 1TB' },
        { id: 'el6', name: 'Sony WH-1000XM5', category: 'Accesorios', price: 7500, image: 'Sony WH-1000XM5.png', specs: 'Noise Cancelling, 30h Batería' },
        { id: 'el7', name: 'Smart TV Samsung Neo QLED 65"', category: 'TV', price: 32000, image: 'Smart TV Samsung Neo QLED 65.png', specs: '4K, 120Hz, Gaming Hub' },
        { id: 'el8', name: 'Cámara Canon EOS R6', category: 'Camaras', price: 48000, image: 'Cámara Canon EOS R6.png', specs: 'Full Frame, 4K 60fps' },
        { id: 'el9', name: 'MacBook Air M3', category: 'PC Gaming', price: 22999, image: 'MacBook Air M3.png', specs: 'Chip M3, 13.6", Midnight' },
        { id: 'el10', name: 'Drone DJI Mini 4 Pro', category: 'Camaras', price: 19500, image: 'Drone DJI Mini 4 Pro.png', specs: '4K HDR, Sensores Omnidireccionales' },
        { id: 'el11', name: 'PC Custom RTX 4090 White', category: 'PC Gaming', price: 85000, image: 'PC Custom RTX 4090 White.png', specs: 'Ryzen 9 7950X, 64GB DDR5' },

        // --- CONSOLAS (Agregadas Explícitamente) ---
        { id: 'conPS5', name: 'PlayStation 5 Standard', category: 'Consolas', price: 13500, image: 'ps5.png', specs: '4K HDR, SSD Ultra Rápido' },
        { id: 'conSwitch', name: 'Nintendo Switch OLED', category: 'Consolas', price: 8999, image: 'nintendo switch oled.png', specs: 'Pantalla OLED 7", Blanco' },
        { id: 'conXbox', name: 'Xbox Series X', category: 'Consolas', price: 14999, image: 'xbox series x.png', specs: '1TB SSD, 4K 120FPS' },

        // --- VIDEOJUEGOS (Portada Real) ---
        { id: 'gm1', name: 'Spider-Man 2', category: 'Consolas', price: 1399, image: 'Spider-Man 2.png', platform: 'PS5', specs: 'Acción, Mundo Abierto' },
        { id: 'gm2', name: 'Super Mario Wonder', category: 'Consolas', price: 1199, image: 'Super Mario Wonder.png', platform: 'Nintendo Switch', specs: 'Plataformas, Multijugador' },
        { id: 'gm3', name: 'Starfield', category: 'Consolas', price: 1499, image: 'Starfield.png', platform: 'Xbox / PC', specs: 'RPG Espacial, Bethesda' },
        { id: 'gm4', name: 'Elden Ring: Shadow of Erdtree', category: 'Consolas', price: 999, image: 'Elden Ring Shadow of Erdtree.png', platform: 'Multiplataforma', specs: 'DLC, RPG, Souls' },
        { id: 'gm5', name: 'Forza Motorsport', category: 'Consolas', price: 1599, image: 'Forza Motorsport.png', platform: 'Xbox Series X', specs: 'Simulación, Carreras' },
        { id: 'gm6', name: 'God of War Ragnarok', category: 'Consolas', price: 1299, image: 'God of War Ragnarok.png', platform: 'PS5 / PC', specs: 'Aventura, Acción' },
        { id: 'gm7', name: 'Zelda Tears of the Kingdom', category: 'Consolas', price: 1199, image: 'Zelda Tears of the Kingdom.png', platform: 'Nintendo Switch', specs: 'Aventura, Mundo Abierto' },
        { id: 'gm8', name: 'Call of Duty: MW III', category: 'Consolas', price: 1699, image: 'Call of Duty MW III.png', platform: 'Multiplataforma', specs: 'FPS, Online' },
        { id: 'gm9', name: 'Final Fantasy VII Rebirth', category: 'Consolas', price: 1799, image: 'Final Fantasy VII Rebirth.png', platform: 'PS5', specs: 'RPG, Historia Épica' },
        { id: 'gm10', name: 'Hollow Knight Silksong', category: 'Consolas', price: 899, image: 'Hollow Knight Silksong.png', platform: 'Multiplataforma', specs: 'Metroidvania, Indie' },
        { id: 'gm11', name: 'EA FC 25', category: 'Consolas', price: 1400, image: 'EA FC 25.png', platform: 'Multiplataforma', specs: 'Deportes, Fútbol' }
    ];

    // --- ESTADO ---
    let state = {
        filteredProducts: [...masterCatalog], 
        visibleCount: 8, 
        itemsPerPage: 4, 
        cart: [],
        filters: { search: "", categories: [], maxPrice: 90000 },
        sort: "relevance"
    };

    // --- 2. LÓGICA DEL HERO SLIDER AUTOMÁTICO ---
    function startHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); 
    }
    startHeroSlider();

    // --- 3. RENDERIZADORES DE CARRUSELES ---
    
    // Función Genérica para crear Cards
    function createProductCard(product, isGame = false) {
        const card = document.createElement('div');
        card.className = 'store-product-card';
        if(isGame) card.style.minWidth = "220px"; 
        
        const extraInfo = isGame ? `<p style="font-size:0.8em; color:#777;">${product.platform}</p>` : '';

        card.innerHTML = `
            <div class="card-image-wrapper"><img src="${product.image}" alt="${product.name}"></div>
            <div class="card-info">
                <p class="product-category">${product.category}</p>
                <p class="product-name">${product.name}</p>
                ${extraInfo}
                <p class="product-price">$${new Intl.NumberFormat('es-MX').format(product.price)}</p>
                <div class="btn-group">
                    <button class="view-details-btn" onclick="openDetailsModal('${product.id}')">Ver Detalles</button>
                    <button class="add-to-cart-btn" onclick="addToCart('${product.id}', '${product.name}', ${product.price})"><i class="fas fa-cart-plus"></i></button>
                </div>
            </div>
        `;
        return card;
    }

    // A. Carrusel Ofertas (Electrónica + Consolas)
    const offersTrack = document.getElementById('offers-carousel-track');
    if(offersTrack) {
        // Mostramos electrónica y consolas en ofertas
        const offers = masterCatalog.filter(p => !p.id.startsWith('gm')); 
        offers.forEach(p => offersTrack.appendChild(createProductCard(p)));
        // Eventos Flechas
        document.getElementById('offers-prev-btn')?.addEventListener('click', () => offersTrack.scrollBy({left: -300, behavior:'smooth'}));
        document.getElementById('offers-next-btn')?.addEventListener('click', () => offersTrack.scrollBy({left: 300, behavior:'smooth'}));
    }

    // B. Carrusel Juegos
    const gamesTrack = document.getElementById('games-carousel-track');
    if(gamesTrack) {
        const games = masterCatalog.filter(p => p.id.startsWith('gm'));
        games.forEach(g => gamesTrack.appendChild(createProductCard(g, true)));
        // Eventos Flechas
        document.getElementById('games-prev-btn')?.addEventListener('click', () => gamesTrack.scrollBy({left: -300, behavior:'smooth'}));
        document.getElementById('games-next-btn')?.addEventListener('click', () => gamesTrack.scrollBy({left: 300, behavior:'smooth'}));
    }

    // --- 4. RENDERIZADO DEL GRID PRINCIPAL (CATÁLOGO) ---
    const productGrid = document.getElementById('product-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const noMoreMsg = document.getElementById('no-more-products');

    function renderMainGrid() {
        if (!productGrid) return;
        productGrid.innerHTML = "";
        const visibleProducts = state.filteredProducts.slice(0, state.visibleCount);
        
        if (visibleProducts.length === 0) {
            productGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 20px;"><h3>No se encontraron resultados.</h3></div>';
            loadMoreBtn.style.display = 'none';
            return;
        }

        visibleProducts.forEach(p => productGrid.appendChild(createProductCard(p, p.id.startsWith('gm'))));

        if (state.visibleCount >= state.filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
            noMoreMsg.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'inline-block';
            noMoreMsg.style.display = 'none';
        }
    }

    // --- 5. LÓGICA DE FILTRADO Y BÚSQUEDA ---
    const searchInput = document.getElementById('search-input');
    const categoryCheckboxes = document.querySelectorAll('.category-filter');
    const priceRange = document.getElementById('price-range');
    const sortSelect = document.getElementById('sort-select');

    function applyFilters() {
        let temp = [...masterCatalog];

        // Search
        if (state.filters.search) {
            const term = state.filters.search.toLowerCase();
            temp = temp.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
        }
        // Categories
        if (state.filters.categories.length > 0) {
            temp = temp.filter(p => state.filters.categories.includes(p.category));
        }
        // Price
        temp = temp.filter(p => p.price <= state.filters.maxPrice);
        // Sort
        if (state.sort === 'price-asc') temp.sort((a,b) => a.price - b.price);
        if (state.sort === 'price-desc') temp.sort((a,b) => b.price - a.price);
        if (state.sort === 'date-desc') temp.reverse();

        state.filteredProducts = temp;
        renderMainGrid();
    }

    // Listeners Filtros
    if(searchInput) searchInput.addEventListener('keyup', (e) => {
        state.filters.search = e.target.value;
        state.visibleCount = 8;
        applyFilters();
    });
    
    categoryCheckboxes.forEach(cb => cb.addEventListener('change', () => {
        state.filters.categories = Array.from(categoryCheckboxes).filter(i => i.checked).map(i => i.value);
        state.visibleCount = 8;
        applyFilters();
    }));

    if(priceRange) priceRange.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        document.getElementById('price-value').textContent = new Intl.NumberFormat('es-MX').format(val);
        state.filters.maxPrice = val;
        applyFilters();
    });

    if(sortSelect) sortSelect.addEventListener('change', (e) => {
        state.sort = e.target.value;
        applyFilters();
    });

    if(loadMoreBtn) loadMoreBtn.addEventListener('click', () => {
        state.visibleCount += state.itemsPerPage;
        renderMainGrid();
    });

    window.filterByCategory = function(cat) {
        state.filters.categories = [cat];
        categoryCheckboxes.forEach(cb => cb.checked = (cb.value === cat));
        window.location.href = "#catalogo-section";
        applyFilters();
    };

    // --- 6. MODAL DE DETALLES ---
    const detailsModal = document.getElementById('details-modal');
    const modalBody = document.getElementById('modal-body-content');

    window.openDetailsModal = function(id) {
        const prod = masterCatalog.find(p => p.id === id);
        if(!prod) return;

        const specsHtml = prod.platform 
            ? `<tr><th>Plataforma:</th><td>${prod.platform}</td></tr>` 
            : '';

        modalBody.innerHTML = `
            <div style="text-align:center;">
                <img src="${prod.image}" style="max-width:200px; border-radius:10px;">
                <h2 style="margin:10px 0; color:var(--primary-color);">${prod.name}</h2>
                <h3 style="color:var(--secondary-color);">$${new Intl.NumberFormat('es-MX').format(prod.price)} MXN</h3>
            </div>
            <table class="detail-specs-table">
                <tr><th>Categoría:</th><td>${prod.category}</td></tr>
                ${specsHtml}
                <tr><th>Especificaciones:</th><td>${prod.specs || 'N/A'}</td></tr>
                <tr><th>Disponibilidad:</th><td>En Stock (Envío Inmediato)</td></tr>
                <tr><th>Garantía:</th><td>1 Año Directa con JARB</td></tr>
            </table>
            <button class="add-to-cart-btn" style="width:100%; margin-top:20px; padding:15px; font-size:1.1em;" 
                onclick="addToCart('${prod.id}', '${prod.name}', ${prod.price}); closeDetailsModal();">
                Añadir al Carrito Ahora
            </button>
        `;
        detailsModal.style.display = 'flex';
    };

    window.closeDetailsModal = function() {
        detailsModal.style.display = 'none';
    };
    
    detailsModal.addEventListener('click', (e) => {
        if(e.target === detailsModal) closeDetailsModal();
    });

    // --- 7. CARRITO ---
    const cartList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');

    window.addToCart = function(id, name, price) {
        const exists = state.cart.find(i => i.id === id);
        if(exists) exists.quantity++;
        else state.cart.push({id, name, price, quantity: 1});
        updateCartUI();
        showNotification(`✔ ${name} añadido al carrito`);
    };

    window.removeFromCart = function(id) {
        state.cart = state.cart.filter(i => i.id !== id);
        updateCartUI();
    };

    function updateCartUI() {
        cartList.innerHTML = "";
        let total = 0, count = 0;
        state.cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div><b>${item.name}</b><br><small>x${item.quantity}</small></div>
                <div>$${item.price*item.quantity} <button class="cart-item-remove-btn" onclick="removeFromCart('${item.id}')">✕</button></div>
            `;
            cartList.appendChild(li);
        });
        cartTotal.textContent = new Intl.NumberFormat('es-MX').format(total);
        cartCount.textContent = count;
    }

    document.getElementById('open-cart-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.classList.add('open');
    });
    document.getElementById('close-cart-btn')?.addEventListener('click', () => cartModal.classList.remove('open'));

    window.showNotification = function(msg) {
        const n = document.getElementById('notification-container');
        n.textContent = msg;
        n.classList.add('show');
        setTimeout(() => n.classList.remove('show'), 3000);
    };

    // --- 8. CANVAS PRO: SIMULACIÓN VENTAS 2025 ---
    const canvas = document.getElementById('jarb-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        
        // Datos simulados (Ago - Dic 2025)
        const data = [150, 220, 180, 260, 300]; 
        const labels = ['Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const barW = 40;
        const gap = 30;
        const startX = 50;
        
        // Fondo
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0,0,W,H);
        
        // Ejes
        ctx.beginPath();
        ctx.moveTo(30, 20); ctx.lineTo(30, H-30); ctx.lineTo(W-10, H-30);
        ctx.strokeStyle = "#555";
        ctx.stroke();

        // Barras
        data.forEach((val, i) => {
            const hBar = (val / 350) * (H - 50); // Escala
            const x = startX + i * (barW + gap);
            const y = (H - 30) - hBar;

            let grd = ctx.createLinearGradient(0, y, 0, H-30);
            grd.addColorStop(0, i % 2 === 0 ? "#0070d1" : "#e4002b");
            grd.addColorStop(1, "#ffffff");

            ctx.fillStyle = grd;
            ctx.fillRect(x, y, barW, hBar);
            
            ctx.fillStyle = "#333";
            ctx.font = "bold 12px Arial";
            ctx.fillText(labels[i], x + 5, H - 15);
            ctx.fillText(val, x + 8, y - 5);
        });
    }

    // --- 9. EXTRAS ---
    window.setTheme = (t) => { document.body.className = ''; if(t !== 'light') document.body.classList.add(`theme-${t}`); };

    const typingText = "¡Última hora! Ofertas Flash por inauguración online...";
    let tIdx = 0;
    const tEl = document.getElementById('typing-output');
    function typeWriter() {
        if(tEl && tIdx < typingText.length) {
            tEl.textContent += typingText.charAt(tIdx);
            tIdx++;
            setTimeout(typeWriter, 80);
        }
    }
    typeWriter();

    const commentForm = document.getElementById('comment-form');
    if(commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification("¡Comentario enviado!");
            commentForm.reset();
        });
    }

    // Inicializar Grid
    renderMainGrid();
});