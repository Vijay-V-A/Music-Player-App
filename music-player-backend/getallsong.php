<?php
header('Access-Control-Allow-Origin: *');

include "./dbconnection.php";


$query = "SELECT * FROM `track_songs`";

$sql = $conn->query($query);

$Results = array();
while ($row = $sql->fetch_object()) {
    array_push($Results, $row);
}

echo json_encode($Results);
