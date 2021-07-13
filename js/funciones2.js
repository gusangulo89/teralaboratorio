/*Funciones Generales de JS*/

$(document).ready(function() {
    $("input").on("keypress", function() {
        $input = $(this);
        setTimeout(function() {
            $input.val($input.val().toUpperCase());
        }, 100);
    });
    $("textarea").on("keypress", function() {
        $input = $(this);
        setTimeout(function() {
            $input.val($input.val().toUpperCase());
        }, 100);
    });

    $("#modalAddLocalidad").on("hidden.bs.modal", function(e) {
        e.preventDefault();
    });

    $("#modal-gira").on('hidden.bs.modal', function() {
        location.reload();
    });
});

function getPais() {
    $.ajax({
        url: "controlador/getPais.php",
        type: "POST",
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].pais_id + "'>" + data[i].pais_nombre + "</option>";
            }
            $("#pais").html(cadena);
            var idpais = $("#pais").val();
            $("#paislocalidad").val(data[idpais].pais_nombre);
            getEstado(idpais);
        } else {
            toastr["error"]("No se encontraron paises.", "Error");
            cadena = "<option value='0'>Sin resultados.</option>";
            $("#pais").html(cadena);
        }
    });
}

function getGiraFolios() {
    $.ajax({
        url: "controlador/getGirasFolios.php",
        type: "POST",
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "<option value='0'>Seleccione Avanzada</option>";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].girafolio + "'> Gira: " + data[i].gira_motivo + " " + data[i].gira_inicio + ' ' + data[i].gira_fin + "</option>";
            }
            $("#foliogira").html(cadena);
        } else {
            toastr["info"]("No se encontraron paises.", "Info");
            cadena = "<option value='0'>Dar de alta el folio de la gira.</option>";
            $("#foliogira").html(cadena);
        }
    });
}

function capNewGira() {
    $("#tituloGiraComponente").html("Descripci&oacute;n de la Gira, Ejemplo: Gira o Avanzada Manzanillo, Col.");
    $("#motivogira").show();
    $("#listaGiras").hide();
    $("#btn-capturaGira").hide();
}


function getEstado(idpais) {
    $.ajax({
        url: "controlador/getEstado.php",
        type: "POST",
        data: {
            idpais: idpais
        }
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].icve_estados + "'>" + data[i].estado_nombre + "</option>";
            }
            $("#estado").html(cadena);
            var idpais = $("#pais").val();
            var idestado = $("#estado").val();
            getLocalidad(idpais, idestado);
        } else {
            //toastr["error"]("No se encontraron estados.", "Error");
            cadena = "<option value='0'>Sin resultados.</option>";
            $("#estado").html(cadena);
        }
    });
}

function getLocalidad(idpais, idestado) {
    var datos = {
        "idpais": idpais,
        "idestado": idestado
    }

    $.ajax({
        url: "controlador/getLocalidad.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].icve_localidad + "'>" + data[i].localidad_nombre + "</option>";
            }
            $("#localidad").html(cadena);
            //$("#btn-add-localidad").hide(); /* Era para el boton de agregar localidad */
            getAeropuerto();
            getHospedaje();
        } else {
            toastr["info"]("De click en el icono + para capturar localidad.", "Info");
            cadena = "<option value='0'>Seleccionar Localidad...</option>";
            $("#localidad").html(cadena);
            $("#btn-add-localidad").show();
        }
    });
}

function getAeropuerto() {
    var localidad = $("#localidad").val();
    var datos = {
        "localidad": localidad
    }

    $.ajax({
        url: "controlador/getAeropuerto.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].icve_aeropuerto + "'>" + data[i].aeropuerto_desc + "</option>";
            }
            $("#aeropuertos").append(cadena);
        } else {
            cadena = "<option value='0'>Seleccione Aeropuerto.</option>";
            $("#aeropuertos").html(cadena);
        }
    });
}

/*function getComidasT() {
    var localidad = $("#localidad").val();
    var datos = {
        "localidad": localidad
    }

    $.ajax({
        url: "controlador/getComidasT.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += " " + data[i].alimento_desc + ",";
            }
            $("#comidas").html(cadena);
        } else {
            toastr["error"]("No se encontraron comidas regionales para esta localidad.", "Error");
            cadena = "<option value='0'>Sin resultados.</option>";
            $("#comidas").html(cadena);
        }
    });
}*/

function getHospedaje() {
    var localidad = $("#localidad").val();
    var datos = {
        "localidad": localidad
    }

    $.ajax({
        url: "controlador/getHospedaje.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].icve_hospedaje + "'>" + data[i].hospedaje_desc + "</option>";
            }
            $("#hospedaje").append(cadena);
        } else {
            cadena = "<option value='0'>Seleccione hospedaje.</option>";
            $("#hospedaje").html(cadena);
        }
    });
}

function getModeloAeronave() {
    var aeronave = $("#aeronave").val();
    var matricula = 0;
    var datos = {
        "aeronave": aeronave,
        "matricula": matricula
    }

    $.ajax({
        url: "controlador/getModeloAeronave.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].matricula + "'>" + data[i].matricula + " " + data[i].tipo + "</option>";
            }
            $("#modeloaeronave").html(cadena);
        } else {
            toastr["error"]("No se encontraron hospedajes para esta localidad.", "Error");
            cadena = "<option value='0'>Sin resultados.</option>";
            $("#modeloaeronave").html(cadena);
        }
    });
}

function getAvion() {
    var aeronave = $("#aeronave").val();
    var matricula = 0;
    var datos = {
        "aeronave": aeronave,
        "matricula": matricula
    }

    $.ajax({
        url: "controlador/getModeloAeronave.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].matricula + "'>" + data[i].matricula + " " + data[i].tipo + "</option>";
            }
            $("#modeloaeronave").html(cadena);
        } else {
            toastr["error"]("No se encontraron hospedajes para esta localidad.", "Error");
            cadena = "<option value='0'>Sin resultados.</option>";
            $("#modeloaeronave").html(cadena);
        }
    });
}

function getHelicoptero() {
    var helicoptero = $("#helicoptero").val();
    var matricula = 0;
    var datos = {
        "helicoptero": helicoptero,
        "matricula": matricula
    }

    $.ajax({
        url: "controlador/getHelo.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].matricula + "'>" + data[i].matricula + " " + data[i].tipo + "</option>";
            }
            $("#helicoptero").html(cadena);
        } else {
            toastr["error"]("No se encontraron helicopteros.", "Error");
            cadena = "<option value='0'>Sin resultados.</option>";
            $("#helicoptero").html(cadena);
        }
    });
}

/*Mostrar algunas pantallas*/
function showPntAddLocalidad() {
    $("#modalAddLocalidad").modal("show");
}

