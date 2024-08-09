const $userIconLink = document.querySelector("#userIconLink");
const $userIcon = document.querySelector("#userIcon");

// 장바구니 목록 보기
const cartListGet = async function () {
  try {
    const res = await fetch("https://openmarket.weniv.co.kr/cart/", {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    const productIds = data.results.map((item) => item.product_id);
    console.log(data);
    drawProduct(data);
    console.log("Product IDs:", productIds);
    const fetchProductDetails = async (productIds) => {
      try {
        const fetchPromises = productIds.map((productId) =>
          fetch(`https://openmarket.weniv.co.kr/products/${productId}/`, {
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
        );

        const productsData = await Promise.all(fetchPromises);
        console.log(productsData);
        return productsData;
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    console.log(data.results.length);
    if (data.results.length < 1) {
      const $h2 = document.createElement("h2");
      const $p = document.createElement("p");
      $h2.textContent = "장바구니에 담긴 상품이 없습니다.";
      $p.textContent = "원하는 상품을 장바구니에 담아보세요!";
      document.body.appendChild($h2);
      $h2.appendChild($p);
    }
    return productId;
  } catch (error) {
    console.log(error);
  }
};

// 초기화 함수
async function init() {
  const productData = await cartListGet();
  // 데이터를 화면에 그려주기
  drawProduct(productData);
}

init();

function drawProduct(data) {
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
  $storeName.textContent = data.store_name;
  $productName.textContent = data.product_name;
  $price.textContent = data.price;
  $productImage.style.width = "600px";
  $productImage.style.height = "600px";
  $productImage.style.objectFit = "fill";
  let formattedPrice;
  if (data.price && !isNaN(data.price)) {
    formattedPrice = Number(data.price).toLocaleString("ko-KR");
  } else {
    formattedPrice = "가격 정보 없음";
  }

  $productDiv.append($productImage, $storeName, $productName, $price);
  document.body.appendChild($productDiv);

  // 로그인시 마이페이지로 변경
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

    // a 태그 동작 금지
    $userIconLink.addEventListener("click", (event) => {
      event.preventDefault();
    });

    // 마이페이지 클릭시 마이페이지/로그아웃 띄우기
    const $clickMyPage = document.createElement("a");
    $clickMyPage.className = "clickMyPage";
    const $clickLogOut = document.createElement("a");
    $clickLogOut.className = "clickLogOut";

    const $tooltip = document.createElement("div");

    $clickMyPage.textContent = "마이페이지";
    $clickLogOut.textContent = "로그아웃";
    $clickMyPage.href = "";
    $clickLogOut.href = "";

    // 툴팁 관련
    // 툴팁 보이기 함수
    function showTooltip() {
      const rect = $userIconLink.getBoundingClientRect();
      $tooltip.style.display = "block";
      $tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
      $tooltip.style.left = `${rect.left + window.scrollX - 30}px`;
      document.addEventListener("click", documentClickHandler);
    }
    // 툴팁 가리기 함수
    function hideTooltip() {
      $tooltip.style.display = "none";
      document.removeEventListener("click", documentClickHandler);
    }

    function documentClickHandler(event) {
      if (
        !$tooltip.contains(event.target) &&
        !$userIconLink.contains(event.target)
      ) {
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
    $tooltip.appendChild($clickMyPage);
    $tooltip.appendChild($clickLogOut);
    // 툴팁 스타일
    $tooltip.style.cssText = `
    position: absolute;
    display: none;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 10px;
    z-index: 100;
  `;
    // a태그 스타일
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
    // 화살표 모양
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
    // body에 툴팁 추가
    document.body.appendChild($tooltip);
    $tooltip.style.zIndex = "1000";

    $userIconLink.addEventListener("click", () => {
      showTooltip();
    });

    $clickLogOut.addEventListener("click", () => {
      localStorage.clear();
      document.body.removeChild($tooltip);

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
      $userIconLink.removeEventListener("click", showTooltip);
    });
  } else {
    $userIconLink.addEventListener("click", () => {
      // 로그인 버튼 클릭시 로그인 페이지로 이동
      // $userIconLink.setAttribute("href", "./signIn.html");
      // $userIconLink.href = "./signIn.html";
      location.href = "./signIn.html";
    });
  }
}
