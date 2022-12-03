<?php


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST,GET,DELETE");
header("Content-Type:application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization,X-Requested-With");


include "./dbconnection.php";


$plid = $_GET["plid"];




$query = "SELECT track_songs.* FROM `playlist_song`
     INNER JOIN track_songs ON track_songs.id = playlist_song.track_song_id
     WHERE playlist_id = $plid";


$sql = $conn->query($query);

$Results = array();


while ($row = $sql->fetch_object()) {
    array_push($Results, $row);
}

echo json_encode($Results);
