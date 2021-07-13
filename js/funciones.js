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
});

function recargar() {
    location.reload();
}

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
                cadena += "<option value='" + data[i].icve_localidad + "'>" + data[i].localidad_nombre + ' ' + data[i].estado_nombre + "</option>";
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
            $("#aeropuertos").html(cadena);
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
            $("#hospedaje").html(cadena);
        } else {
            cadena = "<option value='0'>Seleccione hospedaje.</option>";
            $("#hospedaje").html(cadena);
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
            location.reload();
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

function getSituacion() {
    $.ajax({
        url: "controlador/getSituacion.php",
        type: "POST",
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].id_per + "'>" + data[i].sit_per_desc + "</option>";
            }
            $("#situacion").html(cadena);
            var idpais = $("#situacion").val();

        } else {
            toastr["error"]("No se encontro el catalogo de situaciones.", "Error");
            cadena = "<option value='0'>Sin resultados.</option>";
            $("#situacion").html(cadena);
        }
    });
}



function guardarGira() {
    var motivoGira = $("#motivogira").val();
    var fechaInicio = $("#fechainicio").val();
    var fechafin = $("#fechafin").val();
    var localidad = $("#localidad").val();
    var aeropuertos = $("#aeropuertos").val();
    var hospedaje = $("#hospedaje").val();
    var obsHospedaje = $("#obsHospedaje").val();
    var aeronave = $("#aeronave").val();
    var modeloaeronave = $("#modeloaeronave").val();
    var funcionario = $("#funcionario").val();
    var elementos = $("#elemento").val();
    var obsGira = $("#obsGira").val();

    var datos = {
        "motivoGira": motivoGira,
        "fechaInicio": fechaInicio,
        "fechafin": fechafin,
        "localidad": localidad,
        "aeropuertos": aeropuertos,
        "hospedaje": hospedaje,
        "obsHospedaje": obsHospedaje,
        "aeronave": aeronave,
        "modeloaeronave": modeloaeronave,
        "funcionario": funcionario,
        "elementos": elementos,
        "obsGira": obsGira
    }

    if (motivoGira == "") {
        toastr["error"]("Por favor indique el motivo de la gira.", "Error");
        $("#motivogira").css({ "border-color": "red" });
    } else if (fechaInicio == "") {
        toastr["error"]("Por favor indique la fecha de inicio de la gira.", "Error");
        $("#fechainicio").css({ "border-color": "red" });
    } else if (fechafin == "") {
        toastr["error"]("Por favor indique la fecha de fin de la gira.", "Error");
        $("#fechafin").css({ "border-color": "red" });
    } else if (fechafin < fechaInicio) {
        toastr["error"]("Error en la fecha de fin, no puede ser menor que la fecha de inicio de la gira..", "Error");
    } else if (funcionario == "") {
        toastr["error"]("Seleccionar cuando menos un funcionario.", "Error");
        $("#funcionario").css({ "border-color": "red" });
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
            $("#fechainicio").val("");
            $("#fechafin").val("");
            $("#localidad").val("");
            $("#aeropuertos").val("");
            $("#hospedaje").val("");
            $("#obsHospedaje").val("");
            $("#aeronave").val("");
            $("#modeloaeronave").val("");
            $("#funcionario").val("");
            $("#elemento").val("");
            $("#obsGira").val("");
            location.reload();
            toastr["success"]("Datos de la gira guardados satisfactoriamente, consulte a su administrador." + respuestaJSON, "Correcto");
        }).fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se pueden guardar los datos de la gira, consulte a su administrador.", "Error");
        });
    }
}

