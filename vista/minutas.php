

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="addons/bootstrap/css/bootstrap.min.css">
	        <link href="addons/styles.css" rel="stylesheet" />
	<link rel="stylesheet" href="addons/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="addons/datatable/css/dataTables.bootstrap4.min.css">
        <link  rel="icon"   href="images/TERA_lines.png" type="image/png" />
    <link href='fullcalendar/main.css' rel='stylesheet' />
    <script src='fullcalendar/main.js'></script>

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
                    <a class="nav-link active" href="minutas.php"><i class="far fa-handshake"></i> Minutas</a>
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
                    <a class="nav-link" data-toggle="dropdown" href="" aria-expanded="false">
                        <i class="fas fa-tasks"></i>
                        <span class="badge badge-danger navbar-badge">1</span>
                    </a>
                </li>

                <li class="nav-item dropdown">
                   <!-- <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> <?php // echo $name; ?>   <i class="fas fa-user fa-fw"></i></a>  -->

                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Usuario<i class="fas fa-user fa-fw"></i></a>
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
                             <a class="nav-link" href="tareas.php">
                                <div class="sb-nav-link-icon"><i class="fas fa-tasks"></i></div>
                                Tareas Generales
                            </a>
                        </div>
                    </div>
            </div>

<!-- AQUI COMIENZA EL CUERPO DE LA PAGINA -->


            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid">
                        <h1 class="mt-4"><i class="far fa-handshake"></i> Minutas de seguimiento</h1>
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                              <div class="container-fluid">
                                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                                  <ul class="navbar-nav">
                                    <li class="nav-item">
                                      <a class="nav-link" aria-current="page" href="#"><i class="fas fa-plus"></i> Agregar Minuta</a>
                                    </li>
                                  </ul>
                              </div>
                            </div>
                        </nav>
                     

                        <div class="row px-4">
                            <div class="col-xl-10">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <i class="fas fa-chart-area me-1"></i>
                                        Ultimas minutas
                                    </div>
                                    <div class="card-body"></div>
                                </div>
                            </div>
                            <div class="col-xl-2">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <i class="fas fa-chart-bar me-1"></i>
                                        Minutas por area
                                    </div>
                                    <div class="card-body">
                                        <div class="container">
                                            <div class="row">
                                                <div class="col text-end">
                                                    Ventas
                                                </div>
                                                <div class="col">
                                                    3
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                 

                        <div class="col-xl">
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                Ultimos experimentos
                            </div>
                                
                              
                                <div class="card-body">
                                    <table id="datatablesSimple">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <tr>
                                                <td>Tiger Nixon</td>
                                                <td>System Architect</td>
                                                <td>Edinburgh</td>
                                                <td>61</td>
                                                <td>2011/04/25</td>
                                                <td>$320,800</td>
                                            </tr>
                                            <tr>
                                                <td>Garrett Winters</td>
                                                <td>Accountant</td>
                                                <td>Tokyo</td>
                                                <td>63</td>
                                                <td>2011/07/25</td>
                                                <td>$170,750</td>
                                            </tr>
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

    

<!-- AQUI COMIENZA EL FOOTER-->
<?php include("includes/footer.php") ?>