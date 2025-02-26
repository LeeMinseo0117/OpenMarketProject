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
      drawOrder();
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

function drawOrder() {
  const container = document.querySelector(".payment");

  // Daum 우편번호 API 스크립트 추가
  if (!document.querySelector('script[src*="postcode.v2.js"]')) {
    const daumScript = document.createElement("script");
    daumScript.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(daumScript);
  }

  window.execDaumPostcode = function () {
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업을 통한 검색 결과 항목 클릭 시 실행
        var addr = ""; // 주소_결과값이 없을 경우 공백
        var extraAddr = ""; // 참고항목

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          // 도로명 주소를 선택
          addr = data.roadAddress;
        } else {
          // 지번 주소를 선택
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
        } else {
          document.getElementById("UserAdd1").value = "";
        }
        document.getElementById("zipCodeInput").value = data.zonecode;
        document.getElementById("UserAdd1").value = addr;
        document.getElementById("UserAdd1").value += extraAddr;
        document.getElementById("UserAdd2").focus();
      },
    }).open();
  };

  const $deliveryInfo = document.createElement("h2");
  $deliveryInfo.textContent = "배송정보";
  const $ordererInfo = document.createElement("h3");
  $ordererInfo.textContent = "주문자 정보";

  const $orderName = document.createElement("input");
  $orderName.type = "text";
  $orderName.id = "orderName";
  $orderName.name = "orderName";
  $orderName.value = "";
  const $orderNameLabel = document.createElement("label");
  $orderNameLabel.htmlFor = "orderName";
  $orderNameLabel.textContent = "이름";

  const $ordererPhone = document.createElement("input");
  $ordererPhone.type = "tel";
  $ordererPhone.id = "ordererPhone";
  $ordererPhone.name = "ordererPhone";
  $ordererPhone.value = "";
  const $ordererPhoneLabel = document.createElement("label");
  $ordererPhoneLabel.htmlFor = "ordererPhone";
  $ordererPhoneLabel.textContent = "휴대폰";

  const $ordererEmail = document.createElement("input");
  $ordererEmail.type = "email";
  $ordererEmail.id = "ordererEmail";
  $ordererEmail.name = "ordererEmail";
  $ordererEmail.value = "";
  const $ordererEmailLabel = document.createElement("label");
  $ordererEmailLabel.htmlFor = "ordererEmail";
  $ordererEmailLabel.textContent = "이메일";

  container.appendChild($deliveryInfo);
  container.appendChild($ordererInfo);

  const $nameGroup = document.createElement("div");
  $nameGroup.appendChild($orderNameLabel);
  $nameGroup.appendChild($orderName);

  const $phoneGroup = document.createElement("div");
  $phoneGroup.appendChild($ordererPhoneLabel);
  $phoneGroup.appendChild($ordererPhone);

  const $emailGroup = document.createElement("div");
  $emailGroup.appendChild($ordererEmailLabel);
  $emailGroup.appendChild($ordererEmail);

  $ordererInfo.appendChild($nameGroup);
  $ordererInfo.appendChild($phoneGroup);
  $ordererInfo.appendChild($emailGroup);

  const $deliveryAddressInfo = document.createElement("h3");
  $deliveryAddressInfo.textContent = "배송지 정보";

  const $recipient = document.createElement("input");
  $recipient.type = "text";
  $recipient.id = "recipient";
  $recipient.name = "recipient";
  $recipient.value = "";
  const $recipientLabel = document.createElement("label");
  $recipientLabel.htmlFor = "recipient";
  $recipientLabel.textContent = "수령인";

  const $recipientPhone = document.createElement("input");
  $recipientPhone.type = "tel";
  $recipientPhone.id = "recipientPhone";
  $recipientPhone.name = "recipientPhone";
  $recipientPhone.value = "";
  const $recipientPhoneLabel = document.createElement("label");
  $recipientPhoneLabel.htmlFor = "recipientPhone";
  $recipientPhoneLabel.textContent = "휴대폰";

  const $addressContainer = document.createElement("div");
  $addressContainer.className = "addressContainer";

  const $addressLabel = document.createElement("label");
  $addressLabel.htmlFor = "addressLabel";
  $addressLabel.className = "addressLabel";
  $addressLabel.textContent = "■ 주소 *";

  const $br1 = document.createElement("br");

  const $zipCodeInput = document.createElement("input");
  $zipCodeInput.type = "text";
  $zipCodeInput.className = "zipCodeInput";
  $zipCodeInput.id = "zipCodeInput";
  $zipCodeInput.name = "zipCodeInput";
  $zipCodeInput.maxLength = "10";
  $zipCodeInput.placeholder = "우편번호";

  const $zipButton = document.createElement("input");
  $zipButton.type = "button";
  $zipButton.id = "zipButton";
  $zipButton.className = "zipButton";
  $zipButton.value = "우편번호 찾기";
  $zipButton.onclick = function () {
    execDaumPostcode();
  };

  const $address1Input = document.createElement("input");
  $address1Input.type = "text";
  $address1Input.className = "form-control mb-2";
  $address1Input.name = "user_add1";
  $address1Input.id = "UserAdd1";
  $address1Input.required = true;
  $address1Input.readOnly = true;

  const $address2Input = document.createElement("input");
  $address2Input.type = "text";
  $address2Input.className = "form-control";
  $address2Input.name = "user_add2";
  $address2Input.id = "UserAdd2";
  $address2Input.maxLength = "40";
  $address2Input.placeholder = "상세 주소를 입력하세요";

  const $recipientGroup = document.createElement("div");
  $recipientGroup.appendChild($recipientLabel);
  $recipientGroup.appendChild($recipient);

  const $recipientPhoneGroup = document.createElement("div");
  $recipientPhoneGroup.appendChild($recipientPhoneLabel);
  $recipientPhoneGroup.appendChild($recipientPhone);

  container.appendChild($deliveryAddressInfo);
  $deliveryAddressInfo.appendChild($recipientGroup);
  $deliveryAddressInfo.appendChild($recipientPhoneGroup);

  $addressContainer.appendChild($addressLabel);
  $addressContainer.appendChild($br1);
  $addressContainer.appendChild($zipCodeInput);
  $addressContainer.appendChild($zipButton);
  $addressContainer.appendChild($address1Input);
  $addressContainer.appendChild($address2Input);

  container.appendChild($addressContainer);
}
