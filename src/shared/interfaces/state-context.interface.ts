import NotificationInterface from './notification.interface';
import UserInterface from './user.interface';

export default interface StateContextInterface {
    snackbar: NotificationInterface;
    user: UserInterface | null;
    changeSnackbar: any;
    changeUser: any;
  }