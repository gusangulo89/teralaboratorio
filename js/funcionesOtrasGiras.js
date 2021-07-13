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



function guardarGiraOtra() {
    var motivogira = $("#motivogira").val();
    var fechainicio = $("#fechainicio").val();
    var fechafin = $("#fechafin").val();
    var localidad = $("#localidad").val();
    var elementos = $("#elemento").val();
    var obsGira = $("#obsGira").val();


    if (elementos == null || elementos == "") {
        elementos = 0;
    }



    var datos = {
        "motivogira": motivogira,
        "fechainicio": fechainicio,
        "fechafin": fechafin,
        "localidad": localidad,
        "elementos": elementos,
        "obsGira": obsGira
    }

  if (motivogira == "") {
        toastr["warning"]("Especifique el motivo de la gira.");
        $("#motivogira").css({ "border-color": "red" });
        $("#motivogira").focus();
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
    } else if (localidad == "") {
        toastr["error"]("Por favor indique la localidad de la gira.", "Error");
        $("#localidad").css({ "border-color": "" });
        $("#localidad").css({ "border-color": "red" });
    } else if (elementos == "") {
        toastr["error"]("Seleccionar cuando menos un elemento.", "Error");
        $("#elemento").css({ "border-color": "red" });
    } else {
        $.ajax({
            url: "controlador/guardarGiraOtra.php",
            type: "POST",
            data: datos,
            dataType: "json"
        }).done(function(respuestaJSON, txtStatus, jqXHR) {
            //var resultado = JSON.parse(respuestaJSON);
            //alert(respuestaJSON);
            $("#motivogira").val("");
            $("#fechainicio").val("");
            $("#fechafin").val("");
            $("#localidad").val("");
            $("#elemento").val("");
            $("#obsGira").val("");
            location.reload();
            toastr["success"]("Datos de la gira guardados satisfactoriamente, consulte a su administrador." + respuestaJSON.resultgira, "Correcto");
        }).fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se pueden guardar los datos de la gira, consulte a su administrador.", "Error");
        });
    }
}


function consultaOtraGira(cvegira) {
    var gira = {
        "icvegira": cvegira
    }

    $.ajax({
            type: "POST",
            url: "controlador/getConsultaOtraGira.php",
            dataType: "JSON",
            data: gira
        })
        .done(function(giraConsulta, txtStatus, jqXHR) {


            $("#udp-icvegira").val(giraConsulta.gira.gira_id);
            $("#udp-giramotivo_alm").val(giraConsulta.gira.motivogiraalm);
            $("#udp-motivogira").val(giraConsulta.gira.motivogira);
            $("#udp-fechainicio").val(giraConsulta.gira.girainicio);
            $("#udp-fechafin").val(giraConsulta.gira.girafin);
            $("#udp-pais").append("<option value='" + giraConsulta.gira.cvepais + "'>" + giraConsulta.gira.paisnombre + "</option>");
            $("#udp-estado").append("<option value='" + giraConsulta.gira.cveestado + "'>" + giraConsulta.gira.estadonombre + "</option>");
            $("#udp-localidad").append("<option value='" + giraConsulta.gira.cvelugar + "'>" + giraConsulta.gira.localidadnombre + "</option>");

        
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
           // var cvelocalidad = $("#udp-localidad").val();
               

            //$("#modeloaeronave").append("<option value='" + giraConsulta.gira.tipoaeronave + "'>" + giraConsulta.gira.tipoaeronave + "</option>");
            $("#udp-observaciones").val(giraConsulta.gira.giraobservaciones);
            $("#udp-millasterrestres").val(giraConsulta.gira.millasterrestres);
            $("#udp-millasaereas").val(giraConsulta.gira.millasaereas);
            $("#modal-gira").modal("show");

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se puede consultar la gira, verifique con el administrador del sistema.", "Error");
        });
}


function consultaGiracon2(cvegira) {
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

function actualizaOtraGira() {
    /* Recolecto Datos*/
    var udpCveGira = $("#udp-icvegira").val();
    var udpMotivoGira = $("#udp-motivogira").val();
    var udpFechaInicio = $("#udp-fechainicio").val();
    var udpFechaFin = $("#udp-fechafin").val();
    var udpLocalidad = $("#udp-localidad").val();
    var udpAeropuertos = $("#udp-aeropuertos").val();
    var udpElemento = $("#udp-elemento").val();
    var udpObservaciones = $("#udp-observaciones").val();
    var udpMillasTerrestres = $("#udp-millasterrestres").val();
    var udpMillasAereas = $("#udp-millasaereas").val();

  

    if (udpElemento == 0 || udpElemento == null) {
        udpElemento = 0;
    }

    if (udpMillasTerrestres == 0 || udpMillasTerrestres == null) {
        udpMillasTerrestres = 0;
    }

    if (udpMillasAereas == 0 || udpMillasAereas == null) {
        udpMillasAereas = 0;
    }

    

    var datos = {
        "udpCveGira": udpCveGira,
        "udpMotivoGira": udpMotivoGira,
        "udpFechaInicio": udpFechaInicio,
        "udpFechaFin": udpFechaFin,
        "udpLocalidad": udpLocalidad,
        "udpElemento": udpElemento,
        "udpObservaciones": udpObservaciones,
        "udpMillasTerrestres": udpMillasTerrestres,
        "udpMillasAereas": udpMillasAereas,
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


