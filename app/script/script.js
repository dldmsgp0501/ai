document.addEventListener("DOMContentLoaded", function () {
  const screens = document.querySelectorAll(".screen");
  const nav = document.getElementById("bottomNav");
  const navBtns = document.querySelectorAll(".nav-btn");

  let onboardingTimer1 = null;
  let onboardingTimer2 = null;
  let onboardingTimer3 = null;

  let selectedRecordImage = "./images/recode2-1.jpg";
  let selectedWriteImage = "./images/#";
  let imageTarget = "record";

  function clearOnboardingFlow() {
    clearTimeout(onboardingTimer1);
    clearTimeout(onboardingTimer2);
    clearTimeout(onboardingTimer3);
    onboardingTimer1 = null;
    onboardingTimer2 = null;
    onboardingTimer3 = null;
  }

  function showPage(pageId) {
    const targetPage = document.getElementById(pageId);
    if (!targetPage) return;

    screens.forEach(function (screen) {
      screen.classList.remove("active");
      screen.style.display = "none";
    });

    targetPage.classList.add("active");
    targetPage.style.display = targetPage.classList.contains("onboarding") ? "flex" : "block";

    if (["splash", "onboarding1", "onboarding2", "onboarding3", "login"].includes(pageId)) {
      nav.classList.remove("show");
    } else {
      nav.classList.add("show");
      clearOnboardingFlow();
    }

    navBtns.forEach(function (btn) {
      btn.classList.remove("on");

      if (btn.dataset.page === pageId) {
        btn.classList.add("on");
      }

      if (pageId === "record3" && btn.dataset.page === "record1") {
        btn.classList.add("on");
      }

      if ((pageId === "communityDetail" || pageId === "write") && btn.dataset.page === "community") {
        btn.classList.add("on");
      }
    });
  }

  function startOnboardingFlow() {
    clearOnboardingFlow();
    showPage("onboarding1");

    onboardingTimer1 = setTimeout(function () {
      showPage("onboarding2");
    }, 3000);

    onboardingTimer2 = setTimeout(function () {
      showPage("onboarding3");
    }, 6000);

    onboardingTimer3 = setTimeout(function () {
      showPage("login");
    }, 9000);
  }

  showPage("splash");

  setTimeout(function () {
    startOnboardingFlow();
  }, 2000);

  document.addEventListener("click", function (e) {
    const onboardingBtn = e.target.closest(".next-onboarding");
    if (!onboardingBtn) return;

    e.preventDefault();
    clearOnboardingFlow();
    showPage("login");
  });

  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      const id = document.querySelector(".login input[type='text']").value.trim();
      const pw = document.querySelector(".login input[type='password']").value.trim();

      if (!id || !pw) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
        return;
      }

      clearOnboardingFlow();
      showPage("home");
    });
  }

  navBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const page = btn.dataset.page;

      if (page === "calendar" || page === "profile") {
        return;
      }

      clearOnboardingFlow();
      showPage(page);
    });
  });

  document.addEventListener("click", function (e) {
    const backBtn = e.target.closest(".back");
    if (!backBtn) return;

    const page = backBtn.dataset.page;

    if (page) {
      clearOnboardingFlow();
      showPage(page);
    }
  });

  const mainBackBtn = document.querySelector("#home .home-back");

  if (mainBackBtn) {
    mainBackBtn.addEventListener("click", function () {
      clearOnboardingFlow();
      showPage("login");
    });
  }

  const goRecordBtn = document.getElementById("goRecordBtn");
  const goRecord2 = document.getElementById("goRecord2");

  if (goRecordBtn) {
    goRecordBtn.addEventListener("click", function () {
      showPage("record3");
    });
  }

  if (goRecord2) {
    goRecord2.addEventListener("click", function () {
      showPage("record3");
    });
  }

  // 이미지 업로드 팝업 + 실제 파일 업로드 + 카메라
  const imageUploadPopup = document.getElementById("imageUploadPopup");
  const recordImageUploadBox = document.getElementById("recordImageUploadBox");
  const recordPreviewImg = document.getElementById("recordPreviewImg");
  const selectPhotoBtn = document.getElementById("selectPhotoBtn");
  const cameraBtn = document.querySelector("#imageUploadPopup button:nth-child(2)");

  const writeImageUploadBox = document.getElementById("writeImageUploadBox");
  const writePreviewImg = document.getElementById("writePreviewImg");

  const imageFileInput = document.getElementById("imageFileInput");
  const cameraFileInput = document.getElementById("cameraFileInput");

  function applySelectedImage(file) {
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    if (imageTarget === "record") {
      selectedRecordImage = imageUrl;

      if (recordPreviewImg && recordImageUploadBox) {
        recordPreviewImg.src = selectedRecordImage;
        recordImageUploadBox.classList.add("has-image");
      }
    }

    if (imageTarget === "write") {
      selectedWriteImage = imageUrl;

      if (writePreviewImg && writeImageUploadBox) {
        writePreviewImg.src = selectedWriteImage;
        writeImageUploadBox.classList.add("has-image");
      }
    }
  }

  if (recordImageUploadBox && imageUploadPopup) {
    recordImageUploadBox.addEventListener("click", function (e) {
      e.stopPropagation();
      imageTarget = "record";
      imageUploadPopup.classList.add("show");
    });
  }

  if (writeImageUploadBox && imageUploadPopup) {
    writeImageUploadBox.addEventListener("click", function (e) {
      e.stopPropagation();
      imageTarget = "write";
      imageUploadPopup.classList.add("show");
    });
  }

  if (imageUploadPopup) {
    imageUploadPopup.addEventListener("click", function (e) {
      if (e.target === imageUploadPopup) {
        imageUploadPopup.classList.remove("show");
      }
    });
  }

  if (selectPhotoBtn && imageFileInput && imageUploadPopup) {
    selectPhotoBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      imageUploadPopup.classList.remove("show");
      imageFileInput.click();
    });
  }

  if (cameraBtn && cameraFileInput && imageUploadPopup) {
    cameraBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      imageUploadPopup.classList.remove("show");
      cameraFileInput.click();
    });
  }

  if (imageFileInput) {
    imageFileInput.addEventListener("change", function () {
      applySelectedImage(imageFileInput.files[0]);
      imageFileInput.value = "";
    });
  }

  if (cameraFileInput) {
    cameraFileInput.addEventListener("change", function () {
      applySelectedImage(cameraFileInput.files[0]);
      cameraFileInput.value = "";
    });
  }

  // 감정 선택
  document.addEventListener("click", function (e) {
    const moodBtn = e.target.closest(".record-mood");
    if (!moodBtn) return;

    document.querySelectorAll(".record-mood").forEach(function (item) {
      item.classList.remove("on");
    });

    moodBtn.classList.add("on");
  });

  // 기록 업로드 → 기록1/메인에 반영
  const recordNextBtn = document.getElementById("recordNextBtn");

  if (recordNextBtn) {
    recordNextBtn.addEventListener("click", function () {
      const selectedMood = document.querySelector(".record-mood.on span");
      const textarea = document.querySelector(".record-textarea");
      const recordText = textarea.value.trim() || "오늘 하루를 기록했어요.";
      const moodEmoji = selectedMood ? selectedMood.textContent : "😊";

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const date = String(now.getDate()).padStart(2, "0");
      const hour = now.getHours();
      const minute = String(now.getMinutes()).padStart(2, "0");
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      const dateText = `${year}-${month}-${date} | ${ampm} ${displayHour}:${minute}`;

      const newCard = `
        <article class="my-record-card">
          <div class="thumb">
            <img src="${selectedRecordImage}" alt="기록 이미지">
          </div>
          <div>
            <h3>오늘의 감정: <span>${moodEmoji}</span></h3>
            <p>${recordText}<small>${dateText}</small></p>
          </div>
          <span class="send-icon"><img src="./images/mynaui_send-solid.svg" alt="공유"></span>
        </article>
      `;

      const recordTitle = document.querySelector("#record1 .home-section-title");

      if (recordTitle) {
        recordTitle.insertAdjacentHTML("afterend", newCard);
      }

      const homeRecordCard = document.querySelector("#home .my-record-card");

      if (homeRecordCard) {
        homeRecordCard.outerHTML = newCard;
      }

      textarea.value = "";

      if (recordPreviewImg && recordImageUploadBox) {
        recordPreviewImg.src = "./images/#";
        recordImageUploadBox.classList.remove("has-image");
      }

      selectedRecordImage = "./images/recode2-1.jpg";

      document.querySelectorAll(".record-mood").forEach(function (item) {
        item.classList.remove("on");
      });

      showPage("record1");
    });
  }

  // 커뮤니티 카드 클릭 → 상세
  document.addEventListener("click", function (e) {
    const card = e.target.closest("#community .community-card");
    if (!card) return;

    const profileImg = card.querySelector(".community-profile-img img")?.getAttribute("src") || "./images/community_user1.jpg";
    const nickname = card.querySelector(".community-profile span")?.textContent || "OneDay 사용자";
    const postImg = card.querySelector(".community-thumb img")?.getAttribute("src") || "./images/#";
    const mood = card.querySelector(".community-mood")?.textContent || "오늘의 감정: 😊";
    const title = card.querySelector(".community-card-title")?.textContent || "제목 없는 글";
    const desc = card.querySelector(".community-desc")?.textContent || "내용이 없습니다.";
    const date = card.querySelector(".community-date")?.textContent || "";
    const metaItems = card.querySelectorAll(".community-meta span");

    document.querySelector("#communityDetail .detail-profile-img img").src = profileImg;
    document.querySelector("#communityDetail .detail-profile span").textContent = nickname;
    const detailMainImgBox = document.querySelector("#communityDetail .detail-main-img");
const detailMainImg = document.querySelector("#communityDetail .detail-main-img img");

if (postImg && postImg !== "./images/#") {
  detailMainImg.src = postImg;
  detailMainImgBox.style.display = "block";
} else {
  detailMainImg.src = "";
  detailMainImgBox.style.display = "none";
}
    document.querySelector("#communityDetail .detail-mood").textContent = mood;
    document.querySelector("#communityDetail .detail-title").textContent = title;
    document.querySelector("#communityDetail .detail-desc").textContent = desc;
    document.querySelector("#communityDetail .detail-date").textContent = date;

    const detailMetaItems = document.querySelectorAll("#communityDetail .detail-meta span");

    metaItems.forEach(function (item, index) {
      const number = item.textContent.trim();

      if (detailMetaItems[index]) {
        detailMetaItems[index].lastChild.textContent = number;
      }
    });

    showPage("communityDetail");
  });

  // 글쓰기 이동
  const writeBtn = document.getElementById("writeBtn");

  if (writeBtn) {
    writeBtn.addEventListener("click", function () {
      showPage("write");
    });
  }

  // 글 업로드 → 커뮤니티 상단 추가
  const writeUploadBtn = document.getElementById("writeUploadBtn");

  if (writeUploadBtn) {
    writeUploadBtn.addEventListener("click", function () {
      const titleInput = document.querySelector(".write-title-input");
      const contentArea = document.querySelector(".write-content-area");

      const title = titleInput.value.trim() || "제목 없는 글";
      const content = contentArea.value.trim() || "OneDay 유저들과 자유롭게 얘기해보세요.";

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const date = String(now.getDate()).padStart(2, "0");
      const hour = now.getHours();
      const minute = String(now.getMinutes()).padStart(2, "0");
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      const dateText = `${year}-${month}-${date} | ${ampm} ${displayHour}:${minute}`;

      const imageHTML =
        selectedWriteImage !== "./images/#"
          ? `<div class="community-thumb"><img src="${selectedWriteImage}" alt="커뮤니티 이미지"></div>`
          : "";

      const newPost = `
        <article class="community-card">
          <div class="community-profile">
            <div class="community-profile-img"><img src="./images/community_user1.jpg" alt="프로필"></div>
            <span>OneDay 사용자</span>
          </div>
          <div class="community-body">
            ${imageHTML}
            <div class="community-info">
              <p class="community-mood">오늘의 감정: 😊</p>
              <h3 class="community-card-title">${title}</h3>
              <p class="community-desc">${content}</p>
              <p class="community-date">${dateText}</p>
            </div>
          </div>
          <div class="community-meta">
            <span><img src="./images/icon-park-solid_like.png" alt="좋아요">0</span>
            <span><img src="./images/ri_message-2-fill.png" alt="댓글">0</span>
            <span><img src="./images/mdi_eye.png" alt="조회수">0</span>
          </div>
        </article>
      `;

      const list = document.querySelector(".community-post-list");

      if (list) {
        list.insertAdjacentHTML("afterbegin", newPost);
      }

      titleInput.value = "";
      contentArea.value = "";

      selectedWriteImage = "./images/#";

      if (writePreviewImg && writeImageUploadBox) {
        writePreviewImg.src = "./images/#";
        writeImageUploadBox.classList.remove("has-image");
      }

      showPage("community");
    });
  }

  // 커뮤니티 이용규칙 팝업
  const ruleBtn = document.querySelector(".rule-btn");
  const rulesPopup = document.getElementById("rulesPopup");
  const rulesCloseBtn = document.getElementById("rulesCloseBtn");

  if (ruleBtn && rulesPopup) {
    ruleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      rulesPopup.classList.add("show");
    });
  }

  if (rulesCloseBtn && rulesPopup) {
    rulesCloseBtn.addEventListener("click", function () {
      rulesPopup.classList.remove("show");
    });
  }

  if (rulesPopup) {
    rulesPopup.addEventListener("click", function (e) {
      if (e.target === rulesPopup) {
        rulesPopup.classList.remove("show");
      }
    });
  }

  // 공유 팝업
  const sharePopup = document.getElementById("sharePopup");

  document.addEventListener("click", function (e) {
    const shareBtn = e.target.closest(".send-icon");

    if (shareBtn && sharePopup) {
      e.stopPropagation();
      sharePopup.classList.add("show");
    }
  });

  if (sharePopup) {
    sharePopup.addEventListener("click", function (e) {
      if (e.target === sharePopup) {
        sharePopup.classList.remove("show");
      }
    });
  }

  // 배너 슬라이드
  const slider = document.getElementById("bannerSlider");
  let slideIndex = 0;
  const slideCount = 3;
  const stayTime = 3000;
  const moveTime = 800;

  if (slider) {
    setInterval(function () {
      slideIndex++;
      slider.style.transition = `transform ${moveTime}ms ease`;
      slider.style.transform = `translateX(-${slideIndex * 100}%)`;

      if (slideIndex === slideCount) {
        setTimeout(function () {
          slider.style.transition = "none";
          slider.style.transform = "translateX(0)";
          slideIndex = 0;
        }, moveTime);
      }
    }, stayTime + moveTime);
  }
});