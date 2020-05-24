import { LangEnum } from "./lang.enum";
import { CultureEnum } from "./culture.enum";

export interface TranslateInterface {
  culture: CultureEnum;
  language: LangEnum;
  decimalSeparator: string;
  thousandSeparator: string;
  messages: any;
  switchLanguage: any;
}
