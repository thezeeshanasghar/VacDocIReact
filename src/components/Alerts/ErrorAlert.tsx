import { IonAlert } from "@ionic/react";
import React from "react";
interface AlertProps {
  message: string;
}
const ErrorAlert: React.FC<AlertProps> = ({ message }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <IonAlert
        isOpen={isOpen}
        header="Alert"
        color="danger"
        message={message}
        buttons={["OK"]}
        onDidDismiss={() =>
          setTimeout(() => {
            setIsOpen(false);
          }, 1000)
        }
      />
    </>
  );
};

export default ErrorAlert;