function mostrarModal(matricula) {
    /*Obtengo el valor que voy a mandar en el arreglo de datos
    para el JSON */

    /*$("#consultaPersonal").html("<strong> Localidad: </strong>" + idlocalidad + "</br>" + "<strong> Descripci&oacute;n: " + descripcionLocalidad);
    $("#modalPersonal").modal("show");*/
    //$("#").val("")

    $.ajax({
            type: "POST",
            url: "modal_query.php", //Este archivo PHP
            dataType: "json",
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
                var stringHTMLcovid = "<strong>Ha tenido Covid:  <input type='radio' disabled='disabled' name='cvd'></input></strong>";
            } else if (covid == 1) {
                var stringHTMLcovid = "<strong>Ha tenido  Covid: <input type='radio'  checked='checked' name='cvd' class='radiob'></input></strong>";
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

            //var gradomayus = strto    upper(respuestaJSON.gr_abrev);

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

function guardarSituacion() {

    var fechaInicio = $("#fechainicio").val();
    var fechafin = $("#fechafin").val();
    var elementos = $("#elemento").val();
    var situacion = $("#situacion").val();
    var nota = $("#nota").val();

    var datos = {
        "fechaInicio": fechaInicio,
        "fechafin": fechafin,
        "elementos": elementos,
        "situacion": situacion,
        "nota": nota
    }


    if (fechaInicio == "") {
        toastr["error"]("Por favor indique la fecha de inicio de la situacion del militar.", "Error");
        $("#fechainicio").css({ "border-color": "red" });
    } else if (fechafin == "") {
        toastr["error"]("Por favor indique la fecha de fin de la situacion del militar.", "Error");
        $("#fechafin").css({ "border-color": "red" });
    } else if (fechafin < fechaInicio) {
        toastr["error"]("Error en la fecha de fin, no puede ser menor que la fecha de inicio", "Error");
    } else if (elementos == "") {
        toastr["error"]("Seleccionar cuando menos un elemento.", "Error");
        $("#elemento").css({ "border-color": "red" });
    } else {
        $.ajax({
            url: "controlador/guardarSituacion.php",
            type: "POST",
            data: datos,
            dataType: "json"
        }).done(function(respuestaJSON, txtStatus, jqXHR) {


            $("#fechainicio").val("");
            $("#fechafin").val("");
            $("#elemento").val("");
            $("#situacion").val("");
            $("#nota").val("");
            setTimeout(recargar(), 900);
            toastr["success"]("Datos de la situacion guardados satisfactoriamente, consulte a su administrador." + respuestaJSON.respuesta, "Correcto");
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "16000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se pueden guardar los datos de la situacion, consulte a su administrador.", "Error");

        });
    }
}

function mostrarModalExtracto(matricula) {
    $("#campo-giraid").val(matricula);
    $("#modal-oficio").modal("show");
}

function descargarExtracto() {
    var matricula = $("#matricula").val();
    window.location = "personal_extracto_pdf.php?matricula=" + matricula;
}


function generaExtractoPdf(cvegira) {
    window.location.href = "personal_extracto_pdf.php?matricula=" + matricula;
}





function mostrarModalOficio(giraid) {
    $("#campo-giraid").val(giraid);
    $("#modal-oficio").modal("show");
}

function descargarOficio(giraid) {
    //var cvegiraid = $("#campo-giraid").val();

    window.location = "template.php?cvegiraid=" + giraid; //+"&localida="+localidad_of_gira PARA MAS PARAMETROS
    //$("#modal-oficio").modal("hide");
}

function generaOficioWord(cvegira) {
    window.location.href = "template.php?cvegiraid=" + cvegira;
}


function guardarBajaPer() {


    var elementos = $("#elemento").val();
    var nota = $("#nota").val();

    var datos = {
        "elementos": elementos,
        "nota": nota
    }


    if (nota == "") {
        toastr["error"]("Capture la nota correspondiente a la baja por favor.", "Error");
        $("#nota").css({ "border-color": "red" });
    } else if (elementos == "") {
        toastr["error"]("Seleccionar cuando menos un elemento.", "Error");
        $("#elemento").css({ "border-color": "red" });
    } else {
        $.ajax({
            url: "controlador/guardarBajaPer.php",
            type: "POST",
            data: datos,
            dataType: "json"
        }).done(function(respuestaJSON, txtStatus, jqXHR) {


            $("#elemento").val("");
            $("#nota").val("");
            setTimeout(recargar(), 900);
            toastr["success"]("Datos de la baja guardados satisfactoriamente ." + respuestaJSON.respuesta, "Correcto");
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "16000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se pueden guardar los datos de la baja, consulte a su administrador.", "Error");

        });
    }
}

function mostrarModalOficio(giraid) {
    $("#campo-giraid").val(giraid);
    $("#modal-oficio").modal("show");
}

function descargarOficio(giraid) {
    //var cvegiraid = $("#campo-giraid").val();

    window.location = "template.php?cvegiraid=" + giraid; //+"&localida="+localidad_of_gira PARA MAS PARAMETROS
    //$("#modal-oficio").modal("hide");
}

function generaOficioWord(cvegira) {
    window.location.href = "template.php?cvegiraid=" + cvegira;
}

function getGrados() {
    $.ajax({
        url: "controlador/getGrados.php",
        type: "POST",
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "<option value='0'>Seleccione Grado</option>";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].id_gra + "'>  " + data[i].gr_descripcion + "</option>";
            }
            $("#grado").html(cadena);
        } else {
            toastr["info"]("No se encontraron grados.", "Info");
            cadena = "<option value='0'>Dar de alta grado.</option>";
            $("#grado").html(cadena);
        }
    });
}