function showPntAddEstado() {
    $("#modalAddEstado").modal("show");
}

function showPntAddAeropuerto() {
    $("#modalAddAeropuerto").modal("show");
}

function showPntAddHospedaje() {
    $("#modalAddHospedaje").modal("show");
}

function guardarLocalidad() {
    var idpais = $("#pais").val();
    var idestado = $("#estado").val();
    var deslocalidad = $("#deslocalidad").val();

    var datos = {
        "idpais": idpais,
        "idestado": idestado,
        "deslocalidad": deslocalidad
    }

    $.ajax({
        url: "controlador/setLocalidad.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        if (data.respuesta) {
            $("#modalAddLocalidad").modal("hide");
            $("#deslocalidad").val("");
            //$("#localidad").ajax.reload();
        } else {
            $("#modalAddLocalidad").modal("hide");
            $("#deslocalidad").val("");
            toastr["error"]("No se puede guardar la localidad, consulte a su administrador.", "Error");
        }
    });

}

function guardarAeropuerto() {
    var idpais = $("#pais").val();
    var idestado = $("#estado").val();
    var localidad = $("#localidad").val();
    var descAeropuerto = $("#descAeropuerto").val();

    var datos = {
        "idpais": idpais,
        "idestado": idestado,
        "localidad": localidad,
        "descAeropuerto": descAeropuerto
    }

    $.ajax({
        url: "controlador/setAeropuerto.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        if (data.respuesta) {
            $("#modalAddAeropuerto").modal("hide");
            $("#descAeropuerto").val("");
            location.reload();
        } else {
            $("#modalAddAeropuerto").modal("hide");
            $("#descAeropuerto").val("");
            toastr["error"]("No se pueden guardar los datos del aeropuerto, consulte a su administrador.", "Error");
        }
    });

}

/* Función para "Guardar Estado" */
function guardarEstado() {
    var idpais = $("#pais").val();
    var desestado = $("#desestado").val();

    var datos = {
        "idpais": idpais,
        "desestado": desestado
    }

    $.ajax({
        url: "controlador/setEstado.php",
        type: "POST",
        data: datos,
        dataType: "JSON"
    }).done(function(resp) {
        var datares = JSON.parse(resp);
        if (datares.respuesta) {
            $("#modalAddLocalidad").modal("hide");
            $("#deslocalidad").val("");
            location.reload();
        } else {
            $("#modalAddLocalidad").modal("hide");
            $("#deslocalidad").val("");
            toastr["error"]("No se puede guardar la localidad, consulte a su administrador.", "Error");
        }
    });
}

function guardarHospedaje() {
    var idPais = $("#pais").val();
    var idEstado = $("#estado").val();
    var idlocalidad = $("#localidad").val();
    var descHospedaje = $("#descHospedaje").val();

    var datos = {
        "idpais": idPais,
        "idEstado": idEstado,
        "idlocalidad": idlocalidad,
        "descHospedaje": descHospedaje
    }

    $.ajax({
        url: "controlador/setHospedaje.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        if (data.respuesta) {
            $("#modalAddHospedaje").modal("hide");
            $("#descHospedaje").val("");
            location.reload();
        } else {
            $("#modalAddHospedaje").modal("hide");
            $("#descHospedaje").val("");
            toastr["error"]("No se puede guardar los datos relevantes del hospedaje, consulte a su administrador.", "Error");
        }
    });
}

function mostrarArregloFun() {
    var arreglo = $("#funcionario").val();
    for (var i = 0; i < arreglo.length; i++) {
        alert("Valores del arreglo: " + arreglo[i]);
    }

}

function mostrarArregloPersonas() {
    var arreglo = $("#elemento").val();
    for (var i = 0; i < arreglo.length; i++) {
        alert("Valores del arreglo: " + arreglo[i]);
    }

}

function pruebaFecha() {
    var fechaInicio = $("#fechainicio").val();
    alert("El valor de la fecha es" + fechaInicio);
}

function guardarGira() {
    var motivogira = $("#motivogira").val();
    var motivogiraalm = $("#motivogiraalm").val();
    var foliogira = $("#foliogira").val();
    var fechainicio = $("#fechainicio").val();
    var fechafin = $("#fechafin").val();
    var localidad = $("#localidad").val();
    var aeropuertos = $("#aeropuertos").val();
    var hospedaje = $("#hospedaje").val();
    var obsHospedaje = $("#obsHospedaje").val();
    var avion = $("#avion").val();
    var helicoptero = $("#helicoptero").val();
    var funcionario = $("#funcionario").val();
    var elementos = $("#elemento").val();
    var obsGira = $("#obsGira").val();

    if (funcionario == null || funcionario == "") {
        funcionario = 0;
    }

    if (elementos == null || elementos == "") {
        elementos = 0;
    }



    var datos = {
        "motivogira": motivogira,
        "motivogiraalm": motivogiraalm,
        "foliogira": foliogira,
        "fechainicio": fechainicio,
        "fechafin": fechafin,
        "localidad": localidad,
        "aeropuertos": aeropuertos,
        "hospedaje": hospedaje,
        "obsHospedaje": obsHospedaje,
        "avion": avion,
        "helicoptero": helicoptero,
        "funcionario": funcionario,
        "elementos": elementos,
        "obsGira": obsGira
    }

    if (foliogira == 0 && motivogiraalm == "") {
        toastr["warning"]("Seleccione una gira o especifique la descripcion de la gira.");
        $("#motivogira").css({ "border-color": "red" });
        $("#foliogira").focus();
    } else if (motivogiraalm == "") {
        toastr["warning"]("Especifique el motivo de la gira.");
        $("#motivogiraalm").css({ "border-color": "red" });
        $("#foliogira").focus();
    } else if (fechainicio == "") {
        toastr["error"]("Por favor indique la fecha de inicio de la gira.", "Error");
        $("#motivogira").css({ "border-color": "" });
        $("#fechainicio").css({ "border-color": "red" });
    } else if (fechafin == "") {
        toastr["error"]("Por favor indique la fecha de fin de la gira.", "Error");
        $("#motivogira").css({ "border-color": "" });
        $("#fechainicio").css({ "border-color": "" });
        $("#fechafin").css({ "border-color": "red" });
    } else if (fechafin < fechainicio) {
        $("#motivogira").css({ "border-color": "" });
        $("#fechainicio").css({ "border-color": "red" });
        $("#fechafin").css({ "border-color": "red" });
        toastr["error"]("Error en la fecha de fin, no puede ser menor que la fecha de inicio de la gira..", "Error");
    } else if (elementos == "") {
        toastr["error"]("Seleccionar cuando menos un elemento.", "Error");
        $("#elemento").css({ "border-color": "red" });
    } else {
        $.ajax({
            url: "controlador/guardarGira.php",
            type: "POST",
            data: datos,
            dataType: "json"
        }).done(function(respuestaJSON, txtStatus, jqXHR) {
            //var resultado = JSON.parse(respuestaJSON);
            //alert(respuestaJSON);
            $("#motivogira").val("");
            $("#motivogiraalm").val("");
            $("#fechainicio").val("");
            $("#fechafin").val("");
            $("#localidad").val("");
            $("#aeropuertos").val("");
            $("#hospedaje").val("");
            $("#obsHospedaje").val("");
            $("#avion").val("");
            $("#helicoptero").val("");
            $("#funcionario").val("");
            $("#elemento").val("");
            $("#obsGira").val("");
            location.reload();
            toastr["success"]("Datos de la gira guardados satisfactoriamente, consulte a su administrador." + respuestaJSON.resultgira, "Correcto");
        }).fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se pueden guardar los datos de la gira, consulte a su administrador.", "Error");
        });
    }
}


