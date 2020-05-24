import { NotificationTypeEnum } from './../enums/notification-type.enum';

export default interface NotificationInterface {
  type: NotificationTypeEnum;
  title: string;
  messageId: string;
  isVisible: boolean;
}