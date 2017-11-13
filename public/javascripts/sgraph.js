FusionCharts.ready(function () {

    singleseries_draw = function (xaxisname, yaxisname, data, plottooltext, bgcolor) {
        var chart = new FusionCharts({
            type: "column2d",
            renderAt: 'chart-container',
            width: '100%',
            height: '100%',
            dataFormat: "json",
            dataSource: {
                chart: {
                    xAxisName: xaxisname,
                    yAxisName: yaxisname,
                    bgcolor: "#123123",
                    paletteColors: "#FE3F45,#FE871A,#FEBC41,#98CE2C,#0B99C9,#36B5E4,#d9d9d9,#bdbdbd,#969696,#636363",
                    plotttooltext: plottooltext,
                    bgAlpha: "0",
                    canvasBgAlpha:"0",
                    canvasborderthickness: "0",
                    showcanvasborder: "0",
                    showBorder: "0",
                    canvasborderalpha: "0",
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


    function sgraph_transform(response) {
        data = [];
        for (var key in response) {
            if($.isPlainObject(response[key])){
                for(key2 in response[key]){
                    data.push({label: key2, value: response[key][key2]});
                }
            }
            data.push({label: key, value: response[key]});
        }
        return data;
    }

    singleseries_render_select = function(){

        options = [
            {
                value:'column2d',
                text: "2D Column Chart"
            },
            {
                value:'column3d',
                text: "3D Column Chart"
            },
            {
                value:'bar2d',
                text: "2D Bar Chart"
            },
            {
                value:'bar3d',
                text: "3D Bar Chart"
            },
            {
                value:'line',
                text: "Line Chart"
            },
            {
                value:'area2d',
                text: "2D Area Chart"
            },
            {
                value:'pie2d',
                text: "2D Pie Chart"
            },
            {
                value:'pie3d',
                text: "3D Pie Chart"
            },
            {
                value:'doughnut2d',
                text: "2D Doughnut Chart"
            },
            {
                value:'doughnut3d',
                text: "3D Doughnut Chart"
            },
            {
                value:'pareto2d',
                text: "2D Pareto Chart"
            },
            {
                value:'pareto3d',
                text: "3D Pareto Chart"
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
});