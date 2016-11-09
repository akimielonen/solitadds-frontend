import React, { Component } from 'react'
import * as d3 from 'd3'
import moment from 'moment'

import Chart from './Chart'

class App extends Component {

    constructor() {
        super()
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        const parser = d3.dsvFormat(';')
        d3.text('./data/some-applications-operative-pub-20161031.csv', (error, text) => {
            if (error) throw error

            var applications = []
            parser.parse(text, (data) => {
                data.createdDate = new moment(data.createdDate).toDate()
                data.sentDate = new moment(data.sentDate).toDate()
                data.submittedDate = new moment(data.submittedDate).toDate()
                data.verdictGivenDate = new moment(data.verdictGivenDate).toDate()
                applications.push(data)
            })

            this.setState({
                data: applications
            })
        })
    }

    render() {
        return (
            <div>
                <h1>SolitaDDS</h1>
                <Chart width={1200} height={60 * this.state.data.length} padding={20} data={this.state.data}/>
            </div>
        )
    }
}

export default App
