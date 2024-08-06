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
