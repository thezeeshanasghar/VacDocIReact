import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
} from "@ionic/react";
import React from "react";
import WeekDaysCard from "./WeekDaysCard";
import Header from "../../components/header/Header";

const AddClinic: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <Header pageName="Add Clinic" />
        <form noValidate className="ion-padding">
          <IonItem>
            <IonLabel position="floating" color="primary">
              Name
            </IonLabel>
            <IonInput type="text" required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="primary">
              Phone Number
            </IonLabel>
            <IonInput type="text" required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="primary">
              Address
            </IonLabel>
            <IonTextarea required></IonTextarea>
          </IonItem>
          <WeekDaysCard name="Monday" />
          <WeekDaysCard name="Tuesday" />
          <WeekDaysCard name="Wednesday" />
          <WeekDaysCard name="Thursday" />
          <WeekDaysCard name="Friday" />
          <WeekDaysCard name="Satureday" />
          <WeekDaysCard name="Sunday" />
          <IonItem style={{ minHeight: "300px" }}>
            <div
              className="map"
              style={{
                minHeight: "300px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Google Maps component or placeholder */}
            </div>
          </IonItem>
          <IonButton type="submit" disabled>
            Submit
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddClinic;
