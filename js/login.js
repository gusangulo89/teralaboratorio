/* Este es un JS para el procesamiento del inicio de sesión
    10 de Enero de 2020.
*/

/*Inicio de sesión */

function iniciarSesion() {
    var username = $("#username").val();
    var password = $("#password").val();
    if (username == "") {
        $("#username").css({ "background": "red" });
        $("#username").attr("placeholder", "Este campo no puede estar vac\u00EDo");
        $("#password").css({ "background": "rgba(0, 0, 0, .3)" });
        toastr["error"]("Por favor indique su nombre de usuario.", "Error");


    } else if (password == "") {
        $("#password").css({ "background": "red" });
        $("#password").attr("placeholder", "Este campo no puede estar vac\u00EDo");
        $("#username").css({ "background": "rgba(0, 0, 0, .3)" });
        toastr["error"]("Por favor indique su contrase\u00F1a.", "Error");
    } else {
        $("#username").css({ "background": "rgba(0, 0, 0, .3)" });
        $("#password").css({ "background": "rgba(0, 0, 0, .3)" });
        var datUsuario = {
            "username": username,
            "password": password
        }
        $.ajax({
                type: "POST",
                url: "controlador/procesaUsuario.php",
                dataType: "json",
                data: datUsuario
            })
            .done(function(respuestaUsuario, txtStatus, jqXHR) {
                if (respuestaUsuario.password == false) {
                    toastr["error"]("La contrase\u00F1a introducida es incorrecta, verifique por favor.", "Error");
                    $("#password").css({ "background": "red" });
                    $("#password").focus();


                } else {
                    $("#username").val("");
                    $("#password").val("");
                    window.location = "dashboard.php";
                }

            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                toastr["error"]("El usuario ingresado no est\u00E1 registrado en el sistema.", "Error");
            });
        // console.clear();
    }
    //alert("mensaje de prueba");
}

/*Cerrar de sesión */
function cerrarSesion() {
    $.ajax({
            type: "POST",
            url: "controlador/logout.php",
            dataType: "json",
        })
        .done(function(respuestaUsuario, txtStatus, jqXHR) {
            if (respuestaUsuario.resp == true) {
                window.location = "index.php";
                toastr["success"]("Cierre de sesi\u00F3n satisfactorio.", "Correcto.");
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se puede completar el cierre de sesi\u00F3n, verifique con el administrador del sistema.", "Error");
        });
}