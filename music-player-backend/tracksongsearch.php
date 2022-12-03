<?php


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST,GET,DELETE");
header("Content-Type:application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization,X-Requested-With");


include "./dbconnection.php";

$search = $_GET["search"];



if ($search != "") {
    $query = "SELECT * FROM `track_songs` WHERE name LIKE '%$search%'";
} else {
    $query = "SELECT * FROM `track_songs`";
}

$sql = $conn->query($query);

$Results = array();

while ($row = $sql->fetch_object()) {

    array_push($Results, $row);
}

echo json_encode($Results);
