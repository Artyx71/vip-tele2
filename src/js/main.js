const sessionObject = JSON.parse(localStorage.clientInfo);
const scorebalance = document.querySelector(".score-balance");
const scoreId = document.querySelector(".score-id");
const scoreName = document.querySelector(".account__score-naming");
const sessionId = localStorage.sessionID;
const scoreOwner = document.querySelector(".account__score-owner");
const payScoreUrl = `http://45.84.68.38:8082/system_api/?format=json&context=web&model=users&method1=web_cabinet.add_payment_operation&arg1={"suid":\"${sessionId}\","src_ip":"10.20.30.41", "contract_number": "${scoreId}", "summa_in": "100.00", "operator": "SBERBANK_ACQ"}`;
// scoreId.innerHTML = sessionObject.account;
// scorebalance.innerHTML = sessionObject.balance;
// scoreName.innerHTML = sessionObject.tariff;
// scoreOwner.innerHTML = sessionObject.name;
const payHistoryWrapper = document.getElementById("payHistoryWrapper");
const activeServicesWrapper = document.getElementById("activeServicesWrapper");
console.log(activeServicesWrapper);
const payHistoryBtn = document.getElementById("payHistoryBtn");
const allWrappers = document.querySelectorAll(".container-wrapper");
const allBtns = document.querySelectorAll(".btn");
const payHistoryUrl = `http://45.84.68.38:8082/system_api/?format=json&context=web&model=users&method1=web_cabinet.get_pay_log&arg1={"start_date":"01.01.2022","end_date":"01.01.2024","page_number":1,"per_page":50,"suid":\"${sessionId}\"}`;
const activeServicesBtn = document.getElementById("activeServicesBtn");
console.log(activeServicesBtn);
const servicesUrl = `http://45.84.68.38:8082/system_api/?format=json&context=web&model=users&method1=web_cabinet.get_usluga_list&arg1={"filter":"","get_user_uslugas_all":true,"get_user_uslugas":true,"get_setted":true,"suid":\"${sessionId}\"}`;
const regexCost = /\((.*?)руб/;
const regexName = /^[^:]+/;
const logoutBtn = document.getElementById("logoutBtn");
console.log(sessionId);

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

  console.log(215215215215215, fetchData);
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
      console.log(serviceHistory);
      return serviceHistory[1];
    });
  console.log(215215215215215, fetchData);
  const tableBody = document.getElementById("services-table-body");

  const myChildData = fetchData
    .map((element) => {
      const serviceName = element.__self;
      const serviceNameResult = serviceName.match(regexName)[0];
      const serviceCost = regexCost.exec(element.__self);
      const serviceCostResult = serviceCost ? serviceCost[1] + "руб" : null;
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
  location.href = "login.html";
  localStorage.clear();
});
