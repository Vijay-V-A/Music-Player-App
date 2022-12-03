<?php
header('Access-Control-Allow-Origin: *');

include "./dbconnection.php";


$query = "SELECT playlist.id,playlist.PlayListName AS Pname,COUNT(playlist_song.track_song_id) AS song_count FROM `playlist`
LEFT JOIN playlist_song ON playlist_song.playlist_id = playlist.id
GROUP BY playlist.id";

$sql = $conn->query($query);

$Results = array();
while ($row = $sql->fetch_object()) {
    array_push($Results, $row);
}

echo json_encode($Results);
