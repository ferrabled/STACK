import Notification from "components/notification";
import { useState } from "react";
import { Notify } from "types";

export default function useToast(): [
  JSX.Element,
  (notify: Notify) => void
] {
  const [notify, setNotify] = useState<Notify>({
    isOpen: false,
    message: "",
    type: "info",
  });
  return [
    <Notification
      key="notif"
      isOpen={notify.isOpen}
      message={notify.message}
      type={notify.type}
    ></Notification>,
    setNotify,
  ];
}
