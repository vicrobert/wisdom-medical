//默认初始医院
var initialhospital = "北京协和医院";
/**关系图**/
function refresh(selectval) {
    $("body").showLoading();
    $("#a").empty();
    var width = $("#a").width(),
        height = $("#a").height(),
        dragEvent = 0,
        root = null;
    var force = d3.layout.force()
        .linkDistance(50) //连接线长度设置
        .charge(-120)
        .gravity(.05)
        .size([width, height])
        .on("tick", tick);
    var svg = d3.select("#a").append("svg")
        .attr("width", width)
        .attr("height", height)
        .call( // <-A
            d3.behavior.zoom() // <-B
                .scaleExtent([-1, 10]) // <-C
                .on("zoom", zoom) // <-D
        ).append("g");

    function zoom() {
        if (dragEvent != 2) {
            svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }
    }
    var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");

 /*   d3.json("./resourceAnalysisController/getResourceAnalysisListD3?hospital_name=" + selectval + "&zzys=" + $("#zzys").get(0).checked + "&zrys=" + $("#zrys").get(0).checked + "&hlwxwsj=" + $("#hlwxwsj").get(0).checked, function(error, json) {*/
        //d3.json("../jsonp/getResourceAnalysisListD3.json", function(error, json) {
     d3.json("../../medical/DoctorInternetAnalysisRefreshD3.action?hospitalName="+encodeURI(encodeURI(selectval)), function(error, json) {
        root = json;
        if (root != null) {
	        $("#doctorMessage").empty();
	        $("#newMessage").empty();
	        if (typeof(root) != null && typeof(root.children[0]) != "undefined" && typeof(root.children[0].children[0]) != "undefined") {
	            //var doctor_id_first = root.children[0].children[0].children[0].children[0].id;
	        		//var doctor_id_first = root.children[0].children[0].id;
	        		changeRight(root.children[0].children[0]);
	        	}
	        update();
        }
        $("body").hideLoading();
    });

    function update() {
        var nodes = flatten(root),
            links = d3.layout.tree().links(nodes);
        force.nodes(nodes)
            .links(links)
            .start();
        link = link.data(links, function(d) {
            return d.target.id;
        });
        link.exit().remove();
        link.enter().insert("line", ".node")
            .attr("class", "link")
            .style("stroke-width", function(d) {
                return d.target.childrenNum + 2.3; //根据子数据多少改变链接线粗细
            });
        node = node.data(nodes, function(d) {
            return d.id;
        });
        node.exit().remove();
        var drag = force.drag()
            .on("dragstart", function(d, i) {
                dragEvent = 1;
                d.fixed = true; //拖拽开始后设定被拖拽对象为固定
            })
            .on("dragend", function(d, i) {
                dragEvent = 0;
            })
            .on("drag", function(d, i) {
                dragEvent = 2;
            });
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .on("click", click)
            .call(drag)
            .on("mouseover", function(d) {
                if (d.tier == 4) {
                    changeRight(d);
                }
            })
            .on("mouseout", function(d) {
                if (d.tier == 4) {}
            });
        nodeEnter.append("circle")
            .attr("r", function(d) {
                return Math.sqrt(d.size) / 3 || 13.5;
            });
        nodeEnter.append("text")
            .attr('dy','-1em')
            .text(function(d) {
                return d.name;
            }).style("fill", textColor).style("font-weight", fontWeight).style('font-size','15px');
        //11点赞数图片
        // nodeEnter.append("image")
        //     .attr("width", 15)
        //     .attr("height", 15)
        //     .attr("transform", function(d) {
        //         return "translate(-30,8)";
        //     })
        //     .attr("xlink:href", function(d) {
        //         if (d.tier == 4) {
        //             return "../images/good.png";
        //         }
        //     });
        // //11点赞数
        // nodeEnter.append("text")
        //     .attr("dy", ".35em")
        //     .style("fill", "#436EEE")
        //     .attr("transform", function(d) {
        //         return "translate(-5,17)";
        //     })
        //     .text(function(d) {
        //         if (d.tier == 4) {
        //             return d.goodNum;
        //         }
        //     });
        // //22解答问题数图片
        // nodeEnter.append("image")
        //     .attr("width", 15)
        //     .attr("height", 15)
        //     .attr("transform", function(d) {
        //         return "translate(10,9)";
        //     })
        //     .attr("xlink:href", function(d) {
        //         if (d.tier == 4) {
        //             return "../images/talk.png";
        //         }
        //     });
        // //22解答问题数
        // nodeEnter.append("text")
        //     .attr("dy", ".35em")
        //     .style("fill", "green")
        //     .attr("transform", function(d) {
        //         return "translate(36,17)";
        //     })
        //     .text(function(d) {
        //         if (d.tier == 4) {
        //             return d.solveProblemNum;
        //         }
        //     });
        node.select("circle")
            .style("fill", color);
    }

    function tick() {
        link.attr("x1", function(d) {
            return d.source.x;
        })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            });
        node.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    }
    //主节点判别 修改字体为粗体
    function fontWeight(d) {
        if (d.tier == 10) {
            return "bold";
        }
    }
    //主节点判别 修改字体颜色
    function textColor(d) {
        if (d.tier == 10) {
            return "#18c2d8";
        }else{
            return '#155ba1'
        }
    }
    

    function color(d) {
        if (d.tier == 10) {
            return "#e37a12";
        }
        return d._children ? "yellow" : d.children ? "#436EEE" : "#4FC5FA";
    }

    function click(d) {
        if (d.tier == 4) {
            overclick(d);
        } else if (d.tier == 5) {
            overclickIllness(d);
        } else {
            if (d3.event.defaultPrevented) return;
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
        }
        update();
    }

    function overclick(d) {
        $('#search_val').val(d.name);
        $('#zzysHS').hide();
        $('#zrysHS').hide();
        $('#showd3page').val("doctor");
        doctorFhospital(d.name, d.hospital);
        $("#hiddenLastHospital").val(d.hospital);
        $('#selectName').empty();
        $('#selectName').append("医生：");
    }

    function overclickIllness(d) {
        $('#search_val').val(d.name);
        $('#zzysHS').show();
        $('#zrysHS').show();
        $('#showd3page').val("illness");
        $('#selectName').empty();
        $('#selectName').append("疾病：");
        goodIllness(d.name);
    }
    var ii = 0;

    function flatten(root) {
        var nodes = [];

        function recurse(node) {
            if (node.children) node.children.forEach(recurse);
            if (!node.id) node.id = ++ii;
            nodes.push(node);
        }
        recurse(root);
        return nodes;
    }
}

