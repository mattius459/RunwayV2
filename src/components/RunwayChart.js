import React from "react";
import Plot from "react-plotly.js";

function PlotlyChart({ figJson }) {

  if (!figJson) {
    return <div className='js-plotly-plot'>Loading chart...</div>;
  }

  const finalFigJson = {
    ...figJson,
    layout: {
      ...figJson.layout,
      width: window.innerWidth, // Modify this value as per your requirements
    }
  }

  return (
    
    <Plot
      data={finalFigJson.data}
      layout={finalFigJson.layout}
    />
  );
}

export default PlotlyChart;