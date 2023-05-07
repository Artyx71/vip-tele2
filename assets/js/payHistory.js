const sessionId = localStorage.sessionID;
console.log(sessionId);
const payHistoryUrl = `http://45.84.68.38:8082/system_api/?format=json&context=web&model=users&method1=web_cabinet.get_pay_log&arg1={"start_date":"01.01.2022","end_date":"01.01.2024","page_number":1,"per_page":50,"suid":\"${sessionId}\"}`;

console.log(123, payHistoryUrl);
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
     <th scope="row">${new Date(element.op_date).toLocaleDateString(
       "en-GB"
     )} </th>
      <td>${element.op_summa} ₽</td>
   </tr>
  `;
  })
  .join("");

console.log(215215215215215, fetchData);
tableBody.innerHTML = myChildData;
