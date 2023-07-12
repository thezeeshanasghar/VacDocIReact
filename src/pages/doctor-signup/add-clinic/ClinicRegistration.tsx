import React, { useState } from "react";
import {
  IonContent,
  IonInput,
  IonLabel,
  IonPage,
  IonButton,
  IonItem,
  IonCard,
  IonIcon,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { person, arrowForward } from "ionicons/icons";
import "./clinicReg.css";

const ClinicRegistration: React.FC = () => {
  const router = useIonRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  const handleClinicRegistration = (e: any) => {
    e.preventDefault();

    // Handle sign-up logic here
    console.log("Name:", name);
    console.log("Address:", address);
    console.log("Mobile:", mobile);

    const Doc_data = localStorage.getItem("drData");
    //@ts-ignore
    const drData = JSON.parse(Doc_data);
    drData.clinic = {
      name,
      address,
      number: mobile,
      clinicTiming: "",
    };
    localStorage.setItem("drData", JSON.stringify(drData));
    router.push("/auth/clinic_schedule");

  };
const submit=name.length>0&&address.length>0&&mobile.length>0;
  return (
    <IonPage>
      <IonContent className="sign-up-content-clinic">
        <IonToolbar color={"primary"}>
          {" "}
          &nbsp;&nbsp; <b>Clinic Registration</b>
        </IonToolbar>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <IonCard className="form-card-clinic">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "4px",
              }}
            >
              <IonIcon icon={person} className="signup-icon-clinic" />
            </div>
            <form
              className="form-wrapper-clinic"
              onSubmit={handleClinicRegistration}
            >
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  required
                  type="text"
                  value={name}
                  onIonChange={(e) => setName(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Address</IonLabel>
                <IonInput
                  required
                  type="text"
                  value={address}
                  onIonChange={(e) => setAddress(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Mobile Number</IonLabel>
                <IonInput
                  required
                  type="number"
                  value={mobile}
                  onIonChange={(e) => setMobile(e.detail.value!)}
                />
              </IonItem>
              <IonButton expand="full" type="submit" disabled={!submit}>
                Next
                <IonIcon slot="end" icon={arrowForward} />
              </IonButton>
            </form>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ClinicRegistration;
