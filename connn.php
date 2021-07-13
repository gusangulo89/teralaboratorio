<?php
$servername = "SRV-CSM-AD:3308";
$username = "Investigacion06";
$password = "CSM2020#";

// Create connection
//$conn = new mysqli($servername, $username, $password);


$conn = new mysqli($servername, $username, $password, "tera");

// Check connection 
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>