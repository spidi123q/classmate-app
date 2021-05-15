import IPaginatedRequest from "./PaginatedRequest";

export default interface INotification {
  _id: string;
  title: string;
  body: string;
  image?: string;
  seen: boolean;
}

export type INotificationQuery = Partial<INotification & IPaginatedRequest>;
