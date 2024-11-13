<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
//include '../no_auth/config.inc'; //change file path for config.inc if needed
// Create connection


//Define some constants in this PHP code block
$servername = 'localhost';
$username = 'root'; // Flashline username
$password = ''; // phpMyAdmin password
$dbname = 'hic'; // Flashline username

$id = '';
$user = $_POST['Username'];
$email = $_POST['Email'];
$pass = $_POST['Password'];
$theme = $_POST['Theme'];


//echo ("Hello from server: $user : $pass\n");

 $conn = new mysqli($servername, $username, $password, $dbname);
 // Check connection
 if ($conn->connect_error) {
   echo "Connection failed: " . $conn->connect_error;
 } else{
    echo "Success!";
 }




$sqlstatement = $conn->prepare("INSERT INTO user (ID, Username, Password, Email, Theme) values (?, ?, ?, ?, ?)"); //prepare the statement

if($sqlstatement){
    $sqlstatement->bind_param("sssss",$id,$user,$pass,$email,$theme); //insert the variables into the ? in the above statement
    $sqlstatement->execute(); //execute the query
    echo $sqlstatement->error; //print an error if the query fails
    $sqlstatement->close();
}else{
    echo "Statement Failed";
}


$conn->close();

 ?>