import { IonAlert } from "@ionic/react";
import React from "react";
interface AlertProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}
const AlertSuccess: React.FC<AlertProps> = ({ isOpen, setOpen, message }) => {
  return (
    <>
      <IonAlert
        isOpen={isOpen}
        header="Alert"
        color="success"
        message={message}
        buttons={["OK"]}
        onDidDismiss={() => setOpen(false)}
      />
    </>
  );
};

export default AlertSuccess;