function getCyS() {
    $.ajax({
        url: "controlador/getCyS.php",
        type: "POST",
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "<option value='0'>Seleccione Cuerpo y Servicio</option>";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].id_cs + "'>  " + data[i].cs_descripcion + "</option>";
            }
            $("#cuerpo_serv").html(cadena);
        } else {
            toastr["info"]("No se encontraron grados.", "Info");
            cadena = "<option value='0'>Dar de alta Cuerpo.</option>";
            $("#cuerpo_serv").html(cadena);
        }
    });
}

function getCargo() {
    $.ajax({
        url: "controlador/getCargos.php",
        type: "POST",
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "<option value='0'>Seleccione el Cargo</option>";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].id_car + "'>  " + data[i].descripcion + "</option>";
            }
            $("#cargo").html(cadena);
        } else {
            toastr["info"]("No se encontraron cargos.", "Info");
            cadena = "<option value='0'>Dar de alta cargo.</option>";
            $("#cargo").html(cadena);
        }
    });
}


function getCargo_op() {
    $.ajax({
        url: "controlador/getCargo_op.php",
        type: "POST",
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "<option value='0'>Seleccione el cargo_op</option>";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].cargo_op_id + "'>  " + data[i].cargo_op_desc + "</option>";
            }
            $("#cargo_op").html(cadena);
        } else {
            toastr["info"]("No se encontraron cargo_op.", "Info");
            cadena = "<option value='0'>Dar de alta cargo_op.</option>";
            $("#cargo_op").html(cadena);
        }
    });
}

function getArea_lab() {
    $.ajax({
        url: "controlador/getArea_lab.php",
        type: "POST",
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "<option value='0'>Seleccione el Area laboral</option>";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i].id_area + "'>  " + data[i].descripcion + "</option>";
            }
            $("#area_lab").html(cadena);
        } else {
            toastr["info"]("No se encontraron area laboral.", "Info");
            cadena = "<option value='0'>Dar de alta area_lab.</option>";
            $("#area_lab").html(cadena);
        }
    });
}

