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

// cart.js
const $shoppingCart = document.querySelector("#shoppingCart");
const $userIconLink = document.querySelector("#userIconLink");
const $userIcon = document.querySelector("#userIcon");

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
    console.log("장바구니 데이터 가져오기 시작");
    const res = await fetch("https://estapi.openmarket.weniv.co.kr/cart/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await res.json();
    console.log("장바구니 데이터:", data);

    if (!data.results || data.results.length === 0) {
      console.log("장바구니가 비어있습니다");
      showEmptyCart();
      return;
    } else {
      data.results.forEach((item) => {
        console.log("장바구니 아이템:", item);
        if (item.product) {
          drawProduct(item.product, item.quantity, item.id);
        }
      });
      purchaseProduct();
    }
  } catch (error) {
    console.error("장바구니 로드 중 에러 발생:", error);
    if (error.message.includes("자격 인증데이터")) {
      console.log("로그인이 필요합니다");
      window.location.href = "./signIn.html";
    }
  }
};

function showEmptyCart() {
  const $h2 = document.createElement("h2");
  const $p = document.createElement("p");
  $h2.textContent = "장바구니에 담긴 상품이 없습니다.";
  $p.textContent = "원하는 상품을 장바구니에 담아보세요!";
  document.body.appendChild($h2);
  $h2.appendChild($p);
}

async function deleteCartProduct(cartItemId) {
  try {
    console.log("삭제 요청할 cartItemId:", cartItemId);
    const url = `https://estapi.openmarket.weniv.co.kr/cart/${cartItemId}`;
    console.log("요청 URL:", url);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });

    console.log("응답 상태 코드:", response.status);
    const responseText = await response.text();
    console.log("응답 내용:", responseText);

    if (!response.ok) {
      throw new Error(`상품 삭제 실패: ${responseText}`);
    }

    return true;
  } catch (error) {
    console.log("상품 삭제 에러 발생: ", error);
    console.log("에러 세부 정보:", error.message);
    return false;
  }
}

