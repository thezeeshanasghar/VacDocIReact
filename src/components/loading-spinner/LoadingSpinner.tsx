import { IonLoading } from "@ionic/react";
import React from "react";
import "./loading-spinner.css";
interface ILoadingSpinnerProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
}
const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({
  isOpen,
  setOpen,
  time,
}) => {
  return (
    <>
      <IonLoading
        isOpen={isOpen}
        cssClass={"custom-loading"}
        onDidDismiss={() => setOpen(false)}
        message={"Loading..."}
        duration={time}
      />
    </>
  );
};

export default LoadingSpinner;
