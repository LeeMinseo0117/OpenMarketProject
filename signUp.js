const buyerSingUp = async function (signUpData) {
  try {
    const res = await fetch(
      "https://estapi.openmarket.weniv.co.kr/accounts/buyer/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      }
    );
    const data = await res.json();
    console.log(data);
    const status = res.status;
    console.log("Status:", status);
    return { status, data };
  } catch (error) {
    console.log(error);
  }
};
