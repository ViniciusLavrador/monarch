import { showNotification, NotificationProps } from "@mantine/notifications";

type showNotificationParams = Omit<NotificationProps, "color">;
type NotificationTypes = "SUCCESS" | "ERROR" | "WARNING" | "INFO";

const defaultNotificationTitle: Record<NotificationTypes, string> = {
  ERROR: "Ops",
  INFO: "",
  SUCCESS: "Uhuu",
  WARNING: "Cuidado..",
};

const defaultNotificationColor: Record<NotificationTypes, string> = {
  ERROR: "red",
  INFO: "blue",
  SUCCESS: "green",
  WARNING: "yellow",
};

const _notify = (type: NotificationTypes, { title, ...params }: showNotificationParams) =>
  showNotification({
    ...params,
    color: defaultNotificationColor[type],
    title: title || defaultNotificationTitle[type],
  });

export const notifySuccess = (params: showNotificationParams) => _notify("SUCCESS", params);
export const notifyInfo = (params: showNotificationParams) => _notify("INFO", params);
export const notifyWarning = (params: showNotificationParams) => _notify("WARNING", params);
export const notifyError = (params: showNotificationParams) => _notify("ERROR", params);
