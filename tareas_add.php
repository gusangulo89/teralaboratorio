<?php 

include("includes/conexion.php");

if (isset($_POST['guardar_tarea'])){

$iniciales = $_POST['usr'];
$tarea = $_POST['tarea'];
$estatus = $_POST['estatus'];
$observaciones = $_POST['observaciones'];



$query="INSERT INTO `tareas` (`id`, `usr`, `tarea`, `creado_el`, `estatus_tarea`, `observaciones`) VALUES (NULL, '$iniciales', '$tarea', current_timestamp(), '$estatus', '$observaciones')";
$result = mysqli_query($conn, $query);

if (!$result) {
	die("query failed");

}

$_SESSION['message'] = 'Tarea agregada exitosamente!';
$_SESSION['message_type'] = 'success';

header("Location: tareas.php");

}

 ?>