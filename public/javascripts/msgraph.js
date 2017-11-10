FusionCharts.ready(function () {

    multiseries_draw = function (caption, subcaption, categories, series, plottooltext) {
        var chart = new FusionCharts({
            type: 'mscolumn2d',
            renderAt: 'chart-container',
            width: '100%',
            height: '600',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "palette": "1",
                    "caption": caption,
                    "subcaption": subcaption,
                    "numberprefix": null,
                    "showvalues": "0",
                    "legendshadow": "0",
                    "legendborderalpha": "0",
                    "legendbgcolor": "FFFFFF",
                    "plottooltext": plottooltext,
                    "plotgradientcolor": "",
                    "bgcolor": "FFFFFF",
                    "showalternatehgridcolor": "0",
                    "divlinecolor": "CCCCCC",
                    "showcanvasborder": "0",
                    "canvasborderalpha": "0",
                    "canvasbordercolor": "CCCCCC",
                    "canvasborderthickness": "1",
                    "captionpadding": "30",
                    "linethickness": "3",
                    "yaxisvaluespadding": "15",

                },
                "categories": categories,
                "dataset": series
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
        "url": "http://188.166.212.83:8080/api/papers/count?years[]=2011&years[]=2012&years[]=2013&venues[]=arxiv&venues[]=icse&groups[]=years&groups[]=venues",
        "method": "GET",
        "headers": {}
    };

    parse_response = function(response) {
        var categories = [{"category": []}];
        var serii = [];
        for (category in response) {
            categories[0]["category"].push({
                "label": category,
                "stepSkipped": false,
                "appliedSmartLabel": true
            });
            for (series_name in response[category]){
                var found = false;
                for (i in serii){
                    if (serii[i]["seriesname"] == series_name){
                        found = true;
                        serii[i]["data"].push({"value": response[category][series_name]});
                        break;
                    }
                }
                if(!found){
                    serii.push({
                        "seriesname": series_name,
                        "data": [{
                            "value": response[category][series_name]
                        }]
                    });
                }
            }
        }
        return {"series": serii, "categories": categories}
    };

    $.ajax(settings).done(function (response) {
        data = parse_response(response);
        categories = data["categories"];
        series = data["series"];
        multiseries_draw("Authors", "these are the captions", categories, series, "Year : $seriesname\nRevenue : $datavalue").render();
    });
});