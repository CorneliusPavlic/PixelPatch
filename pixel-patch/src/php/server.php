<?php
//default database server connection
header('Access-Control-Allow-Origin: http://localhost:3000');
//include '../no_auth/config.inc'; //change file path for config.inc if needed
// Create connection


//Define some constants in this PHP code block
$servername = 'localhost';
$username = 'root'; // Flashline username
$password = ''; // phpMyAdmin password
$dbname = 'hic'; // Flashline username

 $conn = new mysqli($servername, $username, $password, $dbname);
 // Check connection
 if ($conn->connect_error) {
   echo "Connection failed: " . $conn->connect_error;
 } else{
    echo "Success!";
 }

 ?>