function guardarGiraAvanzada() {
    var motivogira = $("#motivogira").val();
    var foliogira = $("#foliogira").val();
    var fechainicio = $("#fechainicio").val();
    var fechafin = $("#fechafin").val();
    var localidad = $("#localidad").val();
    var elementos = $("#elemento").val();
    var millasterrestres = $("#millasterrestres").val();
    var millasaereas = $("#millasaereas").val();
    var vehforaneo = $("#vehforaneo").val();
    var itinerario = $("#itinerario").val();


    if (millasterrestres == "") {
        millasterrestres = 0;
    }

    if (millasaereas == "") {
        millasaereas = 0;
    }

    if (vehforaneo == "") {
        vehforaneo = "NO APLICA";
    }

    var datos = {
        "motivo": motivogira,
        "folio": foliogira,
        "fechainicio": fechainicio,
        "fechafin": fechafin,
        "localidad": localidad,
        "elementos": elementos,
        "millasterrestres": millasterrestres,
        "millasaereas": millasaereas,
        "vehforaneo": vehforaneo,
        "itinerario": itinerario

    }

    if (foliogira == 0 && motivogira == "") {
        toastr["warning"]("Seleccione una gira o especifique el motivo de la gira.");
        $("#motivogira").css({ "border-color": "red" });
        $("#foliogira").focus();
    } else if (fechainicio == "") {
        toastr["warning"]("Seleccione a fecha de inicio de la Gira.");
        $("#motivogira").css({ "border-color": "" });
        $("#foliogira").css({ "border-color": "" });
        $("#fechainicio").css({ "border-color": "red" });
    } else if (fechafin == "") {
        toastr["warning"]("Seleccione a fecha de termino de la Gira.");
        $("#motivogira").css({ "border-color": "" });
        $("#fechainicio").css({ "border-color": "" });
        $("#fechafin").css({ "border-color": "red" });
    } else if (fechainicio > fechafin) {
        toastr["warning"]("La fecha de termino no puede ser menor que la fecha de inicio, verifique por favor.");
        $("#fechainicio").css({ "border-color": "" });
        $("#fechafin").css({ "border-color": "" });
        $("#fechainicio").css({ "border-color": "yellow" });
        $("#fechafin").css({ "border-color": "red" });
    } else if (elementos == "") {
        toastr["warning"]("Debe seleccionar cuando menos un elemento.");
        $("#fechainicio").css({ "border-color": "green" });
        $("#fechafin").css({ "border-color": "green" });
        $("#elemento").css({ "border-color": "red" });
    } else {
        $.ajax({
            url: "controlador/guardarGiraAvanzada.php",
            type: "POST",
            data: datos,
            dataType: "json"
        }).done(function(respuestaJSON, txtStatus, jqXHR) {
            //var resultado = JSON.parse(respuestaJSON);
            //alert(respuestaJSON);
            $("#motivogira").val("");
            $("#foliogira").val("");
            $("#fechainicio").val("");
            $("#fechafin").val("");
            $("#localidad").val("");
            $("#elemento").val("");
            $("#obsGira").val("");
            toastr["success"]("Datos de la gira avanzada guardados satisfactoriamente." + respuestaJSON.respuesta, "Correcto");
            location.reload();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se pueden guardar los datos de la gira, consulte a su administrador.", "Error");
        });
    }


}

function comparaFechasGiras() {
    var fechainicio = $("#fechainicio").val();
    var fechafin = $("#fechafin").val();

    if (fechainicio > fechafin) {
        toastr["warning"]("La fecha de termino no puede ser menor que la fecha de inicio, verifique por favor.");
        $("#fechainicio").css({ "border-color": "yellow" });
        $("#fechafin").css({ "border-color": "red" });
    } else {
        $("#fechainicio").css({ "border-color": "green" });
        $("#fechafin").css({ "border-color": "green" });
    }
}

function comparaFechasGirasUDP() {
    var fechainicio = $("#udp-fechainicio").val();
    var fechafin = $("#udp-fechafin").val();

    if (fechainicio > fechafin) {
        toastr["warning"]("La fecha de termino no puede ser menor que la fecha de inicio, verifique por favor.");
        $("#udp-fechainicio").css({ "border-color": "yellow" });
        $("#udp-fechafin").css({ "border-color": "red" });
    } else {
        $("#udp-fechainicio").css({ "border-color": "green" });
        $("#udp-fechafin").css({ "border-color": "green" });
    }
}

