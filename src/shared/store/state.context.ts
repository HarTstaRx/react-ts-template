import { createContext } from 'react';
import StateContextInterface from '../interfaces/state-context.interface';
import { NotificationTypeEnum } from '../enums/notification-type.enum';

export const StateContext = createContext<StateContextInterface>({
  notification: { type: NotificationTypeEnum.INFO, title: '', messageId: '', isVisible: false },
  changeNotification: null,
  user: null,
  changeUser: null,
});