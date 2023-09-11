
function computeChartData(data) {
    const age = Number(data.age);
    const MNI_input = Number(data.monthly_income);
    const MS_input = Number(data.monthly_spend);
    const TA_input = Number(data.current_investments);
    const lifeExpectancy = Number(data.life_expectancy);
    
    const EI = Number(data.expected_inflation) / 100;
    const MIR_input = Math.pow(1 + EI, 1 / 12) - 1;
    const EAE = Number(data.expected_age_of_entitlement);
    const ER = Number(data.expected_return) / 100;
    const SI_input = Number(0.0025 + EI);
    //MNIIR is the monthly net income increase rate
    const MNIIR_input = (1 + SI_input) ** (1 / 12) - 1;
    const TF = 0.15;
    const MER = Math.pow(1 + ER, 1 / 12) - 1;
    let retireIn = 0;
    const financial_traces_data = [];

    //This does 100 years of traces for each quitting work year path that the user may quit work.
    while (retireIn <= 100) {
        let MS = MS_input;
        let MNI = MNI_input;
        let TA = TA_input;
        let SI = SI_input;
        let MIR = MIR_input;
        let MNIIR = MNIIR_input;
        const monthly_financial_data = [];
        let month = 0;
        //This takes each quitting work year path and finds the state of the financial data each month along that path.
        while (TA > 0 && month < 1000) {

            // Check if age of entitlement has been reached
            if (month === (EAE - age) * 12) {
                //Fix this entire block of code later as it is confusing and probably not accurate.
                SI = MIR - 0.00083; // assuming SS payment growth is 1% less than inflation. Fix this later.
                MS = MS * 0.99875; // assuming 1.5% less annual spending each year in retirement. Fix this later.
                MNI = 6000; // assumed SS payment. Fix this later.
                MNI *= 1 + MNIIR;
            }
            if (month === retireIn * 12) {
                MNI = 0;
            }
            
            const monthly_leftover = MNI - MS;
            if (monthly_leftover > 0) {
                TA += monthly_leftover;

            } else {
                TA += monthly_leftover * (1 + TF);
            }

            MS *= 1 + MIR;
            MNI *= 1 + MNIIR;
            TA *= 1 + MER;

            const single_month_data = {
                TA: TA,
                MS: MS,
                MNI:MNI
            };
            monthly_financial_data.push(single_month_data);
            month += 1;
        }
        
        retireIn += 1;
        financial_traces_data.push(monthly_financial_data);
    
    }

    return [age, EAE, lifeExpectancy, financial_traces_data];
}

export default computeChartData;