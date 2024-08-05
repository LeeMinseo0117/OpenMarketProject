// **로그인 페이지**

// - 아이디나 비밀번호가 일치하지 않거나, 아이디나 비밀번호를 입력하지 않은 채 로그인 버튼을 누르면 경고 문구가 나타납니다. -> 완성
// - 입력 창 아래에 경고창이 나타나면 로그인 버튼을 눌러도 로그인 되지 않습니다.
// - 입력 창에 입력이 안된 부분이 존재한 채로 로그인 버튼을 누르면 입력되지 않은 입력 창에 focus 이벤트가 작동하고 로그인은 되지 않습니다.
// - 아이디나 비밀번호가 일치하지 않는다면, 비밀번호 입력창에 focus이벤트가 발생하고 빈칸이 됩니다.
// - 로그인이 성공할 시, 로그인하기 이전 페이지로 이동합니다.
// - 구매자 : 구매 회원 로그인 탭을 클릭하면 구매 회원으로 로그인합니다.
// - 판매자 : 판매 회원 로그인 탭을 클릭하면 판매 회원으로 로그인합니다.

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
    const data = await res.json();
    console.log(data);
    const status = res.status;
    console.log("Status:", status);
    return { status, data };
  } catch (error) {
    console.log(error);
  }
};

// 1 submit 이벤트 발생
$form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const $id = document.querySelector("#id");
  const $pw = document.querySelector("#pw");
  const username = $id.value;
  const password = $pw.value;
  const $alert = document.querySelector("#alert");

  // 2 아이디 입력창이 비어있는지 확인
  // 2-1 아이디 입력이 제대로 되어있지 않으면
  if (username.trim() === "") {
    // 2-2 YES~! -> 2-3 NO -> 3
    $alert.textContent = "아이디를 입력해 주세요.";
    // 2-3 경고 문구 출력 todo
    // 2-4 함수 종료
    return;
  }
  // 3 비밀번호 입력창이 비어있는지 확인
  if (password.trim() === "") {
    // 3-1 비밀번호 입력이 제대로 되어있지 않으면
    // 3-2 YES~! -> 3-3 NO -> 4
    $alert.textContent = "비밀번호를 입력해 주세요";
    // 3-3 경고 문구 출력 todo
    // 3-4 함수 종료
    return;
  }
  // 4 서버에 로그인 요청
  const signInData = {
    username,
    password,
    login_type,
  };
  // // 4-1 아이디 또는 비밀번호 일치하는지 확인
  // 4-2 일치하다면
  // 4-3 YES~! -> 5 NO -> 4-4
  // 5 로그인
  const confirmLogin = await signIn(signInData);
  console.log(confirmLogin.status);
  if (confirmLogin.status === 200) {
    // todo 로그인 된 페이지로 이동
  }
  //   // 4-4 경고 문구 출력
  else {
    $alert.textContent = "아이디 또는 비밀번호가 일치하지 않습니다.";
    // todo 문구 띄우기
  }
  // }
});
