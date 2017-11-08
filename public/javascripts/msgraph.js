FusionCharts.ready(function () {

    var categories = [{
        "category": [{
            "label": "2012",
            "stepSkipped": false,
            "appliedSmartLabel": true
        },
            {
                "label": "2013",
                "stepSkipped": false,
                "appliedSmartLabel": true
            },
            {
                "label": "2014",
                "stepSkipped": false,
                "appliedSmartLabel": true
            },
            {
                "label": "2015",
                "stepSkipped": false,
                "appliedSmartLabel": true
            },
            {
                "label": "2016",
                "stepSkipped": false,
                "appliedSmartLabel": true
            }
        ]
    }];

    var series = [{
        "seriesname": "iPod",
        "data": [{
            "value": "42.63"
        },
            {
                "value": "35.16"
            },
            {
                "value": "26.38"
            },
            {
                "value": "20.38"
            },
            {
                "value": "14.23"
            }
        ]
    }

    ];

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
                    "numberprefix": "$",
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

    multiseries_draw("Authors", "these are the captions", categories, series, "Year : $seriesname\nRevenue : $datavalue").render();
    $("tspan").remove();
    $('#styles').change(function () {
        value = $(this).find("option:selected")[0].value;
        $("#chart-container").updateFusionCharts({
            "type": value
        });
        $("tspan").remove();
    });
});