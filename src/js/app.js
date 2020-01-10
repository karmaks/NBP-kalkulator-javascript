import Service from './Service';
import {
    DOM
} from './Dom'
import {
    InfoBar
} from './InfoBar';



function filter(resp, selected) {
    return resp.filter(r => r.code == selected.toUpperCase());
}


const currentRates = (resp, mainSelected, secondSelected) => {
    let main = filter(resp, mainSelected);
    let second = filter(resp, secondSelected);

    if (mainSelected == 'pln') {
        main = 1;
        DOM.currentRateSecond.textContent = `${(second[0].mid / main).toFixed(2)} ${mainSelected.toUpperCase()}`;
    } else if (secondSelected == 'pln') {
        second = 1;
        DOM.currentRateSecond.textContent = `${(second / main[0].mid).toFixed(2)} ${mainSelected.toUpperCase()}`;
    } else {
        DOM.currentRateSecond.textContent = `${(second[0].mid / main[0].mid).toFixed(2)} ${mainSelected.toUpperCase()}`;
    }
    DOM.currentRateMain.textContent = `1 ${secondSelected.toUpperCase()}`;
}



const service = new Service();

const mainCurrency = 'main';
const secondCurrency = 'second';

const infoBarMainCurrency = new InfoBar(mainCurrency);
const infoBarSecondCurrency = new InfoBar(secondCurrency);


const getMainCurrency = () => {

    const mainCurrencySelected = DOM.mainCurrencySelected.value;
    const secondCurrencySelected = DOM.secondCurrencySelected.value;
    const mainCurrencyInput = DOM.mainCurrencyInput;
    const secondCurrencyInput = DOM.secondCurrencyInput;


    service.getTableA()
        .then(resp => {
            if (mainCurrencySelected == 'pln' && secondCurrencySelected !== 'pln') {
                const rateMainCurrency = mainCurrencyInput.value;
                const rateSecondCurrency = filter(resp, secondCurrencySelected);
                secondCurrencyInput.value = (rateMainCurrency / rateSecondCurrency[0].mid).toFixed(2);
                currentRates(resp, mainCurrencySelected, secondCurrencySelected);
            } else if (mainCurrencySelected !== 'pln' && secondCurrencySelected == 'pln') {
                const rateMainCurrency = filter(resp, mainCurrencySelected);
                const rateSecondCurrency = secondCurrencyInput.value;
                secondCurrencyInput.value = ((rateMainCurrency[0].mid * mainCurrencyInput.value) / (rateSecondCurrency)).toFixed(2);
                currentRates(resp, mainCurrencySelected, secondCurrencySelected);
            } else if (mainCurrencySelected == 'pln' && secondCurrencySelected == 'pln') {
                secondCurrencyInput.value = mainCurrencyInput.value;
                currentRates(resp, mainCurrencySelected, secondCurrencySelected);
            } else {
                const rateMainCurrency = filter(resp, mainCurrencySelected);
                const rateSecondCurrency = filter(resp, secondCurrencySelected);
                secondCurrencyInput.value = ((rateMainCurrency[0].mid * mainCurrencyInput.value) / (rateSecondCurrency[0].mid)).toFixed(2);
                currentRates(resp, mainCurrencySelected, secondCurrencySelected);
            }
        })
        .then(() => {
            infoBarMainCurrency.showInfo(mainCurrencySelected, mainCurrencyInput);
            infoBarSecondCurrency.showInfo(secondCurrencySelected, secondCurrencyInput);


        });
}


const getSecondCurrency = () => {

    const mainCurrencySelected = DOM.mainCurrencySelected.value;
    const secondCurrencySelected = DOM.secondCurrencySelected.value;
    const mainCurrencyInput = DOM.mainCurrencyInput;
    const secondCurrencyInput = DOM.secondCurrencyInput;

    service.getTableA()
        .then(resp => {
            if (mainCurrencySelected == 'pln' && secondCurrencySelected !== 'pln') {
                const rateSecondCurrency = filter(resp, secondCurrencySelected);
                mainCurrencyInput.value = (secondCurrencyInput.value * rateSecondCurrency[0].mid).toFixed(2);
            } else if (mainCurrencySelected !== 'pln' && secondCurrencySelected == 'pln') {
                const rateMainCurrency = filter(resp, mainCurrencySelected);
                mainCurrencyInput.value = (secondCurrencyInput.value / rateMainCurrency[0].mid).toFixed(2);
            } else if (mainCurrencySelected == 'pln' && secondCurrencySelected == 'pln') {
                mainCurrencyInput.value = secondCurrencyInput.value;
            } else {
                const rateMainCurrency = filter(resp, mainCurrencySelected);
                const rateSecondCurrency = filter(resp, secondCurrencySelected);
                mainCurrencyInput.value = ((rateSecondCurrency[0].mid * secondCurrencyInput.value) / (rateMainCurrency[0].mid)).toFixed(2);
            }
        }).then(() => {
            infoBarMainCurrency.showInfo(mainCurrencySelected, mainCurrencyInput);
            infoBarSecondCurrency.showInfo(secondCurrencySelected, secondCurrencyInput);
        })
}

const tableRates = () => {
    service.getTableA()
        .then(resp => {
            DOM.usdRateTable.textContent = filter(resp, 'usd')[0].mid.toFixed(2);
            DOM.eurRateTable.textContent = filter(resp, 'eur')[0].mid.toFixed(2);
            DOM.gbpRateTable.textContent = filter(resp, 'gbp')[0].mid.toFixed(2);
            DOM.chfRateTable.textContent = filter(resp, 'chf')[0].mid.toFixed(2);
        })

}

const getDate = () => {
    service.getDate().then(resp => DOM.dateRate.textContent = resp.data[0].effectiveDate);
}

window.addEventListener('DOMContentLoaded', getMainCurrency);
window.addEventListener('DOMContentLoaded', tableRates);
window.addEventListener('DOMContentLoaded', getDate);

DOM.mainCurrencySelected.addEventListener('change', getMainCurrency);
DOM.secondCurrencySelected.addEventListener('change', getMainCurrency);
DOM.mainCurrencyInput.addEventListener('input', getMainCurrency);

DOM.secondCurrencyInput.addEventListener('input', getSecondCurrency);