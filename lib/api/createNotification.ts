import axios from "./axios";

interface CreateNotificationPayload{
  title: string;
  message: string;
  banner: string
}
export const createNotification = (payload: CreateNotificationPayload) => {
  return axios.post("/bridge/fcm/message", payload);
};
