import React from "react";
import { IonContent, IonText } from "@ionic/react";

type ErrorComponentProps = {
  title: string;
};

const ErrorComponent: React.FC<ErrorComponentProps> = ({ title }) => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
  };

  const titleStyle: React.CSSProperties = {
    color: "red",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <IonText color="danger" style={titleStyle}>
        <h3>{title} failed to load. Please try again.</h3>
      </IonText>
    </div>
  );
};

export default ErrorComponent;