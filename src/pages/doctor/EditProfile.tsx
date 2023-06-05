import {
    IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import React, { FormEvent } from "react";
import Header from "../../components/header/Header";

const EditProfile: React.FC = () => {
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        throw new Error("Function not implemented.");
    }

  return (
    <IonPage>
      <Header pageName="Update Profile" />
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
                <IonItem>
                  <IonLabel position="floating">First Name</IonLabel>
                  <IonInput type="text" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Last Name</IonLabel>
                  <IonInput type="text" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput type="email" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Phone No</IonLabel>
                  <IonInput type="tel" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">PDMC</IonLabel>
                  <IonInput type="text" />
                </IonItem>
            <IonButton type="submit" expand="full">Update</IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
