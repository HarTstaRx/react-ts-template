import React, { useState } from 'react';

import { IntlProvider } from 'react-intl';

import intlMessagesES from './es.json';
import intlMessagesEN from './en.json';
import { TranslateContext } from './translate.context';
import { LangEnum } from './lang.enum';
import { CultureEnum } from './culture.enum';

interface Props {
  children: any;
}

// eslint-disable-next-line max-lines-per-function
function IntlProviderWrapper(props: Props) {
  const getMessages = (language: string) => {
    switch (language) {
      case LangEnum.EN_US:
      case LangEnum.EN_GB:
        return intlMessagesEN;
      case LangEnum.CA_ES:
      case LangEnum.ES_ES:
      default:
        return intlMessagesES;
    }
  };

  const isLangEnum = (language: LangEnum) => {
    let existLang: boolean = false;
    Object.keys(LangEnum)
      .forEach((lang: any) => {
        if (lang === language) existLang = true;
      });
    return existLang;
  };

  const selectLanguage = () => {
    let language: LangEnum = localStorage.getItem('language') as LangEnum;
    if (!language) language = navigator.language.slice(0, 2).toUpperCase() as LangEnum;
    if (!isLangEnum(language)) language = LangEnum.EN_GB;
    return language;
  };

  const selectCulture = (language: LangEnum) => {
    switch (language) {
      case LangEnum.EN_US:
        return CultureEnum.US;
      case LangEnum.EN_GB:
        return CultureEnum.GB;
      case LangEnum.CA_ES:
      case LangEnum.ES_ES:
      default:
        return CultureEnum.ES;
    }
  };

  const getNumberSeparators = (culture: CultureEnum) => {
    let hasComma: boolean = false;
    switch (culture) {
      case CultureEnum.US:
      case CultureEnum.GB:
        hasComma = false;
        break;
      case CultureEnum.ES:
      default:
        hasComma = true;
        break;
    }
    return {
      decimalSeparator: hasComma ? ',' : '.',
      thousandSeparator: hasComma ? '.' : ','
    };
  }

  const language: LangEnum = selectLanguage();
  const culture: CultureEnum = selectCulture(language);
  const numberSeparators: any = getNumberSeparators(culture);

  const [context, setContext] = useState({
    language: language,
    messages: getMessages(language),
    culture: culture,
    decimalSeparator: numberSeparators.decimalSeparator,
    thousandSeparator: numberSeparators.thousandSeparator,
  });

  const switchLanguage = (language: LangEnum): void => {
    localStorage.setItem('language', language);
    const culture: CultureEnum = selectCulture(language);
    const numberSeparators: any = getNumberSeparators(culture);
    setContext(contextState => ({
      ...contextState,
      language: language,
      messages: getMessages(culture),
      culture: culture,
      decimalSeparator: numberSeparators.decimalSeparator,
      thousandSeparator: numberSeparators.thousandSeparator,
    }));
  };

  const contextValue = {
    ...context,
    switchLanguage,
  };

  return (
    <TranslateContext.Provider value={contextValue}>
      <IntlProvider
        locale={context.language}
        messages={context.messages}
        defaultLocale={context.language}
      >
        {props.children}
      </IntlProvider>
    </TranslateContext.Provider>
  );
}

export default IntlProviderWrapper;
