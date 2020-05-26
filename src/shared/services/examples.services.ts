import { LangEnum } from "../../i18n";
import DropdownOptionInterface from "../interfaces/dropdown-option.interface";
import RadioOptionInterface from "../interfaces/radio-option.interface";
import CurrencyInterface from "../interfaces/example-currency.interface";

class ExampleServices {
  getLanguages(): Promise<DropdownOptionInterface[]> {
    return new Promise(resolve => {
      return resolve([
        { key: LangEnum.ES_ES, text: 'examples.languages.es-es' },
        { key: LangEnum.CA_ES, text: 'examples.languages.ca-es' },
        { key: LangEnum.EN_GB, text: 'examples.languages.en-gb' },
        { key: LangEnum.EN_US, text: 'examples.languages.en-us' }
      ]);
    });
  }

  getRadioValues(): Promise<RadioOptionInterface[]> {
    return new Promise(resolve => {
      return resolve([
        { key: 'dog', label: 'examples.inputs.radio.dog' },
        { key: 'cat', label: 'examples.inputs.radio.cat' },
        { key: 'bear', label: 'examples.inputs.radio.bear' },
      ]);
    });
  }

  getCurrencies(): Promise<CurrencyInterface[]> {
    return new Promise(resolve => {
      return resolve([
        { icon: '€', name: 'Euro' },
        { icon: '$', name: 'Dollar' },
        { icon: '¥', name: 'Yen' },
      ]);
    });
  }
}

export const exampleService = new ExampleServices();