

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
    <link href='addons/fullcalendar/lib/main.css' rel='stylesheet' />
        <link  rel="icon"   href="images/TERA_lines.png" type="image/png" />
    <script src='addons/fullcalendar/lib/main.js'></script>
<script>

  document.addEventListener('DOMContentLoaded', function() {
    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendar.Draggable;

    var containerEl = document.getElementById('external-events');
    var calendarEl = document.getElementById('calendar');
    var checkbox = document.getElementById('drop-remove');

    // initialize the external events
    // -----------------------------------------------------------------

    new Draggable(containerEl, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText
        };
      }
    });

    // initialize the calendar
    // -----------------------------------------------------------------

    var calendar = new Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      droppable: true, // this allows things to be dropped onto the calendar
      drop: function(info) {
        // is the "remove after drop" checkbox checked?
        if (checkbox.checked) {
          // if so, remove the element from the "Draggable Events" list
          info.draggedEl.parentNode.removeChild(info.draggedEl);
        }
      }
    });

    calendar.render();
  });

</script>



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
                    <a class="nav-link active" href="calendario.php"><i class="far fa-calendar"></i> Calendario</a>
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
                            <h1 class="mt-4"><i class="far fa-calendar-alt"></i> Calendario de Actividades</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Dashboard</li>
                            </ol>


                            <div class="row px-4">
                                <div class="col-xl-2">
                                    <div class="card mb-4">
                                        <div class="card-header">
                                            EVENTOS
                                        </div>
                                        <div class="card-body">
                                            <div id=external-events>
                                                    <div class='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
                                                      <div class='fc-event-main'>Capacitación</div>
                                                    </div>
                                                    <div class='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
                                                      <div class='fc-event-main'>Prueba Piloto</div>
                                                    </div>
                                                    <div class='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
                                                      <div class='fc-event-main'>Prueba en Planta</div>
                                                    </div>
                                                    <p>
                                                        <input type='checkbox' id='drop-remove' />
                                                        <label for='drop-remove'>Remove after drop</label>
                                                        </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-10">
                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="calendar-container">
                                            <div id=calendar></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                        </div>
                    </div>
                </main>

    

<!-- AQUI COMIENZA EL FOOTER-->
<?php include("includes/footer.php") ?>