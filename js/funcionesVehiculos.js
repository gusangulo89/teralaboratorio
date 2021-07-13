/****** MODULO DE VEHICULOS ********/
$("#datosVehiculo").on('hidden.bs.modal', function() {
    $("#guardarDatosVeh-btn").prop("disabled", true);
    $("#vehudp-matricula").prop("readonly", true);
    $("#vehudp-serie").prop("readonly", true);
    $("#vehudp-marca").prop("readonly", true);
    $("#vehudp-tipo").prop("readonly", true);
    $("#vehudp-modelo").prop("readonly", true);
    $("#vehudp-color").prop("readonly", true);
    $("#vehudp-placa").prop("readonly", true);
    $("#vehudp-fechaUmantto").prop("readonly", true);
    $("#vehudp-KMUmantto").prop("readonly", true);
    $("#vehudp-km").prop("readonly", true);
    $("#vehudp-km-mantto").prop("readonly", true);
    $("#vehudp-periodo-mantto").prop("readonly", true);
    $("#vehudp-situacion").attr('disabled', 'disabled');
    $("#vehudp-ubicacion").prop("readonly", true);
    $("#vehudp-status").attr('disabled', 'disabled');
    $("#vehudp-observaciones").prop("readonly", true);
    $("#vehudp-matricula").val("");
    $("#vehudp-serie").val("");
    $("#vehudp-marca").val("");
    $("#vehudp-tipo").val("");
    $("#vehudp-modelo").val("");
    $("#vehudp-color").val("");
    $("#vehudp-placa").val("");
    $("#vehudp-fechaUmantto").val("");
    $("#vehudp-KMUmantto").val("");
    $("#vehudp-km").val("");
    $("#vehudp-km-mantto").val("");
    $("#vehudp-periodo-mantto").val("");
    $("#vehudp-situacion").val("");
    $("#vehudp-ubicacion").val("");
    $("#vehudp-status").val("");
    $("#vehudp-observaciones").val("");
});

$("#modalCapturaVehiculo").on('hidden.bs.modal', function() {
    $("#veh-matricula").val("");
    $("#veh-serie").val("");
    $("#veh-marca").val("");
    $("#veh-tipo").val("");
    $("#veh-modelo").val("");
    $("#veh-color").val("");
    $("#veh-placa").val("");
    $("#veh-fechaUmantto").val("");
    $("#veh-KMUmantto").val("");
    $("#veh-km").val("");
    $("#veh-km-mantto").val("");
    $("#veh-periodo-mantto").val("");
    $("#veh-situacion").val("");
    $("#veh-ubicacion").val("");
    $("#veh-status").val("");
    $("#veh-foto").val("");
    $("#veh-observaciones").val("");
});

function limpiarCatalogoVehiculos() {
    //Destruyo el catalogo
    location.reload();
}

function cargaCatalogo() {
    $('#tableVehiculos').dataTable({
        "bAutoWidth": false,
        "destroy": true,
        "language": {
            "url": "json/spanish.json"
        }
    });
}

function agregarVehiculo() {
    $("#veh-matricula").focus();
    $("#modalCapturaVehiculo").modal("show");

}

function existenciaMatricula(tipoOP) {
    if (tipoOP == 1) {
        let matricula = $("#vehudp-matricula").val();
        var datos = {
            "matricula": matricula
        }

        $.ajax({
                type: "POST",
                url: "controlador/getVehiculoMatricula.php",
                dataType: "json",
                data: datos
            })
            .done(function(vehiculo, txtStatus, jqXHR) {
                if (vehiculo.cantidad >= 1) {
                    toastr["warning"]("Ya existe un veh\u00EDculo con esta matr\u00EDcula: " + matricula, "Error");
                    $("#vehudp-matricula").css({ "border-color": "red" });
                    $("#vehudp-matricula").focus();
                } else {
                    $("#vehudp-matricula").css({ "border-color": "green" });
                }

            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                toastr["error"]("No se pueden consultar la informaci\u00F3n, verifique con el administrador.", "Error");
            });
    } else if (tipoOP == 2) {
        let matricula = $("#veh-matricula").val();
        var datos = {
            "matricula": matricula
        }

        $.ajax({
                type: "POST",
                url: "controlador/getVehiculoMatricula.php",
                dataType: "json",
                data: datos
            })
            .done(function(vehiculo, txtStatus, jqXHR) {
                if (vehiculo.cantidad >= 1) {
                    toastr["warning"]("Ya existe un veh\u00EDculo con esta matr\u00EDcula: " + matricula, "Error");
                    $("#veh-matricula").css({ "border-color": "red" });
                    $("#veh-matricula").focus();
                } else {
                    $("#veh-matricula").css({ "border-color": "green" });
                }

            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                toastr["error"]("No se pueden consultar la informaci\u00F3n, verifique con el administrador.", "Error");
            });
    }

}

