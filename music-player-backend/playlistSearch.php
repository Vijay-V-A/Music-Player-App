<?php


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST,GET,DELETE");
header("Content-Type:application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization,X-Requested-With");


include "./dbconnection.php";

$search = $_GET["search"];
$plid = $_GET["plid"];


if ($search != "") {
    $query = "SELECT track_songs.* FROM `track_songs` 
    LEFT JOIN playlist_song ON playlist_song.id = track_songs.id AND playlist_song.playlist_id = $plid 
    WHERE track_songs.name LIKE '%$search%'";
} else {
    $query = "SELECT track_songs.*
              FROM `track_songs`
              LEFT JOIN playlist_song ON playlist_song.id = track_songs.id AND playlist_song.playlist_id = $plid";
}

$query_1 = "SELECT track_song_id FROM `playlist_song` WHERE playlist_id = $plid";


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
