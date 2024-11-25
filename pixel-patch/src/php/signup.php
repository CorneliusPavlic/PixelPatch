<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
//include '../no_auth/config.inc'; //change file path for config.inc if needed
// Create connection

include "server.php";

$id = '';
$user = $_POST['Username'];
$email = $_POST['Email'];
$pass = $_POST['Password'];
$theme = $_POST['Theme'];




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