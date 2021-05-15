export default interface PushToken {
  _id: string;
  deviceId?: string;
  deviceName: string;
  token: string;
  platform: string;
  userId: string;
}

export type PushTokenEdit = Omit<PushToken, "userId" | "_id">