/***************************/
/***************************/
/**人》网站》子科室》科室》医院**/
/***************************/
/***************************/
function doctorFhospital(doctor_name, hospital) {
    $("body").showLoading();
    $("#a").empty();
    var width = $("#a").width(),
        height = $("#a").height(),
        dragEvent = 0,
        root = null;
    var force = d3.layout.force()
        .linkDistance(50) //连接线长度设置
        .charge(-120)
        .gravity(.05)
        .size([width, height])
        .on("tick", tickDFS);
    var svg = d3.select("#a").append("svg")
        .attr("width", width)
        .attr("height", height)
        .call( // <-A
            d3.behavior.zoom() // <-B
                .scaleExtent([-1, 10]) // <-C
                .on("zoom", zoom) // <-D
        ).append("g");

    function zoom() {
        if (dragEvent != 2) {
            svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }
    }
    var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");
   /* d3.json("./resourceAnalysisController/getDoctorFhospitalListD3?doctor_name=" + doctor_name + "&hospital=" + hospital, function(error, json) {*/
   //     d3.json("../jsonp/getDoctorFhospitalListD3.json", function(error, json) {
    d3.json("../../medical/DoctorInternetAnalysisRefreshD3ByDoctor.action?doctorName="+encodeURI(doctor_name), function(error, json) {
        root = json;
        updateDFS();
        $("body").hideLoading();
    });

    function updateDFS() {
        var nodes = flattenDFS(root),
            links = d3.layout.tree().links(nodes);
        force.nodes(nodes)
            .links(links)
            .start();
        link = link.data(links, function(d) {
            return d.target.id;
        });
        link.exit().remove();
        link.enter().insert("line", ".node")
            .attr("class", "link")
            .style("stroke-width", function(d) {
                return d.target.childrenNum + 2.3; //根据子数据多少改变链接线粗细
            });
        node = node.data(nodes, function(d) {
            return d.id;
        });
        node.exit().remove();
        var drag = force.drag()
            .on("dragstart", function(d, i) {
                dragEvent = 1;
                d.fixed = true; //拖拽开始后设定被拖拽对象为固定
            })
            .on("dragend", function(d, i) {
                dragEvent = 0;
            })
            .on("drag", function(d, i) {
                dragEvent = 2;
            });
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .on("click", clickDFS)
            .call(drag);
        nodeEnter.append("circle")
            .attr("r", function(d) {
                return Math.sqrt(d.size) / 3 || 13.5;
            });
        nodeEnter.append("text")
            .attr("y", "-10em")
            .attr("dy", "-1em")
            .text(function(d) {
                return d.name;
            }).style("fill", textColorDFS).style("font-weight", fontWeightDFS);
        node.select("circle")
            .style("fill", colorDFS);
    }

    function tickDFS() {
        link.attr("x1", function(d) {
            return d.source.x;
        })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            });
        node.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    }
    //主节点判别 修改字体为粗体
    function fontWeightDFS(d) {
        if (d.tier == 20) {
            return "bold";
        }
    }
    //主节点判别 修改字体颜色
    function textColorDFS(d) {
        if (d.tier == 20) {
            return "#18c2d8";
        }else{
            return '#155ba1'
        }
    }

    function colorDFS(d) {
        if (d.tier == 20) {
            return "#33ADD6";
        }
        if (d.tier == 24) {
            return "#e37a12";
        }
        return d._children ? "yellow" : d.children ? "#436EEE" : "#0099CC";
    }

    function clickDFS(d) {
        if (d.tier == 24) {
            overclickDFS(d);
        } else {
            if (d3.event.defaultPrevented) return;
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
        }
        updateDFS();
    }

    function overclickDFS(d) {
        $('#search_val').val(d.name);
        $('#zzysHS').show();
        $('#zrysHS').show();
        $('#showd3page').val("hospital");
        refresh(d.name);
        $('#selectName').empty();
        $('#selectName').append("医院：");
    }

    function flattenDFS(root) {
        var nodes = [],
            i = 0;

        function recurse(node) {
            if (node.children) node.children.forEach(recurse);
            if (!node.id) node.id = ++i;
            nodes.push(node);
        }
        recurse(root);
        return nodes;
    }
}
/***************************/
/***************************/
/**疾病》区域》城市》医院》科室》医生**/
/***************************/
/***************************/
function goodIllness(illness) {
    $("body").showLoading();
    $("#a").empty();
    var width = $("#a").width(),
        height = $("#a").height(),
        dragEvent = 0,
        root = null;
    var force = d3.layout.force()
        .linkDistance(50) //连接线长度设置
        .charge(-120)
        .gravity(.05)
        .size([width, height])
        .on("tick", tickIllness);
    var svg = d3.select("#a").append("svg")
        .attr("width", width)
        .attr("height", height)
        .call( // <-A
            d3.behavior.zoom() // <-B
                .scaleExtent([-1, 10]) // <-C
                .on("zoom", zoom) // <-D
        ).append("g");

    function zoom() {
        if (dragEvent != 2) {
            svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }
    }
    var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");
   /* d3.json("./resourceAnalysisController/getGoodIllnessD3?illness=" + illness + "&zzys=" + $("#zzys").get(0).checked + "&zrys=" + $("#zrys").get(0).checked, function(error, json) {*/
        d3.json("./resourceAnalysisController/getGoodIllnessD3?illness=" + illness + "&zzys=" + $("#zzys").get(0).checked + "&zrys=" + $("#zrys").get(0).checked, function(error, json) {
        root = json;
        updateIllness();
        $("body").hideLoading();
    });

    function updateIllness() {
        var nodes = flattenIllness(root),
            links = d3.layout.tree().links(nodes);
        force.nodes(nodes)
            .links(links)
            .start();
        link = link.data(links, function(d) {
            return d.target.id;
        });
        link.exit().remove();
        link.enter().insert("line", ".node")
            .attr("class", "link")
            .style("stroke-width", function(d) {
                return d.target.childrenNum + 2.3; //根据子数据多少改变链接线粗细
            });
        node = node.data(nodes, function(d) {
            return d.id;
        });
        node.exit().remove();
        var drag = force.drag()
            .on("dragstart", function(d, i) {
                dragEvent = 1;
                d.fixed = true; //拖拽开始后设定被拖拽对象为固定
            })
            .on("dragend", function(d, i) {
                dragEvent = 0;
            })
            .on("drag", function(d, i) {
                dragEvent = 2;
            });
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .on("click", clickIllness)
            .call(drag)
            .on("mouseover", function(d) {
                if (d.tier == 36) {
                    changeRight(d);
                }
            })
            .on("mouseout", function(d) {
                if (d.tier == 36) {}
            });
        nodeEnter.append("circle")
            .attr("r", function(d) {
                return Math.sqrt(d.size) / 3 || 13.5;
            });
        nodeEnter.append("text")
            .attr("dy", ".35em")
            .text(function(d) {
                return d.name;
            }).style("fill", textColorIllness).style("font-weight", fontWeightIllness);
        node.select("circle")
            .style("fill", colorIllness);
    }

    function tickIllness() {
        link.attr("x1", function(d) {
            return d.source.x;
        })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            });
        node.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    }
    //字体粗体
    function fontWeightIllness(d) {
        if (d.tier == 31) {
            return "bold";
        }
    }
    //字体颜色
    function textColorIllness(d) {
        if (d.tier == 31) {
            return "orange";
        }
        if (d.tier == 32) {
            return "#7744FF";
        }
        if (d.tier == 33) {
            return "#5500FF";
        }
        if (d.tier == 34) {
            return "#4400CC";
        }
        if (d.tier == 35) {
            return "#2200AA";
        }
        if (d.tier == 36) {
            return "#220088";
        }
    }
    /**疾病》区域》城市》医院》科室》医生**/
    //背景色
    function colorIllness(d) {
        if (d.tier == 31) {
            return d.children ? "#e37a12" : "yellow";
        }
        if (d.tier == 32) {
            return d.children ? "#7CFC00" : "yellow";
        }
        if (d.tier == 33) {
            return d.children ? "#7CFC00" : "yellow";
        }
        if (d.tier == 34) {
            return d.children ? "#e37a12" : "yellow";
        }
        if (d.tier == 35) {
            return d.children ? "#20B2AA" : "yellow";
        }
        if (d.tier == 36) {
            return "#1C86EE";
        }
    }

    function clickIllness(d) {
        if (d.tier == 36) {
            overclickIllness(d);
        } else {
            if (d3.event.defaultPrevented) return;
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
        }
        updateIllness();
    }

    function overclickIllness(d) {
        $('#search_val').val(d.name);
        $('#zzysHS').hide();
        $('#zrysHS').hide();
        $('#showd3page').val("doctor");
        $("#hiddenLastHospital").val(d.hospital);
        doctorFhospital(d.name, d.hospital);
        $('#selectName').empty();
        $('#selectName').append("医生：");
    }
    var ii = 0;

    function flattenIllness(root) {
        var nodes = [];

        function recurse(node) {
            if (node.children) node.children.forEach(recurse);
            if (!node.id) node.id = ++ii;
            nodes.push(node);
        }
        recurse(root);
        return nodes;
    }
}