function consultaGira(cvegira) {
    var gira = {
        "icvegira": cvegira
    }

    $.ajax({
            type: "POST",
            url: "controlador/getConsultaGira.php",
            dataType: "JSON",
            data: gira
        })
        .done(function(giraConsulta, txtStatus, jqXHR) {


            if (giraConsulta.gira.giraavanzada == 1) {
                $("#ga-motivo_gira_alm").hide();
                $("#ga-fchaini").show();
                $("#ga-aeropuertos").hide();
                $("#ga-hospedaje").hide();
                $("#ga-funcionarios").hide();
                $("#tituloGira").html("Avanzada");
                $("#ga-avion").hide();
            }

            if (giraConsulta.gira.cveaeropuerto == 0) {
                $("#ga-aeropuertos").hide();
            }

            if (giraConsulta.gira.cvehospedaje == 0) {
                $("#ga-hospedaje").hide();
            }

            if (giraConsulta.funcionario.length == 0) {
                $("#ga-funcionarios").hide();
            }

            /*if (giraConsulta.gira.millasterrestres == 0 || giraConsulta.gira.millasterrestres == null) {
                $("#ga-millasterrestres").hide();
            }

            if (giraConsulta.gira.millasaereas == 0 || giraConsulta.gira.millasaereas == null) {
                $("#ga-millasaereas").hide();
            }*/

            if (giraConsulta.gira.vehic == null || giraConsulta.gira.vehic == "") {
                $("#udp-vehforaneo").val("NO ESPECIFICADO");
            } else {
                $("#udp-vehforaneo").val(giraConsulta.gira.vehic);
            }

            $("#udp-icvegira").val(giraConsulta.gira.gira_id);
            $("#udp-giramotivo_alm").val(giraConsulta.gira.motivogiraalm);
            $("#udp-motivogira").val(giraConsulta.gira.motivogira);
            $("#udp-fechainicio").val(giraConsulta.gira.girainicio);
            $("#udp-fechafin").val(giraConsulta.gira.girafin);
            $("#udp-pais").append("<option value='" + giraConsulta.gira.cvepais + "'>" + giraConsulta.gira.paisnombre + "</option>");
            $("#udp-estado").append("<option value='" + giraConsulta.gira.cveestado + "'>" + giraConsulta.gira.estadonombre + "</option>");
            $("#udp-localidad").append("<option value='" + giraConsulta.gira.cvelugar + "'>" + giraConsulta.gira.localidadnombre + "</option>");
            var strcF = "";

            for (var i = 0; i < giraConsulta.funcionario.length; i++) {
                strcF += "<option selected='true' value='" + giraConsulta.funcionario[i].funcionario_id + "'>" + giraConsulta.funcionario[i].funcionario_puesto +
                    " " + giraConsulta.funcionario[i].funcionario_nombre + " " + giraConsulta.funcionario[i].funcionario_ap_pat + " " +
                    giraConsulta.funcionario[i].funcionario_ap_mat + "</option>";
            }

            for (var a = 0; a < giraConsulta.funcionariostodos.length; a++) {
                strcF += "<option value='" + giraConsulta.funcionariostodos[a].funcionario_id + "'>" + giraConsulta.funcionariostodos[a].funcionario_puesto +
                    " " + giraConsulta.funcionariostodos[a].funcionario_nombre + " " + giraConsulta.funcionariostodos[a].funcionario_ap_pat + " " +
                    giraConsulta.funcionariostodos[a].funcionario_ap_mat + "</option>"
            }
            $("#udp-funcionario").empty().append(strcF);

            var strcP = "";
            var ayudante = "";
            for (var j = 0; j < giraConsulta.elemento.length; j++) {
                if (giraConsulta.elemento[j].gira_ayud == 1) {
                    ayudante = "AYUDANTE";
                } else {
                    ayudante = "";
                }
                strcP += "<option selected='true' value='" + giraConsulta.elemento[j].matricula + "'>" + giraConsulta.elemento[j].gr_descripcion +
                    " " + giraConsulta.elemento[j].cs_descripcion + " " + giraConsulta.elemento[j].nombre + " " +
                    giraConsulta.elemento[j].paterno + " " + giraConsulta.elemento[j].materno + " " + ayudante + "</option>";
            }

            for (var b = 0; b < giraConsulta.elementostodos.length; b++) {
                if (giraConsulta.elementostodos[b].gira_ayud == 1) {
                    ayudante = "AYUDANTE";
                } else {
                    ayudante = "";
                }
                strcP += "<option value='" + giraConsulta.elementostodos[b].matricula + "'>" + giraConsulta.elementostodos[b].gr_descripcion +
                    " " + giraConsulta.elementostodos[b].cs_descripcion + " " + giraConsulta.elementostodos[b].nombre + " " +
                    giraConsulta.elementostodos[b].paterno + " " + giraConsulta.elementostodos[b].materno + " " + ayudante + "</option>";
            }
            $("#udp-elemento").empty().append(strcP);
            var cvelocalidad = $("#udp-localidad").val();
            var cadenaAeropuerto = "";
            if (giraConsulta.gira.cveaeropuerto == 0) {
                // cadenaAeropuerto = "<option selected='true' value='0'> NO APLICA G/A </option>";
            } else {
                cadenaAeropuerto = "<option selected='true' value='" + giraConsulta.gira.cveaeropuerto + "'>" + giraConsulta.gira.aeropuerto + "</option>";
            }
            getAeropuertoUDP(cvelocalidad, cadenaAeropuerto);

            var aeronave = giraConsulta.gira.tipoaeronave;
            switch (aeronave) {
                case 0:
                    var cadenaAeronave = "<option selected='true' value='0'> NO APLICAaa G/A </option>";
                    var cadenaAeronaveDesc = "<option selected='true' value='0'> NO APLICAzz G/A </option>";
                    $("#aeronave").append(cadenaAeronave);
                    break;
            }
            // avion
            // var cadenaAeronave = "<option selected='true' value='" + giraConsulta.gira.tipoaeronave + "'> Avi&oacute;n </option>";
            var cadenaAeronaveDesc = "<option selected='true' value='" + giraConsulta.gira.matriculaavion + "'> " + giraConsulta.gira.matriculaavion + " " + giraConsulta.gira.aviondesc + "</option>";
            $("#avion").append(cadenaAeronave);
            getAvionUDP(giraConsulta.gira.matriculaavion, cadenaAeronaveDesc);
            //helicoptero

            // var cadenaAeronave = "<option selected='true' value='" + giraConsulta.gira.tipoaeronave + "'> Helic&oacute;tero </option>";
            var cadenaAeronaveDesc = "<option selected='true' value='" + giraConsulta.gira.matriculahelicoptero + "'> " + giraConsulta.gira.matriculahelicoptero + " " + giraConsulta.gira.helicopterodesc + "</option>";
            $("#helicoptero").append(cadenaAeronave);
            getHelicopteroUDP(giraConsulta.gira.matriculahelicoptero, cadenaAeronaveDesc);


            $("#udp-hospedaje").append("<option value='" + giraConsulta.gira.cvehospedaje + "'>" + giraConsulta.gira.hospedajedesc + "</option>");


            //$("#modeloaeronave").append("<option value='" + giraConsulta.gira.tipoaeronave + "'>" + giraConsulta.gira.tipoaeronave + "</option>");
            $("#udp-observaciones").val(giraConsulta.gira.giraobservaciones);
            $("#udp-millasterrestres").val(giraConsulta.gira.millasterrestres);
            $("#udp-millasaereas").val(giraConsulta.gira.millasaereas);
            $("#dato-documento").html("<strong> DOCUMENTO CORRESPONDIENTE DEL ITINERARIO</strong></br><a href='" + giraConsulta.gira.itinerario + "'>" + giraConsulta.gira.itinerario + "</a>")
            $("#modal-gira").modal("show");

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se puede consultar la gira, verifique con el administrador del sistema.", "Error");
        });
}


