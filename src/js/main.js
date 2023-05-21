const sessionObject = JSON.parse(localStorage.clientInfo);
const scorebalance = document.querySelector(".score-balance");
const scoreId = document.querySelector(".score-id");
const scoreName = document.querySelector(".account__score-naming");
const sessionId = localStorage.sessionID;
const scoreOwner = document.querySelector(".account__score-owner");
const payScoreUrl = `http://45.84.68.38:8082/system_api/?format=json&context=web&model=users&method1=web_cabinet.add_payment_operation&arg1={"suid":\"${sessionId}\","src_ip":"10.20.30.41", "contract_number": "${scoreId}", "summa_in": "100.00", "operator": "SBERBANK_ACQ"}`;
scoreId.innerHTML = sessionObject.account;
scorebalance.innerHTML = sessionObject.balance;
scoreName.innerHTML = sessionObject.tariff;
scoreOwner.innerHTML = sessionObject.name;

function payScoreEvent() {
  console.log(
    fetch("https://tele-com.vip/carbon/api.php?req=" + btoa(payScoreUrl))
  );
}