function drawProduct(data, quantity, cartItemId) {
  console.log("drawProduct 호출됨 - cartItemId:", cartItemId);

  const $productsContainer = document.createElement("div");
  $productsContainer.className = "productsContainer";
  const $productDiv = document.createElement("div");
  $productDiv.className = "productDiv";
  const $productCheck = document.createElement("input");
  $productCheck.className = "productCheck";
  $productCheck.type = "checkbox";
  const $productImage = document.createElement("Img");
  $productImage.className = "productImage";
  const $productContent = document.createElement("div");
  $productContent.className = "productContent";
  const $storeName = document.createElement("p");
  $storeName.className = "storeName";
  const $productName = document.createElement("p");
  $productName.className = "productName";
  const $price = document.createElement("p");
  $price.className = "price";
  const $countContainer = document.createElement("div");
  $countContainer.className = "countContainer";
  const $count = document.createElement("input");
  $count.className = "count";
  const $decreaseButton = document.createElement("button");
  $decreaseButton.className = "decreaseButton";
  const $increaseButton = document.createElement("button");
  $increaseButton.className = "increaseButton";
  let $productTotalPrice = document.createElement("p");
  $productTotalPrice.className = "productTotalPrice";
  const $deleteButton = document.createElement("button");
  $deleteButton.className = "deleteButton";

  $decreaseButton.textContent = "-";
  $increaseButton.textContent = "+";
  $count.type = "number";
  $count.value = quantity || 1;
  $count.min = 1;
  $count.max = 99;
  $count.readOnly = true;

  $decreaseButton.addEventListener("click", () => {
    let value = parseInt($count.value);
    if (value > parseInt($count.min)) {
      $count.value = value - 1;
      $productTotalPrice.innerText =
        ($count.value * priceValue).toLocaleString("ko-KR") + "원";
      if ($productCheck.checked) {
        updateTotalPrice();
      }
    }
  });

  $increaseButton.addEventListener("click", () => {
    let value = parseInt($count.value);
    if (value < parseInt($count.max)) {
      $count.value = value + 1;
      $productTotalPrice.innerText =
        ($count.value * priceValue).toLocaleString("ko-KR") + "원";
      if ($productCheck.checked) {
        updateTotalPrice();
      }
    }
  });

  $deleteButton.addEventListener("click", async () => {
    console.log("삭제 버튼 클릭 - cartItemId:", cartItemId);
    if (confirm("정말로 이 상품을 삭제하시겠습니까?")) {
      const success = await deleteCartProduct(cartItemId);
      console.log("삭제 요청 결과:", success);
      if (success) {
        $productsContainer.remove();

        const remainingProducts =
          document.querySelectorAll(".productsContainer");
        if (remainingProducts.length === 0) {
          showEmptyCart();
        }
      } else {
        alert("상품 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  });

  $count.addEventListener("change", function (e) {
    localStorage.setItem("onChange", e.target.value);
  });

  let formattedPrice;
  if (data.price && !isNaN(data.price)) {
    formattedPrice = Number(data.price).toLocaleString("ko-KR") + "원";
  } else {
    formattedPrice = "가격 정보 없음";
  }
  $price.textContent = formattedPrice;

  $productCheck.checked = true;

  const countValue = Number($count.value);
  const priceValue = data.price;
  $productTotalPrice.innerText =
    (countValue * priceValue).toLocaleString("ko-KR") + "원";

  $countContainer.append($decreaseButton, $count, $increaseButton);

  $productImage.src = data.image;
  $storeName.textContent = data.seller_name;
  $productName.textContent = data.product_name;

  $productsContainer.append($productDiv);
  $productDiv.append(
    $productCheck,
    $productImage,
    $productContent,
    $countContainer,
    $productTotalPrice,
    $deleteButton
  );
  $productContent.append($storeName, $productName, $price);

  document.body.append($productsContainer);
}

function updateTotalPrice() {
  const totalPrice = calculateTotalPrice();
  const $totalProductPrice = document.querySelector(".totalProductPrice");
  if ($totalProductPrice) {
    $totalProductPrice.textContent = totalPrice.toLocaleString("ko-KR") + "원";
  }
}

function calculateTotalPrice() {
  const checkedProducts = document.querySelectorAll(".productCheck:checked");
  let totalPrice = 0;
  checkedProducts.forEach((checkbox) => {
    const container = checkbox.closest(".productDiv");
    const priceText = container.querySelector(".productTotalPrice").textContent;
    const price = parseInt(priceText.replace(/[,원]/g, ""));
    totalPrice += price;
  });
  return totalPrice;
}

function purchaseProduct() {
  const $purchaseContainer = document.createElement("div");
  $purchaseContainer.className = "purchaseContainer";

  $purchaseContainer.style.display = "flex";
  $purchaseContainer.style.flexDirection = "column";
  $purchaseContainer.style.alignItems = "center";
  $purchaseContainer.style.gap = "20px";

  const $allPurchaseButton = document.createElement("a");
  $allPurchaseButton.className = "allPurchaseButton";
  const $totalProductPrice = document.createElement("p");
  $totalProductPrice.className = "totalProductPrice";

  $allPurchaseButton.textContent = "주문하기";
  $allPurchaseButton.style.display = "flex";
  $allPurchaseButton.style.justifyContent = "center";
  $allPurchaseButton.style.alignItems = "center";
  $allPurchaseButton.style.width = "220px";
  $allPurchaseButton.style.height = "68px";
  const initialTotalPrice = calculateTotalPrice();
  $totalProductPrice.textContent =
    initialTotalPrice.toLocaleString("ko-KR") + "원";

  document.body.append($purchaseContainer);
  $purchaseContainer.append($totalProductPrice, $allPurchaseButton);

  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("productCheck")) {
      updateTotalPrice();
    }
  });

  $allPurchaseButton.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = "./payment.html";
  });
}

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