function consultaGiracon(cvegira) {
    var gira = {
        "icvegira": cvegira
    }

    $.ajax({
            type: "POST",
            url: "controlador/getConsultaGira.php",
            dataType: "JSON",
            data: gira
        })
        .done(function(giraConsulta, txtStatus, jqXHR) {


            if (giraConsulta.gira.giraavanzada == 1) {
                $("#ga-motivo_gira_alm").hide();
                $("#ga-fchaini").show();
                $("#ga-aeropuertos").hide();
                $("#ga-hospedaje").hide();
                $("#ga-aeronave").hide();
                $("#ga-funcionarios").hide();
                $("#tituloGira").html("Avanzada");
            }

            if (giraConsulta.gira.cveaeropuerto == 0) {
                $("#ga-aeropuertos").hide();
            }

            if (giraConsulta.gira.cvehospedaje == 0) {
                $("#ga-hospedaje").hide();
            }

            if (giraConsulta.gira.tipoaeronave == 0) {
                $("#ga-aeronave").hide();
            }

            if (giraConsulta.funcionario.length == 0) {
                $("#ga-funcionarios").hide();
            }

            /*if (giraConsulta.gira.millasterrestres == 0 || giraConsulta.gira.millasterrestres == null) {
                $("#ga-millasterrestres").hide();
            }

            if (giraConsulta.gira.millasaereas == 0 || giraConsulta.gira.millasaereas == null) {
                $("#ga-millasaereas").hide();
            }*/

            if (giraConsulta.gira.vehic == null || giraConsulta.gira.vehic == "") {
                $("#udp-vehforaneo").val("NO ESPECIFICADO");
            } else {
                $("#udp-vehforaneo").val(giraConsulta.gira.vehic);
            }



            $("#udp-icvegira").val(giraConsulta.gira.gira_id);
            $("#udp-giramotivo_alm").val(giraConsulta.gira.motivogiraalm);
            $("#udp-motivogira").val(giraConsulta.gira.motivogira);
            $("#udp-fechainicio").val(giraConsulta.gira.girainicio);
            $("#udp-fechafin").val(giraConsulta.gira.girafin);
            $("#udp-pais").append("<option value='" + giraConsulta.gira.cvepais + "'>" + giraConsulta.gira.paisnombre + "</option>");
            $("#udp-estado").append("<option value='" + giraConsulta.gira.cveestado + "'>" + giraConsulta.gira.estadonombre + "</option>");
            $("#udp-localidad").append("<option value='" + giraConsulta.gira.cvelugar + "'>" + giraConsulta.gira.localidadnombre + "</option>");
            var strcF = "";

            for (var i = 0; i < giraConsulta.funcionario.length; i++) {
                strcF += "<option selected='true' value='" + giraConsulta.funcionario[i].funcionario_id + "'>" + giraConsulta.funcionario[i].funcionario_puesto +
                    " " + giraConsulta.funcionario[i].funcionario_nombre + " " + giraConsulta.funcionario[i].funcionario_ap_pat + " " +
                    giraConsulta.funcionario[i].funcionario_ap_mat + "</option>";
            }

            for (var a = 0; a < giraConsulta.funcionariostodos.length; a++) {
                strcF += "<option value='" + giraConsulta.funcionariostodos[a].funcionario_id + "'>" + giraConsulta.funcionariostodos[a].funcionario_puesto +
                    " " + giraConsulta.funcionariostodos[a].funcionario_nombre + " " + giraConsulta.funcionariostodos[a].funcionario_ap_pat + " " +
                    giraConsulta.funcionariostodos[a].funcionario_ap_mat + "</option>"
            }
            $("#udp-funcionario").empty().append(strcF);

            var strcP = "";
            var ayudante = "";
            for (var j = 0; j < giraConsulta.elemento.length; j++) {
                if (giraConsulta.elemento[j].gira_ayud == 1) {
                    ayudante = "AYUDANTE";
                } else {
                    ayudante = "";
                }
                strcP += "<option selected='true' value='" + giraConsulta.elemento[j].matricula + "'>" + giraConsulta.elemento[j].gr_descripcion +
                    " " + giraConsulta.elemento[j].cs_descripcion + " " + giraConsulta.elemento[j].nombre + " " +
                    giraConsulta.elemento[j].paterno + " " + giraConsulta.elemento[j].materno + " " + ayudante + "</option>";
            }

            for (var b = 0; b < giraConsulta.elementostodos.length; b++) {
                if (giraConsulta.elementostodos[b].gira_ayud == 1) {
                    ayudante = "AYUDANTE";
                } else {
                    ayudante = "";
                }
                strcP += "<option value='" + giraConsulta.elementostodos[b].matricula + "'>" + giraConsulta.elementostodos[b].gr_descripcion +
                    " " + giraConsulta.elementostodos[b].cs_descripcion + " " + giraConsulta.elementostodos[b].nombre + " " +
                    giraConsulta.elementostodos[b].paterno + " " + giraConsulta.elementostodos[b].materno + " " + ayudante + "</option>";
            }
            $("#udp-elemento").empty().append(strcP);
            var cvelocalidad = $("#udp-localidad").val();
            var cadenaAeropuerto = "";
            if (giraConsulta.gira.cveaeropuerto == 0) {
                cadenaAeropuerto = "<option selected='true' value='0'> NO APLICA G/A </option>";
            } else {
                cadenaAeropuerto = "<option selected='true' value='" + giraConsulta.gira.cveaeropuerto + "'>" + giraConsulta.gira.aeropuerto + "</option>";
            }
            getAeropuertoUDP(cvelocalidad, cadenaAeropuerto);

            var aeronave = giraConsulta.gira.tipoaeronave;
            switch (aeronave) {
                case 0:
                    var cadenaAeronave = "<option selected='true' value='0'> NO APLICA G/A </option>";
                    var cadenaAeronaveDesc = "<option selected='true' value='0'> NO APLICA G/A </option>";
                    $("#aeronave").append(cadenaAeronave);
                    break;
                case 1:
                    var cadenaAeronave = "<option selected='true' value='" + giraConsulta.gira.tipoaeronave + "'> Avi&oacute;n </option>";
                    var cadenaAeronaveDesc = "<option selected='true' value='" + giraConsulta.gira.matriculaavion + "'> " + giraConsulta.gira.matriculaavion + " " + giraConsulta.gira.aviondesc + "</option>";
                    $("#aeronave").append(cadenaAeronave);
                    getModeloAeronaveUDP(giraConsulta.gira.tipoaeronave, giraConsulta.gira.matriculaavion, cadenaAeronaveDesc);
                    break;
                case 2:
                    var cadenaAeronave = "<option selected='true' value='" + giraConsulta.gira.tipoaeronave + "'> Helic&oacute;tero </option>";
                    var cadenaAeronaveDesc = "<option selected='true' value='" + giraConsulta.gira.matriculahelicoptero + "'> " + giraConsulta.gira.matriculahelicoptero + " " + giraConsulta.gira.helicopterodesc + "</option>";
                    $("#aeronave").append(cadenaAeronave);
                    getModeloAeronaveUDP(giraConsulta.gira.tipoaeronave, giraConsulta.gira.matriculahelicoptero, cadenaAeronaveDesc);
                    break;
            }

            $("#udp-hospedaje").append("<option value='" + giraConsulta.gira.cvehospedaje + "'>" + giraConsulta.gira.hospedajedesc + "</option>");


            //$("#modeloaeronave").append("<option value='" + giraConsulta.gira.tipoaeronave + "'>" + giraConsulta.gira.tipoaeronave + "</option>");
            $("#udp-observaciones").val(giraConsulta.gira.giraobservaciones);
            $("#udp-millasterrestres").val(giraConsulta.gira.millasterrestres);
            $("#udp-millasaereas").val(giraConsulta.gira.millasaereas);
            $("#dato-documento").html("<strong> DOCUMENTO CORRESPONDIENTE DEL ITINERARIO</strong></br><a href='" + giraConsulta.gira.itinerario + "'>" + giraConsulta.gira.itinerario + "</a>")
            $("#modal-gira").modal("show");

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se puede consultar la gira, verifique con el administrador del sistema.", "Error");
        });
}

