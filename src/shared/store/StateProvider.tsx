import React, { useState } from 'react';

import { StateContext } from './state.context';
import NotificationInterface from '../interfaces/notification.interface';
import StateContextInterface from '../interfaces/state-context.interface';
import UserInterface from '../interfaces/user.interface';
import { NotificationTypeEnum } from '../enums/notification-type.enum';

interface Props {
    children: any;
}

export default function StateProvider(props: Props) {
  const changeNotification = (notification: NotificationInterface): void => {
    setContext(contextState => ({
      ...contextState,
      notification: notification,
    }));
  };

  const changeUser = (user: UserInterface): void => {
    localStorage.setItem('user.language', user.language);
    setContext(contextState => ({
      ...contextState,
      user: user,
    }));
  };

  const [context, setContext] = useState<StateContextInterface>({
    notification: {
      type: NotificationTypeEnum.INFO,
      isVisible: false,
      title: '',
      messageId: '',
    },
    user: null,
    changeNotification: changeNotification,
    changeUser: changeUser,
  });

  const contextValue = {
    ...context,
    changeNotification,
    changeUser,
  };
    
  return <StateContext.Provider value={contextValue}>{props.children}</StateContext.Provider>;
}