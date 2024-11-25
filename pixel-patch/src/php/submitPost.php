<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
//include '../no_auth/config.inc'; //change file path for config.inc if needed
// Create connection

include "server.php";
//echo var_dump($_POST);

$id = '';
$title = $_POST['title'];
$dataSend = $_POST['dataSend'];
$data = implode(',', $dataSend);
$hashtags = $_POST['hashtags'];
$likes = 0;
$userID = $_POST['userID'];





$sqlstatement = $conn->prepare("INSERT INTO posts (ID, Title, Data, Hashtags, Likes, UserID) values (?, ?, ?, ?, ?, ?)"); //prepare the statement

if($sqlstatement){
    $sqlstatement->bind_param("ssssii",$id,$title,$data,$hashtags,$likes,$userID); //insert the variables into the ? in the above statement
    $sqlstatement->execute(); //execute the query
    if($sqlstatement->error){
        echo "Statement Error: ". $sqlstatement->error;
    }else{
        $id = mysqli_insert_id($conn);
        echo $id;
    } //print an error if the query fails
    
    $sqlstatement->close();
}else{
    echo "Statement Failed";
}


$conn->close();

?>