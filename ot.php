<?php 

require "includes/conexion.php";


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
            <!-- Navbar Brand LOGO TERA -->



            <a class="navbar-brand ps-3" href="index.php">
                    <img src="images/tera_logo.svg" alt="" width="180" height="30">
            </a>


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
                        <li><a class="dropdown-item" href="logout.php">Logout</a></li>
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
                            <a class="nav-link active" href="ot.php">
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
                             <a class="nav-link" href="tareas.php">
                                <div class="sb-nav-link-icon"><i class="fas fa-tasks"></i></div>
                                Tareas Generales
                            </a>
                        </div>
                    </div>
            </div>

<!-- AQUI VA EL CONTENIDO DE LA PAGINA -->


 <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <div class="row">
                        <h1 class="mt-4 col-md-7"><i class="fas fa-tools"></i> Ordenes de Trabajo</h1>
                        <h5 class="mt-auto col-md-4 ms-auto">Pendientes <span class="badge bg-danger">
                            
                            <?php 
                            $result = mysqli_query($conn, "SELECT * FROM ot where nombre_estatus_ot=1");
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
                                      <a class="nav-link" aria-current="page" href="#"><i class="fas fa-plus"></i>Agregar</a>
                                    </li>
                                    <li class="nav-item">
                                      <a class="nav-link" aria-current="page" href="#"><i class="far fa-envelope"></i> Enviar</a>
                                    </li>
                                    <li class="nav-item dropdown">
                                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Exportar
                                      </a>
                                      <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li><a class="dropdown-item" href="#"><i class="far fa-file-excel"></i>Excel XLSX</a></li>
                                        <li><a class="dropdown-item" href="#"><i class="far fa-file-pdf"></i>PDF</a></li>
                                        <li><a class="dropdown-item" href="#"><i class="fas fa-print"></i>Imprimir</a></li>
                                      </ul>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </nav>

                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active"></li>
                        </ol>

                        <div class="row px-4">
                            <div class="col-xl">
                                        <div id="accordion">
                                              <div class="card">
                                                <div class="card-header" id="headingOne">
                                                  <h5 class="mb-0">
                                                    <button class="btn btn-sm" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                      Agregar OT
                                                    </button>
                                                  </h5>
                                                </div>

                                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                                  <div class="card-body">
                                                    Aqui va el formulario para agregar la OT
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>


               



                        <div class="row px-4">
                            <div class="col-xl">
                                <div class="card mb-4">
                                        <div class="card-header">
                                        <i class="fas fa-table me-1"></i>
                                            Matriz
                                        </div>
                                    
                                        <div class="card-body">
                                            <table id="datatablesSimple">
                                                <thead>
                                                    <tr>
                                                        <th>Codigo OT</th>
                                                        <th>Area</th>
                                                        <th>Descripcion</th>
                                                        <th>Creado el</th>
                                                        <th>Usuario</th>
                                                        <th>Estatus</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Codigo OT</th>
                                                        <th>Area</th>
                                                        <th>Descripcion</th>
                                                        <th>Creado el</th>
                                                         <th>Usuario</th>
                                                        <th>Estatus</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    <?php 
                                                    $query="SELECT ot.codigo_sai, areas.nombre_area, ot.descripcion_ot, ot.creado_el, usuarios.iniciales, estatus.nombre_estatus FROM ot LEFT JOIN usuarios ON ot.usuario=usuarios.idlogin LEFT JOIN estatus ON ot.nombre_estatus_ot=estatus.id LEFT JOIN areas ON ot.area=areas.id";
                                                    $resultado = mysqli_query($conn, $query);

                                                    while($row = mysqli_fetch_array($resultado)) { ?>

                                                   <tr>
                                                        <td> <?php echo $row['codigo_sai'] ?> </td>
                                                        <td><?php echo $row['nombre_area'] ?></td>
                                                        <td><?php echo $row['descripcion_ot'] ?></td>
                                                        <td><?php echo $row['creado_el'] ?></td>
                                                        <td><?php echo $row['iniciales'] ?></td>
                                                        <td><span class="badge
                                                        <?php
                                                            if ($row['nombre_estatus']=='Pendiente'){
                                                                echo " bg-danger";
                                                                } else if ($row['nombre_estatus']=='En Proceso') {
                                                                echo " bg-warning text-dark";
                                                            } else if ($row['nombre_estatus']=='Terminado'){
                                                                echo " bg-success";
                                                            } ?>

                                                            "><?php echo $row['nombre_estatus'] ?></span></td>
                                                        <td><a href="#!"><i class="far fa-edit"></i></a></td>
                                                    </tr>
                                                <?php } ?>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </main>
               


<!-- AQUI COMIENZA EL FOOTER-->
<?php include("includes/footer.php") ?>