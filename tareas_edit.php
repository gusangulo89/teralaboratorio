<?php 

require "includes/conexion.php";

if (isset($_GET['id'])) {
	$id = $_GET['id'];
	$query = "SELECT * FROM tareas WHERE id = $id";
	$result = mysqli_query($conn, $query);

	if(mysqli_num_rows($result) == 1) {
		$row = mysqli_fetch_array($result);
		$usr = $row['usr'];
		$tarea = $row['tarea'];
		$estatus_tarea = $row['estatus_tarea'];
		$observaciones = $row['observaciones'];

	}
}

if(isset($_POST['update'])) {
	$id = $_GET['id'];
	$usr = $_POST['usr'];
	$tarea = $_POST['tarea'];
	$estatus_tarea = $_POST['estatus_tarea'];
	$observaciones = $_POST['observaciones'];

$query = "UPDATE tareas set usr = '$usr', tarea = '$tarea', estatus_tarea= '$estatus_tarea', observaciones = '$observaciones' WHERE id = $id";
mysqli_query($conn, $query);
header("Location:tareas.php");

$_SESSION['message']='Task Updated successfully';
$_SESSION['message_type']='warning';



}

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="addons/bootstrap/css/bootstrap.min.css">
	        <link href="addons/styles.css" rel="stylesheet" />
	<link rel="stylesheet" href="addons/fontawesome/css/all.min.css">
        <link  rel="icon"   href="images/TERA_lines.png" type="image/png" />
</head>
	<!-- BARRA SUPERIOR -->

		<body class="sb-nav-fixed">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <!-- Navbar Brand-->
            <a class="navbar-brand ps-3" href="index.php">CSM - PANDORA</a>


            <!-- Sidebar Toggle   order-1 order-lg-0 me-4 me-lg-0           -->
            <button class="btn btn-link btn-sm" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="index.php"><i class="fas fa-columns"></i> Dashboard</a>
                </li>
                <li>
                    <a class="nav-link" href="calendario.php"><i class="far fa-calendar"></i> Calendario</a>
                </li>
                <li>
                    <a class="nav-link" href="minutas.php"><i class="far fa-handshake"></i> Minutas</a>
                </li>
            </ul>

            
            <!-- Navbar Search
            <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div class="input-group">
                    <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
                </div>
            </form> -->
            <!-- Navbar-->
            <ul class="navbar-nav ms-auto me-0 me-md-3 my-2 my-md-0">
                <li class="nav-item dropdown">

                   <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> <?php echo $nombre; ?>   <i class="fas fa-user fa-fw"></i></a> 


                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <!--<li><a class="dropdown-item" href="#!">Settings</a></li> -->
                        <!--<li><a class="dropdown-item" href="#!">Activity Log</a></li>-->
                        <!-- <li><hr class="dropdown-divider" /></li> -->
                        <li><a class="dropdown-item" href="#!">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <!-- <div class="sb-sidenav-menu-heading">Core</div>
                            <a class="nav-link" href="index.php">
                                <div class="sb-nav-link-icon"><i class="fas fa-chart-line"></i></div>
                                Dashboard
                            </a> -->

                            <div class="sb-sidenav-menu-heading">INVESTIGACION</div>
                            <a class="nav-link" href="index.php">
                                <div class="sb-nav-link-icon"><i class="far fa-folder-open"></i></div>
                                Proyectos
                            </a>
                             <a class="nav-link" href="index.php">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Etapas
                            </a>
                            <a class="nav-link" href="#!">
                                <div class="sb-nav-link-icon"><i class="fas fa-flask"></i></div>
                                Experimentos
                            </a>
                            <a class="nav-link" href="gastos.php">
                                <div class="sb-nav-link-icon"><i class="fas fa-money-bill-alt"></i></div>
                                Control de Gastos
                            </a>

                              <?php// } ?> <!-- Aqui termina el permiso del tipo 1-->

                            <div class="sb-sidenav-menu-heading">GENERALES</div>
                            <a class="nav-link" href="seguridad.php">
                                <div class="sb-nav-link-icon"><i class="fas fa-shield-alt"></i></div>
                                Auditorias de Seguridad
                            </a>
                            <a class="nav-link" href="ot.php">
                                <div class="sb-nav-link-icon"><i class="fas fa-tools"></i></div>
                                Ordenes de Trabajo
                            </a>
                            <a class="nav-link" href="#!">
                                <div class="sb-nav-link-icon"><i class="fas fa-shopping-cart"></i></div>
                                Requisiciones
                            </a>
                             <a class="nav-link" href="lecciones.php">
                                <div class="sb-nav-link-icon"><i class="fas fa-chalkboard-teacher"></i></div>
                                Lecciones aprendidas
                            </a>
                             <a class="nav-link active" href="tareas.php">
                                <div class="sb-nav-link-icon"><i class="fas fa-tasks"></i></div>
                                Tareas Generales
                            </a>
                        </div>
                    </div>
            </div>