function guardarPersonal() {
    var matricula = $("#matricula").val();
    var RFC = $("#RFC").val();
    var CURP = $("#CURP").val();
    var grado = $("#grado").val();
    var cuerpo_serv = $("#cuerpo_serv").val();
    var nombre = $("#nombre").val();
    var paterno = $("#paterno").val();
    var materno = $("#materno").val();
    var fechanac = $("#fechanac").val();
    var fechaalta = $("#fechaalta").val();
    var cargo = $("#cargo").val();
    var cargo_op = $("#cargo_op").val();
    var area_lab = $("#area_lab").val();
    var telefono = $("#telefono").val();
    var sgira = $("#sgira").val();

    var datos = {
        "matricula": matricula,
        "RFC": RFC,
        "CURP": CURP,
        "grado": grado,
        "cuerpo_serv": cuerpo_serv,
        "nombre": nombre,
        "paterno": paterno,
        "materno": materno,
        "fechanac": fechanac,
        "fechaalta": fechaalta,
        "cargo": cargo,
        "cargo_op": cargo_op,
        "area_lab": area_lab,
        "telefono": telefono,
        "sgira": sgira
    }

    if (matricula == "") {
        toastr["error"]("Por favor indique la matricula.", "Error");
        $("#matricula").css({ "border-color": "red" });
    } else if (RFC == "") {
        toastr["error"]("Por favor indique el RFC.", "Error");
        $("#RFC").css({ "border-color": "red" });
    } else if (CURP == "") {
        toastr["error"]("Por favor indique la CURP.", "Error");
        $("#CURP").css({ "border-color": "red" });
    } else if (grado == "") {
        toastr["error"]("Por favor indique el grado.", "Error");
        $("#grado").css({ "border-color": "red" });
    } else if (cuerpo_serv == "") {
        toastr["error"]("Por favor indiqueel cuerpo y servicio.", "Error");
        $("#cuerpo_serv").css({ "border-color": "red" });
    } else if (nombre == "") {
        toastr["error"]("Por favor indique el o los nombres.", "Error");
        $("#nombre").css({ "border-color": "red" });
    } else if (paterno == "") {
        toastr["error"]("Por favor indique el apellido paterno.", "Error");
        $("#paterno").css({ "border-color": "red" });
    } else if (materno == "") {
        toastr["error"]("Por favor indique el apellido materno.", "Error");
        $("#materno").css({ "border-color": "red" });
    } else if (fechanac == "") {
        toastr["error"]("Por favor indique la fecha de nacimiento.", "Error");
        $("#fechanac").css({ "border-color": "red" });
    } else if (fechaalta == "") {
        toastr["error"]("Por favor indique la fecha de alta.", "Error");
        $("#fechaalta").css({ "border-color": "red" });
    } else if (cargo == "") {
        toastr["error"]("Por favor indique el cargo.", "Error");
        $("#cargo").css({ "border-color": "red" });
    } else if (cargo_op == "") {
        toastr["error"]("Por favor indique el cargo de operacion.", "Error");
        $("#cargo_op").css({ "border-color": "red" });
    } else if (area_lab == "") {
        toastr["error"]("Por favor indique el area laboral.", "Error");
        $("#area_lab").css({ "border-color": "red" });
    } else if (telefono == "") {
        toastr["error"]("Por favor indique el telefono.", "Error");
        $("#telefono").css({ "border-color": "red" });
    } else if (sgira == "") {
        toastr["error"]("Por favor indique si el personal a dar de alta sale de gira.", "Error");
        $("#sgira").css({ "border-color": "red" });
    } else {
        $.ajax({
            url: "controlador/guardarPersonal.php",
            type: "POST",
            data: datos,
            dataType: "json"
        }).done(function(respuestaJSON, txtStatus, jqXHR) {
            //var resultado = JSON.parse(respuestaJSON);
            //alert(respuestaJSON);
            $("#matricula").val("");
            $("#RFC").val("");
            $("#CURP").val("");
            $("#grado").val("");
            $("#cuerpo_serv").val("");
            $("#nombre").val("");
            $("#paterno").val("");
            $("#materno").val("");
            $("#fechanac").val("");
            $("#fechaalta").val("");
            $("#cargo").val("");
            $("#cargo_op").val("");
            $("#area_lab").val("");
            $("#telefono").val("");
            $("#sgira").val("")

            toastr["success"](respuestaJSON.respuesta, "Correcto");
            location.reload();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No se pueden guardar los datos de la personal, consulte a su administrador.", "Error");
        });
    }
}