function consultarDatosVehiculo(matricula) {
    var datosVeh = {
        "matricula": matricula
    }

    $.ajax({
            type: "POST",
            url: "controlador/getVehiculo.php",
            dataType: "json",
            data: datosVeh
        })
        .done(function(vehiculo, txtStatus, jqXHR) {
            $("#vehudp-matricula").val(vehiculo.matricula);
            $("#vehudp-serie").val(vehiculo.serie);
            $("#vehudp-marca").val(vehiculo.marca);
            $("#vehudp-tipo").val(vehiculo.tipo);
            $("#vehudp-modelo").val(vehiculo.modelo);
            $("#vehudp-color").val(vehiculo.color);
            $("#vehudp-placa").val(vehiculo.placa);
            $("#vehudp-fechaUmantto").val(vehiculo.fechaultmanto);
            $("#vehudp-KMUmantto").val(vehiculo.kmultmanto);
            $("#vehudp-km").val(vehiculo.kilometraje);
            $("#vehudp-km-mantto").val(vehiculo.mantenimientokm);
            $("#vehudp-periodo-mantto").val(vehiculo.mantoperiodo);
            $("#vehudp-situacion").val(vehiculo.sitoperativa);
            $("#vehudp-ubicacion").val(vehiculo.ubicacion);
            $("#vehudp-status").val(vehiculo.estatus);
            $("#vehudp-observaciones").val(vehiculo.observaciones);
            $("#datosVehiculo").modal("show");

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se puede guardar los datos del vehículo, error : ", "Error");
        });


}

function actualizarVehiculo() {
    var matricula = $("#vehudp-matricula").val();
    var serie = $("#vehudp-serie").val();
    var marca = $("#vehudp-marca").val();
    var tipo = $("#vehudp-tipo").val();
    var modelo = $("#vehudp-modelo").val();
    var color = $("#vehudp-color").val();
    var placa = $("#vehudp-placa").val();
    var fechaultmanto = $("#vehudp-fechaUmantto").val();
    var kmultmanto = $("#vehudp-KMUmantto").val();
    var kilometraje = $("#vehudp-km").val();
    var mantenimientokm = $("#vehudp-km-mantto").val();
    var mantoperiodo = $("#vehudp-periodo-mantto").val();
    var sitoperativa = $("#vehudp-situacion").val();
    var ubicacion = $("#vehudp-ubicacion").val();
    var observaciones = $("#vehudp-observaciones").val();
    var estatus = $("#vehudp-status").val();

    var datosUDPveh = {
        "matricula": matricula,
        "serie": serie,
        "marca": marca,
        "tipo": tipo,
        "modelo": modelo,
        "color": color,
        "placa": placa,
        "fechaultmanto": fechaultmanto,
        "kmultmanto": kmultmanto,
        "kilometraje": kilometraje,
        "mantenimientokm": mantenimientokm,
        "mantoperiodo": mantoperiodo,
        "sitoperativa": sitoperativa,
        "ubicacion": ubicacion,
        "observaciones": observaciones,
        "estatus": estatus
    }

    //Código de Ajax para actualizar el vehículo.
    $.ajax({
            type: "POST",
            url: "controlador/setUpdateVehiculo.php",
            dataType: "json",
            data: datosUDPveh
        })
        .done(function(vehiculo, txtStatus, jqXHR) {
            $("#vehudp-matricula").val("");
            $("#vehudp-serie").val("");
            $("#vehudp-marca").val("");
            $("#vehudp-tipo").val("");
            $("#vehudp-modelo").val("");
            $("#vehudp-color").val("");
            $("#vehudp-placa").val("");
            $("#vehudp-fechaUmantto").val("");
            $("#vehudp-KMUmantto").val("");
            $("#vehudp-km").val("");
            $("#vehudp-km-mantto").val("");
            $("#vehudp-periodo-mantto").val("");
            $("#vehudp-situacion").val("");
            $("#vehudp-ubicacion").val("");
            $("#vehudp-status").val("");
            $("#vehudp-observaciones").val("");
            $("#datosVehiculo").modal("hide");
            toastr["success"]("Datos del veh\u00EDculo actualizados correctamente", "\u00C9xito");
            setTimeout(function() {
                location.reload();
            }, 2500);



        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se puede guardar los datos del veh\u00EDculo, error : ", "Error");
        });
}

