<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
//include '../no_auth/config.inc'; //change file path for config.inc if needed
// Create connection

include "server.php";
//echo var_dump($_POST);

$ID = '18';





$sqlstatement = $conn->prepare("SELECT * from posts where ID=?"); //prepare the statement

if($sqlstatement){
    $sqlstatement->bind_param("s",$ID); //insert the variables into the ? in the above statement
    $sqlstatement->execute(); //execute the query
    echo $sqlstatement->error; //print an error if the query fails
    $result = $sqlstatement->get_result();
    $myArray = array();
    if($result){
      while ($row = $result->fetch_assoc()) {
        $myArray[] = $row;
      }
    }else{
      echo "No User Found";
    }
    echo json_encode($myArray);
    
    $sqlstatement->close();
}else{
    echo "Statement Failed";
}


$conn->close();

 ?>