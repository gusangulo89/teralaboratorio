$(document).ready(function() {
    cantidadGirasXmes();
});


function cantidadGirasXmes() {
    $.ajax({
            type: "POST",
            url: "controlador/estadisticas_graficas.php",
            dataType: "json"
        })
        .done(function(estadisticas, txtStatus, jqXHR) {
            var data = {
                labels: ["Ene", "Feb", "Mar", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                datasets: [{
                    label: "Giras",
                    fillColor: "rgba(54,87,255,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [estadisticas.girasenero, estadisticas.girasfebrero, estadisticas.girasmarzo, estadisticas.girasabril, estadisticas.girasmayo,
                        estadisticas.girasjunio, estadisticas.girasjulio, estadisticas.girasagosto, estadisticas.girasseptiembre, estadisticas.girasoctubre,
                        estadisticas.girasnoviembre, estadisticas.girasdiciembre
                    ]
                }]
            };

            var persoSituacion = {
                labels: ["Presente", "Licencias", "Vacaciones", "Rebajados", "Faltistas"],
                datasets: [{
                    label: "Presente",
                    fillColor: "rgba(250,143,82,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [estadisticas.perpresentes, estadisticas.perlicencias, estadisticas.pervacaciones,
                        estadisticas.perrebajados, estadisticas.perfaltistas
                    ]
                }]
            };

            var situacionVehiculos = [{
                    value: estadisticas.sitvehprimera,
                    color: "#26913F",
                    highlight: "#FF5A5E",
                    label: "Primera Situaci\u00f3n"
                }, {
                    value: estadisticas.sitvehsegunda,
                    color: "#F5E82A",
                    highlight: "#5AD3D1",
                    label: "Segunda Situaci\u00f3n"
                },
                {
                    value: estadisticas.sitvehtercera,
                    color: "#F7341E",
                    highlight: "#5AD3D1",
                    label: "Tercera Situaci\u00f3n"
                },
                {
                    value: estadisticas.sitvehcuarta,
                    color: "#2899EB",
                    highlight: "#FFC870",
                    label: "Orden de Operaciones"
                }
            ]

            var situacionAeronaves = {
                labels: ["Primera", "Segunda", "Tercera", "Ord.Oper."],
                datasets: [{
                    label: "Aviones",
                    fillColor: "rgba(250,143,82,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [3, 8, 5, 1]
                }, {
                    label: "Helicopteros",
                    fillColor: "rgba(161,214,235,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [estadisticas.sitheli1, estadisticas.sitheli2, estadisticas.sitheli3,
                        estadisticas.sitheli4
                    ]
                }]
            };

            var ctxl = $("#lineChartDemo").get(0).getContext("2d");
            var lineChart = new Chart(ctxl).Line(data);

            var ctxb = $("#barChartDemo").get(0).getContext("2d");
            var barChart = new Chart(ctxb).Bar(persoSituacion);

            var ctxd = $("#doughnutChartDemo").get(0).getContext("2d");
            var doughnutChart = new Chart(ctxd).Doughnut(situacionVehiculos);

            var ctxb2 = $("#sitaeronaves").get(0).getContext("2d");
            var barChart2 = new Chart(ctxb2).Bar(situacionAeronaves);






            var ctxr = $("#radarChartDemo").get(0).getContext("2d");
            var radarChart = new Chart(ctxr).Radar(data);

            var ctxpo = $("#polarChartDemo").get(0).getContext("2d");
            var polarChart = new Chart(ctxpo).PolarArea(pdata);

            var ctxp = $("#pieChartDemo").get(0).getContext("2d");
            var pieChart = new Chart(ctxp).Pie(pdata);


        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            toastr["error"]("No existe el regitro consulte a su administrador.", "Error");
        });
}






var pdata = [{
    value: 300,
    color: "#F7464A",
    highlight: "#FF5A5E",
    label: "Red"
}, {
    value: 50,
    color: "#46BFBD",
    highlight: "#5AD3D1",
    label: "Green"
}, {
    value: 100,
    color: "#FDB45C",
    highlight: "#FFC870",
    label: "Yellow"
}]