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
  const $container = document.querySelector(".payment");
  $container.classList.add("container");

  if (!document.querySelector('script[src*="postcode.v2.js"]')) {
    const $daumScript = document.createElement("script");
    $daumScript.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild($daumScript);
  }

  window.execDaumPostcode = function () {
    new daum.Postcode({
      oncomplete: function (data) {
        var addr = "";
        var extraAddr = "";

        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
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
          document.getElementById("userAdd1").value = "";
        }
        document.getElementById("zipCodeInput").value = data.zonecode;
        document.getElementById("userAdd1").value = addr;
        document.getElementById("userAdd1").value += extraAddr;
        document.getElementById("userAdd2").focus();
      },
    }).open();
  };

  const $deliveryInfo = document.createElement("h2");
  $deliveryInfo.className = "deliveryInfo";
  $deliveryInfo.textContent = "배송정보";
  $container.appendChild($deliveryInfo);

  const $ordererSection = document.createElement("div");
  $ordererSection.className = "ordererSection";

  const $ordererInfo = document.createElement("h3");
  $ordererInfo.className = "ordererInfo";
  $ordererInfo.textContent = "주문자 정보";
  $ordererSection.appendChild($ordererInfo);

  const $nameGroup = document.createElement("div");
  $nameGroup.className = "inputGroup";

  const $orderNameLabel = document.createElement("label");
  $orderNameLabel.htmlFor = "orderName";
  $orderNameLabel.textContent = "이름";

  const $orderName = document.createElement("input");
  $orderName.className = "orderName";
  $orderName.type = "text";
  $orderName.id = "orderName";
  $orderName.name = "orderName";
  $orderName.value = "";

  $nameGroup.appendChild($orderNameLabel);
  $nameGroup.appendChild($orderName);
  $ordererSection.appendChild($nameGroup);

  const $phoneGroup = document.createElement("div");
  $phoneGroup.className = "inputGroup";

  const $ordererPhoneLabel = document.createElement("label");
  $ordererPhoneLabel.htmlFor = "ordererPhone";
  $ordererPhoneLabel.textContent = "휴대폰";

  const $ordererPhone = document.createElement("input");
  $ordererPhone.className = "ordererPhone";
  $ordererPhone.type = "text";
  $ordererPhone.id = "ordererPhone";
  $ordererPhone.name = "ordererPhone";
  $ordererPhone.value = "";

  $phoneGroup.appendChild($ordererPhoneLabel);
  $phoneGroup.appendChild($ordererPhone);
  $ordererSection.appendChild($phoneGroup);

  const $emailGroup = document.createElement("div");
  $emailGroup.className = "inputGroup";

  const $ordererEmailLabel = document.createElement("label");
  $ordererEmailLabel.htmlFor = "ordererEmail";
  $ordererEmailLabel.textContent = "이메일";

  const $ordererEmail = document.createElement("input");
  $ordererEmail.className = "ordererEmail";
  $ordererEmail.type = "email";
  $ordererEmail.id = "ordererEmail";
  $ordererEmail.name = "ordererEmail";
  $ordererEmail.value = "";

  $emailGroup.appendChild($ordererEmailLabel);
  $emailGroup.appendChild($ordererEmail);
  $ordererSection.appendChild($emailGroup);

  $container.appendChild($ordererSection);

  const $deliveryAddressSection = document.createElement("div");
  $deliveryAddressSection.className = "deliveryAddressSection";

  const $deliveryAddressInfo = document.createElement("h3");
  $deliveryAddressInfo.className = "deliveryAddressInfo";
  $deliveryAddressInfo.textContent = "배송지 정보";
  $deliveryAddressSection.appendChild($deliveryAddressInfo);

  const $recipientGroup = document.createElement("div");
  $recipientGroup.className = "inputGroup";

  const $recipientLabel = document.createElement("label");
  $recipientLabel.htmlFor = "recipient";
  $recipientLabel.textContent = "수령인";

  const $recipient = document.createElement("input");
  $recipient.className = "recipient";
  $recipient.type = "text";
  $recipient.id = "recipient";
  $recipient.name = "recipient";
  $recipient.value = "";

  $recipientGroup.appendChild($recipientLabel);
  $recipientGroup.appendChild($recipient);
  $deliveryAddressSection.appendChild($recipientGroup);

  const $recipientPhoneGroup = document.createElement("div");
  $recipientPhoneGroup.className = "inputGroup";

  const $recipientPhoneLabel = document.createElement("label");
  $recipientPhoneLabel.htmlFor = "recipientPhone";
  $recipientPhoneLabel.textContent = "휴대폰";

  const $recipientPhone = document.createElement("input");
  $recipientPhone.className = "recipientPhone";
  $recipientPhone.type = "text";
  $recipientPhone.id = "recipientPhone";
  $recipientPhone.name = "recipientPhone";
  $recipientPhone.value = "";

  $recipientPhoneGroup.appendChild($recipientPhoneLabel);
  $recipientPhoneGroup.appendChild($recipientPhone);
  $deliveryAddressSection.appendChild($recipientPhoneGroup);

  const $addressContainer = document.createElement("div");
  $addressContainer.className = "addressContainer";

  const $addressLabelGroup = document.createElement("div");
  $addressLabelGroup.className = "inputGroup";

  const $addressLabel = document.createElement("label");
  $addressLabel.htmlFor = "zipCodeInput";
  $addressLabel.className = "addressLabel";
  $addressLabel.textContent = "배송주소";

  const $zipWrapper = document.createElement("div");
  $zipWrapper.className = "zipWrapper";
  $zipWrapper.style.display = "flex";
  $zipWrapper.style.flex = "1";

  const $zipCodeInput = document.createElement("input");
  $zipCodeInput.className = "zipCodeInput";
  $zipCodeInput.type = "text";
  $zipCodeInput.id = "zipCodeInput";
  $zipCodeInput.name = "zipCodeInput";
  $zipCodeInput.maxLength = "10";
  $zipCodeInput.placeholder = "우편번호";
  $zipCodeInput.style.marginRight = "10px";

  const $zipButton = document.createElement("input");
  $zipButton.className = "zipButton";
  $zipButton.type = "button";
  $zipButton.id = "zipButton";
  $zipButton.value = "우편번호 찾기";
  $zipButton.onclick = function () {
    execDaumPostcode();
  };

  $zipWrapper.appendChild($zipCodeInput);
  $zipWrapper.appendChild($zipButton);

  $addressLabelGroup.appendChild($addressLabel);
  $addressLabelGroup.appendChild($zipWrapper);
  $addressContainer.appendChild($addressLabelGroup);

  const $address1Input = document.createElement("input");
  $address1Input.className = "address1Input";
  $address1Input.type = "text";
  $address1Input.name = "user_add1";
  $address1Input.id = "userAdd1";
  $address1Input.required = true;
  $address1Input.readOnly = true;
  $address1Input.style.width = "100%";
  $address1Input.style.marginTop = "10px";
  $address1Input.style.marginBottom = "10px";
  $addressContainer.appendChild($address1Input);

  const $address2Input = document.createElement("input");
  $address2Input.className = "address2Input";
  $address2Input.type = "text";
  $address2Input.name = "user_add2";
  $address2Input.id = "userAdd2";
  $address2Input.maxLength = "40";
  $address2Input.placeholder = "상세 주소를 입력하세요";
  $address2Input.style.width = "100%";
  $addressContainer.appendChild($address2Input);

  $deliveryAddressSection.appendChild($addressContainer);
  $container.appendChild($deliveryAddressSection);

  const $paymentMethod = document.createElement("h2");
  $paymentMethod.className = "paymentMethod";
  $paymentMethod.textContent = "결제수단";
  $container.appendChild($paymentMethod);

  const paymentOptions = [
    { id: "creditCard", text: "신용/체크카드" },
    { id: "bankTransfer", text: "무통장 입금" },
    { id: "mobilePayment", text: "휴대폰 결제" },
    { id: "naverPay", text: "네이버페이" },
    { id: "kakaoPay", text: "카카오페이" },
  ];

  const $paymentOptionsContainer = document.createElement("div");
  $paymentOptionsContainer.className = "paymentOptionsContainer";

  paymentOptions.forEach((option) => {
    const $radioContainer = document.createElement("div");
    $radioContainer.style.display = "flex";
    $radioContainer.style.alignItems = "center";

    const $radio = document.createElement("input");
    $radio.type = "radio";
    $radio.id = option.id;
    $radio.name = "paymentMethod";
    $radio.value = option.id;
    $radio.style.margin = "0 8px 0 0";

    const $label = document.createElement("label");
    $label.htmlFor = option.id;
    $label.textContent = option.text;
    $label.style.cursor = "pointer";

    $radioContainer.appendChild($radio);
    $radioContainer.appendChild($label);

    $paymentOptionsContainer.appendChild($radioContainer);
  });

  $container.appendChild($paymentOptionsContainer);

  const $checkboxContainer = document.createElement("div");
  $checkboxContainer.className = "checkboxContainer";

  const $agreeCheck = document.createElement("input");
  $agreeCheck.className = "agreeCheck";
  $agreeCheck.type = "checkbox";
  $agreeCheck.id = "agreeCheck";
  $agreeCheck.name = "agreeCheck";

  const $label = document.createElement("label");
  $label.htmlFor = "agreeCheck";
  $label.textContent = "주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.";
  $label.style.cursor = "pointer";
  $label.style.marginLeft = "8px";

  $checkboxContainer.style.display = "flex";
  $checkboxContainer.style.alignItems = "center";
  $label.style.width = "400px";
  $checkboxContainer.style.display = "flex";
  $checkboxContainer.style.alignItems = "center";
  $checkboxContainer.style.justifyContent = "center";
  $checkboxContainer.style.marginTop = "30px";

  $checkboxContainer.appendChild($agreeCheck);
  $checkboxContainer.appendChild($label);

  $container.appendChild($checkboxContainer);

  const $submitButton = document.createElement("button");
  $submitButton.className = "submitButton";
  $submitButton.textContent = "결제하기";

  $container.appendChild($submitButton);

  async function postOrder(orderData) {
    try {
      let phoneNumber = orderData.receiver_phone_number.replace(/[^0-9]/g, "");

      if (phoneNumber.length === 11) {
        phoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      } else if (phoneNumber.length === 10) {
        phoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      }

      orderData.receiver_phone_number = phoneNumber;

      const response = await fetch(
        "https://estapi.openmarket.weniv.co.kr/order/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`주문 실패: ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      console.error("주문 실패:", error);
      return null;
    }
  }

  $submitButton.addEventListener("click", async function (e) {
    e.preventDefault();

    // 폼 검증
    if (!validateOrderForm()) {
      return;
    }

    // 장바구니 아이템 ID 목록 가져오기
    try {
      const cartResponse = await fetch(
        "https://estapi.openmarket.weniv.co.kr/cart/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const cartData = await cartResponse.json();

      const cartItems = cartData.results
        .map((item) => item.id)
        .filter((id) => id !== null);

      const paymentMethodMap = {
        creditCard: "card",
        bankTransfer: "deposit",
        mobilePayment: "phone",
        naverPay: "naverpay",
        kakaoPay: "kakaopay",
      };

      // 선택된 결제 방법 가져오기
      const selectedPaymentMethod = document.querySelector(
        'input[name="paymentMethod"]:checked'
      );
      if (!selectedPaymentMethod) {
        alert("결제 방법을 선택해주세요.");
        return;
      }

      const orderData = {
        order_type: "cart_order",
        cart_items: cartItems,
        total_price: totalPrice,
        receiver: document.getElementById("recipient").value,
        receiver_phone_number: document.getElementById("recipientPhone").value,
        address: `(${document.getElementById("zipCodeInput").value}) ${
          document.getElementById("userAdd1").value
        } ${document.getElementById("userAdd2").value}`,
        address_message: null,
        payment_method: paymentMethodMap[selectedPaymentMethod.value],
      };

      const orderResult = await postOrder(orderData);

      if (orderResult) {
        alert("주문이 완료되었습니다.");
        window.location.href = "./main.html";
      }
    } catch (error) {
      console.error("주문 처리 중 오류 발생:", error);
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  });

  $container.appendChild($submitButton);
}

function validateOrderForm() {
  if (!document.getElementById("orderName").value) {
    alert("주문자 이름을 입력해주세요.");
    return false;
  }

  if (!document.getElementById("ordererPhone").value) {
    alert("주문자 휴대폰 번호를 입력해주세요.");
    return false;
  }

  if (!document.getElementById("ordererEmail").value) {
    alert("주문자 이메일을 입력해주세요.");
    return false;
  }

  if (!document.getElementById("recipient").value) {
    alert("수령인 이름을 입력해주세요.");
    return false;
  }

  if (!document.getElementById("recipientPhone").value) {
    alert("수령인 휴대폰 번호를 입력해주세요.");
    return false;
  }

  if (!document.getElementById("zipCodeInput").value) {
    alert("우편번호를 입력해주세요.");
    return false;
  }

  if (!document.getElementById("userAdd1").value) {
    alert("주소를 입력해주세요.");
    return false;
  }

  if (!document.getElementById("userAdd2").value) {
    alert("상세 주소를 입력해주세요.");
    return false;
  }

  if (!document.querySelector('input[name="paymentMethod"]:checked')) {
    alert("결제 방법을 선택해주세요.");
    return false;
  }

  if (!document.getElementById("agreeCheck").checked) {
    alert("주문 내용 확인 및 정보 제공 동의가 필요합니다.");
    return false;
  }

  return true;
}
