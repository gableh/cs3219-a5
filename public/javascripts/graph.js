$(document).ready(function () {
    $("#query_type").change(function () {
        value = $(this).find("option:selected")[0].value;
        console.log(value);
        if (value == "top") {
            $(".top_form").removeClass("hidden");
            $("#limit").parent().removeClass("hidden");
            $(".transition_form").addClass("hidden");
        } else if (value == "count") {
            $(".top_form").addClass("hidden");
            $("#limit").parent().addClass("hidden");
            $(".transition_form").removeClass("hidden");
        }
    });
    $("#top").change(function () {
        value = $(this).find("option:selected")[0].value;
        console.log(value);
        if (value == "") {
            $("#top-input").parent().addClass("hidden");
        } else{
            $("#top-input").parent().removeClass("hidden");
        }
    });
    $("#count-ms").change(function () {
        value = $(this).find("option:selected")[0].value;
        console.log(value);
        if (value == "") {
            $("#count-ms-input").parent().addClass("hidden");
        } else{
            $("#count-ms-input").parent().removeClass("hidden");
        }
    });
    function isInt(value) {
        var x;
        return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
    }
    function sgraph_transform(response) {
        data = [];
        for (var key in response) {
            data.push({label: key, value: response[key]})
        }
        return data;
    }
    $("#submit").click(function () {
        url = "http://188.166.212.83:8080/api";
        reference_type = $("#reference_type").find("option:selected")[0].value;
        url += "/" + reference_type;
        query_type = $("#query_type").find("option:selected")[0].value;
        url += "/" + query_type;

        headers = {};

        if (query_type == "top") {
            limit = $("#limit").val();
            if(isInt(limit)){
                headers["limit"] = parseInt(limit)
            } else {
                headers["limit"] = "10"
            }
            sort = $("#reference_type").find("option:selected")[0].value;
            if(sort=="citations"){
                headers["context"] = "citations"
            }
            topvalue = $("#top").find("option:selected")[0].value;
            if(topvalue != ""){
                topinput = $("#top-input").val();
                if(topinput != ""){
                    // topinput = topinput.split(",");
                    // for (var i = 0; i < topinput.length; i++) {
                    //     topinput[i] = topinput[i].trim();
                    // }
                    headers[topvalue] = topinput;
                }

            }

        } else if (query_type == "count") {
            count_type = $("#count").find("option:selected")[0].value;
            countinput = $("#count-input").val().split(",");
            for (var i = 0; i < countinput.length; i++) {
                countinput[i] = countinput[i].trim();
            }
            headers[count_type] = countinput;
            headers["groups"] = [count_type];

            ms_count_type = $("#count-ms").find("option:selected")[0].value;
            countinput = $("#count-ms-input").val().split(",");
            for (var i = 0; i < countinput.length; i++) {
                countinput[i] = countinput[i].trim();
            }
            headers[ms_count_type] = countinput;
            headers["groups"].push(ms_count_type);

        }

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "type": "GET",
            "data": headers
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
            single_series = true;
            for(key in response){
                if($.isPlainObject(response[key])){
                    single_series = false;
                }
                break;
            }
            if(single_series){
                console.log("fsdf");
                data = sgraph_transform(response);
                singleseries_draw("", "", data, "", "#FFFFFF").render();
                singleseries_render_select();
            } else {
                console.log("fsdffsdf");
                data = msgraph_transform(response);
                categories = data["categories"];
                series = data["series"];
                multiseries_draw("", "", categories, series, "", "FFFFFF").render();
                multiseries_render_select();
            }
        });
    });
});