function actualizaGira() {
    /* Recolecto Datos*/
    var udpCveGira = $("#udp-icvegira").val();
    var udpMotivoGira = $("#udp-motivogira").val();
    var udpGiraMotivoAlm = $("#udp-giramotivo_alm").val();
    var udpFechaInicio = $("#udp-fechainicio").val();
    var udpFechaFin = $("#udp-fechafin").val();
    var udpLocalidad = $("#udp-localidad").val();
    var udpAeropuertos = $("#udp-aeropuertos").val();
    var udpHospedaje = $("#udp-hospedaje").val();
    var udpAvion = $("#avion").val();
    var udpHelicoptero = $("#helicoptero").val();
    var udpFuncionario = $("#udp-funcionario").val();
    var udpElemento = $("#udp-elemento").val();
    var udpObservaciones = $("#udp-observaciones").val();
    var udpMillasTerrestres = $("#udp-millasterrestres").val();
    var udpMillasAereas = $("#udp-millasaereas").val();
    var udpVehiculo = $("#udp-vehforaneo").val();
    var udpItinerario = $("#itinerario").val();
    //var udpItinerario = $("#itinerario").val().replace(/C:\\fakepath\\/, '');

    if (udpMotivoGira == "") {
        udpMotivoGira = "NO APLICA";
    }

    if (udpGiraMotivoAlm == "") {
        udpGiraMotivoAlm = "NO APLICA";
    }

    if (udpAvion == "") {
        udpAvion = "NO APLICA";
    }

    if (udpHelicoptero == "") {
        udpHelicoptero = "NO APLICA";
    }

    if (udpFuncionario == 0 || udpFuncionario == null) {
        udpFuncionario = 0;
    }

    if (udpElemento == 0 || udpElemento == null) {
        udpElemento = 0;
    }

    if (udpMillasTerrestres == 0 || udpMillasTerrestres == null) {
        udpMillasTerrestres = 0;
    }

    if (udpMillasAereas == 0 || udpMillasAereas == null) {
        udpMillasAereas = 0;
    }

    if (udpItinerario == "" || udpItinerario == null) {
        udpItinerario = "NO APLICA";
    } else {
        var udpItinerario = $("#itinerario").val().replace(/C:\\fakepath\\/, '');
    }

    if (udpVehiculo == 0 || udpVehiculo == null || udpVehiculo == "") {
        udpVehiculo = "NO APLICA";
    }

    var datos = {
        "udpCveGira": udpCveGira,
        "udpMotivoGira": udpMotivoGira,
        "udpGiraMotivoAlm": udpGiraMotivoAlm,
        "udpFechaInicio": udpFechaInicio,
        "udpFechaFin": udpFechaFin,
        "udpLocalidad": udpLocalidad,
        "udpAeropuertos": udpAeropuertos,
        "udpHospedaje": udpHospedaje,
        "udpAvion": udpAvion,
        "udpHelicoptero": udpHelicoptero,
        "udpFuncionario": udpFuncionario,
        "udpElemento": udpElemento,
        "udpObservaciones": udpObservaciones,
        "udpMillasTerrestres": udpMillasTerrestres,
        "udpMillasAereas": udpMillasAereas,
        "udpVehiculo": udpVehiculo,
        "udpItinerario": udpItinerario
    }

    $.ajax({
        url: "controlador/setUpdateGira.php",
        type: "POST",
        data: datos,
        dataType: "JSON"
    }).done(function(respuestaJSON, txtStatus, jqXHR) {
        $("#udp-icvegira").val("");
        $("#udp-motivogira").val("");
        $("#udp-gira_motivo_alm").val("");
        $("#udp-fechainicio").val("");
        $("#udp-fechafin").val("");
        $("#udp-localidad").val("");
        $("#udp-aeropuertos").val("");
        $("#udp-hospedaje").val("");
        $("#avion").val("");
        $("#helicoptero").val("");
        $("#udp-funcionario").val("");
        $("#udp-elemento").val("");
        $("#udp-millasterrestres").val("");
        $("#udp-millasaereas").val("");
        $("#udp-vehforaneo").val("");
        $("#udp-observaciones").val("");



        toastr["success"]("Datos de la gira avanzada actualizados satisfactoriamente." + respuestaJSON.respuesta, "Correcto");
        location.reload();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        toastr["error"]("No se pueden guardar los datos de la gira, consulte a su administrador.", "Error");
    });
}


function getPaisUDP() {
    var cadenaPais = "";
    $.ajax({
        url: "controlador/getPais.php",
        type: "POST",
    }).done(function(resp) {
        var data = JSON.parse(resp);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadenaPais += "<option value='" + data[i].pais_id + "'>" + data[i].pais_nombre + "</option>";
            }
            $("#udp-pais").html(cadenaPais);
        } else {
            toastr["error"]("No se encontraron paises.", "Error");
            cadenaPais = "<option value='0'>Sin resultados.</option>";
            $("#udp-pais").html(cadenaPais);
        }
    });
}

