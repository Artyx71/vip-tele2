<?php
if($_GET['req']) {
  header('Content-Type: application/json; charset=utf-8');
  $req = base64_decode($_GET['req']);
  $data = file_get_contents($req);
  echo $data;
}
else
  exit;
?>
