console.log(window.location.search);

// productId를 매개변수로 받아서 상품 정보를 서버에서 가져오는 함수
const productLists = async function (productId) {
  try {
    const res = await fetch(
      "https://openmarket.weniv.co.kr/products/" + productId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// data를 매개변수로 받아서 상품을 그려주는 함수
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
}

// 초기화 함수
async function init() {
  // 쿼리파라미터에서 product_id를 가져온다
  const param = new URLSearchParams(window.location.search);
  const productId = param.get("product_id");
  // productId를 매개변수로 넣어서 상품 정보를 서버에서 받아오기
  const productData = await productLists(productId);
  // 데이터를 화면에 그려주기
  drawProduct(productData);
}

init();
