const $userIconLink = document.querySelector("#userIconLink");
const $userIcon = document.querySelector("#userIcon");
const req = new Promise((resolve, reject) => {
  const requestObj = new XMLHttpRequest();
  requestObj.open("GET", "https://openmarket.weniv.co.kr/products/");
  requestObj.onreadystatechange = () => {
    if (requestObj.readyState === 4 && requestObj.status === 200) {
      const result = requestObj.responseText;
      resolve(result);
    } else if (requestObj.readyState === 4 && requestObj.status !== 200) {
      reject("실패했다");
    }
  };
  requestObj.send();
});

function drawProduct(data) {
  const $productLists = document.querySelector(".productLists");
  const $productLink = document.createElement("a");
  $productLink.className = "productLink";
  const $productDiv = document.createElement("div");
  $productDiv.className = "productItem";
  const $productImage = document.createElement("Img");
  $productImage.className = "productImage";
  const $storeName = document.createElement("p");
  $storeName.className = "storeName";
  const $productName = document.createElement("p");
  $productName.className = "productName";
  const $price = document.createElement("p");
  $price.className = "price";

  $productImage.src = data.image;
  console.log($productImage);
  $storeName.textContent = data.store_name;
  $productName.textContent = data.product_name;
  $price.textContent = data.price;
  $productImage.style.width = "380px";
  $productImage.style.height = "380px";
  $productImage.style.objectFit = "fill";
  let formattedPrice;
  if (data.price && !isNaN(data.price)) {
    formattedPrice = Number(data.price).toLocaleString("ko-KR");
  } else {
    formattedPrice = "가격 정보 없음";
  }
  $price.textContent = formattedPrice;
  $productLink.setAttribute(
    "href",
    "/ProductDetails.html?product_id=" + data.product_id
  );

  $productLists.append($productDiv);
  $productDiv.append($productLink);
  $productLink.append($productImage, $storeName, $productName, $price);
}

req
  .then((response) => {
    const json = JSON.parse(response);
    if (json.results && Array.isArray(json.results)) {
      json.results.forEach(drawProduct);
    } else if (Array.isArray(json)) {
      json.forEach(drawProduct);
    } else {
      console.error("예상치 못한 API 응답 구조:", json);
    }
  })
  .catch((error) => {
    console.error("API 요청 실패:", error);
  });
if (localStorage.getItem("user_type") && localStorage.getItem("token")) {
  $userIconLink.innerHTML = "";
  $userIcon.src = "./src/icon-user.svg";
  $userIconLink.appendChild($userIcon);
  const textElement = document.createElement("span");
  textElement.textContent = "마이페이지";
  $userIconLink.appendChild(textElement);
  $userIconLink.style.display = "flex";
  $userIconLink.style.flexDirection = "column";
  $userIconLink.style.alignItems = "center";
  $userIconLink.addEventListener("click", function (event) {
    event.preventDefault();
  });

  // 호버시 마이페이지/로그아웃 뜨기
  const $hoverMyPage = document.createElement("a");
  const $hoverLogOut = document.createElement("a");
  const tooltip = document.createElement("div");

  // a 태그 내용과 속성 설정
  $hoverMyPage.textContent = "마이페이지";
  $hoverMyPage.href = "#";
  $hoverLogOut.textContent = "로그아웃";
  $hoverLogOut.href = "#";

  function showTooltip() {
    const rect = $userIconLink.getBoundingClientRect();
    tooltip.style.display = "block";
    tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
    tooltip.style.left = `${rect.left + window.scrollX}px`;
  }

  // 툴팁 숨기기 함수
  function hideTooltip() {
    tooltip.style.display = "none";
  }

  function hideTooltipWithDelay() {
    setTimeout(() => {
      if (!tooltip.matches(":hover")) {
        hideTooltip();
      }
    }, 100);
  }
  // 로그아웃 시
  $hoverLogOut.addEventListener("click", () => {
    localStorage.clear();
    textElement.textContent = "로그인";
    document.body.removeChild(tooltip);

    // 사용자 아이콘 링크 초기화
    $userIconLink.innerHTML = "";
    const initialIcon = document.createElement("img");
    initialIcon.src = "./src/icon-user.svg";
    initialIcon.id = "userIcon";

    const initialText = document.createElement("span");
    initialText.textContent = "로그인";

    $userIconLink.appendChild(initialIcon);
    $userIconLink.appendChild(initialText);

    // 스타일 초기화
    $userIconLink.style = "";

    // 이벤트 리스너 제거
    $userIconLink.removeEventListener("mouseenter", showTooltip);
    $userIconLink.removeEventListener("mouseleave", hideTooltipWithDelay);
  });

  // 툴팁에 a 태그 추가
  tooltip.appendChild($hoverMyPage);
  tooltip.appendChild($hoverLogOut);

  // 툴팁 스타일 설정
  tooltip.style.cssText = `
    position: absolute;
    display: none;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 10px;
    z-index: 100;
    
  `;

  // a 태그 스타일 설정
  const linkStyle = `
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: #333;
    text-align: center;
    font-family: "SpoqaHanSansNeo-Regular"
  `;
  $hoverMyPage.style.padding = "10px 17px 10px 17px";
  $hoverMyPage.style.padding = "10px 25px 10px 25px";

  $hoverMyPage.style.cssText = linkStyle;
  $hoverLogOut.style.cssText = linkStyle;

  // 툴팁에 삼각형 모양 추가
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
  tooltip.insertBefore(arrow, tooltip.firstChild);

  // 툴팁을 body에 추가
  document.body.appendChild(tooltip);
  tooltip.style.zIndex = "1000";

  // 마우스 진입 이벤트
  $userIconLink.addEventListener("mouseenter", (e) => {
    const rect = $userIconLink.getBoundingClientRect();
    tooltip.style.display = "block";
    tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
    tooltip.style.left = `${rect.left + window.scrollX}px`;
  });

  function hideTooltip() {
    tooltip.style.display = "none";
  }

  // 마우스 진입 이벤트
  $userIconLink.addEventListener("mouseenter", showTooltip);

  // 마우스 이탈 이벤트 (타이머 사용)
  $userIconLink.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!tooltip.matches(":hover")) {
        hideTooltip();
      }
    }, 100);
  });

  // 툴팁에서 마우스가 벗어났을 때 이벤트
  tooltip.addEventListener("mouseleave", hideTooltip);
}
$userIconLink.addEventListener("click", () => {
  // 로그인 버튼 클릭시 로그인 페이지로 이동
  location.href = "./signIn.html";
});
