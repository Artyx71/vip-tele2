let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let login = document.getElementById("login");
  let password = document.getElementById("password");

  if (login.value == "" || password.value == "") {
    alert("Пожалуйста заполните поля!");
  } else {
    const loginUrl = `http://45.84.68.38:8082/system_api/?format=json&context=web&model=users&method1=web_cabinet.login&arg1={"login":"VIP-${login.value}","passwd":"${password.value}"}`;
    console.log(123, loginUrl);
    fetch("https://tele-com.vip/carbon/api.php?req=" + btoa(loginUrl))
      .then((response) => response.json())
      .then((clientInfo) => {
        if (!clientInfo.error) {
          console.log("clientInfo", clientInfo);
          const sessionID = clientInfo.session_id;
          const clientName = clientInfo.user.__abonent;
          const clientAccount = clientInfo.user.abonent.__account;
          const clientAccountSplit = clientAccount.split(" ");
          const clientAccountNumber = clientAccountSplit[1];
          const clientAccountDebt = clientAccountSplit[3];
          const clientContractNumber = clientInfo.user.abonent.contract_number;
          const clientBalance = clientInfo.user.abonent.recomend_pay_sum;
          const clientActivationDate = clientInfo.user.abonent.activate_date;
          const clientTariff = clientInfo.user.abonent.__tarif;

          const clientInfoObject = {
            name: clientName,
            account: clientAccountNumber,
            contractNumber: clientContractNumber,
            balance: clientAccountDebt,
            activationDate: clientActivationDate,
            tariff: clientTariff,
            clientName: clientName,
          };
          console.log(clientInfo);
          localStorage.setItem("sessionID", sessionID);
          localStorage.setItem("clientInfo", JSON.stringify(clientInfoObject));
          window.location.assign("main.html");
        } else {
          console.error(clientInfo.error);
        }
      });
  }
});
