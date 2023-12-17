import { useEffect, useState } from "react";

export type IAppNotificationProps = {
  notification: { type?: String; message?: String; trackId?: string };
};

export const getInfoNotification = (message: string) => ({
  type: "INFO",
  message,
  trackId: new Date().getTime().toString(),
});

export const getErrorNotification = (message: string) => ({
  type: "ERROR",
  message,
  trackId: new Date().getTime().toString(),
});

export const getSuccessNotification = (message: string) => ({
  type: "SUCCESS",
  message,
  trackId: new Date().getTime().toString(),
});

export const getWarningNotification = (message: string) => ({
  type: "WARNING",
  message,
  trackId: new Date().getTime().toString(),
});

export const getTextNotification = (message: string) => ({
  type: "TEXT",
  message,
  trackId: new Date().getTime().toString(),
});

const notificationMaps = {
  INFO: "blue",
  ERROR: "red",
  SUCCESS: "green",
  WARNING: "yellow",
  TEXT: "gray",
};

const AppNotification = (props: IAppNotificationProps) => {
  const { notification } = props;
  const [color, setColor] = useState("red");
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (notification?.type) {
      type ObjectKey = keyof typeof notificationMaps;
      const myVar = notification?.type as ObjectKey;
      setColor(notificationMaps[myVar]);
      setDisplay(true);
      setTimeout(() => {
        setDisplay(false);
      }, 3000);
    }
  }, [notification]);

  const getDiv = (classCode: string) => {
    const getClass = (colorCode: string) => {
      return `flex items-center px-2 mb-4 text-xs text-${colorCode}-800 rounded-lg bg-${colorCode}-50 dark:bg-gray-800 dark:text-${colorCode}-400`;
    };

    return (
      <div className={getClass(classCode)} role="alert">
        <svg
          className="mr-3 inline h-4 w-4 shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>{notification?.message}</div>
      </div>
    );
  };

  return <div className="mt-4">{display ? getDiv(color) : <></>}</div>;
};

export default AppNotification;
