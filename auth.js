// auth.js

// 로그인 상태 확인
function checkLoginStatus() {
    const accessToken = localStorage.getItem("accessToken");
    const userType = localStorage.getItem("user_type");
    console.log("로그인 여부:", !!(localStorage.getItem("user_type") && 
    localStorage.getItem("accessToken") && 
    localStorage.getItem("refreshToken")));
    return {
        isLoggedIn: !!accessToken,
        userType: userType,
        token: accessToken
    };
}

// 로그아웃
function logout($userIconLink, $tooltip) {
    localStorage.clear();
    if ($tooltip) {
        document.body.removeChild($tooltip);
    }
    setupLoginUI($userIconLink);
}

// 로그인 UI 설정
function setupLoginUI($userIconLink) {
    $userIconLink.innerHTML = "";
    const initialIcon = document.createElement("img");
    initialIcon.src = "./src/icon-user.svg";
    initialIcon.id = "userIcon";

    const initialText = document.createElement("span");
    initialText.textContent = "로그인";

    $userIconLink.appendChild(initialIcon);
    $userIconLink.appendChild(initialText);
    $userIconLink.style = "";

    $userIconLink.addEventListener("click", () => {
        location.href = "./signIn.html";
    });
}

// 마이페이지 UI 설정
function setupMyPageUI($userIconLink, $userIcon) {
    $userIconLink.innerHTML = "";
    $userIcon.src = "./src/icon-user.svg";
    $userIconLink.appendChild($userIcon);
    
    const textElement = document.createElement("span");
    textElement.textContent = "마이페이지";
    $userIconLink.appendChild(textElement);
    
    $userIconLink.style.display = "flex";
    $userIconLink.style.flexDirection = "column";
    $userIconLink.style.alignItems = "center";

    // a 태그 동작 금지
    $userIconLink.addEventListener("click", (event) => {
        event.preventDefault();
    });

    setupTooltip($userIconLink);
}

// 툴팁 설정
function setupTooltip($userIconLink) {
    const $tooltip = document.createElement("div");
    const $clickMyPage = document.createElement("a");
    const $clickLogOut = document.createElement("a");

    $clickMyPage.className = "clickMyPage";
    $clickLogOut.className = "clickLogOut";
    $clickMyPage.textContent = "마이페이지";
    $clickLogOut.textContent = "로그아웃";
    $clickMyPage.href = "";
    $clickLogOut.href = "";

    setupTooltipStyles($tooltip, $clickMyPage, $clickLogOut);
    setupTooltipEvents($userIconLink, $tooltip);

    $clickLogOut.addEventListener("click", () => logout($userIconLink, $tooltip));

    $tooltip.appendChild($clickMyPage);
    $tooltip.appendChild($clickLogOut);
    document.body.appendChild($tooltip);
}

// 툴팁 스타일 설정
function setupTooltipStyles($tooltip, $clickMyPage, $clickLogOut) {
    $tooltip.style.cssText = `
        position: absolute;
        display: none;
        background-color: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        padding: 10px;
        z-index: 1000;
    `;

    const linkStyle = `
        display: block;
        padding: 5px 10px;
        text-decoration: none;
        color: #333;
        text-align: center;
        font-family: "SpoqaHanSansNeo-Regular";
    `;

    $clickMyPage.style.padding = "10px 17px 10px 17px";
    $clickMyPage.style.marginBottom = "8px";
    $clickLogOut.style.padding = "10px 25px 10px 25px";
    $clickMyPage.style.cssText = linkStyle;
    $clickLogOut.style.cssText = linkStyle;

    // 화살표 추가
    const arrow = document.createElement("div");
    arrow.style.cssText = `
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid white;
    `;
    $tooltip.insertBefore(arrow, $tooltip.firstChild);
}

// 툴팁 이벤트 설정
function setupTooltipEvents($userIconLink, $tooltip) {
    function showTooltip() {
        const rect = $userIconLink.getBoundingClientRect();
        $tooltip.style.display = "block";
        $tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
        $tooltip.style.left = `${rect.left + window.scrollX - 30}px`;
        document.addEventListener("click", documentClickHandler);
    }

    function hideTooltip() {
        $tooltip.style.display = "none";
        document.removeEventListener("click", documentClickHandler);
    }

    function documentClickHandler(event) {
        if (!$tooltip.contains(event.target) && !$userIconLink.contains(event.target)) {
            hideTooltip();
        }
    }

    $userIconLink.addEventListener("click", () => {
        if ($tooltip.style.display === "block") {
            hideTooltip();
        } else {
            showTooltip();
        }
    });
}

// 페이지 로드시 UI 초기화
function initializeUI($userIconLink, $userIcon, $shoppingCart) {
    const { isLoggedIn } = checkLoginStatus();
    
    if (isLoggedIn) {
        setupMyPageUI($userIconLink, $userIcon);
    } else {
        setupLoginUI($userIconLink);
        setupShoppingCartModal($shoppingCart);
    }
}

// 쇼핑카트 모달 설정
function setupShoppingCartModal($shoppingCart) {
    $shoppingCart.addEventListener("click", (e) => {
        e.preventDefault();
        showLoginModal();
    });
}

// 로그인 필요 모달 표시
function showLoginModal() {
    const $modalContainer = document.createElement("div");
    $modalContainer.className = "modalContainer";
    const $modalContent = document.createElement("div");
    $modalContent.className = "modalContent";
    const $modalText = document.createElement("p");
    $modalText.textContent = "로그인이 필요한 서비스입니다.";
    const $modalYes = document.createElement("button");
    $modalYes.textContent = "로그인하기";
    const $modalNo = document.createElement("button");
    $modalNo.textContent = "취소";

    $modalYes.addEventListener("click", () => {
        location.href = "./signIn.html";
    });
    
    $modalNo.addEventListener("click", () => {
        $modalContainer.remove();
    });

    $modalContent.append($modalText, $modalYes, $modalNo);
    $modalContainer.appendChild($modalContent);
    document.body.appendChild($modalContainer);
}