<?php
if($_GET['req']) {
  http_response_code(200); // OK
  header('Content-Type: application/json; charset=utf-8');
  $req = base64_decode($_GET['req']);
  $data = file_get_contents($req);
  echo $data;
}
elseif($_GET['payment']) {
  if(is_int($_GET['amount']) && is_int($_GET['orderNumber']))
  {
    $data = array(
      'userName' => 'P1513074909-api',
      'password' => 'VkP@35gE',
      'amount' => $_GET['amount'],
      'orderNumber' => $_GET['orderNumber'],
      'returnUrl' => 'http://45.84.68.38/cabinet/paycheck/?paysystem=sbrf_acq%26orderId=a8e38d00-6c0a-767e-8032-3c5c02480174%26lang=ru',
      'description' => "Оплата по договору VIP-900"
    );
  
    $paymentUrl = "https://securepayments.sberbank.ru/payment/rest/register.do?". http_build_query($data);
  
    header("Location: $paymentUrl");
  }
  else
    {
      http_response_code(400); // Bad Request
      header('Content-Type: application/json; charset=utf-8');
      echo `{"error": "Некорректные данные платежа"}`;
    }
}
else
  exit;
?>
