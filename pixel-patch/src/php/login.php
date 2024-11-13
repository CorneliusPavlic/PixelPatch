<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
//include '../no_auth/config.inc'; //change file path for config.inc if needed
// Create connection


//Define some constants in this PHP code block
$servername = 'localhost';
$username = 'root'; // Flashline username
$password = ''; // phpMyAdmin password
$dbname = 'hic'; // Flashline username

$user = $_POST['Username'];
$pass = $_POST['Password'];


//echo ("Hello from server: $user : $pass\n");

 $conn = new mysqli($servername, $username, $password, $dbname);
 // Check connection
 if ($conn->connect_error) {
   echo "Connection failed: " . $conn->connect_error;
 } else{
    echo "Success!";
 }




$sqlstatement = $conn->prepare("SELECT ID from user where Username=? and Password=?"); //prepare the statement

if($sqlstatement){
    $sqlstatement->bind_param("ss",$user,$pass,); //insert the variables into the ? in the above statement
    $sqlstatement->execute(); //execute the query
    echo $sqlstatement->error; //print an error if the query fails
    $result = $sqlstatement->get_result();
    if($result){
      while ($row = $result->fetch_assoc()) {
        echo $row['ID'];
      }
    }else{
      echo "No User Found";
    }
    
    $sqlstatement->close();
}else{
    echo "Statement Failed";
}


$conn->close();

 ?>