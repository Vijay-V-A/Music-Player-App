<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST,GET,DELETE");
header("Content-Type:application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization,X-Requested-With");


include "./dbconnection.php";

$sid = $_GET["sid"];
$plid = $_GET["plid"];

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {
    $query = "INSERT INTO `playlist_song`(`playlist_id`, `track_song_id`) VALUES ('$plid','$sid')";

    $sql = $conn->query($query);

    echo $sql;
} else if ($method == "DELETE") {

    $query_1 = "DELETE FROM `playlist_song` WHERE playlist_id = '$plid' AND  track_song_id = '$sid'";

    $sql_1 = $conn->query($query_1);

    echo $sql_1;
}
