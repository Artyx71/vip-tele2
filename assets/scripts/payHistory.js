const sessionId = JSON.parse(sessionStorage.sessionID);
console.log(sessionId);
const payHistoryUrl = `45.84.68.38:8082/system_api/?format=json&context=web&model=users&method1=web_cabinet.get_pay_log&arg1={"start_date":"01.01.2022","end_date":"01.01.2024","page_number":1,"per_page":50,"suid":\"${sessionId}\"}"}`;

console.log(123, payHistoryUrl);

fetch("https://tele-com.vip/carbon/api.php?req=" + btoa(payHistoryUrl))
  .then((response) => console.log(response.json()))
  .then((payHistory) => {
    if (!payHistory.error) {
      console.log("payHistory", payHistory);
      const paymentDate = payHistory.create_date;
      const payHistoryObject = {
        paymentDate: paymentDate,
      };

      sessionStorage.setItem("payHistory", JSON.stringify(payHistoryObject));
    } else {
      console.error(payHistory.error);
    }
  });
