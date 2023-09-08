import React, { useState, useEffect } from "react";
import Config from "./Config";
import computeChartData from "./ChartCalc";
import renderChart from "./ChartCreation";
import Plot from "react-plotly.js";

function UserInputDataParent() {
  const [formData, setFormData] = useState({
    
    age: "26",
    monthly_income: 4000,
    monthly_income_max: 8000,
    monthly_spend: 3000,
    monthly_spend_max: 6000,
    current_investments: 200000,
    current_investments_max: 400000,
    expected_return: "8",
    expected_return_max: "16",
    expected_inflation: "4",
    expected_inflation_max: "8",
    expected_age_of_entitlement: "67",
    expected_age_of_entitlement_max: "73",
    life_expectancy: "90",
    life_expectancy_max: "110"
  });

  const [chartDataAndLayout, setChartDataAndLayout] = useState(null);

  //This runs on component mount to render initial chart
  const updateChart = async (data) => {
    try {
      //call computeChartData to get net_worth_traces_data
      const [age, EAE, life_expectancy, net_worth_traces_data] = computeChartData(data);
      //call renderChart with net_worth_traces_data as argument to create plotly chart data
      const [chartData, layout] = renderChart([age, EAE, life_expectancy, net_worth_traces_data]);
      setChartDataAndLayout({ chartData, layout });
    } catch (error) {
      console.error("Error updating chart:", error);
    }
  };

  useEffect(() => {
    updateChart(formData);
  }, [formData]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [id]: value,
      };
      // console.log("Updated formData:", updatedFormData); // Print the updated formData
      return updatedFormData;
    });
  };

  //This code prevents the chart from being rendered until the data is loaded
  if (!chartDataAndLayout) {
    return <div className="js-plotly-plot">Loading chart...</div>;
  }

  const { chartData, layout } = chartDataAndLayout;

  return (
    <>
      <Plot data={chartData} layout={layout} />
      <Config
        handleChange={handleChange}
        handleChartUpdate={updateChart}
        formData={formData}
      />
    </>
  );
}

export default UserInputDataParent;