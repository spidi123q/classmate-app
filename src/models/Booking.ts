import { ISuccess } from "react-native-razorpay";
import { ITimeStamps } from "../common/models/TimeStamps";
import { BookingStatus, PreferredSlot } from "./enum";
import IOrganization from "./Organization";

export default interface IBooking extends ITimeStamps {
  organizationId: string;
  active: boolean;
  razorpayOrderId?: string;
  paymentDetails?: ISuccess;
  organization?: IOrganization;
  status: BookingStatus;
  preferredSlot: PreferredSlot;
  liveDetails?: ILiveDetails;
  liveUpdateInterval: number;
}

export interface ILiveDetails {
  roomName: string;
  lastSeem: Date;
  isLive: boolean;
}

export interface IBookingEdit extends Partial<IBooking> {}
