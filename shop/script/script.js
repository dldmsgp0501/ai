// 상품 데이터
const products = {
    recommended: [
        {
            id: 1,
            name: '소프트 니트 카디건',
            price: 49000,
            originalPrice: 89000,
            discount: 45,
            image: 'https://images.unsplash.com/photo-1676083140193-84c3414fb78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 2,
            name: '베이직 화이트 셔츠',
            price: 35000,
            originalPrice: 59000,
            discount: 40,
            image: 'https://images.unsplash.com/photo-1676083140058-4cbfc100b646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 3,
            name: '빈티지 데님 팬츠',
            price: 62000,
            originalPrice: 98000,
            discount: 37,
            image: 'https://images.unsplash.com/photo-1663766976204-ead9fb54d388?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: true
        },
        {
            id: 4,
            name: '플리츠 미디 스커트',
            price: 45000,
            originalPrice: 79000,
            discount: 43,
            image: 'https://images.unsplash.com/photo-1755051661299-5d27d720f131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 5,
            name: '오버핏 트렌치 코트',
            price: 129000,
            originalPrice: 189000,
            discount: 32,
            image: 'https://images.unsplash.com/photo-1762605135012-56a59a059e60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 6,
            name: '실크 블라우스',
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
            price: 159000,
            originalPrice: 249000,
            discount: 36,
            image: 'https://images.unsplash.com/photo-1698598078883-952cb7521b01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: true
        },
        {
            id: 8,
            name: '캐시미어 터틀넥',
            price: 89000,
            originalPrice: 139000,
            discount: 36,
            image: 'https://images.unsplash.com/photo-1674154082514-44b308d0209e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 9,
            name: '하이웨이스트 슬랙스',
            price: 58000,
            originalPrice: 92000,
            discount: 37,
            image: 'https://images.unsplash.com/photo-1673637082482-55952ee63ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 10,
            name: '레더 미니백',
            price: 79000,
            originalPrice: 129000,
            discount: 39,
            image: 'https://images.unsplash.com/photo-1743642565836-587f43dbc374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        },
        {
            id: 11,
            name: '플라워 패턴 원피스',
            price: 72000,
            originalPrice: 119000,
            discount: 39,
            image: 'https://images.unsplash.com/photo-1758542259093-26a591f7efaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: true
        },
        {
            id: 12,
            name: '앵클 첼시 부츠',
            price: 95000,
            originalPrice: 149000,
            discount: 36,
            image: 'https://images.unsplash.com/photo-1524275406383-49f669cf763a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
            liked: false
        }
    ]
};

// 숫자를 천단위 콤마로 포맷
function formatPrice(price) {
    return price.toLocaleString('ko-KR');
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
            <p class="product-name">${product.name}</p>
            <div class="product-price-wrapper">
                <span class="product-discount">${product.discount}%</span>
                <span class="product-price">${formatPrice(product.price)}원</span>
            </div>
            <p class="product-original-price">${formatPrice(product.originalPrice)}원</p>
        </div>
    `;
    
    return card;
}

// 상품 렌더링
function renderProducts() {
    const recommendedContainer = document.getElementById('recommendedProducts');
    const bestContainer = document.getElementById('bestProducts');
    
    // 추천 상품 렌더링
    products.recommended.forEach(product => {
        recommendedContainer.appendChild(createProductCard(product));
    });
    
    // 베스트 상품 렌더링
    products.best.forEach(product => {
        bestContainer.appendChild(createProductCard(product));
    });
}

// 찜하기 토글
function toggleLike(productId) {
    // 추천 상품에서 찾기
    let product = products.recommended.find(p => p.id === productId);
    
    // 베스트 상품에서 찾기
    if (!product) {
        product = products.best.find(p => p.id === productId);
    }
    
    if (product) {
        product.liked = !product.liked;
    }
}

// 하단 네비게이션 활성화
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

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    // 상품 렌더링
    renderProducts();
    
    // 찜하기 버튼 클릭 이벤트
    document.addEventListener('click', (e) => {
        const likeBtn = e.target.closest('.like-btn');
        if (likeBtn) {
            const productId = parseInt(likeBtn.dataset.id);
            toggleLike(productId);
            likeBtn.classList.toggle('liked');
            
            // 햅틱 피드백 (지원하는 경우)
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        }
    });
    
    // 하단 네비게이션 클릭 이벤트
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            setActiveNav(index);
            
            // 햅틱 피드백
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        });
    });
    
    // 검색 버튼 클릭
    document.querySelector('.header-icons .icon-btn:first-child').addEventListener('click', () => {
        alert('검색 기능은 준비 중입니다.');
    });
    
    // 장바구니 버튼 클릭
    document.querySelector('.header-icons .icon-btn:nth-child(2)').addEventListener('click', () => {
        alert('장바구니로 이동합니다.');
    });
    
    // 알림 버튼 클릭
    document.querySelector('.header-icons .icon-btn:nth-child(3)').addEventListener('click', () => {
        alert('새로운 알림이 없습니다.');
    });
});

// 스크롤 시 헤더 그림자 효과
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 10) {
        header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.06)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});