function aChangeSelect(name, tier) {
    if (name.indexOf("医院") > 0) {
        $('#search_val').val(name);
        $('#zzysHS').show();
        $('#zrysHS').show();
        $('#showd3page').val("hospital");
    } else if (tier == 5) {
        $('#search_val').val(name);
        $('#zzysHS').show();
        $('#zrysHS').show();
        $('#showd3page').val("illness");
    } else {
        $('#search_val').val(name);
        $('#zzysHS').hide();
        $('#zrysHS').hide();
        $('#showd3page').val("doctor");
    }
}

$(document).ready(function() {
    $('#searchbtn').bind("click", function() {
        if ($('#showd3page').val() == "hospital") {
            refresh($('#search_val').val());
            $('#zzysHS').show();
            $('#zrysHS').show();
        }
        if ($('#showd3page').val() == "illness") {
            goodIllness($('#search_val').val());
            $('#zzysHS').show();
            $('#zrysHS').show();
        }
        if ($('#showd3page').val() == "doctor") {
            doctorFhospital($('#search_val').val(), $("#hiddenLastHospital").val());
            $('#zzysHS').hide();
            $('#zrysHS').hide();
        }
    });
    $('#zzys').bind("click", function() {
        if ($('#showd3page').val() == "hospital") {
            refresh($('#search_val').val());
        }
        if ($('#showd3page').val() == "illness") {
            goodIllness($('#search_val').val());
        }
        if ($('#showd3page').val() == "doctor") {
            doctorFhospital($('#search_val').val(), $("#hiddenLastHospital").val());
        }
    });
    $('#zrys').bind("click", function() {
        if ($('#showd3page').val() == "hospital") {
            refresh($('#search_val').val());
        }
        if ($('#showd3page').val() == "illness") {
            goodIllness($('#search_val').val());
        }
        if ($('#showd3page').val() == "doctor") {
            doctorFhospital($('#search_val').val(), $("#hiddenLastHospital").val());
        }
    });
    $('#hlwxwsj').bind("click", function() {
        if ($('#showd3page').val() == "hospital") {
            refresh($('#search_val').val());
        }
        if ($('#showd3page').val() == "illness") {
            goodIllness($('#search_val').val());
        }
        if ($('#showd3page').val() == "doctor") {
            doctorFhospital($('#search_val').val(), $("#hiddenLastHospital").val());
        }
    });
    refresh(initialhospital);
    $('#search_val').val(initialhospital);

    $("#search_val").autocomplete({
        source: function(request, response) {
            var url = "";
            if ($('#showd3page').val() == "hospital") {
                url = "deptController/getAutoCompleteFieldsByHospital";
            }
            if ($('#showd3page').val() == "illness") {
                url = "resourceAnalysisController/getAutoCompleteFieldsByIllness";
            }
            if ($('#showd3page').val() == "doctor") {
                url = "resourceAnalysisController/getAutoCompleteFieldsByDoctor";
            }
            $.ajax({
                url: url,
                dataType: "json",
                /*data: {
                    hospital_name: request.term,
                    illness: request.term,
                    doctor: request.term
                },*/
                success: function(data) {
                    response($.map(data.autoCompletedFields, function(item) {
                        return {
                            label: item.name,
                            value: item.name
                        };
                    }));
                }
            });
        },
        minLength: 0,
        autoFill: true,
        select: function(event, ui) {}
    });
});

