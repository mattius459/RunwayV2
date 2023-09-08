import React, { useState, useEffect } from "react";

function Config({ handleChange, handleChartUpdate, formData }) {

  const handleSubmit = async () => {
    try {
      handleChartUpdate(formData);
      console.log("Form data submitted successfully.");
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const handleSliderRelease = (event) => {
    const { id, value } = event.target;
    const newMax = parseInt(value) * 2;
  
    setTimeout(() => {
      handleChange({ target: { id, value } });
      handleChange({ target: { id: `${id}_max`, value: newMax.toString() } });
    }, 300);
  };

  useEffect(() => {
    handleSliderRelease({ target: { id: "monthly_income", value: formData.monthly_income } });
    handleSliderRelease({ target: { id: "monthly_spend", value: formData.monthly_spend } });
    handleSliderRelease({ target: { id: "current_investments", value: formData.current_investments } });
    handleSliderRelease({ target: { id: "expected_return", value: formData.expected_return } });
    handleSliderRelease({ target: { id: "expected_inflation", value: formData.expected_inflation } });
    handleSliderRelease({ target: { id: "expected_age_of_entitlement", value: formData.expected_age_of_entitlement } });
    handleSliderRelease({ target: { id: "life_expectancy", value: formData.life_expectancy } });
  }, []);

  return (
    <div className="Config">
      <div className="Config1">
        {/* Age div */}
        <div id="age_div">
            <div id="age_div_text_box">
          <p>Current Age</p>
          <input
            type="number"
            id="age"
            className="input"
            placeholder="26"
            value={formData.age}
            onChange={handleChange}
          />
          </div>
        </div>
        {/* ... */}
        {/* Monthly Income div */}
        <div id="monthly_income_div">
            <div id="monthly_income_text_box">
          <p>Monthly Income</p>
          <input
            type="number"
            id="monthly_income"
            className="input"
            placeholder="4000"
            value={formData.monthly_income}
            onChange={handleChange}
          />
          </div>
          <input
            type="range"
            id="monthly_income"
            min="0"
            className="slider"
            max={formData.monthly_income_max}
            value={formData.monthly_income}
            step="25"
            onChange={handleChange}
            onMouseUp={handleSliderRelease}
          />
        </div>
        {/* Monthly Spend div */}
        <div id="monthly_spend_div">
            <div id="monthly_spend_text_box">
          <p>Monthly Spend</p>
          <input
            type="number"
            id="monthly_spend"
            className="input"
            placeholder="3000"
            value={formData.monthly_spend}
            onChange={handleChange}
          />
          </div>
          <input
            type="range"
            id="monthly_spend"
            min="0"
            className="slider"
            max={formData.monthly_spend_max}
            value={formData.monthly_spend}
            step="25"
            onChange={handleChange}
            onMouseUp={handleSliderRelease}
          />
        </div>
        {/* Submit button */}
        <div id="submit_div">
          <button id="submit" type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div className="Config2">
        {/* current investments div */}
        <div id="current_investments_div">
            <div id="current_investments_text_box">
          <p>Current Investments</p>
          <input
            type="number"
            id="current_investments"
            className="input"
            placeholder="200000"
            value={formData.current_investments}
            onChange={handleChange}
          />
          </div>
          <input
            type="range"
            id="current_investments"
            min="0"
            className="slider"
            max={formData.current_investments_max}
            value={formData.current_investments}
            step="1000"
            onChange={handleChange}
            onMouseUp={handleSliderRelease}
          />
        </div>
        {/* expected return div */}
        <div id="expected_return_div">
            <div id="expected_return_text_box">
          <p>Expected Return</p>
          <input
            type="number"
            id="expected_return"
            className="input"
            placeholder="8"
            value={formData.expected_return}
            onChange={handleChange}
          />
          </div>
          <input
            type="range"
            id="expected_return"
            min="0"
            className="slider"
            max={formData.expected_return_max}
            value={formData.expected_return}
            step=".1"
            onChange={handleChange}
            onMouseUp={handleSliderRelease}
          />
        </div>
        {/* expected inflation div */}
        <div id="expected_inflation_div">
        <div id="expected_inflation_text_box">
          <p>Expected Inflation</p>
          <input
            type="number"
            id="expected_inflation"
            className="input"
            placeholder="4"
            value={formData.expected_inflation}
            onChange={handleChange}
          />
        </div>
          <input
            type="range"
            id="expected_inflation"
            min="0"
            className="slider"
            max={formData.expected_inflation_max}
            value={formData.expected_inflation}
            step="0.1"
            onChange={handleChange}
            onMouseUp={handleSliderRelease}
          />
        </div>
      </div>
      <div className="Config3">
      {/* expected age of entitlement div */}
      <div id="expected_age_of_entitlement_div">
            <div id="expected_age_of_entitlement_text_box">
          <p>Expected Age of Entitlement</p>
          <input
            type="number"
            id="expected_age_of_entitlement"
            className="input"
            placeholder="67"
            value={formData.expected_age_of_entitlement}
            onChange={handleChange}
          />
          </div>
          <input
            type="range"
            id="expected_age_of_entitlement"
            min="0"
            className="slider"
            max={formData.expected_age_of_entitlement_max}
            value={formData.expected_age_of_entitlement}
            step="1"
            onChange={handleChange}
            onMouseUp={handleSliderRelease}
          />
        </div>
        {/* life expectancy div */}
        <div id="life_expectancy_div">
            <div id="life_expectancy_text_box">
          <p>Life Expectancy</p>
          <input
            type="number"
            id="life_expectancy"
            className="input"
            placeholder="67"
            value={formData.life_expectancy}
            onChange={handleChange}
          />
          </div>
          <input
            type="range"
            id="life_expectancy"
            min="0"
            className="slider"
            max={formData.life_expectancy_max}
            value={formData.life_expectancy}
            step="1"
            onChange={handleChange}
            onMouseUp={handleSliderRelease}
          />
        </div>
      </div>
    </div>
  );
}

export default Config;