import { IonToast } from "@ionic/react";
import React from "react";

interface ToastProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  message: string;
  color: string;
}

const Toast: React.FC<ToastProps> = ({ isOpen, setOpen, message, color }) => {
  return (
    <IonToast
      isOpen={isOpen}
      onDidDismiss={() => setOpen(false)}
      message={message}
      duration={2000}
      color={color}
      buttons={[
        {
          text: "Close",
          role: "cancel",
          handler: () => setOpen(false),
        },
      ]}
    />
  );
};

export default Toast;
