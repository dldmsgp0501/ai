// 장바구니 데이터
const cartItems = [
    {
        id: 1,
        name: '소프트 니트 카디건',
        price: 49000,
        quantity: 1,
        size: 'Free',
        color: '아이보리',
        image: 'https://images.unsplash.com/photo-1676083140193-84c3414fb78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    },
    {
        id: 2,
        name: '베이직 화이트 셔츠',
        price: 35000,
        quantity: 2,
        size: 'M',
        color: '화이트',
        image: 'https://images.unsplash.com/photo-1676083140058-4cbfc100b646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    },
    {
        id: 3,
        name: '플리츠 미디 스커트',
        price: 45000,
        quantity: 1,
        size: 'S',
        color: '베이지',
        image: 'https://images.unsplash.com/photo-1755051661299-5d27d720f131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
    }
];

// 숫자를 천단위 콤마로 포맷
function formatPrice(price) {
    return price.toLocaleString('ko-KR');
}

// 장바구니 아이템 카드 생성
function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.id = item.id;
    
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
            <div>
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-option">${item.color} / ${item.size}</p>
            </div>
            <div class="cart-item-bottom">
                <p class="cart-item-price">${formatPrice(item.price * item.quantity)}원</p>
                <div class="quantity-control">
                    <button class="quantity-btn decrease" data-id="${item.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" x2="19" y1="12" y2="12"></line>
                        </svg>
                    </button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" x2="12" y1="5" y2="19"></line>
                            <line x1="5" x2="19" y1="12" y2="12"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <button class="remove-btn" data-id="${item.id}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" x2="6" y1="6" y2="18"></line>
                <line x1="6" x2="18" y1="6" y2="18"></line>
            </svg>
        </button>
    `;
    
    return cartItem;
}

// 장바구니 렌더링
function renderCart() {
    const container = document.getElementById('cartItems');
    container.innerHTML = '';
    
    cartItems.forEach(item => {
        container.appendChild(createCartItem(item));
    });
    
    updateOrderSummary();
}

// 주문 요약 업데이트
function updateOrderSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal) + '원';
    document.getElementById('total').textContent = formatPrice(subtotal) + '원';
    
    // 페이지 제목 업데이트
    const subtitle = document.querySelector('.page-subtitle');
    if (subtitle) {
        subtitle.textContent = `총 ${cartItems.length}개의 상품`;
    }
}

// 수량 증가
function increaseQuantity(itemId) {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
        item.quantity++;
        renderCart();
    }
}

// 수량 감소
function decreaseQuantity(itemId) {
    const item = cartItems.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity--;
        renderCart();
    }
}

// 아이템 제거
function removeItem(itemId) {
    const index = cartItems.findIndex(i => i.id === itemId);
    if (index !== -1) {
        if (confirm('장바구니에서 삭제하시겠습니까?')) {
            cartItems.splice(index, 1);
            renderCart();
        }
    }
}

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    // 장바구니 렌더링
    renderCart();
    
    // 수량 증가/감소 버튼
    document.addEventListener('click', (e) => {
        const increaseBtn = e.target.closest('.quantity-btn.increase');
        const decreaseBtn = e.target.closest('.quantity-btn.decrease');
        const removeBtn = e.target.closest('.remove-btn');
        
        if (increaseBtn) {
            const itemId = parseInt(increaseBtn.dataset.id);
            increaseQuantity(itemId);
            
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        }
        
        if (decreaseBtn) {
            const itemId = parseInt(decreaseBtn.dataset.id);
            decreaseQuantity(itemId);
            
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        }
        
        if (removeBtn) {
            const itemId = parseInt(removeBtn.dataset.id);
            removeItem(itemId);
        }
    });
    
    // 주문하기 버튼
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('주문 페이지로 이동합니다.');
        });
    }
});