function guardarVehiculo() {
    var vehmatricula = $("#veh-matricula").val();
    var vehserie = $("#veh-serie").val();
    var vehmarca = $("#veh-marca").val();
    var vehtipo = $("#veh-tipo").val();
    var vehmodelo = $("#veh-modelo").val();
    var vehcolor = $("#veh-color").val();
    var vehplacas = $("#veh-placa").val();
    var vehfechaultmantto = $("#veh-fechaUmantto").val();
    var vehkmultmantto = $("#veh-KMUmantto").val();
    var vehkilometraje = $("#veh-km").val();
    var vehserkmmantto = $("#veh-km-mantto").val();
    var vehserperiodo = $("#veh-periodo-mantto").val();
    var vehsituacion = $("#veh-situacion").val();
    var vehubicacion = $("#veh-ubicacion").val();
    var vehstatus = $("#veh-status").val();
    var vehfoto = $("#veh-foto").val();
    var vehobservaciones = $("#veh-observaciones").val();

    if (vehmatricula == 0 || vehmatricula == null || vehmatricula == "") {
        toastr["warning"]("Indique la matrícula del vehículo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "red" });
    } else if (vehserie == 0 || vehserie == null || vehserie == "") {
        toastr["warning"]("Indique el n&uacute;mero de serie del vehículo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "red" });
    } else if (vehmarca == 0 || vehmarca == null || vehmarca == "") {
        toastr["warning"]("Indique la marca del vehículo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "green" });
        $("#veh-marca").css({ "border-color": "red" });
    } else if (vehtipo == 0 || vehtipo == null || vehtipo == "") {
        toastr["warning"]("Indique el tipo de veh&iacute;culo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "green" });
        $("#veh-marca").css({ "border-color": "green" });
        $("#veh-tipo").css({ "border-color": "red" });
    } else if (vehmodelo == 0 || vehmodelo == null || vehmodelo == "") {
        toastr["warning"]("Indique el modelo del veh&iacute;culo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "green" });
        $("#veh-marca").css({ "border-color": "green" });
        $("#veh-tipo").css({ "border-color": "green" });
        $("#veh-modelo").css({ "border-color": "red" });
    } else if (vehcolor == 0 || vehcolor == null || vehcolor == "") {
        toastr["warning"]("Indique el color del veh&iacute;culo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "green" });
        $("#veh-marca").css({ "border-color": "green" });
        $("#veh-tipo").css({ "border-color": "green" });
        $("#veh-modelo").css({ "border-color": "green" });
        $("#veh-color").css({ "border-color": "red" });
    } else if (vehplacas == 0 || vehplacas == null || vehplacas == "") {
        toastr["warning"]("Indique las placas de &aacute;mbito c&iacute;vil del veh&iacute;culo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "green" });
        $("#veh-marca").css({ "border-color": "green" });
        $("#veh-tipo").css({ "border-color": "green" });
        $("#veh-modelo").css({ "border-color": "green" });
        $("#veh-color").css({ "border-color": "green" });
        $("#veh-placa").css({ "border-color": "red" });
    } else if (vehfechaultmantto == 0 || vehfechaultmantto == null || vehfechaultmantto == "") {
        toastr["warning"]("Indique la fecha de &uacute;ltimo mantenimiento del veh&iacute;culo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "green" });
        $("#veh-marca").css({ "border-color": "green" });
        $("#veh-tipo").css({ "border-color": "green" });
        $("#veh-modelo").css({ "border-color": "green" });
        $("#veh-color").css({ "border-color": "green" });
        $("#veh-placa").css({ "border-color": "green" });
        $("#veh-fechaUmantto").css({ "border-color": "red" });
    } else if (vehkmultmantto == 0 || vehkmultmantto == null || vehkmultmantto == "") {
        toastr["warning"]("Indique el kilometraje al momento del &uacute;ltimo mantenimiento del veh&iacute;culo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "green" });
        $("#veh-marca").css({ "border-color": "green" });
        $("#veh-tipo").css({ "border-color": "green" });
        $("#veh-modelo").css({ "border-color": "green" });
        $("#veh-color").css({ "border-color": "green" });
        $("#veh-placa").css({ "border-color": "green" });
        $("#veh-fechaUmantto").css({ "border-color": "green" });
        $("#veh-KMUmantto").css({ "border-color": "red" });
    } else if (vehkilometraje == 0 || vehkilometraje == null || vehkilometraje == "") {
        toastr["warning"]("Indique el kilometraje actual del veh&iacute;culo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "green" });
        $("#veh-marca").css({ "border-color": "green" });
        $("#veh-tipo").css({ "border-color": "green" });
        $("#veh-modelo").css({ "border-color": "green" });
        $("#veh-color").css({ "border-color": "green" });
        $("#veh-placa").css({ "border-color": "green" });
        $("#veh-fechaUmantto").css({ "border-color": "green" });
        $("#veh-KMUmantto").css({ "border-color": "green" });
        $("#veh-km").css({ "border-color": "red" });
    } else if (vehserkmmantto == 0 || vehserkmmantto == null || vehserkmmantto == "") {
        toastr["warning"]("Indique el kilometraje para aplicaci&oacute;n de servicio del veh&iacute;culo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "green" });
        $("#veh-marca").css({ "border-color": "green" });
        $("#veh-tipo").css({ "border-color": "green" });
        $("#veh-modelo").css({ "border-color": "green" });
        $("#veh-color").css({ "border-color": "green" });
        $("#veh-placa").css({ "border-color": "green" });
        $("#veh-fechaUmantto").css({ "border-color": "green" });
        $("#veh-KMUmantto").css({ "border-color": "green" });
        $("#veh-km").css({ "border-color": "green" });
        $("#veh-km-mantto").css({ "border-color": "red" });
    } else if (vehserperiodo == 0 || vehserperiodo == null || vehserperiodo == "") {
        toastr["warning"]("Indique el periodo en meses para aplicaci&oacute;n de servicio del veh&iacute;culo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "green" });
        $("#veh-marca").css({ "border-color": "green" });
        $("#veh-tipo").css({ "border-color": "green" });
        $("#veh-modelo").css({ "border-color": "green" });
        $("#veh-color").css({ "border-color": "green" });
        $("#veh-placa").css({ "border-color": "green" });
        $("#veh-fechaUmantto").css({ "border-color": "green" });
        $("#veh-KMUmantto").css({ "border-color": "green" });
        $("#veh-km").css({ "border-color": "green" });
        $("#veh-km-mantto").css({ "border-color": "green" });
        $("#veh-periodo-mantto").css({ "border-color": "red" });
    } else if (vehsituacion == 0 || vehsituacion == null || vehsituacion == "") {
        toastr["warning"]("Indique la situaci&oacute;n actual del veh&iacute;culo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "green" });
        $("#veh-marca").css({ "border-color": "green" });
        $("#veh-tipo").css({ "border-color": "green" });
        $("#veh-modelo").css({ "border-color": "green" });
        $("#veh-color").css({ "border-color": "green" });
        $("#veh-placa").css({ "border-color": "green" });
        $("#veh-fechaUmantto").css({ "border-color": "green" });
        $("#veh-KMUmantto").css({ "border-color": "green" });
        $("#veh-km").css({ "border-color": "green" });
        $("#veh-km-mantto").css({ "border-color": "green" });
        $("#veh-periodo-mantto").css({ "border-color": "green" });
        $("#veh-situacion").css({ "border-color": "red" });
    } else if (vehubicacion == 0 || vehubicacion == null || vehubicacion == "") {
        toastr["warning"]("Indique la ubicaci&oacute;n actual del veh&iacute;culo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "green" });
        $("#veh-marca").css({ "border-color": "green" });
        $("#veh-tipo").css({ "border-color": "green" });
        $("#veh-modelo").css({ "border-color": "green" });
        $("#veh-color").css({ "border-color": "green" });
        $("#veh-placa").css({ "border-color": "green" });
        $("#veh-fechaUmantto").css({ "border-color": "green" });
        $("#veh-KMUmantto").css({ "border-color": "green" });
        $("#veh-km").css({ "border-color": "green" });
        $("#veh-km-mantto").css({ "border-color": "green" });
        $("#veh-periodo-mantto").css({ "border-color": "green" });
        $("#veh-situacion").css({ "border-color": "green" });
        $("#veh-ubicacion").css({ "border-color": "red" });
    } else if (vehstatus == 0 || vehstatus == null || vehstatus == "") {
        toastr["warning"]("Indique la ubicaci&oacute;n actual del veh&iacute;culo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "green" });
        $("#veh-marca").css({ "border-color": "green" });
        $("#veh-tipo").css({ "border-color": "green" });
        $("#veh-modelo").css({ "border-color": "green" });
        $("#veh-color").css({ "border-color": "green" });
        $("#veh-placa").css({ "border-color": "green" });
        $("#veh-fechaUmantto").css({ "border-color": "green" });
        $("#veh-KMUmantto").css({ "border-color": "green" });
        $("#veh-km").css({ "border-color": "green" });
        $("#veh-km-mantto").css({ "border-color": "green" });
        $("#veh-periodo-mantto").css({ "border-color": "green" });
        $("#veh-situacion").css({ "border-color": "green" });
        $("#veh-ubicacion").css({ "border-color": "green" });
        $("#veh-status").css({ "border-color": "red" });
    } else if (vehobservaciones == 0 || vehobservaciones == null || vehobservaciones == "") {
        toastr["warning"]("Indique la ubicaci&oacute;n actual del veh&iacute;culo.", "Aviso");
        $("#veh-matricula").css({ "border-color": "green" });
        $("#veh-serie").css({ "border-color": "green" });
        $("#veh-marca").css({ "border-color": "green" });
        $("#veh-tipo").css({ "border-color": "green" });
        $("#veh-modelo").css({ "border-color": "green" });
        $("#veh-color").css({ "border-color": "green" });
        $("#veh-placa").css({ "border-color": "green" });
        $("#veh-fechaUmantto").css({ "border-color": "green" });
        $("#veh-KMUmantto").css({ "border-color": "green" });
        $("#veh-km").css({ "border-color": "green" });
        $("#veh-km-mantto").css({ "border-color": "green" });
        $("#veh-periodo-mantto").css({ "border-color": "green" });
        $("#veh-situacion").css({ "border-color": "green" });
        $("#veh-ubicacion").css({ "border-color": "green" });
        $("#veh-status").css({ "border-color": "green" });
        $("#veh-observaciones").css({ "border-color": "red" });
    } else {
        var datosVeh = {
            "vehmatricula": vehmatricula,
            "vehserie": vehserie,
            "vehmarca": vehmarca,
            "vehtipo": vehtipo,
            "vehmodelo": vehmodelo,
            "vehcolor": vehcolor,
            "vehplacas": vehplacas,
            "vehfechaultmantto": vehfechaultmantto,
            "vehkmultmantto": vehkmultmantto,
            "vehkilometraje": vehkilometraje,
            "vehserkmmantto": vehserkmmantto,
            "vehserperiodo": vehserperiodo,
            "vehsituacion": vehsituacion,
            "vehubicacion": vehubicacion,
            "vehstatus": vehstatus,
            "vehfoto": vehfoto,
            "vehobservaciones": vehobservaciones

        }

        $.ajax({
                type: "POST",
                url: "controlador/setVehiculo.php",
                dataType: "json",
                data: datosVeh
            })
            .done(function(vehiculo, txtStatus, jqXHR) {
                $("#modalCapturaVehiculo").modal("hide");
                $("#veh-matricula").val("");
                $("#veh-serie").val("");
                $("#veh-marca").val("");
                $("#veh-tipo").val("");
                $("#veh-modelo").val("");
                $("#veh-color").val("");
                $("#veh-placa").val("");
                $("#veh-fechaUmantto").val("");
                $("#veh-KMUmantto").val("");
                $("#veh-km").val("");
                $("#veh-km-mantto").val("");
                $("#veh-periodo-mantto").val("");
                $("#veh-situacion").val("");
                $("#veh-ubicacion").val("");
                $("#veh-status").val("");
                $("#veh-foto").val("");
                $("#veh-observaciones").val("");
                toastr["success"]("Datos del veh&iacute;culo guardados satisfactoriamente." + vehiculo.respuesta, "Correcto");

                limpiarCatalogoVehiculos();
                //cargaCatalogo();
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                toastr["error"]("No se puede guardar los datos del vehículo, error : ", "Error");
            });
    }


    /*
     */
}

function consultarSituacionVeh() {
    $("#modalvehiculoMantenimiento").modal("show");
}

function fichaVehiculo(matricula) {
    var datosvehiculo = {
        "matricula": matricula
    };

    $.ajax({
            type: "POST",
            url: "controlador/getFechaKMmantto.php",
            dataType: "json",
            data: datosvehiculo
        })
        .done(function(vehiculo, txtStatus, jqXHR) {
            //toastr["success"](vehiculo.respuesta, "Correcto");
            $("#fechaUltMantto").val(vehiculo.fechaultmanto);
            $("#KMUltMantto").val(vehiculo.kmultmanto);
            $("#matriculaMantto").val(vehiculo.matricula);
            $("#fichaLogMantenimiento").modal("show");
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se puede consultar los datos del vehículo", "Error");
        });
}

function actualizaFicha() {
    var fechaNuevaMantto = $("#nuevaFechaMantto").val();
    var kilometrajeNvoMantto = $("#nuevoKilometrajeMantto").val();
    var matricula = $("#matriculaMantto").val();
    //Creacion del arreglo de datos u objeto JS con propiedades
    var datosVehiculo = {
        "matricula": matricula,
        "fechaNuevaMantto": fechaNuevaMantto,
        "kilometrajeNvoMantto": kilometrajeNvoMantto
    };

    $.ajax({
            type: "POST",
            url: "controlador/setUpdateMantto.php",
            dataType: "json",
            data: datosVehiculo
        })
        .done(function(vehiculo, txtStatus, jqXHR) {
            toastr["success"](vehiculo.respuesta, "Correcto");
            setTimeout(function() {
                location.reload();
            }, 4000);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se puede actualizar los datos del mantenimiento, consulte al administrador del sistema.", "Error");
        });
}

function msjEliminarVeh(matricula) {
    $("#mat-veh-del").html(matricula);
    $("#delVehMatricula").val(matricula);
    $("#confirmDeleteVehiculo").modal("show");
}

function eliminarVehiculo() {
    var matricula = $("#delVehMatricula").val();

    var datosVeh = {
        "matricula": matricula
    };

    $.ajax({
            type: "POST",
            url: "controlador/deleteVehiculo.php",
            dataType: "json",
            data: datosVeh
        })
        .done(function(vehiculo, txtStatus, jqXHR) {
            toastr["success"](vehiculo.respuesta, "Correcto");
            setTimeout(function() {
                location.reload();
            }, 3000);


        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se puede eliminar lso datos del vehículo", "Error");
        });
}

function habCamposVeh() {
    $("#guardarDatosVeh-btn").prop("disabled", false);
    $("#vehudp-matricula").prop("readonly", false);
    $("#vehudp-serie").prop("readonly", false);
    $("#vehudp-marca").prop("readonly", false);
    $("#vehudp-tipo").prop("readonly", false);
    $("#vehudp-modelo").prop("readonly", false);
    $("#vehudp-color").prop("readonly", false);
    $("#vehudp-placa").prop("readonly", false);
    $("#vehudp-fechaUmantto").prop("readonly", false);
    $("#vehudp-KMUmantto").prop("readonly", false);
    $("#vehudp-km").prop("readonly", false);
    $("#vehudp-km-mantto").prop("readonly", false);
    $("#vehudp-periodo-mantto").prop("readonly", false);
    $("#vehudp-situacion").removeAttr('disabled');
    $("#vehudp-ubicacion").prop("readonly", false);
    $("#vehudp-status").removeAttr('disabled');
    $("#vehudp-observaciones").prop("readonly", false);
}


function buscaVehiculo() {
    var matricula = $("#matricula-veh").val();

    var datosVeh = {
        "matricula": matricula
    }

    $.ajax({
            type: "POST",
            url: "controlador/getVehiculo.php",
            dataType: "json",
            data: datosVeh
        })
        .done(function(vehiculo, txtStatus, jqXHR) {
            if (vehiculo.estatus >= 2) {
                toastr["warning"]("Este veh&iacute;culo se encuentra en servicio o mantenimiento.", "Aviso");
                $("#matricula-veh").val("");
                $("#matricula-veh").focus();

            } else {
                $("#datveh-matricula").html(vehiculo.matricula);
                $("#matriculaasig-veh").val(vehiculo.matricula);
                $("#datveh-marca").html(vehiculo.marca);
                $("#datveh-tipo").html(vehiculo.tipo);
                $("#datveh-modelo").html(vehiculo.modelo);
                $("#datveh-color").html(vehiculo.color);
                $("#kilometrosalida").val(vehiculo.kilometraje);
            }

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No existe matr&iacute;cula registrada del veh&iacute;culo.", "Error");
            $("#datveh-matricula").html("");
            $("#matriculaasig-veh").val();
            $("#datveh-marca").html("");
            $("#datveh-tipo").html("");
            $("#datveh-modelo").html("");
            $("#datveh-color").html("");
        });
}

$("#bus-veh-matricula").keypress(function(e) {
    if (e.which == 13) {
        buscaVehiculo();
    }
});

function guardarServicioVehicular() {
    var matricula = $("#matricula-veh").val();
    var horasalida = $("#horasalida").val();
    var kilometrosalida = $("#kilometrosalida").val();
    var gasolinasalida = $("#gasolinasalida").val();
    var personalMilitar = $("#personal").val();
    var personalcivil = $("#personalcivil").val();
    var servchofer = $("#servchofer").val();
    var placasciviles = $("#placas").val();
    var persautoriza = $("#persautoriza").val();
    var servdestinoveh = $("#servdestinoveh").val();
    //Datos obligatorios del chófer
    if (servchofer == "" || servchofer == null || servchofer == 0) {
        toastr["warning"]("Favor de Capturar el ch&oacute;fer.", "Alerta");
        $("#cuerpoCardChofer").css({ "border-color": "red" });
        $("#servchofer").focus();
    } else if (gasolinasalida == "" || gasolinasalida == null || gasolinasalida == 0) {
        toastr["warning"]("Favor de Capturar el nivel de combustible del veh&iacute;culo.", "Alerta");
        $("#gasolinasalida").css({ "border-color": "red" });
        $("#gasolinasalida").focus();
    } else if (placasciviles == "" || placasciviles == null || placasciviles == 0) {
        toastr["warning"]("Favor de seleccionar las placas civiles.", "Alerta");
        $("#placas").css({ "border-color": "red" });
        $("#placas").focus();
    } else if (horasalida == "" || horasalida == null || horasalida == 0) {
        toastr["warning"]("Favor de seleccionar la hora de salida del veh&iacute;culo.", "Alerta");
        $("#horasalida").css({ "border-color": "red" });
        $("#horasalida").focus();
    } else if (persautoriza == "" || persautoriza == null || persautoriza == 0) {
        toastr["warning"]("Favor de seleccionar el personal que autoriza.", "Alerta");
        $("#persautoriza").css({ "border-color": "red" });
        $("#persautoriza").focus();

    } else if (servdestinoveh == "" || servdestinoveh == null || servdestinoveh == 0) {
        toastr["warning"]("Favor de capturar el destino.", "Alerta");
        $("#servdestinoveh").css({ "border-color": "red" });
        $("#servdestinoveh").focus();

    } else if (matricula == "" || matricula == null || matricula == 0) {
        toastr["warning"]("Favor de seleccionar el veh&iacute;culo para el servicio a asignar.", "Alerta");
        $("#matricula-veh").css({ "border-color": "red" });
        $("#matricula-veh").focus();
    } else {
        //Validación de los datos de salida
        if (horasalida == "" || horasalida == null) {
            horasalida = 0;
        }

        if (kilometrosalida == "" || kilometrosalida == null) {
            kilometrosalida = 0;
        }

        if (gasolinasalida == "" || gasolinasalida == null) {
            gasolinasalida = 0;
        }

        if (personalMilitar == "" || personalMilitar == null) {
            personalMilitar = 0;
        }

        if (personalcivil == "" || personalcivil == null) {
            personalcivil = 0;
        }

        var datosServicioVehicular = {
            "matricula": matricula,
            "horasalida": horasalida,
            "kilometrosalida": kilometrosalida,
            "gasolinasalida": gasolinasalida,
            "personalMilitar": personalMilitar,
            "personalCivil": personalcivil,
            "servchofer": servchofer,
            "placasciviles": placasciviles,
            "persautoriza": persautoriza,
            "servdestinoveh": servdestinoveh
        }

        $.ajax({
                type: "POST",
                url: "controlador/setServicioVehicular.php",
                dataType: "json",
                data: datosServicioVehicular
            })
            .done(function(datosServicioVehicular, txtStatus, jqXHR) {
                toastr["success"]("Estatus:" + datosServicioVehicular.respuesta, "&Eacute;xito");
                location.reload();



            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                toastr["error"]("No existe matr&iacute;cula registrada del veh&iacute;culo.", "Error");
            });
    }

}

function arriboVehiculo(idarribo) {
    var hora = new Date();
    var h = hora.getHours();
    var m = hora.getMinutes();

    var datosVehiculoArribo = {
        "idarribo": idarribo
    }
    $.ajax({
            type: "POST",
            url: "controlador/getDetArriboVeh.php",
            dataType: "json",
            data: datosVehiculoArribo
        })
        .done(function(arriboVehiculo, txtStatus, jqXHR) {
            $("#getVehSitMatricula").val(arriboVehiculo.matricula);
            $("#sitVehKM").val(arriboVehiculo.kminicial);
            $("#getVehSitMarca").val(arriboVehiculo.marca);
            $("#getVehSitTipo").val(arriboVehiculo.tipo);
            $("#getVehSitModelo").val(arriboVehiculo.modelo);
            $("#getVehSitColor").val(arriboVehiculo.color);
            $("#getVehSitGradoChofer").val(arriboVehiculo.chofgrado + " " + arriboVehiculo.rama);
            $("#getVehSitNombreChofer").val(arriboVehiculo.chofnombre + " " + arriboVehiculo.chofappaterno + " " + arriboVehiculo.chofapmaterno);
            $("#sitVehIDArribo").val(arriboVehiculo.idarribo);
            $("#sitVehHoraArribo").val(h + ":" + m);

            var stringHTMLMIlitar = "";
            for (k = 0; k < arriboVehiculo.persmilitar.length; k++) {
                stringHTMLMIlitar += arriboVehiculo.persmilitar[k].gr_descripcion + " " + arriboVehiculo.persmilitar[k].rama + " " + arriboVehiculo.persmilitar[k].chofnombre +
                    " " + arriboVehiculo.persmilitar[k].chofappaterno + " " + arriboVehiculo.persmilitar[k].chofapmaterno + "</br>";
            }

            $("#perMilitarTransportado").html(stringHTMLMIlitar);

            var stringHTMLcivil = "";
            for (var i = 0; i < arriboVehiculo.perscivil.length; i++) {

                stringHTMLcivil += arriboVehiculo.perscivil[i].personalcivil + "</br>";
            }
            $("#perCivilTransportado").html(stringHTMLcivil);

            $("#modalArriboVehiculo").modal("show");
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No existe el regitro consulte a su administrador.", "Error");
        });


}

function confirmarArribo() {
    var idarribo = $("#sitVehIDArribo").val();
    var kminicial = $("#sitVehKM").val();
    var kmarribo = $("#sitVehArriboKilometraje").val();
    var horaarribo = $("#sitVehHoraArribo").val();
    var gasarribo = $("#sitVehArriboGasolina").val();
    var matricula = $("#getVehSitMatricula").val();
    var combuslitros = $("#setArriveCombusLitros").val();
    var combusprecio = $("#setArriveCombusPrecio").val();

    if (kmarribo < kminicial) {
        $("#sitVehArriboKilometraje").css({ "border-color": "red" });
        toastr["error"]("El kilometraje de arribo no puede ser menor que el kilometraje inicial.", "Error");
    }

    $("#sitVehArriboKilometraje").css({ "border-color": "" });

    if (combuslitros == "" || combuslitros == null) {
        combuslitros = 0;
    }

    if (combusprecio == "" || combusprecio == null) {
        combusprecio = 0;
    }

    var datosConArribo = {
        "idarribo": idarribo,
        "matricula": matricula,
        "kminicial": kminicial,
        "kmarribo": kmarribo,
        "horaarribo": horaarribo,
        "gasarribo": gasarribo,
        "combuslitros": combuslitros,
        "combusprecio": combusprecio
    }

    $.ajax({
            type: "POST",
            url: "controlador/setConfirmaArribo.php",
            dataType: "json",
            data: datosConArribo
        })
        .done(function(confirmaArribo, txtStatus, jqXHR) {
            toastr["success"]("Operaci&oacute;n: " + confirmaArribo.respuesta, "&Eacute;xito");
            $("#sitVehIDArribo").val("");
            $("#sitVehArriboKilometraje").val("");
            $("#sitVehHoraArribo").val("");
            $("#sitVehArriboGasolina").val("");

            $("#modalArriboVehiculo").modal("hide");
            location.reload();
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No existe el regitro consulte a su administrador.", "Error");
        });
}

function habCapturaPersonalCivil() {
    $("#showMilitares").show();
    $("#agregarCivil").show();
    $("#addPersCivil").hide();
}

function habCapturaPersonalMilitar() {
    $("#showMilitares").hide();
    $("#agregarCivil").hide();
    $("#addPersCivil").show();
}

function capturaPersonal() {
    $("#modalPersonalTransporta").modal("show");
}

function agregarCivil() {
    var nomcivil = $("#nomcivil").val();
    if (nomcivil == 0 || nomcivil == "") {
        toastr["error"]("Para poder agregar personal civil, capture el nombre.", "Error");
        $("#nomcivil").css({ "border-color": "red" });
    } else {
        $("#nomcivil").css({ "border-color": "" });
        $("#nomcivil").val("");
        $("#personalcivil").append("<option value='" + nomcivil + "' selected='true'>" + nomcivil + "</option>");
    }

}

function mostrarSeccCombustible() {
    $("#seccioncombustible").fadeIn(1200);
}