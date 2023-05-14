const sessionId = localStorage.sessionID;
console.log(sessionId);
const servicesUrl = `http://45.84.68.38:8082/system_api/?format=json&context=web&model=users&method1=web_cabinet.get_usluga_list&arg1={"filter":"","get_user_uslugas_all":true,"get_user_uslugas":true,"get_setted":true,"suid":\"${sessionId}\"}`;

console.log(123, servicesUrl);
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
    return `
    <tr>
    <th scope="row">${element.__self}</th>
     <td>
     ${new Date(element.create_date).toLocaleDateString("en-GB")}
    </td>
      <td>2₽</td>
   </tr>
  `;
  })
  .join("");

tableBody.innerHTML = myChildData;
