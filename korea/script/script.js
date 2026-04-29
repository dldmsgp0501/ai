document.addEventListener('DOMContentLoaded', function () {
      const header = document.querySelector('header');
      const menuBtn = document.querySelector('.menu-btn');
      const tabMenuPanel = document.querySelector('.tab-menu-panel');
      const tabMenuClose = document.querySelector('.tab-menu-close');
      const tabMenuItems = document.querySelectorAll('.tab-menu-item:not(.no-depth) > button');

      if(menuBtn && tabMenuPanel){
        menuBtn.addEventListener('click', function(){
          tabMenuPanel.classList.add('active');
        });
      }

      if(tabMenuClose && tabMenuPanel){
        tabMenuClose.addEventListener('click', function(){
          tabMenuPanel.classList.remove('active');
        });
      }

      // 바깥 영역 클릭시 닫기
      tabMenuPanel.addEventListener('click', function(e){
        if(e.target === tabMenuPanel){
          tabMenuPanel.classList.remove('active');
        }
      });

      tabMenuItems.forEach(function(button){
        button.addEventListener('click', function(){
          const item = button.closest('.tab-menu-item');
          const isOpen = item.classList.contains('open');

          document.querySelectorAll('.tab-menu-item').forEach(function(el){
            el.classList.remove('open');
            const icon = el.querySelector('button span');
            if(icon) icon.textContent = '';
          });

          if(!isOpen){
            item.classList.add('open');
            const icon = button.querySelector('span');
            if(icon) icon.textContent = '';
          }
        });
      });
      const menuItems = document.querySelectorAll('.gnb > li');
      const subMenu = document.querySelector('.sub-menu');
      const subMenuTitle = document.querySelector('.sub-menu-title');
      const subMenuList = document.querySelector('.sub-menu-list');

      const subMenuData = {
        intro: {
          title: '협회소개',
          items: ['협회소개', '인사말', '연혁', '조직도', '오시는길']
        },
        pr: {
          title: '홍보광장',
          items: ['공지사항', '언론보도', '갤러리', '영상']
        },
        azalea: {
          title: '아젤리아패션그룹',
          items: ['아젤리아 드레스', '아젤리아 궁중한복', '아젤리아 키즈', '아젤리아 패션쇼 & 어워즈', '아젤리아 예술단']
        },
        global: {
          title: '국제교류체험관',
          items: ['아젤리아 메거진', '아젤리아 TV 방송', '아젤리아 엔터', '국내 · 국제교류 기획 공연 이벤트', '국제교류한복체험', '전통한문화포럼']
        },
        welfare: {
          title: '나눔과기쁨 & 복지관',
          items: ['(사) 나눔과 기쁨']
        },
        partner: {
          title: '협력기관',
          items: ['협력기관 정보']
        }
      };

      function renderSubMenu(key){
        const data = subMenuData[key];
        if(!data) return;

        subMenuTitle.textContent = data.title;
        subMenuList.innerHTML = data.items.map(function(item){
          return '<li><a href="#">' + item + '</a></li>';
        }).join('');
      }

      let closeTimer;

      function openSubMenu(key){
        clearTimeout(closeTimer);
        renderSubMenu(key);
        header.classList.add('sub-open');
      }

      function closeSubMenuDelay(){
        clearTimeout(closeTimer);
        closeTimer = setTimeout(function(){
          if(!subMenu.matches(':hover') && !document.querySelector('.gnb > li:hover')){
            header.classList.remove('sub-open');
          }
        }, 150);
      }

      menuItems.forEach(function(menu){
        menu.addEventListener('mouseenter', function(){
          openSubMenu(menu.dataset.menu);
        });

        menu.addEventListener('mouseleave', closeSubMenuDelay);
      });

      if(subMenu){
        subMenu.addEventListener('mouseenter', function(){
          clearTimeout(closeTimer);
          header.classList.add('sub-open');
        });

        subMenu.addEventListener('mouseleave', function(){
          header.classList.remove('sub-open');
        });
      }

      const slideCard = document.querySelector('.slide-card');
      /* 🔥 배너 + 이너 + 썸네일 연동 */
const slideData = [
  {
    num:'./images/inner_Number1.svg',
    title:'한복드레스',
    sub:'태극문양디자인등록',
    desc:'디자인등록특허 제30-1087062호',
    thumb:'./images/banner.jpg'
  },
  {
    num:'./images/inner_Number2.svg',
    title:'궁중한복',
    sub:'전통의 미',
    desc:'왕실 의상 재현 프로젝트',
    thumb:'./images/banner2.jpg'
  },
  {
    num:'./images/inner_Number3.svg',
    title:'한복패션',
    sub:'현대적 재해석',
    desc:'글로벌 패션쇼 컬렉션',
    thumb:'./images/banner3.jpg'
  }
];

const slideNum = document.querySelector('.slide-num');
const slideTitle = document.querySelector('.slide-info h3');
const slideSub = document.querySelector('.slide-info span');
const slideDesc = document.querySelector('.slide-info p');
const slideThumbImg = document.querySelector('.slide-thumb img');

let currentIndex = 0;
      const heroSlides = document.querySelectorAll('.hero-slide');

      function updateSlideContent(index){
        const realIndex = index % slideData.length;
        const data = slideData[realIndex];
        if(!data) return;

        heroSlides.forEach(function(slide, slideIndex){
          slide.classList.toggle('active', slideIndex === realIndex);
        });

        slideNum.style.backgroundImage = `url(${data.num})`;
        slideTitle.textContent = data.title;
        slideSub.textContent = data.sub;
        slideDesc.textContent = data.desc;
        slideThumbImg.src = data.thumb;
      }

      setInterval(function(){
        currentIndex = (currentIndex + 1) % slideData.length;
        updateSlideContent(currentIndex);
      }, 3000);

      updateSlideContent(0);

      const slideMenuLines = document.querySelectorAll('.slide-menu-btn span');

      slideMenuLines.forEach(function(line){
        line.addEventListener('click', function(e){
          e.stopPropagation();

          slideMenuLines.forEach(function(item){
            item.classList.remove('active');
          });
          line.classList.add('active');

          if(line.dataset.index === '2'){
            slideCard.classList.add('show-thumb');
          } else {
            slideCard.classList.remove('show-thumb');
          }
        });
      });

      const tabButtons = document.querySelectorAll('.tab-btns button');
      const cards = document.querySelectorAll('.notice-card');

      tabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
          tabButtons.forEach(function (btn) {
            btn.classList.remove('active');
          });
          button.classList.add('active');

          const type = button.textContent.trim();

          cards.forEach(function (card) {
            if (type === '전체') {
              card.style.display = '';
            } else if (type === '공지사항') {
              card.style.display = card.dataset.type === 'notice' ? '' : 'none';
            } else if (type === '뉴스') {
              card.style.display = card.dataset.type === 'news' ? '' : 'none';
            }
          });
        });
      });

      cards.forEach(function (card) {
        card.addEventListener('click', function () {
          if(card.classList.contains('active')){
            card.classList.remove('active');
            return;
          }

          cards.forEach(function (item) {
            item.classList.remove('active');
          });
          card.classList.add('active');
        });
      });

      const galleryList = document.querySelector('.gallery-list');
      const galleryItems = document.querySelectorAll('.gallery-item');

      if(galleryList){
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;
        let isDragging = false;

        galleryList.addEventListener('mousedown', function(e){
          isDown = true;
          isDragging = false;
          galleryList.classList.add('dragging');
          startX = e.pageX - galleryList.offsetLeft;
          scrollLeft = galleryList.scrollLeft;
        });

        galleryList.addEventListener('mouseleave', function(){
          isDown = false;
          galleryList.classList.remove('dragging');
        });

        galleryList.addEventListener('mouseup', function(){
          isDown = false;
          galleryList.classList.remove('dragging');
        });

        galleryList.addEventListener('mousemove', function(e){
          if(!isDown) return;
          e.preventDefault();
          const x = e.pageX - galleryList.offsetLeft;
          const walk = x - startX;

          if(Math.abs(walk) > 5){
            isDragging = true;
          }

          galleryList.scrollLeft = scrollLeft - walk;
        });

        galleryItems.forEach(function(item){
          item.addEventListener('click', function(e){
            if(isDragging){
              e.preventDefault();
              return;
            }

            if(item.classList.contains('active')){
              item.classList.remove('active');
              return;
            }

            galleryItems.forEach(function(el){
              el.classList.remove('active');
            });
            item.classList.add('active');
          });
        });
      }
    });