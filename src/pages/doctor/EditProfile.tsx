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
import React, { FormEvent, useState } from "react";
import Header from "../../components/header/Header";

const EditProfile: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pdmc, setPdmc] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // Perform form submission logic here
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
                <IonInput
                  type="text"
                  value={firstName}
                  onIonChange={(e) => setFirstName(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Last Name</IonLabel>
                <IonInput
                  type="text"
                  value={lastName}
                  onIonChange={(e) => setLastName(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Phone No</IonLabel>
                <IonInput
                  type="tel"
                  value={phone}
                  onIonChange={(e) => setPhone(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">PDMC</IonLabel>
                <IonInput
                  type="text"
                  value={pdmc}
                  onIonChange={(e) => setPdmc(e.detail.value!)}
                />
              </IonItem>
              <IonButton type="submit" expand="full">
                Update
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
