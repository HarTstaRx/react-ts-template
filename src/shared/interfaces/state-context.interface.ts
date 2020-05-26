import NotificationInterface from './notification.interface';
import UserInterface from './user.interface';

export default interface StateContextInterface {
    notification: NotificationInterface;
    user: UserInterface | null;
    changeNotification: any;
    changeUser: any;
  }