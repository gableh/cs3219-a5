FusionCharts.ready(function () {

    data = [{
        label: "Bakersfield Central",
        value: "880000"
    }, {
        label: "Garden Groove harbour",
        value: "730000"
    }, {
        label: "Los Angeles Topanga",
        value: "590000"
    }, {
        label: "Compton-Rancho Dom",
        value: "520000"
    }, {
        label: "Daly City Serramonte",
        value: "330000"
    }];

    singleseries_draw = function (caption, subcaption, data, plottooltext) {
        var chart = new FusionCharts({
            type: "column2d",
            renderAt: 'chart-container',
            width: '100%',
            height: '600',
            dataFormat: "json",
            dataSource: {
                chart: {
                    caption: caption,
                    subCaption: subcaption,
                    paletteColors: "#FE3F45,#FE871A,#FEBC41,#98CE2C,#0B99C9,#36B5E4,#d9d9d9,#bdbdbd,#969696,#636363",
                    plotttooltext: plottooltext
                },
                data: data
            }
        });
        return chart;
    };

    singleseries_draw("Captions", "subcaptions", data, "Year :" + " $label\nRevenue : $value").render();
    $("tspan").remove();
    $('#styles').change(function () {
        value = $(this).find("option:selected")[0].value;
        $("#chart-container").updateFusionCharts({
            "type": value
        });
        $("tspan").remove();
    });
});