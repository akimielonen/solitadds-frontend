import React, { Component, PropTypes } from 'react'
import * as d3 from 'd3'

class Chart extends Component {
    render() {

        // Data
        var data = this.props.data

        // SVG height, width and padding
        var width = this.props.width
        var height = this.props.height
        var padding = this.props.padding


        var xMin = d3.min(data, function(application) {
            return application.createdDate
        })

        var xMax = d3.max(data, function(application) {
            return application.verdictGivenDate
        })

        // Create scales
        var xScale = d3.scaleTime()
            .domain([xMin, xMax])
            .range([padding, width - padding])
        var yScale = d3.scaleLinear()
            .domain([0, data.length])
            .range([padding, height - padding])

        // Create svg
        var svg = d3.select("#svg-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

        data.map((application, index) => {

            let xCreated = xScale(application.createdDate)
            let xSent = xScale(application.sentDate)
            let xVerdict = xScale(application.verdictGivenDate)
            let y = yScale(index)

            // Horizontal line
            svg.append("line")
                .style("stroke", "#000")
                .attr("x1", xCreated)
                .attr("x2", xVerdict)
                .attr("y1", y)
                .attr("y2", y)

            // Created vertical line
            svg.append("line")
                .style("stroke", "fe58ac")
                .attr("x1", xCreated)
                .attr("x2", xCreated)
                .attr("y1", y - 10)
                .attr("y2", y + 10)

            // Sent vertical line
            svg.append("line")
                .style("stroke", "#000")
                .attr("x1", xSent)
                .attr("x2", xSent)
                .attr("y1", y - 10)
                .attr("y2", y + 10)

            // Verdict vertical line
            svg.append("line")
                .style("stroke", "fe58ac")
                .attr("x1", xVerdict)
                .attr("x2", xVerdict)
                .attr("y1", y - 10)
                .attr("y2", y + 10)

            // ApplicationId
            svg.append("text")
                .text(application.applicationId)
                .attr("x", xCreated + 3)
                .attr("y", y - 12)
                .attr("font-family", "sans-serif")
                .attr("font-size", "8px")
                .attr("fill", "#000");

            // Created text
            svg.append("text")
                .text("Luonti")
                .attr("x", xCreated - 12)
                .attr("y", y + 17)
                .attr("font-family", "sans-serif")
                .attr("font-size", "9px")
                .attr("fill", "red");

            // Sent text
            svg.append("text")
                .text("Lähetys")
                .attr("x", xSent - 16)
                .attr("y", y + 26)
                .attr("font-family", "sans-serif")
                .attr("font-size", "9px")
                .attr("fill", "#000");

            // Verdict text
            svg.append("text")
                .text("Päätös")
                .attr("x", xVerdict - 12)
                .attr("y", y + 17)
                .attr("font-family", "sans-serif")
                .attr("font-size", "9px")
                .attr("fill", "red");
        })

        return (
            <div id="svg-container"></div>
        )
    }
}

Chart.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    padding: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired
}

export default Chart
