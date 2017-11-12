

$(document).ready(function(){

    network_draw = function (caption, subcaption, data, plottooltext) {
        // TODO: data parser? returns edges and nodes

        // create a network
        var container = document.getElementById('mynetwork');
        var data = data;
        var options = {
            interaction: {
                tooltipDelay: 0
            },
            nodes: {
                shape: 'dot',
                size: 16
            },
            physics: {
                forceAtlas2Based: {
                    gravitationalConstant: -26,
                    centralGravity: 0.005,
                    springLength: 230,
                    springConstant: 0.18
                },
                maxVelocity: 146,
                solver: 'forceAtlas2Based',
                timestep: 0.35,
                stabilization: {iterations: 150}
            }
        };
        var network = new vis.Network(container, data, options);

    };
    String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
        function () {
            "use strict";
            var str = this.toString();
            if (arguments.length) {
                var t = typeof arguments[0];
                var key;
                var args = ("string" === t || "number" === t) ?
                    Array.prototype.slice.call(arguments)
                    : arguments[0];

                for (key in args) {
                    str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
                }
            }

            return str;
        };

    function network_transform(response) {
        nodes = response["nodes"];
        edges = response["links"];
        parsed_nodes = [];
        parsed_edges = [];
        for (var i = 0; i < nodes.length; i++) {
            node = nodes[i];
            title = '<p style="max-width:300px"><p>Title: '+ node["title"] +'</p><p>ID: '+node["id"]+'</p> <p >Authors: '+node["authors"].join(",")+'</p> <p>Year:'+node["year"]+'</p></p>';
            parsed_nodes.push({"id": node["id"], "title": title, "group": parseInt(node["distance"])});
        }
        for (var i = 0; i < edges.length; i++) {
            edge = edges[i];
            parsed_edges.push({"from": edge["source"], "to": edge["target"], "arrows":"from"});
        }
        return {"nodes": parsed_nodes, "edges": parsed_edges}
    }

    $("#submit").click(function () {
        url = "http://188.166.212.83:8080/api/papers/network";
        headers = {};

        center_input = $("#center-input").val() == "" ? "Low-density parity check codes over GF(q)" : $("#center-input").val();
        distance_input = $("#distance-input").val() == "" ? "2" : $("#distance-input").val();

        headers["center"] = center_input;
        headers["length"] = distance_input;

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "type": "GET",
            "data": headers
        };
        $.ajax(settings).fail(function(){
            alert("Invalid Query, Please check your params");
        }).done(function (response) {
            data = network_transform(response);
            network_draw("", "", data, "");
        });

    });
});