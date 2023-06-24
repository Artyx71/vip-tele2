let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let login = document.getElementById("login");
  let password = document.getElementById("password");

  if (login.value == "" || password.value == "") {
    alert("Пожалуйста заполните поля!");
  } else {
    const loginUrl = `http://45.84.68.38:8082/system_api/?format=json&context=web&model=users&method1=web_cabinet.login&arg1={"login":"VIP-${login.value}","passwd":"${password.value}"}`;
    fetch("https://tele-com.vip/carbon/api.php?req=" + btoa(loginUrl))
      .then((response) => response.json())
      .then((clientInfo) => {
        if (!clientInfo.error) {
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
          localStorage.setItem("sessionID", sessionID);
          localStorage.setItem("clientInfo", JSON.stringify(clientInfoObject));
          document.querySelector(".login-page").classList.add("dn");
          document.querySelector(".main-page").classList.remove("dn");
          var payData = {};
          const sessionObject = JSON.parse(localStorage.clientInfo);
          const scorebalance = document.querySelector(".score-balance");
          const scoreId = document.querySelector(".score-id");

          const payBtn = document.getElementById("payBtn");
          const scoreName = document.querySelector(".account__score-naming");
          const sessionId = localStorage.sessionID;
          const scoreOwner = document.querySelector(".account__score-owner");

          const payHistoryWrapper =
            document.getElementById("payHistoryWrapper");
          const activeServicesWrapper = document.getElementById(
            "activeServicesWrapper"
          );
          const payHistoryBtn = document.getElementById("payHistoryBtn");
          const paymentWrapper = document.getElementById("paymentWrapper");
          const paymentButton = document.getElementById("paymentButton");
          const allWrappers = document.querySelectorAll(".container-wrapper");
          const allBtns = document.querySelectorAll(".btn");
          const payHistoryUrl = `http://45.84.68.38:8082/system_api/?format=json&context=web&model=users&method1=web_cabinet.get_pay_log&arg1={"start_date":"01.01.2022","end_date":"01.01.2024","page_number":1,"per_page":50,"suid":\"${sessionId}\"}`;
          const activeServicesBtn =
            document.getElementById("activeServicesBtn");
          const servicesUrl = `http://45.84.68.38:8082/system_api/?format=json&context=web&model=users&method1=web_cabinet.get_usluga_list&arg1={"filter":"","get_user_uslugas_all":true,"get_user_uslugas":true,"get_setted":true,"suid":\"${sessionId}\"}`;
          const regexCost = /\((.*?)руб/;
          const regexName = /^[^:]+/;
          const logoutBtn = document.getElementById("logoutBtn");

          scoreId.innerHTML = sessionObject.account;
          scorebalance.innerHTML = sessionObject.balance;
          scoreName.innerHTML = sessionObject.tariff;
          scoreOwner.innerHTML = sessionObject.name;
          paymentButton.addEventListener("click", () => {
            allWrappers.forEach((element) => {
              element.classList.remove("active");
            });

            allBtns.forEach((element) => {
              element.classList.remove("active");
            });

            paymentWrapper.classList.add("active");
            paymentButton.classList.add("active");
          });

          payBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            const scoreInput = document.getElementById("score-input").value;
            if (!scoreInput) {
              alert("Введите сумму платежа");
            } else {
              const payScoreUrl = `http://45.84.68.38:8082/system_api/?format=json&context=web&model=users&method1=web_cabinet.add_payment_operation&arg1={"suid":\"${sessionId}\","src_ip":"10.20.30.41", "contract_number": "${scoreId.innerHTML}", "summa_in": "${scoreInput}", "operator": "SBERBANK_ACQ"}`;

              let payIdObject;

              const res = await fetch(
                `http://45.84.68.38:8082/system_api/?format=json&context=web&model=users&method1=web_cabinet.add_payment_operation&arg1={"suid":\"${sessionId}\","src_ip":"10.20.30.41", "contract_number": "${scoreId.innerHTML}", "summa_in": "${scoreInput}", "operator": "SBERBANK_ACQ"}`
              );
              payIdObject = await res.json();

              const params = new URLSearchParams({
                userName: "P1513074909-api",
                password: "VkP@35gE",
                amount: scoreInput * 100,
                orderNumber: payIdObject.operation_id_out,
                returnUrl:
                  "http://45.84.68.38/cabinet/paycheck/?paysystem=sbrf_acq&orderId=a8e38d00-6c0a-767e-8032-3c5c02480174&lang=ru",
              });
              await fetch(
                `https://securepayments.sberbank.ru/payment/rest/register.do?` +
                  params
              )
                .then((response) => response.json())
                .then((payInfo) => {
                  window.open(payInfo?.formUrl, "_blank");
                });
            }
          });

          payHistoryBtn.addEventListener("click", async () => {
            allWrappers.forEach((element) => {
              element.classList.remove("active");
            });

            allBtns.forEach((element) => {
              element.classList.remove("active");
            });

            payHistoryWrapper.classList.add("active");
            payHistoryBtn.classList.add("active");

            const fetchData = await fetch(
              "https://tele-com.vip/carbon/api.php?req=" + btoa(payHistoryUrl)
            )
              .then((response) => response.json())
              .then((payHistory) => {
                return payHistory;
              });

            const tableBody = document.getElementById("payhistory-table-body");

            const myChildData = fetchData.items
              .map((element) => {
                return `
                <tr>
                 <th class="text-center" scope="row">${new Date(
                   element.op_date
                 ).toLocaleDateString("ru-RU")} </th>
                  <td class="text-center">${element.op_summa} ₽</td>
               </tr>
              `;
              })
              .join("");

            tableBody.innerHTML = myChildData;
          });

          activeServicesBtn.addEventListener("click", async () => {
            allWrappers.forEach((element) => {
              element.classList.remove("active");
            });

            allBtns.forEach((element) => {
              element.classList.remove("active");
            });

            activeServicesWrapper.classList.add("active");
            activeServicesBtn.classList.add("active");

            const fetchData = await fetch(
              "https://tele-com.vip/carbon/api.php?req=" + btoa(servicesUrl)
            )
              .then((response) => response.json())
              .then((serviceHistory) => {
                return serviceHistory[1];
              });
            const tableBody = document.getElementById("services-table-body");

            const myChildData = fetchData
              .map((element) => {
                const serviceName = element.__self;
                const serviceNameResult = serviceName.match(regexName)[0];
                const serviceCost = regexCost.exec(element.__self);
                const serviceCostResult = serviceCost
                  ? serviceCost[1] + "руб"
                  : null;
                return `
                <tr>
                <th scope="row">${serviceNameResult}</th>
                 <td>
                 ${new Date(element.create_date).toLocaleDateString("ru-RU")}
                </td>
                  <td>${serviceCostResult}</td>
               </tr>
              `;
              })
              .join("");

            tableBody.innerHTML = myChildData;
          });

          logoutBtn.addEventListener("click", () => {
            location.href = "index.html";
            localStorage.clear();
          });
        } else {
          console.error(clientInfo.error);
        }
      });
  }
});