function getEstadoUDP(idpais, cadenaEstado) {
    $.ajax({
        url: "controlador/getEstado.php",
        type: "POST",
        data: {
            idpais: idpais
        }
    }).done(function(resp) {
        var data = JSON.parse(resp);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadenaEstado += "<option value='" + data[i].icve_estados + "'>" + data[i].estado_nombre + "</option>";
            }
            $("#udp-estado").empty().append(cadenaEstado);
        } else {
            //toastr["error"]("No se encontraron estados.", "Error");
            cadenaEstado = "<option value='0'>Sin resultados de Estado.</option>";
            $("#udp-estado").empty().append(cadenaEstado);
        }
    });

}

function getLocalidadUDP(idpais, idestado, cadenaLocalidad) {
    var datos = {
        "idpais": idpais,
        "idestado": idestado
    }

    $.ajax({
        url: "controlador/getLocalidad.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadenaLocalidad += "<option value='" + data[i].icve_localidad + "'>" + data[i].localidad_nombre + "</option>";
            }
            $("#udp-localidad").empty().append(cadenaLocalidad);
            var icvelocalidad = $("#udp-localidad").val();
            var cadeaAeropuerto = "";
            getAeropuertoUDP(icvelocalidad, cadeaAeropuerto);
            getHospedajeUDP(icvelocalidad, cadeaAeropuerto);
        } else {
            toastr["info"]("De click en el icono + para capturar localidad.", "Info");
            cadenaLocalidad = "<option value='0'>Seleccionar Localidad...</option>";
            $("#udp-localidad").empty().append(cadenaLocalidad);
            $("#btn-add-localidad").show();
        }
    });
}

function getAeropuertoUDP(icvelocalidad, cadenaAeropuerto) {
    var datos = {
        "localidad": icvelocalidad
    }

    $.ajax({
        url: "controlador/getAeropuerto.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadenaAeropuerto += "<option value='" + data[i].icve_aeropuerto + "'>" + data[i].aeropuerto_desc + "</option>";
            }
            $("#udp-aeropuertos").html(cadenaAeropuerto);
        } else {
            cadenaAeropuerto = "<option value='0'>Seleccione Aeropuerto.</option>";
            $("#udp-aeropuertos").html(cadenaAeropuerto);
        }
    });
}

function getHospedajeUDP(icvelocalidad, cadenaHospedaje) {
    var datos = {
        "localidad": icvelocalidad
    }

    $.ajax({
        url: "controlador/getHospedaje.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadenaHospedaje += "<option value='" + data[i].icve_hospedaje + "'>" + data[i].hospedaje_desc + "</option>";
            }
            $("#udp-hospedaje").html(cadenaHospedaje);
        } else {
            cadenaHospedaje = "<option value='0'>Seleccione hospedaje.</option>";
            $("#udp-hospedaje").html(cadenaHospedaje);
        }
    });
}

function getModeloAeronaveUDP(tipoaeronave, matricula, cadena) {
    if (matricula != null) {
        tipoaeronave = tipoaeronave + 1;
    }
    var datos = {
        "aeronave": tipoaeronave,
        "matricula": matricula
    }

    $.ajax({
        url: "controlador/getModeloAeronave.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].matricula + "'>" + data[i].matricula + " " + data[i].tipo + "</option>";
            }
            $("#modeloaeronave").html(cadena);
        } else {
            cadena = "<option value='0'>Seleccione hospedaje.</option>";
            $("#modeloaeronave").html(cadena);
        }
    });
}

function getAvionUDP(matricula, cadena) {

    var datos = {
        "matricula": matricula
    }

    $.ajax({
        url: "controlador/getAvionUDP.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].matricula + "'>" + data[i].matricula + " " + data[i].tipo + "</option>";
            }
            $("#avion").html(cadena);
        } else {
            cadena = "<option value='0'>Seleccione Avion.</option>";
            $("#avion").html(cadena);
        }
    });
}

function getHelicopteroUDP(matricula, cadena) {

    var datos = {
        "matricula": matricula
    }

    $.ajax({
        url: "controlador/getHelicopteroUDP.php",
        type: "POST",
        data: datos
    }).done(function(resp) {
        var data = JSON.parse(resp);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].matricula + "'>" + data[i].matricula + " " + data[i].tipo + "</option>";
            }
            $("#helicoptero").html(cadena);
        } else {
            cadena = "<option value='0'>Seleccione Helicoptero.</option>";
            $("#helicoptero").html(cadena);
        }
    });
}

function subirDocumento() {
    var documentoNombre = document.getElementById("itinerario");
    var file = documentoNombre.files[0];
    var dataDocumento = new FormData();
    dataDocumento.append('archivoDocumento', file);
    //console.log(dataFoto);


    $.ajax({
            type: "POST",
            url: "upload-file.php",
            dataType: "json",
            contentType: false,
            data: dataDocumento,
            processData: false,
            cache: false

        })
        .done(function(documento, txtStatus, jqXHR) {
            $("#carga-doc").hide();
            $("#dato-documento").html("<strong> DOCUMENTO CARGADO SATISFACTORIAMENTE </strong></br><a href='" + documento.ruta + "'>" + documento.ruta + "</a>");
            $("#dato-documento").show();
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un problema en el servidor. Comunicarse con el administrador del sistema");
        });
}



