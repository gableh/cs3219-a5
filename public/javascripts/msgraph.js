FusionCharts.ready(function () {

    multiseries_draw = function (xaxisname, yaxisname,categories, series, plottooltext, bgcolor) {
        var chart = new FusionCharts({
            type: 'mscolumn2d',
            renderAt: 'chart-container',
            width: '100%',
            height: '100%',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "palette": "1",
                    "xAxisName": xaxisname,
                    "yAxisName": yaxisname,
                    "numberprefix": null,
                    "showvalues": "0",
                    "legendshadow": "0",
                    "legendborderalpha": "0",
                    "legendbgcolor": "FFFFFF",
                    "plottooltext": plottooltext,
                    "plotgradientcolor": "",
                    "bgAlpha": "0",
                    "canvasBgAlpha":"0",
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

    msgraph_transform= function(response) {
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

    multiseries_render_select = function(){

        options = [
            {
                value:'mscolumn2d',
                text: "2D Column Chart"
            },
            {
                value:'mscolumn3d',
                text: "3D Column Chart"
            },
            {
                value:'msbar2d',
                text: "2D Bar Chart"
            },
            {
                value:'msbar3d',
                text: "3D Bar Chart"
            },
            {
                value:'marimekko',
                text: "Marimekko Chart"
            }
    ];

        var styles = $("#styles");
        //remove all options
        styles.empty();
        for (i = 0; i < options.length; i++)
        {
            styles.append($('<option>',
                {
                    value: options[i]["value"],
                    text : options[i]["text"]
                }));
        }


    };

    $.ajax(settings).done(function (response) {
        data = msgraph_transform(response);
        categories = null;
        series = null;
        multiseries_draw("Authors", "these are the captions", categories, series, "Year : $seriesname\nRevenue : $datavalue", "FFFFFF").render();
    });
});