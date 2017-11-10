FusionCharts.ready(function () {

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

    $("tspan").remove();
    $('#styles').change(function () {
        value = $(this).find("option:selected")[0].value;
        $("#chart-container").updateFusionCharts({
            "type": value
        });
        $("tspan").remove();
    });

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://188.166.212.83:8080/api/papers/count?years[]=2013&venues[]=icse&groups[]=venues",
        "method": "GET",
        "headers": {}
    };

    function parse_response(response) {
        data = []
        for (var key in response) {
            data.push({label: key, value: response[key]})
        }
        return data;
    }

    $.ajax(settings).done(function (response) {
        data = parse_response(response);
        singleseries_draw("Captions", "subcaptions", data, "Year :" + " $label\nRevenue : $value").render();
    });
});