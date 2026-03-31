// 상품 데이터
const products = {
    recommended: [
        {
            id: 1,
            name: '소프트 니트 카디건',
            category: '아우터',
            price: 49000,
            originalPrice: 89000,
            discount: 45,
            image: 'https://images.unsplash.com/photo-1676083140193-84c3414fb78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 2,
            name: '베이직 화이트 셔츠',
            category: '상의',
            price: 35000,
            originalPrice: 59000,
            discount: 40,
            image: 'https://images.unsplash.com/photo-1676083140058-4cbfc100b646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 3,
            name: '빈티지 데님 팬츠',
            category: '하의',
            price: 62000,
            originalPrice: 98000,
            discount: 37,
            image: 'https://images.unsplash.com/photo-1663766976204-ead9fb54d388?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: true
        },
        {
            id: 4,
            name: '플리츠 미디 스커트',
            category: '하의',
            price: 45000,
            originalPrice: 79000,
            discount: 43,
            image: 'https://images.unsplash.com/photo-1755051661299-5d27d720f131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 5,
            name: '오버핏 트렌치 코트',
            category: '아우터',
            price: 129000,
            originalPrice: 189000,
            discount: 32,
            image: 'https://images.unsplash.com/photo-1762605135012-56a59a059e60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 6,
            name: '실크 블라우스',
            category: '상의',
            price: 55000,
            originalPrice: 89000,
            discount: 38,
            image: 'https://images.unsplash.com/photo-1758207574693-3f870de1fdc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        }
    ],
    best: [
        {
            id: 7,
            name: '울 블렌드 롱 코트',
            category: '아우터',
            price: 159000,
            originalPrice: 249000,
            discount: 36,
            image: 'https://images.unsplash.com/photo-1698598078883-952cb7521b01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: true
        },
        {
            id: 8,
            name: '캐시미어 터틀넥',
            category: '상의',
            price: 89000,
            originalPrice: 139000,
            discount: 36,
            image: 'https://images.unsplash.com/photo-1674154082514-44b308d0209e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 9,
            name: '하이웨이스트 슬랙스',
            category: '하의',
            price: 58000,
            originalPrice: 92000,
            discount: 37,
            image: 'https://images.unsplash.com/photo-1673637082482-55952ee63ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 10,
            name: '레더 미니백',
            category: '가방',
            price: 79000,
            originalPrice: 129000,
            discount: 39,
            image: 'https://images.unsplash.com/photo-1743642565836-587f43dbc374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 11,
            name: '플라워 패턴 원피스',
            category: '원피스',
            price: 72000,
            originalPrice: 119000,
            discount: 39,
            image: 'https://images.unsplash.com/photo-1758542259093-26a591f7efaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: true
        },
        {
            id: 12,
            name: '앵클 첼시 부츠',
            category: '신발',
            price: 95000,
            originalPrice: 149000,
            discount: 36,
            image: 'https://images.unsplash.com/photo-1524275406383-49f669cf763a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 13,
            name: '진주 드롭 이어링',
            category: '악세서리',
            price: 29000,
            originalPrice: 49000,
            discount: 41,
            image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 14,
            name: '미니 크로스백',
            category: '가방',
            price: 69000,
            originalPrice: 99000,
            discount: 30,
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        }
    ]
};

// 전체 상품
const allProducts = [...products.recommended, ...products.best];

// 가격 포맷
function formatPrice(price) {
    return price.toLocaleString('ko-KR');
}

// URL 파라미터 읽기
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// 상품 카드 생성
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
        <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <button class="like-btn ${product.liked ? 'liked' : ''}" data-id="${product.id}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        </div>
        <div class="product-info">
            <p class="product-category">${product.category}</p>
            <p class="product-name">${product.name}</p>
            <div class="product-price-wrapper">
                <span class="product-discount">${product.discount}%</span>
                <span class="product-price">${formatPrice(product.price)}원</span>
            </div>
            <p class="product-original-price">${formatPrice(product.originalPrice)}원</p>
        </div>
    `;

    card.addEventListener('click', (e) => {
        if (e.target.closest('.like-btn')) return;
        window.location.href = `product-detail.html?id=${product.id}`;
    });

    return card;
}

// 홈 화면 렌더링
function renderHomeProducts() {
    const recommendedContainer = document.getElementById('recommendedProducts');
    const bestContainer = document.getElementById('bestProducts');

    if (recommendedContainer) {
        recommendedContainer.innerHTML = '';
        products.recommended.forEach(product => {
            recommendedContainer.appendChild(createProductCard(product));
        });
    }

    if (bestContainer) {
        bestContainer.innerHTML = '';
        products.best.forEach(product => {
            bestContainer.appendChild(createProductCard(product));
        });
    }
}

// 카테고리 카드 클릭 연결
function bindCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        const category = card.dataset.category;

        card.addEventListener('click', () => {
            if (!category) return;
            window.location.href = `product-list.html?category=${encodeURIComponent(category)}`;
        });
    });
}

// 카테고리별 상품
function getProductsByCategory(category) {
    if (!category || category === '전체') {
        return allProducts;
    }

    return allProducts.filter(product => product.category === category);
}

// 리스트 페이지 렌더링
function renderCategoryProducts() {
    const listContainer = document.getElementById('categoryProductList');
    if (!listContainer) return;

    let category = getQueryParam('category');

    if (category) {
        category = decodeURIComponent(category).trim();
    } else {
        category = '전체';
    }

    const filteredProducts = getProductsByCategory(category);

    const titleEl = document.getElementById('productListTitle');
    const countEl = document.getElementById('productListCount');

    if (titleEl) {
        titleEl.textContent = category;
    }

    if (countEl) {
        countEl.textContent = `${filteredProducts.length}개의 상품`;
    }

    listContainer.innerHTML = '';

    if (filteredProducts.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <p class="empty-state-title">상품이 없어요</p>
                <p class="empty-state-text">해당 카테고리의 상품이 없습니다.</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        listContainer.appendChild(createProductCard(product));
    });
}

// 상세 페이지 렌더링
function renderProductDetail() {
    const detailContainer = document.getElementById('productDetailPage');
    if (!detailContainer) return;

    const productId = parseInt(getQueryParam('id'), 10);
    const product = allProducts.find(item => item.id === productId);

    if (!product) {
        detailContainer.innerHTML = `
            <div class="empty-state">
                <p class="empty-state-title">상품을 찾을 수 없어요</p>
                <p class="empty-state-text">선택한 상품 정보가 존재하지 않습니다.</p>
            </div>
        `;
        return;
    }

    detailContainer.innerHTML = `
        <div class="detail-image-box">
            <img src="${product.image}" alt="${product.name}" class="detail-image">
        </div>

        <div class="detail-info">
            <p class="detail-category">${product.category}</p>
            <h2 class="detail-title">${product.name}</h2>

            <div class="detail-price-row">
                <span class="detail-discount">${product.discount}%</span>
                <span class="detail-price">${formatPrice(product.price)}원</span>
            </div>

            <p class="detail-original-price">${formatPrice(product.originalPrice)}원</p>

            <div class="detail-divider"></div>

            <div class="detail-meta">
                <div class="detail-meta-row">
                    <span>배송</span>
                    <span>무료배송</span>
                </div>
                <div class="detail-meta-row">
                    <span>적립</span>
                    <span>최대 5% 적립</span>
                </div>
                <div class="detail-meta-row">
                    <span>카테고리</span>
                    <span>${product.category}</span>
                </div>
            </div>

            <div class="detail-description">
                <h3 class="detail-section-title">상품 설명</h3>
                <p>
                    감각적인 무드와 편안한 실루엣을 함께 담은 MAUVE의 추천 아이템입니다.
                    일상룩부터 포인트 스타일링까지 자연스럽게 어울리도록 구성했습니다.
                </p>
            </div>
        </div>
    `;
}

// 찜하기 토글
function toggleLike(productId) {
    const product = allProducts.find(item => item.id === productId);
    if (product) {
        product.liked = !product.liked;
    }
}

// 하단 네비 활성화
function setActiveNav(index) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 공통 이벤트
function bindCommonEvents() {
    document.addEventListener('click', (e) => {
        const likeBtn = e.target.closest('.like-btn');

        if (likeBtn) {
            e.stopPropagation();
            const productId = parseInt(likeBtn.dataset.id, 10);
            toggleLike(productId);
            likeBtn.classList.toggle('liked');

            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        }
    });

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            setActiveNav(index);

            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        });
    });

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            alert('검색 기능은 준비 중입니다.');
        });
    }

    const cartBtn = document.querySelector('.cart-header-btn');
    if (cartBtn && !cartBtn.hasAttribute('onclick')) {
        cartBtn.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }

    const alarmBtn = document.querySelector('.alarm-btn');
    if (alarmBtn) {
        alarmBtn.addEventListener('click', () => {
            alert('새로운 알림이 없습니다.');
        });
    }

    const addCartBtn = document.getElementById('addToCartBtn');
    if (addCartBtn) {
        addCartBtn.addEventListener('click', () => {
            alert('장바구니에 담았습니다.');
        });
    }

    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            alert('구매 기능은 준비 중입니다.');
        });
    }
}

// 초기 실행
document.addEventListener('DOMContentLoaded', () => {
    renderHomeProducts();
    bindCategoryCards();
    renderCategoryProducts();
    renderProductDetail();
    bindCommonEvents();
});

// 스크롤 시 헤더 효과
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll > 10) {
        header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.06)';
    } else {
        header.style.boxShadow = 'none';
    }
});