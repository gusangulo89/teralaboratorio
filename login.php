<?php 
require "conexion.php"; 

SESSION_START();

if($_POST){
$usuario=$_POST['usuario'];
$password=$_POST['password'];

$sql  ="SELECT idlogin, password, tipo_usuario, nombre, iniciales FROM usuarios WHERE usuario='$usuario'";
$resultado=mysqli_query($conn, $sql);
$num=mysqli_num_rows($resultado);

if($num>0){
    $row=$resultado->fetch_assoc();
    $password_bd=$row['password'];

    $pass_c=sha1($password);

    if($password_bd ==$pass_c){
        $_SESSION['nombre']=$row['nombre'];
        $_SESSION['idlogin']=$row['idlogin'];
        $_SESSION['iniciales']=$row['iniciales'];
        $_SESSION['tipo_usuario']=$row['tipo_usuario'];

        header("Location: index.php");

    }else {
        echo "la contraseña no coincide";
    }
}else{
    echo "No existe usuario";
}

}

?>


<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>CSM - PANDORA</title>
        <link href="addons/styles.css" rel="stylesheet" />
        <link rel="stylesheet" href="addons/bootstrap/css/bootstrap.min.css">
        <script src="addons/fontawesome/js/all.min.js" crossorigin="anonymous"></script>
    </head>
    <body class="bg-dark">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                                    <div class="card-body">
                                        <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                                             <div class="form-floating mb-3">
                                                <input class="form-control" name="usuario" type="inputEmail"><label>Usuario</label>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input class="form-control" name="password" id="inputPassword" type="password" placeholder="Password" />
                                                <label for="inputPassword">Password</label>
                                            </div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                <label class="form-check-label" for="inputRememberPassword">Remember Password</label>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a class="small" href="password.html">Forgot Password?</a>
                                                <button class="btn btn-secondary" type="submit" >Login</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; CSM - PANDORA 2021</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
    </body>
</html>
