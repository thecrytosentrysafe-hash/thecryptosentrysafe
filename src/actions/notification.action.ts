"use server";

import { Types } from "mongoose";
import NotificationModel from "@/models/notification.model";
import { NotificationCategory } from "@/constants";

/* CREATE */
export const createNotification = async ({
  userId,
  type,
  title,
  description,
  from,
  to,
  fromAmount,
  toAmount
}: {
  userId: string;
  type: NotificationCategory;
  title?: string;
  description?: string;
  from?: string;
  to?: string;
  fromAmount?: number;
  toAmount?: number;
}) => {
  await NotificationModel.create({
    userId: new Types.ObjectId(userId),
    type,
    title,
    description,
    from,
    to,
    fromAmount,
    toAmount,
    read: false
  });
};

/* GET USER NOTIFICATIONS */
export const getUserNotifications = async (userId: string) => {
  const notifications = await NotificationModel
    .find({ userId: new Types.ObjectId(userId) })
    .sort({ createdAt: -1 })
    .lean();

  return notifications;
};

/* MARK ONE AS READ */
export const markNotificationAsRead = async (notificationId: string) => {
  await NotificationModel.findByIdAndUpdate(
    notificationId,
    { read: true },
    { new: true }
  );
};

/* MARK ALL AS READ */
export const markAllNotificationsAsRead = async (userId: string) => {
  await NotificationModel.updateMany(
    { userId: new Types.ObjectId(userId), read: false },
    { read: true }
  );
};

/* DELETE ONE */
export const deleteNotification = async (notificationId: string) => {
  await NotificationModel.findByIdAndDelete(notificationId);
};

export const getCoinRelatedTransactions = async (
  userId: string,
  coin: string
) => {
  const transactions = await NotificationModel.find({
    userId,
    $or: [
      { from: coin.toUpperCase() },
      { to: coin.toUpperCase() }
    ]
  })
    .sort({ createdAt: -1 }) // newest first
    .lean();

  return transactions;
}