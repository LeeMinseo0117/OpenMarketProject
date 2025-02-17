let totalPrice = 0;

function checkLoginStatus() {
  const accessToken = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("user_type");
  console.log(
    "로그인 여부:",
    !!(
      localStorage.getItem("user_type") &&
      localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    )
  );
  return {
    isLoggedIn: !!accessToken,
    userType: userType,
    token: accessToken,
  };
}

function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user_type");
  window.location.href = "./signIn.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const { isLoggedIn } = checkLoginStatus();

  const isLoginPage = window.location.pathname.includes("signIn.html");

  if (isLoggedIn && isLoginPage) {
    history.back();
  } else if (!isLoggedIn && !isLoginPage) {
    window.location.href = "./signIn.html";
  }
});

const $shoppingCart = document.querySelector("#shoppingCart");
const $userIconLink = document.querySelector("#userIconLink");
const $userIcon = document.querySelector("#userIcon");

async function init() {
  console.log("초기화 시작");
  console.log("로그인 상태:", checkLoginStatus());
  console.log("access token:", localStorage.getItem("accessToken"));
  await cartListGet();
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("페이지 로드됨");
  initializeUI($userIconLink, $userIcon, $shoppingCart);
  init();
});

async function fetchProductDetail(productId) {
  try {
    const response = await fetch(
      `https://estapi.openmarket.weniv.co.kr/products/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("상품 정보를 가져오는데 실패했습니다.");
    }
    return await response.json();
  } catch (error) {
    console.error(`상품 ID ${productId} 정보 가져오기 실패:`, error);
    return null;
  }
}

async function fetchAllProductDetails(productIds) {
  const promises = productIds.map((productId) => fetchProductDetail(productId));
  const results = await Promise.all(promises);
  return results;
}

const cartListGet = async function () {
  try {
    totalPrice = 0;
    console.log("장바구니 데이터 가져오기 시작");
    const res = await fetch("https://estapi.openmarket.weniv.co.kr/cart/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await res.json();

    const $mainContainer = document.createElement("div");
    $mainContainer.className = "productsContainer";
    document.querySelector(".payment").appendChild($mainContainer);

    if (!data.results || data.results.length === 0) {
      console.log("장바구니가 비어있습니다");
      showEmptyCart();
      return;
    } else {
      data.results.forEach((item) => {
        if (item.product) {
          drawProduct(item.product, item.quantity, item.id, $mainContainer);
        }
      });

      // 총액 표시
      const $totalPrice = document.createElement("div");
      $totalPrice.className = "totalPrice";
      $totalPrice.innerText = `총 주문금액: ${totalPrice.toLocaleString(
        "ko-KR"
      )}원`;
      $mainContainer.after($totalPrice);
    }
  } catch (error) {
    console.error("장바구니 로드 중 에러 발생:", error);
    if (error.message.includes("자격 인증데이터")) {
      console.log("로그인이 필요합니다");
      window.location.href = "./signIn.html";
    }
  }
};

function drawProduct(data, quantity, cartItemId, container) {
  console.log("drawProduct 호출됨 - cartItemId:", cartItemId);

  const $productDiv = document.createElement("div");
  $productDiv.className = "productDiv";
  const $productImage = document.createElement("img");
  $productImage.className = "productImage";
  const $productContent = document.createElement("div");
  $productContent.className = "productContent";
  const $storeName = document.createElement("p");
  $storeName.className = "storeName";
  const $productName = document.createElement("p");
  $productName.className = "productName";
  const $price = document.createElement("p");
  $price.className = "price";
  const $quantity = document.createElement("p");
  $quantity.className = "quantity";

  $productImage.src = data.image;
  $storeName.textContent = data.seller.store_name;
  $productName.textContent = data.name;
  $quantity.textContent = "수량: " + quantity + "개";

  const itemTotalPrice = quantity * data.price;
  $price.innerText = itemTotalPrice.toLocaleString("ko-KR") + "원";

  totalPrice += itemTotalPrice;

  $productDiv.append($productImage, $productContent, $price);
  $productContent.append($storeName, $productName, $quantity);

  container.appendChild($productDiv);
}
