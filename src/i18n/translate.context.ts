import { createContext } from 'react';

import { TranslateInterface } from './translate.interface';

export const TranslateContext = createContext<null | TranslateInterface>(null);
