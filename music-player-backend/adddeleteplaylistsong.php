<?php
header('Access-Control-Allow-Origin: *');

include "./dbconnection.php";

$data = $_GET['id'];


$query = "SELECT track_songs.*
          FROM `track_songs`
          LEFT JOIN playlist_song ON playlist_song.id = track_songs.id AND playlist_song.playlist_id = $data";

$query_1 = "SELECT track_song_id FROM `playlist_song` WHERE playlist_id = $data";


$sql = $conn->query($query);
$sql_1 = $conn->query($query_1);
$sids = array();
$Results = array();

while ($row_ = $sql_1->fetch_object()) {
    array_push($sids, $row_->track_song_id);
}

while ($row = $sql->fetch_object()) {
    if (in_array($row->id, $sids))
        $row->Added = "YES";
    else
        $row->Added = "NO";

    array_push($Results, $row);
}

echo json_encode($Results);
