export class InfoBar {
    constructor(mainOrSecondCurrency) {
        this.summary_input_integer = document.querySelector(`.summary__${mainOrSecondCurrency}-input-integer`);
        this.summary_input_fraction = document.querySelector(`.summary__${mainOrSecondCurrency}-input-fraction`);
        this.summary_selected_integer = document.querySelector(`.summary__${mainOrSecondCurrency}-selected-integer`);
        this.summary_selected_fraction = document.querySelector(`.summary__${mainOrSecondCurrency}-selected-fraction`);
        this.polishZloty = {
            many: 'złotych',
            one: 'złoty',
            few: 'złote'
        };
        this.polishGrosze = {
            many: 'groszy',
            one: 'grosz',
            few: 'grosze'
        };

        this.americanDollar = {
            many: 'dolarów',
            one: 'dolar',
            few: 'dolary'
        }

        this.europeEuro = {
            many: 'euro',
            one: 'euro',
            few: 'euro'
        }

        this.euroAmericanCent = {
            many: 'centów',
            one: 'cent',
            few: 'centy'
        }

        this.britishPound = {
            many: 'funtów',
            one: 'funt',
            few: 'funty'
        }
        this.britishPenny = {
            many: 'pensów',
            one: 'pens',
            few: 'pensy'
        }
    }

    showInfo(selectedCurrency, inputValue) {
        const selected = selectedCurrency;
        const getInputValues = inputValue.value;
        const inputValues = ((getInputValues * 100) / 100).toFixed(2);

        const splitValueArray = inputValues.split('.');
        this.summary_input_integer.textContent = splitValueArray[0];


        const pr = new Intl.PluralRules('pl-PL');
        this.polishZloty[pr.select(inputValues)];


        if (splitValueArray[1] < 10 && splitValueArray[1] > 0) {

            switch (selected) {
                case 'pln':
                    this.summary_selected_integer.textContent = this.polishZloty[pr.select(splitValueArray[0])];
                    if (splitValueArray[1] > 0) {
                        this.summary_input_fraction.textContent = ' i ' + (splitValueArray[1] * 10) / 10;
                        this.summary_selected_fraction.textContent = this.polishGrosze[pr.select(splitValueArray[1])];
                    }
                    break;
                case 'eur':
                    this.summary_selected_integer.textContent = this.europeEuro[pr.select(splitValueArray[0])];
                    if (splitValueArray[1] > 0) {
                        this.summary_input_fraction.textContent = ' i ' + (splitValueArray[1] * 10) / 10;
                        this.summary_selected_fraction.textContent = this.euroAmericanCent[pr.select(splitValueArray[1])];
                    }
                    break;
                case 'usd':
                    this.summary_selected_integer.textContent = this.americanDollar[pr.select(splitValueArray[0])];
                    if (splitValueArray[1] > 0) {
                        this.summary_input_fraction.textContent = ' i ' + (splitValueArray[1] * 10) / 10;
                        this.summary_selected_fraction.textContent = this.euroAmericanCent[pr.select(splitValueArray[1])];
                    }
                    break;
                default:
                    this.summary_selected_integer.textContent = this.britishPound[pr.select(splitValueArray[0])];
                    if (splitValueArray[1] > 0) {
                        this.summary_input_fraction.textContent = ' i ' + (splitValueArray[1] * 10) / 10;
                        this.summary_selected_fraction.textContent = this.britishPenny[pr.select(splitValueArray[1])];
                    }
                    break;
            }

        } else if (splitValueArray[1] == 0 || !splitValueArray[1]) {

            this.summary_input_fraction.textContent = 0;

            switch (selected) {
                case 'pln':
                    this.summary_selected_integer.textContent = this.polishZloty[pr.select(splitValueArray[0])];
                    if (splitValueArray[1] > 0) {
                        this.summary_selected_fraction.textContent = this.polishGrosze[pr.select(splitValueArray[1])];
                    } else {
                        this.summary_input_fraction.textContent = '';
                        this.summary_selected_fraction.textContent = '';
                    }
                    break;

                case 'eur':
                    this.summary_selected_integer.textContent = this.europeEuro[pr.select(splitValueArray[0])];
                    if (splitValueArray[1] > 0) {
                        this.summary_selected_fraction.textContent = this.euroAmericanCent[pr.select(splitValueArray[1])];
                    } else {
                        this.summary_input_fraction.textContent = '';
                        this.summary_selected_fraction.textContent = '';
                    }
                    break;

                case 'usd':
                    this.summary_selected_integer.textContent = this.americanDollar[pr.select(splitValueArray[0])];
                    if (splitValueArray[1] > 0) {
                        this.summary_selected_fraction.textContent = this.euroAmericanCent[pr.select(splitValueArray[1])];
                    } else {
                        this.summary_input_fraction.textContent = '';
                        this.summary_selected_fraction.textContent = '';
                    }
                    break;

                default:
                    this.summary_selected_integer.textContent = this.britishPound[pr.select(splitValueArray[0])];
                    if (splitValueArray[1] > 0) {
                        this.summary_selected_fraction.textContent = this.britishPenny[pr.select(splitValueArray[1])];
                    } else {
                        this.summary_input_fraction.textContent = '';
                        this.summary_selected_fraction.textContent = '';
                    }
                    break;
            }

        } else {
            switch (selected) {
                case 'pln':
                    this.summary_selected_integer.textContent = this.polishZloty[pr.select(splitValueArray[0])];
                    if (splitValueArray[1] > 0) {
                        this.summary_input_fraction.textContent = ' i ' + (splitValueArray[1] * 10) / 10;
                        this.summary_selected_fraction.textContent = this.polishGrosze[pr.select(splitValueArray[1])];
                    } else {
                        this.summary_input_fraction.textContent = '';
                        this.summary_selected_fraction.textContent = '';
                    }
                    break;

                case 'eur':
                    this.summary_selected_integer.textContent = this.europeEuro[pr.select(splitValueArray[0])];
                    if (splitValueArray[1] > 0) {
                        this.summary_input_fraction.textContent = ' i ' + (splitValueArray[1] * 10) / 10;
                        this.summary_selected_fraction.textContent = this.euroAmericanCent[pr.select(splitValueArray[1])];
                    } else {
                        this.summary_input_fraction.textContent = '';
                        this.summary_selected_fraction.textContent = '';
                    }
                    break;

                case 'usd':
                    this.summary_selected_integer.textContent = this.americanDollar[pr.select(splitValueArray[0])];
                    if (splitValueArray[1] > 0) {
                        this.summary_input_fraction.textContent = ' i ' + (splitValueArray[1] * 10) / 10;
                        this.summary_selected_fraction.textContent = this.euroAmericanCent[pr.select(splitValueArray[1])];
                    } else {
                        this.summary_input_fraction.textContent = '';
                        this.summary_selected_fraction.textContent = '';
                    }
                    break;

                default:
                    this.summary_selected_integer.textContent = this.britishPound[pr.select(splitValueArray[0])];
                    if (splitValueArray[1] > 0) {
                        this.summary_input_fraction.textContent = ' i ' + (splitValueArray[1] * 10) / 10;
                        this.summary_selected_fraction.textContent = this.britishPenny[pr.select(splitValueArray[1])];
                    } else {
                        this.summary_input_fraction.textContent = '';
                        this.summary_selected_fraction.textContent = '';
                    }
                    break;
            }
        }
    }
}