function d3Interface() {
    function label(domID, data) {
        var width = $(domID).width(),
            height = $(domID).height()
        dragEvent = 0;

        var min = d3.min(data, function(d) {
            return d.Value
        })
        var max = d3.max(data, function(d) {
            return d.Value
        })

        var scaleBubble = d3.scale.linear()
            .domain([min, max])
            .range([10, 50]); // 最小 最大 设置

        var fill = d3.scale.category10();

        var nodes = [],
            labels = [],
            foci = [{
                x: width / 2,
                y: height / 2
            }];


        var svg = d3.select(domID).append("svg")
            .attr("width", "100%")
            .attr("height", height)
            .call( // <-A
                d3.behavior.zoom() // <-B
                    .scaleExtent([-1, 10]) // <-C
                    .on("zoom", zoom) // <-D
            ).append("g");
        //.attr("domflag", '');
        function zoom() {
            if (dragEvent != 2) {
                svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            }
        }
        svg.append("svg:rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "transparent")
            .style("stroke", "transparent"); //边框颜色


        var force = d3.layout.force()
            .nodes(nodes)
            .links([])
            .charge(-500)
            .chargeDistance(200)
            .gravity(0)
            .friction(0.8)
            .size([width, height])
            .on("tick", tick);


        //var node = svg.selectAll("circle");
        var node = svg.selectAll("g");

        var counter = 0;

        function tick(e) {
            var k = .1 * e.alpha;

            nodes.forEach(function(o, i) {
                o.y += (foci[0].y - o.y) * k;
                o.x += (foci[0].x - o.x) * k;
            });
            node.attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        }
        if (data.length != 0) {
            var buildBubble = setInterval(function() {

                //if (nodes.length > data.length-1) { clearInterval(timer); return;}

                var item = data[counter];

                nodes.push({
                    r: scaleBubble(item.Value),
                    name: item.Label
                });

                force.start();

                node = node.data(nodes);

                var drag = force.drag()
                    .on("dragstart", function(d, i) { //拖拽开始
                        dragEvent = 1;
                        //$("#history").append(dragEvent);
                        d.fixed = true; //拖拽开始后设定被拖拽对象为固定
                    })
                    .on("dragend", function(d, i) { //拖拽结束
                        dragEvent = 0;
                        //$("#history").append(dragEvent);
                    })
                    .on("drag", function(d, i) { //拖拽
                        dragEvent = 2;
                        //$("#history").append(dragEvent);
                    });
                var colorList = ['#033d82','#0094a1','#0a88d4','#c66606','#a73d18','#067f22']
                var n = node.enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function(d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    })
                    .style('cursor', 'pointer')
                    .on('mousedown', function() {
                        var sel = d3.select(this);
                        sel.moveToFront();
                    })
                    .call(drag);

                n.append("circle")
                    .attr("r", function(d) {
                        return d.r;
                    })
                    .attr("title", function(d) {
                        return d.name + "：" + data[counter].Value;
                    })
                    .style("fill", function(d) {
                        return colorList[counter];
                    })
                    .style('stroke','transparent')
                //.style("fill", "red")//颜色 #fdaf27
                n.append("text")
                    .text(function(d) {
                        return d.name;
                    })
                    .style("font-size", function(d) {
                        return  "15px";
                    })
                    .attr("dy", ".35em")
                    .style('fill','#fff')
                counter++;
                if (counter === data.length) {
                    clearInterval(buildBubble);
                }
            }, 100);
        }

        d3.selection.prototype.moveToFront = function() {
            return this.each(function() {
                this.parentNode.appendChild(this);
            });
        };

        function resize() {
            width = window.innerWidth;
            force.size([width, height]);
            force.start();
        }

        d3.select(window).on('resize', resize);
    }

    function locus(domID, data) {
        /*

        easy to show system performance and network flow
        base on  http://blog.bitjuice.com.au/2013/02/using-d3-js-to-visualise-hierarchical-classification/

        features:
        1)tree and connectivity(network) are both supported.
        2)draggable nodes.
        3)able to custom the config and actions

        bug fix:
        change dom property to class instead of dumplicated id

        */
        function graph(d3) {
            //step 0, new graph() ,import "http://d3js.org/d3.v3.min.js" to get d3

            //step 1, custom the config
            this.config = {
                bg_size: {
                    width: $(domID).width(),
                    height: $(domID).height()
                },
                edge_def_width: 5,
                edge_show_arrow: true,
                node_draggable: true,
                show_performance_bar: false,
            }

            var self = this;
            var cluster = d3.layout.cluster().size([self.config.bg_size.height, self.config.bg_size.width - 160]);


            /// step 2, custom the actions
            var showTitleAction;
            var showSubheadAction;
            var showPathDesc;

            this.showTitle = function(f) {
                showTitleAction = f;
            }

            this.showSubhead = function(f) {
                showSubheadAction = f;
            }

            this.showPathDesc = function(f) {
                showPathDesc = f;
            }


            /// final step , bind some data

            this.bind = function(data) {

                /**
                 忽略连通图中的回路，产生一棵树。
                 这棵树符合cluster.nodes(tree)的调用要求（参见：https://github.com/mbostock/d3/wiki/Cluster-Layout）
                 */
                var conv2tree = function(data) {
                    var root = self.getRoot(data);
                    var hasParentFlag = {}; //保证每个节点只有一个父节点，以便形成树状结构
                    hasParentFlag[root.id] = true; //根节点不允许作为子节点
                    self.traverseEdge(data, function(source, target) { //遍历每条边，即所有节点间关系
                        if (!hasParentFlag[target.id] && source.id != target.id) { //首次被遍历到的target，作为source的子节点，后续将不被其它节点作为子节点
                            if (!source.children) {
                                source.children = [];
                            }
                            source.children.push(target);
                            hasParentFlag[target.id] = true;
                        }
                    });
                    return root;
                }


                /**
                 通过cluster.nodes(tree)，为tree的每个节点计算x，y，depth等属性以便定位
                 */
                var buildNodes = function(tree) {
                    return cluster.nodes(tree);
                }

                /**
                 建立节点之间各条边。
                 如果直接调用cluster.links(nodes)，其只支持树状结构，回路会被丢弃，借此把所有边补充完整。
                 */
                var buildLinks = function(data) {
                    var result = [];
                    self.traverseEdge(data, function(source, target, ref) {
                        result.push({
                            'source': source,
                            'target': target,
                            'ref': ref
                        });
                    });
                    return result;
                }

                /**
                 更新数据时保留原有节点的位置信息
                 */
                var merge = function(nodes, links) {

                    var oldData = [];
                    if (self.nodes) { //原nodes存在，输出oldData
                        self.nodes.forEach(function(d) {
                            oldData[d.id] = d;
                        });
                    }
                    if (oldData) { //用oldData里的数据覆盖现nodes里的数据
                        nodes.forEach(function(d) {
                            if (oldData[d.id]) {
                                d.x = oldData[d.id].x;
                                d.y = oldData[d.id].y;
                            }
                        });
                    }


                    self.nodes = nodes;
                    self.links = links;

                }

                //1)连通图->树 参见：https://github.com/mbostock/d3/wiki/Cluster-Layout)
                //1)temporarily convert a connectivity to a tree
                var tree = conv2tree(data);
                //2)根据树状结构计算节点位置.
                //2)caculate for nodes' coords with <code>cluster.nodes(tree);</code>
                var nodes = buildNodes(tree);
                //3)因为连通图是网状而非树状，将所有边补充完整
                //3)fill in all the edges(links) of the connectivity
                var links = buildLinks(data);
                //4)与原有的数据做一次merge，保留位置等信息
                //4)do merge to keep info like node's position
                merge(nodes, links);
                //5)重绘
                //5)redraw
                self.redraw();
            }


            /// call redraw() if necessary (reconfig,recostom the actions, etc. )
            this.redraw = function() {
                var fontSize = 8
                var lineSpace = 2
                var boxHeight = 50
                var boxWidth = 85

                var width = self.config.bg_size.width;
                var height = self.config.bg_size.height;

                var yscale_performancebar = d3.scale.linear()
                    .domain([0, 1])
                    .rangeRound([boxHeight / 2, -boxHeight / 2])


                var diagonal = d3.svg.diagonal()
                    .projection(function(d) {
                        return [d.y - boxWidth / 2, d.x];
                    });


                var _clear = function() {
                    d3.select("svg").remove();

                    svg = d3.select(domID).append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("g")
                        .attr("transform", "translate(80,0)");

                    svg.append("svg:defs").selectAll("marker")
                        .data(["suit"])
                        .enter().append("svg:marker")
                        .attr("id", "idArrow")
                        .attr("viewBox", "0 -5 40 10")
                        .attr("refX", 15)
                        .attr("refY", -1.5)
                        .attr('class', 'triangle')
                        .attr("markerWidth", 6)
                        .attr("markerHeight", 6)
                        .attr("orient", "auto")
                        .append("svg:path")
                        .attr("d", "M0,-5L10,0L0,5");
                }

                var _redrawEdges = function() {


                    var linksWithArrow = self.links;

                    //to show arrow at the end of the path with fixed size, we have to copy each path with .stroke-width=1
                    if (self.config.edge_show_arrow) {
                        linksWithArrow = [];
                        self.links.forEach(function(d) {

                            var fake = {};

                            for (prop in d) {
                                fake[prop] = d[prop];
                            }

                            fake.faked = true; //copy each path with .faked=true as flag

                            linksWithArrow.push(fake);
                            linksWithArrow.push(d);


                        })
                    }



                    var path = svg.selectAll(".link").data(linksWithArrow);


                    // when new path arrives
                    path.enter().insert("path", ":first-child")
                        .attr("marker-end", function(d) {
                            if (d.faked) return "url(#idArrow)";
                        })
                        .attr("id", function(d) {
                            if (!d.faked) return "link" + d.ref.from + "-" + d.ref.to;
                        })
                        .attr("class", function(d) {
                            return "link" + " link-" + d.ref.from + " link-" + d.ref.to;
                        })
                        .attr("d", diagonal)
                        .transition()
                        .duration(1000)
                        .style("stroke-width", function(d) {
                            if (d.faked) {
                                return 1;
                            }
                            if (d.ref.edge_width) return Math.max(1, boxHeight / 2 * d.ref.edge_width); //won't become invisible if too thin
                            else return self.config.edge_def_width; //default value
                        })

                    // when path changes
                    path.attr("d", diagonal)

                    // when path's removed
                    path.exit().remove();



                }


                _clear();

                _redrawEdges();

                ///show description on each path(edge)
                if (showPathDesc) {
                    svg.selectAll(".abc").data(self.links).enter().append("text").append("textPath")
                        .attr("xlink:xlink:href", function(d) {
                            // return "#link" + d.ref.from + "-" + d.ref.to;//显示连接线上的数字
                            return "";
                        }) //why not .attr("xlink:href",...)? this's a hack, see https://groups.google.com/forum/?fromgroups=#!topic/d3-js/vLgbiM4ki1g
                        .attr("startOffset", "50%")
                        .text(showPathDesc)
                }

                ///show each node with text

                var existingNodes = svg.selectAll(".node").data(self.nodes); //选中所有节点

                //矩形
                //draw rectangle
                var newNodes = existingNodes.enter().append("g");

                newNodes.attr("class", "node")
                    .attr("id", function(d) {
                        return "node-" + d.id
                    })
                    .attr("transform", function(d) {
                        return "translate(" + d.y + "," + d.x + ")";
                    })
                    //.append("rect") //make nodes as rectangles OR:
                    .append("circle").attr('r', 50) //make nodes as circles
                    .attr('class', 'nodebox')
                    .attr("x", -boxWidth / 2)
                    .attr("y", -boxHeight / 2)
                    .attr("width", boxWidth)
                    .attr("height", boxHeight)



                if (self.config.node_draggable) {
                    newNodes.call(d3.behavior.drag().origin(Object).on("drag", function(d) {

                        //拖动时移动节点
                        //translate the node
                        function translate(x, y) {
                            return {
                                'x': x,
                                'y': y
                            }
                        }
                        var coord = eval(d3.select(this).attr("transform"));
                        d3.select(this)
                            .attr("transform", "translate(" + (coord.x + d3.event.dx) + "," + (coord.y + d3.event.dy) + ")")


                        //拖动时重绘边
                        //update node's coord ,then redraw affected edges
                        d.x = d.x + d3.event.dy;
                        d.y = d.y + d3.event.dx;

                        _redrawEdges();


                    }));
                }



                //红色柱状性能指示图
                //show performance bar
                if (self.config.show_performance_bar) {
                    newNodes.append("rect")
                        .attr('class', 'performancebar')
                        .attr("x", boxWidth / 2 * 1.05)
                        .attr("width", boxWidth / 10)
                        .style("fill", "red")
                        .style("stroke", "red")
                        .attr("y", boxHeight / 2)
                        .attr("height", 0)

                    //计算柱状图高度
                    existingNodes.select('.performancebar')
                        .transition()
                        .duration(1000)
                        .attr("y", function(d) {
                            return yscale_performancebar(d.load)
                        })
                        .attr("height", function(d) {
                            return boxHeight / 2 - yscale_performancebar(d.load)
                        })
                }

                ///构造文案容器
                ///text constructors

                //标题
                //node titles
                newNodes.append("text")
                    .attr("class", "nodeTitle")
                    .attr("y", -boxHeight / 2 + fontSize + 2 * lineSpace)
                    .attr("text-anchor", "middle")

                //副标题
                //node subhead
                newNodes.append("text")
                    .attr("text-anchor", "middle")
                    .attr("class", "nodeText f1Text")
                    .attr("y", -boxHeight / 2 + 2 * fontSize + 8 * lineSpace)

                //详情矩阵
                //node body text
                newNodes.append("g")
                    .attr("class", "confusionmatrix")
                    .selectAll("g").data(function(d) {
                    return d.confusionmatrix ? d.confusionmatrix : []
                })
                    .enter().append("g")
                    .attr("class", "rows")
                    .attr("transform", function(d, i) {
                        return "translate(" + (-0) + "," + (-boxHeight / 2 + (i + 3) * fontSize + (i + 4) * lineSpace) + ")";
                    })
                    .selectAll("g").data(function(d) {
                    return d
                })
                    .enter().append("g")
                    .attr("class", "columns")
                    .attr("transform", function(d, i) {
                        return "translate(" + i * 30 + ",0)";
                    })
                    .append("text")
                    .attr("text-anchor", "middle")
                    .attr("class", "nodeText")



                ///显示文案
                ///show text

                existingNodes.select(".nodeTitle").text(showTitleAction ? showTitleAction : function(d) {
                    return d.id + ")" + d.name
                }); //标题
                existingNodes.select(".f1Text").text(showSubheadAction ? showSubheadAction : function(d) {
                    return Math.round(d.load * 100) + "%"
                }); //副标题


                existingNodes.select(".confusionmatrix") //详情矩阵
                    .selectAll(".rows")
                    .data(function(d) {
                        return d.confusionmatrix ? d.confusionmatrix : []
                    })
                    .selectAll(".columns") //rows
                    .data(function(d) {
                        return d
                    })
                    .select("text")
                    .text(function(d) {
                        return d
                    })
            }


            /**
             返回根节点
             return the root node
             */
            this.getRoot = function(data) {
                return data['0'];
            };

            /**
             遍历所有节点
             traverse all nodes
             callback(node)
             */
            this.traverse = function(data, callback) {
                if (!data) console.error('data is null')

                function _init() {
                    var i;
                    for (i in data) {
                        data[i].visited = false;
                    }
                }

                function _traverse(pt, callback) {
                    if (!pt) {
                        return;
                    }
                    pt.visited = true;
                    //console.debug("traverse node:" + pt.id);
                    callback(pt);
                    if (pt.ref) {
                        pt.ref.forEach(function(ref) {
                            var childNode = data[ref.to.toString()];
                            if (childNode && !childNode.visited) {
                                _traverse(childNode, callback);
                            }
                        })
                    }



                }

                _init();
                _traverse(self.getRoot(data), callback);
            };

            /**
             遍历所有边
             traverse all edges
             callback(sourceNode,targetNode,ref)
             */
            this.traverseEdge = function(data, callback) {
                if (!data) console.error('data is null')

                self.traverse(data, function(node) {
                    if (node.ref) {
                        node.ref.forEach(function(ref) {
                            var childNode = data[ref.to.toString()];
                            if (childNode) {
                                //console.debug("traverse edge:" + node.id + "-" + childNode.id);
                                callback(node, childNode, ref);
                            }
                        });
                    }
                });
            };



        }

        /////////function(class) Graph end////////////////

        function init_page() {
            // request data here


            //customize anything here
            myGraph.showTitle(function(d) {
                return d.name;
            });

            myGraph.showSubhead(function(d) {
                //console.log(d);
                return d.disease;
            });

            myGraph.showPathDesc(function(d) {
                return d.ref.edge_width.toFixed(2);
            });

            myGraph.bind(data);

        }

        var myGraph = new graph(d3);
        init_page();
    }

    return {
        'label': function(domID, data) {
            label(domID, data)
        },
        'locus': function(domID, data) {
            locus(domID, data)
        }
    }
}