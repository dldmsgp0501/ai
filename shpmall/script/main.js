// 스크롤 등장 효과 줄 요소들
document.querySelectorAll(".box1, .box2, .box3, .box4, .box5, .main-visual").forEach(function(el){
  el.classList.add("reveal");
});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

reveals.forEach(function(el){
  observer.observe(el);
});

// 헤더 고정 + 맨 위로 버튼
const header = document.querySelector("header");
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function(){
  if(window.scrollY > 80){
    header.classList.add("header-fixed");
  } else {
    header.classList.remove("header-fixed");
  }

  if(window.scrollY > 450){
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

topBtn.addEventListener("click", function(){
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// 고객 추천 탭
const recommendTabs = document.querySelectorAll(".recommend-tabs .tab");

recommendTabs.forEach(function(tab){
  tab.addEventListener("click", function(){
    const target = tab.getAttribute("data-tab");

    recommendTabs.forEach(function(btn){
      btn.classList.remove("active");
    });

    document.querySelectorAll(".box3 .tab-panel").forEach(function(panel){
      panel.classList.remove("active");
    });

    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

// MD 추천 탭
const mdTabs = document.querySelectorAll(".md-tabs .md-tab");

mdTabs.forEach(function(tab){
  tab.addEventListener("click", function(){
    const target = tab.getAttribute("data-md");

    mdTabs.forEach(function(btn){
      btn.classList.remove("active");
    });

    document.querySelectorAll(".box5 .tab-panel").forEach(function(panel){
      panel.classList.remove("active");
    });

    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});