<!-- AQUI VA EL CONTENIDO DE LA PAGINA -->


 <div id="layoutSidenav_content">
                <main>
                    <div class="row">
                        <div class="col-md-4">

                            <!--MENSAJE POPUP CUANDO SE GUARDA/MODIFICA O ELIMINA UN DATO --> 

                        <?php if (isset($_SESSION['message'])){    ?>
                            <div class="alert alert-<?=$_SESSION['message_type'];?> alert-dismissible fade show" role="alert">
                               <?=$_SESSION['message']   ?>                      
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>                      
                            </div>                                                
                        <?php session_unset();}  ?>                         
                        </div>                    
                    </div>                    






                    <div class="container-fluid px-4">
                        <div class="row">
                        <h1 class="mt-4 col-md-7"><i class="fas fa-tasks"></i> Tareas generales</h1>
                        <h5 class="mt-auto col-md-4 ms-auto">Pendientes <span class="badge bg-danger">

                            <?php 
                            $result = mysqli_query($conn, "SELECT * FROM tareas where estatus_tarea=1");
                            $row_cnt = mysqli_num_rows($result);
                            echo $row_cnt;
                             ?>



                        </span></h5>
                        <h5 class="mt-auto col-md-4 ms-auto">En Proceso <span class="badge bg-warning text-dark">
                            <?php 
                            $result = mysqli_query($conn, "SELECT * FROM tareas where estatus_tarea=2");
                            $row_cnt = mysqli_num_rows($result);
                            echo $row_cnt;
                             ?>
                        </span></h5>                         
                        </div>

                            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                              <div class="container-fluid">
                                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                                  <ul class="navbar-nav">
                                    <li class="nav-item">
                                      <a class="nav-link" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-plus"></i>Agregar</a>
                                    </li>
                                    <li class="nav-item dropdown">
                                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Por estatus
                                      </a>
                                      <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li><a class="dropdown-item" href="#">Pendientes <span class="badge bg-danger">  </span></a></li>
                                        <li><a class="dropdown-item" href="#">En Proceso <span class="badge bg-warning">  </span></a></li>
                                        <li><a class="dropdown-item" href="#">Terminadas <span class="badge bg-success">  </span></a></li>
                                      </ul>
                                    </li>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Por usuario
                                        </a>
                                         <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <li><a class="dropdown-item" href="#">SACD</a></li>
                                            <li><a class="dropdown-item" href="#">MML</a></li>
                                            <li><a class="dropdown-item" href="#">JPCH</a></li>
                                        </ul>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </nav>
                                        <div class="row">
                                            <div class="col-md-4">

                                                <!--MENSAJE POPUP CUANDO SE GUARDA/MODIFICA O ELIMINA UN DATO --> 

                                                <?php if (isset($_SESSION['message'])){    ?>
                                                    <div class="alert alert-<?=$_SESSION['message_type'];?> alert-dismissible fade show" role="alert">
                                                     <?=$_SESSION['message']   ?>
                                                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>
                                                <?php session_unset();}  ?> 
                                            </div>
                                        </div>


                        <div class="row px-4">
                            <div class="col-xl-px4">
                                <div class="card">
                                    
                                        <div class="collapse2" id="collapseExample">
                                          <div class="card card-body">
                                            <form action="tareas_edit.php?id=<?php echo $_GET['id']; ?>" method="POST">
                                                <div class="row">
                                                <div class="col-1">
                                                    <label for="usr">Usuario</label>
                                                        <select class="form-control form-control-sm" name="usr" >
                                                    <?php 
                                                    $query="SELECT * FROM usuarios WHERE idlogin=$usr";
                                                    $resultado = mysqli_query($conn, $query);
                                                   
                                                    while($row = mysqli_fetch_array($resultado)) { ?>
                                                          <option value="<?php echo $row['idlogin'] ?>"><?php echo $row['iniciales'] ?></option>
                                                      <?php } ?>
                                                        </select>                             
                                                </div>
                                                <div class="col-5">
                                                    <label for="tarea">Tarea</label>
                                                    <input type="text" name="tarea" class="form-control form-control-sm" id="tarea" value="<?php echo $tarea; ?>">
                                                </div>
                                                <div class="col-2">
                                                    <label for="estatus">Estatus</label>
                                                        <select class="form-control form-control-sm" name="estatus_tarea">
                                                    <?php 
                                                    $query="SELECT * FROM estatus";
                                                    $resultado = mysqli_query($conn, $query);
                                                   
                                                    while($row = mysqli_fetch_array($resultado)) { ?>
                                                          <option value="<?php echo $row['id'] ?>"><?php echo $row['nombre_estatus'] ?></option>
                                                      <?php } ?>
                                                        </select>
                                                </div>
                                                <div class="col-5">
                                                    <label for="Observaciones">Observaciones</label>
                                                    <input type="text" name="observaciones" class="form-control form-control-sm" placeholder="Escribe tus observaciones" value="<?php echo $observaciones; ?>">
                                                </div>

                                                </div>
                                                <div class="row">
                                                    <div class="col ms-auto p-2">
                                                    <button class="btn btn-secondary btn-sm" name="update">Update   
                                                    </button>
                                                 </div>
                                                </div>
                                                    
                                               

                                            </form>

                                            
                                          </div>
                                        </div>
                                    

                                </div>
                            </div>
                        </div>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active"></li>
                        </ol>
                        

                   </div>
                </main>
               


<!-- AQUI COMIENZA EL FOOTER-->

<?php include("includes/footer.php") ?>