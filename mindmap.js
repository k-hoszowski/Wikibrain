// SPDX-FileCopyrightText: 2024 Krzysztof Hoszowski <k-hoszowski@tutamail.com>
// SPDX-FileCopyrightText: 2024 Mike Bostock and Observable, Inc.
//
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: ISC

d3.json("data.json", function(data) {
    console.log(data);
});

const data = {
    nodes: [
        { id: "Root" },
        { id: "Child 1" },
        { id: "Child 2" },
        { id: "Grandchild 1" },
        { id: "Grandchild 2" }
    ],
    links: [
        { source: "Root", target: "Child 1" },
        { source: "Root", target: "Child 2" },
        { source: "Child 2", target: "Grandchild 1" },
        { source: "Child 2", target: "Grandchild 2" }
    ]
};

const svg = d3.select("#mindmap"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id).distance(100).strength(0.5))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(data.links)
    .enter().append("line")
    .attr("class", "link")
    .attr("stroke-width", 2);

const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(data.nodes)
    .enter().append("g")
    .attr("class", "node")
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
    .on("click", clicked);

node.append("circle")
    .attr("r", 10)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(d => d.id);

simulation.on("tick", ticked);

function ticked() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("transform", d => `translate(${d.x},${d.y})`);
}

function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

function handleMouseOver(event, d) {
    d3.select(this).select("circle")
        .attr("r", 15)
        .classed("highlight", true);
}

function handleMouseOut(event, d) {
    d3.select(this).select("circle")
        .attr("r", 10)
        .classed("highlight", false);
}

function clicked(event, d) {
    const centerX = width / 2;
    const centerY = height / 2;
    d3.select(this)
        .transition()
        .duration(1000)
        .attr("transform", `translate(${centerX},${centerY})`);
}
