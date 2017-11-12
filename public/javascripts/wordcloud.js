$(document).ready(function(){
    function isInt(value) {
        var x;
        return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
    }

    $("#submit").click(function () {
        $("#loader").removeClass("hidden");
        url = "http://188.166.212.83:8080/api";
        reference_type = $("#reference_type").find("option:selected")[0].value;
        url += "/" + reference_type;
        query_type = $("#query_type").find("option:selected")[0].value;
        url += "/" + query_type;

        headers = {};

        limit = $("#limit").val();
        if(isInt(limit)){
            headers["limit"] = parseInt(limit)
        } else {
            headers["limit"] = "100"
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
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "type": "GET",
            "data": headers
        };
        $.ajax(settings).fail(function(){
            $("#loader").addClass("hidden");
            alert("Invalid Query, Please check your params");
        }).done(function (response) {
            var colors = [ '#FE3F45', '#FE871A', '#FEBC41', '#98CE2C', '#0B99C9', '#36B5E4', '#d9d9d9', '#bdbdbd', '#969696', '#636363' ];
            words = []
            $("#loader").addClass("hidden");
            for(key in response){
                words.push({"text": key, "size": parseInt(response[key])});
            }
            $("svg").remove();
            d3.wordcloud()
                .selector('#chart-container')
                .size([parseInt($("#chart-container").width()), 450])
                .words(words).font("Impact")
                .fill(d3.scale.ordinal().range(colors))
                .start();
        });

    });
});