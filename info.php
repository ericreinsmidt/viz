<?php
	$file = $_GET["filename"];
	$url = "https://s3.amazonaws.com/cloud_test/".$file;
    $data = file_get_contents($url, "r");
    echo $data;
?>