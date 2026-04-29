const screens = document.querySelectorAll(".screen");
const nav = document.getElementById("bottomNav");
const navBtns = document.querySelectorAll(".nav-btn");

let onboardingTimer1 = null;
let onboardingTimer2 = null;
let onboardingTimer3 = null;

function clearOnboardingFlow() {
  clearTimeout(onboardingTimer1);
  clearTimeout(onboardingTimer2);
  clearTimeout(onboardingTimer3);
}

function showPage(pageId) {
  const targetPage = document.getElementById(pageId);
  if (!targetPage) return;

  screens.forEach(screen => {
    screen.classList.remove("active");
    screen.style.display = "none";
  });

  targetPage.classList.add("active");
  targetPage.style.display =
    targetPage.classList.contains("onboarding") ? "flex" : "block";

  if (
    ["splash", "onboarding1", "onboarding2", "onboarding3", "login"].includes(pageId)
  ) {
    nav.classList.remove("show");
  } else {
    nav.classList.add("show");
    clearOnboardingFlow();
  }

  navBtns.forEach(btn => {
    btn.classList.remove("on");

    if (btn.dataset.page === pageId) btn.classList.add("on");

    if (pageId === "record3" && btn.dataset.page === "record1") {
      btn.classList.add("on");
    }

    if (["communityDetail", "write"].includes(pageId)) {
      if (btn.dataset.page === "community") {
        btn.classList.add("on");
      }
    }
  });
}

// 스플래쉬 시작
window.addEventListener("load", () => {
  showPage("splash");

  setTimeout(() => {
    showPage("onboarding1");
  }, 2000);
});

// 시작하기 버튼 → 로그인
document.addEventListener("click", e => {
  const btn = e.target.closest(".next-onboarding");
  if (!btn) return;

  e.preventDefault();
  clearOnboardingFlow();
  showPage("login");
});

// 로그인
document.getElementById("loginBtn")?.addEventListener("click", () => {
  const inputs = document.querySelectorAll(".login input");
  const id = inputs[0].value.trim();
  const pw = inputs[1].value.trim();

  if (!id || !pw) {
    alert("아이디와 비밀번호를 입력해주세요.");
    return;
  }

  showPage("home");
});

// 네비 이동
navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const page = btn.dataset.page;

    if (["calendar", "profile"].includes(page)) return;

    showPage(page);
  });
});

// 뒤로가기
document.querySelectorAll(".back").forEach(btn => {
  btn.addEventListener("click", () => {
    showPage(btn.dataset.page);
  });
});

// 기록 이동
document.getElementById("goRecordBtn")?.addEventListener("click", () => {
  showPage("record3");
});

document.getElementById("goRecord2")?.addEventListener("click", () => {
  showPage("record3");
});

// 감정 선택
document.querySelectorAll(".record-mood").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".record-mood").forEach(b => b.classList.remove("on"));
    btn.classList.add("on");
  });
});

// 커뮤니티 클릭 (에러 수정 핵심 부분)
document.addEventListener("click", e => {
  const card = e.target.closest(".community-card");
  if (!card) return;

  const postImgEl = card.querySelector(".community-thumb img");

  document.querySelector("#communityDetail .detail-main-img img").src =
    postImgEl ? postImgEl.src : "";

  document.querySelector("#communityDetail .detail-title").textContent =
    card.querySelector(".community-card-title")?.textContent || "";

  document.querySelector("#communityDetail .detail-desc").textContent =
    card.querySelector(".community-desc")?.textContent || "";

  showPage("communityDetail");
});

// 글쓰기 이동
document.getElementById("writeBtn")?.addEventListener("click", () => {
  showPage("write");
});