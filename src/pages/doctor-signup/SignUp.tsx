import React, { useState } from "react";
import {
  IonContent,
  IonInput,
  IonLabel,
  IonPage,
  IonButton,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonTitle,
  IonItemDivider,
} from "@ionic/react";
import "./signup.css"; // Import custom CSS file for styling
import { person } from "ionicons/icons";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [pmdc, setPMDC] = useState("");
  const [doctorType, setDoctorType] = useState("");

  const handleSignUp = () => {
    // Handle sign-up logic here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Mobile:", mobile);
    console.log("Password:", password);
    console.log("PMDC:", pmdc);
    console.log("Doctor Type:", doctorType);
  };

  return (
    <IonPage>
      <IonContent className="sign-up-content">
        <div className="form-container">
          <div className="form-wrapper">
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                value={name}
                onIonChange={(e) => setName(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Mobile Number</IonLabel>
              <IonInput
                value={mobile}
                onIonChange={(e) => setMobile(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">PMDC</IonLabel>
              <IonInput
                value={pmdc}
                onIonChange={(e) => setPMDC(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Doctor Type</IonLabel>
              <IonSelect
                value={doctorType}
                onIonChange={(e) => setDoctorType(e.detail.value)}
              >
                <IonSelectOption value="GP">
                  General Practitioner
                </IonSelectOption>
                <IonSelectOption value="Specialist">Specialist</IonSelectOption>
                <IonSelectOption value="Surgeon">Surgeon</IonSelectOption>
                {/* Add more options as needed */}
              </IonSelect>
            </IonItem>
            <IonButton slot="end" strong onClick={handleSignUp}>
              NEXt
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
