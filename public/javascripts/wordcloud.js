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
            words = []
            $("#loader").addClass("hidden");
            for(key in response){
                words.push({"text": key, "size": parseInt(response[key])});
            }
            d3.wordcloud()
                .size([800, 400])
                .selector('#chart-container')
                .words(words)
                .start();
        });

    });
});