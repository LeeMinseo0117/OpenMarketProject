const $form = document.querySelector("form");
const $signIn = document.querySelector("#signIn");

const $purchaseMembership = document.querySelector(".purchaseMembership");
const $saleMembership = document.querySelector(".saleMembership");
let login_type = "BUYER";
$purchaseMembership.addEventListener("click", (e) => {
  e.preventDefault();
  $purchaseMembership.style.backgroundColor = "#FFFFFF";
  $saleMembership.style.backgroundColor = "#f2f2f2";
  login_type = "BUYER";
  return;
});
$saleMembership.addEventListener("click", (e) => {
  e.preventDefault();
  $purchaseMembership.style.backgroundColor = "#f2f2f2";
  $saleMembership.style.backgroundColor = "#FFFFFF";
  login_type = "SELLER";
  return;
});

const signIn = async function (loginData) {
  try {
    const res = await fetch("https://openmarket.weniv.co.kr/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const data = await res.JSON;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
$form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const $id = document.querySelector("#id");
  const $pw = document.querySelector("#pw");
  const username = $id.value;
  const password = $pw.value;
  const loginData = {
    username,
    password,
    login_type,
  };
  signIn(loginData);
});
