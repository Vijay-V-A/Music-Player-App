<?php

header('Access-Control-Allow-Origin: *');
include "./dbconnection.php";

$file = $_POST["PlayList"];


$sql = $conn->query("INSERT INTO `playlist`(`PlayListName`) VALUES ('$file')");

echo $sql;
