// **로그인 페이지**

// - 아이디나 비밀번호가 일치하지 않거나, 아이디나 비밀번호를 입력하지 않은 채 로그인 버튼을 누르면 경고 문구가 나타납니다. -> 완성
// - 입력 창 아래에 경고창이 나타나면 로그인 버튼을 눌러도 로그인 되지 않습니다. -> 완료
// - 입력 창에 입력이 안된 부분이 존재한 채로 로그인 버튼을 누르면 입력되지 않은 입력 창에 focus 이벤트가 작동하고 로그인은 되지 않습니다. -> 완료
// - 아이디나 비밀번호가 일치하지 않는다면, 비밀번호 입력창에 focus이벤트가 발생하고 빈칸이 됩니다. ->  완료
// - 로그인이 성공할 시, 로그인하기 이전 페이지로 이동합니다. -> todo
// - 구매자 : 구매 회원 로그인 탭을 클릭하면 구매 회원으로 로그인합니다. -> todo
// - 판매자 : 판매 회원 로그인 탭을 클릭하면 판매 회원으로 로그인합니다. -> todo

const $form = document.querySelector("form");
const $signIn = document.querySelector("#signIn");
const $alert = document.querySelector("#alert");

const $buyerMembership = document.querySelector(".buyerMembership");
const $sellerMembership = document.querySelector(".sellerMembership");
let login_type = "BUYER";
$buyerMembership.addEventListener("click", (e) => {
  e.preventDefault();
  $buyerMembership.style.backgroundColor = "#FFFFFF";
  $sellerMembership.style.backgroundColor = "#f2f2f2";
  login_type = "BUYER";
  return;
});
$sellerMembership.addEventListener("click", (e) => {
  e.preventDefault();
  $buyerMembership.style.backgroundColor = "#f2f2f2";
  $sellerMembership.style.backgroundColor = "#FFFFFF";
  login_type = "SELLER";
  return;
});

const signIn = async function (loginData) {
  try {
    const res = await fetch("https://estapi.openmarket.weniv.co.kr/accounts/login/", {
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

$form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const $id = document.querySelector("#id");
  const $pw = document.querySelector("#pw");
  const username = $id.value;
  const password = $pw.value;

  // - 입력 창에 입력이 안된 부분이 존재한 채로 로그인 버튼을 누르면 입력되지 않은 입력 창에 focus 이벤트가 작동하고 로그인은 되지 않습니다. -> 완료
  // - 아이디나 비밀번호가 일치하지 않거나, 아이디나 비밀번호를 입력하지 않은 채 로그인 버튼을 누르면 경고 문구가 나타납니다.
  if (username.trim() === "") {
    $alert.textContent = "아이디를 입력해 주세요.";
    $id.focus();
    return;
  }
  if (password.trim() === "") {
    $alert.textContent = "비밀번호를 입력해 주세요";
    $pw.focus();
    return;
  }
  const signInData = {
    username,
    password,
    login_type,
  };
  const confirmLogin = await signIn(signInData);
  console.log(confirmLogin.status);
  if (confirmLogin.status === 200) {
    // 로그인 성공 시 로컬 스토리지에 정보 저장
    localStorage.setItem('accessToken', confirmLogin.data.access)
    localStorage.setItem('refreshToken', confirmLogin.data.refresh)
    localStorage.setItem('user_type', confirmLogin.data.user.user_type)
    // todo : 로그인 된 페이지로 이동하기
    history.back()
  }else {
    $alert.textContent = "아이디 또는 비밀번호가 일치하지 않습니다.";
    // - 아이디나 비밀번호가 일치하지 않는다면, 비밀번호 입력창에 focus이벤트가 발생하고 빈칸이 됩니다. -> 완료
    $pw.value = null;
    $pw.focus();
    return;
  }
  // - 입력 창 아래에 경고창이 나타나면 로그인 버튼을 눌러도 로그인 되지 않습니다. -> 완료
  if ($alert) {
    $signIn.style.pointerEvents = "none";
  }
});