function mostrarModal(matricula) {

    $.ajax({
            type: "POST",
            url: "modal_query.php", //Este archivo PHP
            dataType: "JSON",
            data: { "matricula": matricula } //Este es el arreglo de datos del JSON cs_descripcion
        })
        .done(function(respuestaJSON, txtStatus, jqXHR) {

            //GIRAS
            var giras = respuestaJSON.cantidad_giras;
            if (giras == 0) {
                var stringHTMLgira = "<strong>Giras: </strong>No ha salido de gira.";
            } else if (giras > 0) {
                var stringHTMLgira = "<strong> Giras por Año: </strong>" + respuestaJSON.cantidad_giras + "&nbsp;&nbsp;<strong> Días Comisionado: </strong>" + respuestaJSON.dias_comisionado;
            }

            //VACACIONES
            var vacaciones = respuestaJSON.vacaciones;
            if (vacaciones == 1) {
                var stringHTMLvac = "<strong> Primer Periodo Vacacional del </strong>" + respuestaJSON.primer_per_ini + ' <strong>al</strong> ' + respuestaJSON.primer_per_fin;
            } else if (vacaciones == 2) {
                var stringHTMLvac = "<strong> Periodos Vacacionales: 1ro del </strong>" + respuestaJSON.primer_per_ini + ' <strong>al</strong> ' + respuestaJSON.primer_per_fin + "&nbsp;&nbsp;<strong> 2do: </strong>" + respuestaJSON.segundo_per_ini + ' <strong>al</strong> ' + respuestaJSON.segundo_per_fin;
            } else {
                var stringHTMLvac = "<strong>Vacaciones: </strong>No ha disfrutado vacaciones.";
            }

            //LICENCIAS
            var licencias = respuestaJSON.licencias;
            if (licencias == 0) {
                var stringHTMLlic = "<strong> Liciencias: </strong>No ha disfrutado licencias.";
            } else if (licencias > 0) {
                var stringHTMLlic = "<strong> Días de Licencia: </strong>" + respuestaJSON.licencias + "&nbsp;&nbsp;<strong> Ultima Licencia: </strong>" + respuestaJSON.licencia_ini + '<strong> al </strong> ' + respuestaJSON.licencia_fin;
            }

            //PERMISOS
            var permisos = respuestaJSON.permisos;
            if (permisos == 0) {
                var stringHTMLper = "<strong> Permisos: </strong>No ha hecho uso de permisos.";
            } else if (permisos > 0) {
                var stringHTMLper = "<strong> Días de Permiso: </strong>" + respuestaJSON.permisos;
            }

            //REBAJES
            var diasrebajado = respuestaJSON.dias_rebajado;
            if (diasrebajado == 0) {
                var stringHTMLreb = "<strong> Días de Rebaje: </strong>No ha tenido rebajes.";
            } else if (diasrebajado > 0) {
                var stringHTMLreb = "<strong> &nbsp;&nbsp;Días de Rebaje: </strong>" + respuestaJSON.dias_rebajado;
            }

            //ARRESTOS
            var arrestos = respuestaJSON.arrestos;
            if (arrestos == 0) {
                var stringHTMLarr = "<strong> Arrestos: </strong>No ha tenido arrestos.";
            } else if (arrestos > 0) {
                var stringHTMLarr = "<strong> Arrestos: </strong>" + respuestaJSON.arrestos + "<strong> &nbsp;&nbsp;Días de Arresto: </strong>" + respuestaJSON.dias_arrestado;
            }


            //faltas
            var faltas = respuestaJSON.faltas;
            if (faltas == 0) {
                var stringHTMLfal = "<strong> Faltas: </strong>No ha Faltado.";
            } else if (faltas > 0) {
                var stringHTMLfal = "<strong> Faltas: </strong>" + respuestaJSON.faltas;
            }

            //COVID
            var covid = respuestaJSON.covid;
            if (covid == 0) {
                var stringHTMLcovid = "<strong> Ha tenido Covid:  <input type='radio' disabled='disabled' name='cvd'></input></strong>";
            } else if (covid == 1) {
                var stringHTMLcovid = "<strong> Ha tenido Covid: <input type='radio'  checked='checked' name='cvd' class='radiob'></input></strong>";
            }

            //millas terrestres
            var per_millasterrestres = respuestaJSON.per_millasterrestres;
            if (per_millasterrestres == 0) {
                var stringHTMLMiT = "<strong> Millas Terrestres: </strong>No tiene millas terrestres.";
            } else if (per_millasterrestres > 0) {
                var stringHTMLMiT = "<strong> Millas Terrestres: </strong>" + respuestaJSON.per_millasterrestres;
            }

            //millas aereas
            var per_millasaereas = respuestaJSON.per_millasaereas;
            if (per_millasaereas == 0) {
                var stringHTMLMiA = "<strong> Millas Aereas: </strong>No tiene millas aereas.";
            } else if (per_millasaereas > 0) {
                var stringHTMLMiA = "<strong> Millas Aereas: </strong>" + respuestaJSON.per_millasaereas;
            }

            //var gradomayus = strtoupper(respuestaJSON.gr_abrev);

            $("#consultaPersonal").html("<div class='row'><div class='col-md-8'>" +
                "<strong> Militar: </strong>" + respuestaJSON.gr_abrev + " " + respuestaJSON.cs_descripcion + " " + respuestaJSON.nombre + " " + respuestaJSON.paterno + " " + respuestaJSON.materno +
                "<br>" + "<strong>Aréa laboral: </strong>" + respuestaJSON.descripcion +
                "<br>" + "<strong>Situacion actual: </strong>" + respuestaJSON.sit_per_desc +
                "</div>" +
                "<div class='col-md-4'>" +
                "<img class='justify-content-center' id='imgfoto' src='" + respuestaJSON.foto + "' width='45%' height='85%'></a>" +
                "</div></div>" +
                "<div class='row'><div class='col-md-11'>" +
                "<ul>" +
                "<i>" +
                "<strong> REPORTE ANUAL: </strong>" +
                "</i>" +
                "</ul>" +
                "<ul>" +
                "<i>" +
                stringHTMLgira +
                "</i>" +
                "</ul>" +
                "<ul>" +
                "<i>" +
                stringHTMLvac +
                "</i>" +
                "</ul>" +
                "</div></div>" +
                "<div class='row'><div class='col-md-11'>" +
                "<ul>" +
                "<i>" +
                stringHTMLlic +
                "</i>" +
                "</ul>" +
                "<ul>" +
                "<i>" +
                stringHTMLper + stringHTMLreb +
                "</i>" +
                "</ul>" +
                "<ul>" +
                "<i>" +
                stringHTMLarr +
                "</i>" +
                "</ul>" +
                "<ul>" +
                "<i>" +
                stringHTMLfal + "&nbsp;&nbsp;" + stringHTMLcovid +
                "</i>" +
                "</ul>" +
                "</div></div>" +
                "<div class='row'><div class='col-md-11'>" +
                "<ul>" +
                "<i>" +
                stringHTMLMiT + "&nbsp;&nbsp;" + stringHTMLMiA +
                "</i>" +
                "</ul>" +
                "</div></div>"
            );
            $("#modalPersonal").modal("show");
        })

    .fail(function(jqXHR, textStatus, errorThrown) {

        toastr["error"]("No se puede encontrar el elemento la localidad, consulte a su administrador.", "Error");
    });
}



function getAviones() {
    $.ajax({
        url: "controlador/getAviones.php",
        type: "POST",
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "<option value='0'>Seleccione el avion</option>";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].matricula + "'>  " + data[i].tipo + " " + data[i].matricula + "</option>";
            }
            $("#avion").html(cadena);
        } else {
            toastr["info"]("No se encontraron avion.", "Info");
            cadena = "<option value='0'>Dar de alta avion.</option>";
            $("#avion").html(cadena);
        }
    });
}

function getHelicopteros() {
    $.ajax({
        url: "controlador/getHelicopteros.php",
        type: "POST",
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "<option value='0'>Seleccione el helicoptero</option>";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].matricula + "'>  " + data[i].tipo + " " + data[i].matricula + "</option>";
            }
            $("#helicoptero").html(cadena);
        } else {
            toastr["info"]("No se encontraron avion.", "Info");
            cadena = "<option value='0'>Dar de alta helicoptero.</option>";
            $("#helicoptero").html(cadena);
        }
    });
}