function getNewTrendsReplyMessage(doctor_id) {
    $.ajax({
        //url: "resourceAnalysisController/getNewTrendsReplyMessage",
        url: "../jsonp/getNewTrendsReplyMessage.json",
        method: "GET",
      /*  data: {
            'doctor_id': doctor_id
        },*/
        dataType: "json",
        async: false,
        success: function(data) {

            if (!data) {

                return;
            }

            $('#reply-info').empty();
            $.template("tmpl-reply-info", $('#tmpl-reply-info').html());
            $.tmpl("tmpl-reply-info", data)
                .appendTo("#reply-info");
        }
    });
};

function doctorMessage(doctor) {
    var doctorMessageResult = "";
    /*$.ajax({
        //url: "resourceAnalysisController/selectDoctorMessage",
        url: "../../medical/DoctorInternetAnalysisGetDoctorDetails.action",
        method: "GET",
        data: {
            'doctorId': doctor_id
           },
        dataType: "json",
        async: false,
        success: function(data) {

            if (!data) {

                return;
            }

            $('#doctor-info').empty();

            $.template("tmpl-doctor-infos", $('#tmpl-doctor-info').html());
            $.tmpl("tmpl-doctor-infos", data)
                .appendTo("#doctor-info");
        }
    });*/
    $('#doctor-info').empty();
    $.template("tmpl-doctor-infos", $('#tmpl-doctor-info').html());
    $.tmpl("tmpl-doctor-infos", doctor).appendTo("#doctor-info");
};

function changeRight(doctor) {
    doctorMessage(doctor);
    //getNewTrendsReplyMessage(doctor_id);
}