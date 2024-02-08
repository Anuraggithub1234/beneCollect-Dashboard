import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export default class Pie3D extends Component {

  n = 1

  constructor(props) {
    super(props);

    this.state = {
      noData: true,
      initialData: props.data,
      elemId: props.elemId
    }
  }

  componentDidUpdate(prevProps, prevState) {
    try {
      if (this.props.data !== prevProps.data) {
        this.setState({ initialData: this.props.data }, () => {
          this.createChart();
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.createChart();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  async createChart() {

    if (this.chart) {
      this.chart.dispose();
    }
    
    this.setState({ noData: true });

    if (this.state.initialData.length > 0) {
      await this.setState({ noData: false });
    } else {
      return;
    }

    am4core.useTheme(am4themes_animated);

    let chart = am4core.create(this.state.elemId, am4charts.PieChart3D);

    chart.hiddenState.properties.opacity = 0;

    chart.legend = new am4charts.Legend();

    chart.data = this.state.initialData;
    
    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.category = "label";
    
    var colorSet = new am4core.ColorSet();

    colorSet.list = ["#FBC02D", "#46b34b", "#CC5500", "#0288d1", "blue"].map(function (color) {
      return new am4core.color(color);
    });

    series.colors = colorSet;

    this.chart = chart;

    for (const elem of document.querySelectorAll('title')) {
      if (elem.textContent.toLowerCase().includes("using amcharts")) {
        elem.parentNode.remove();
      }
    }
  }

  render() {
    return (
      <div className='chart-container'>
        {this.state.noData ? <div className="nodata">No Data</div> : <div id={this.state.elemId} style={{ height: "500px" }}></div>}
      </div>
    );
  }

}