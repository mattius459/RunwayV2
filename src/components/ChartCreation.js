
let financial_traces_data = [];
let y_axes_max = 0;

function renderChart([
  currentAge,
  EAE,
  lifeExpectancy,
  financial_traces_seed_data,
]) {
  y_axes_max = 0;
  financial_traces_data = [];
  let age_of_retirement;

  for (let i = 0; i < financial_traces_seed_data.length; i++) {
    const financial_data = financial_traces_seed_data[i];
    let years_of_work = i;
    //Create arrays for hoverdata to use
    const month_array = financial_data.map((_, i) => i / 12 + currentAge);
    const monthInYearArray = financial_data.map((_, i) => i % 12);
    const increasingMonths = financial_data.map((_, i) => i);
    const futureMonthsAndYears = createHumanReadableMonthandYear(increasingMonths);
    const TAValues = financial_data.map((data) => data.TA);
    const MSValues = financial_data.map((data) => data.MS);
    const MNIValues = financial_data.map((data) => data.MNI);
    const MonthlyContribution = MNIValues.map(
      (mni, index) => mni - MSValues[index]
    );
    const MonthlyInvestmentAppreciation = [];
    for (let i = 1; i < TAValues.length; i++) {
      const appreciation =
        TAValues[i] - TAValues[i - 1] - MonthlyContribution[i];
      MonthlyInvestmentAppreciation.push(appreciation);
    }

    //Use above arrays to create customdata object array for hoverdata to use
    const resultArray = [];

    for (let i = 0; i < MSValues.length; i++) {
      const newObj = {
        MS: MSValues[i],
        MNI: MNIValues[i],
        MonthlyContribution: MonthlyContribution[i],
        MIA: MonthlyInvestmentAppreciation[i],
        MonthlyNumber: monthInYearArray[i],
        Year: futureMonthsAndYears[i].year,
        monthName: futureMonthsAndYears[i].monthName,
        years_of_work: years_of_work,
      };
      resultArray.push(newObj);
    }
    //Create new trace object for each set of data and all appropriate hover data
    const new_trace = {
      x: month_array,
      y: TAValues,
      customdata: resultArray,
      hovertemplate:
        "Assuming %{customdata.years_of_work:.0f} more years of work<br>" +
        "<b>Date:</b> %{customdata.monthName}, %{customdata.Year:.0f}<br>" +
        "<b>Age:</b> %{x:.0f} years" +
        " and %{customdata.MonthlyNumber} month(s)<br>" +
        "<b>Net Worth:</b> $%{y:,.0f}<br>" +
        "<b>Monthly Spend</b>: $%{customdata.MS:,.0f}<br>" +
        "<b>Monthly Income</b>: $%{customdata.MNI:,.0f}<br>" +
        '<b>Monthly Asset Appreciation</b>: $%{customdata.MIA:,.0f}<br>'+
        
        // '<b>MLC</b>: $%{customdata.MonthlyContribution:,.0f}<br>'+
        "<extra></extra>",
      hoverlabel: {
        align: "right",
      },
      line: { color: "red" },
      visible: false,
      showlegend: false,
    };
    //Push the new trace object to the financial_traces_data array
    financial_traces_data.push(new_trace);
  }

  //Modify some of the traces based on conditionals. In particular, these next lines change the color and pattern of each trace to show if your funds will last to LE and beyond
  for (let trace = 0; trace < financial_traces_data.length; trace++) {
    if (
      financial_traces_data[trace].x.length <
      (lifeExpectancy - currentAge) * 12
    ) {
      financial_traces_data[trace].line.dash = "dash";
      financial_traces_data[trace].visible = true;
    } else {
      for (let i = 0; i < 5; i++) {
        financial_traces_data[trace + i].visible = true;
        financial_traces_data[trace + i].line.dash = "dash";
        financial_traces_data[trace + i].line.color = "green";

        if (i === 0) {
          financial_traces_data[trace].line.dash = "solid";
          financial_traces_data[trace].line.color = "green";
          age_of_retirement = trace + currentAge
          //Determine if assets are greater at retirement age or EAE age and set y_axes_max accordingly
          if (financial_traces_data[trace].y[(age_of_retirement - currentAge) * 12] * 1.5 > 
          financial_traces_data[trace].y[(EAE - currentAge) * 12] * 1.5) {
            y_axes_max = financial_traces_data[trace].y[(age_of_retirement - currentAge) * 12] * 1.5;
          } else {
            y_axes_max = financial_traces_data[trace].y[(EAE - currentAge) * 12] * 1.5;
          }


        }
      }
      break;
    }
  }

  //Shapes and annotations add the EAE and LE vertical lines and text to the chart
  const shapes = [
    {
      type: "line",
      x0: EAE,
      x1: EAE,
      y0: 0,
      y1: y_axes_max * 1.4,
      line: {
        width: 1,
        dash: "dot",
        color: "black",
      },
    },
    {
      type: "line",
      x0: lifeExpectancy,
      x1: lifeExpectancy,
      y0: 0,
      y1: y_axes_max * 1.4,
      line: {
        width: 1,
        dash: "dot",
        color: "black",
      },
    },
  ];

  const annotations = [
    {
      x: EAE,
      y: y_axes_max * 1.5,
      text: "Expected Entitlement<br> Start Age",
      showarrow: false,
      xshift: 0,
    },
    {
      x: lifeExpectancy,
      y: y_axes_max * 1.5,
      text: "Life Expectancy",
      showarrow: false,
      xshift: 0,
    },
  ];

  const data = financial_traces_data;

  const layout = {
    showlegend: false,
    margin: { l: 55, r: 10, b: 45, t: 20, pad: 4 },
    xaxis: { title: { text: "Age" }, range: [currentAge, lifeExpectancy + 15] },
    yaxis: { title: { text: "Net Worth" }, range: [0, y_axes_max * 1.5] },
    shapes,
    annotations,
  };

  return [data, layout];
}

export default renderChart;

//create function that prepares the month and year display data for the hover text
function createHumanReadableMonthandYear(increasingMonths) {
  const currentDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return increasingMonths.map(monthsToAdd => {
    const newMonth = (currentDate.getMonth() + monthsToAdd) % 12;
    const newYear = currentDate.getFullYear() + Math.floor((currentDate.getMonth() + monthsToAdd) / 12);
    return { year: newYear, month: newMonth, monthName: monthNames[newMonth] };
  });
}

