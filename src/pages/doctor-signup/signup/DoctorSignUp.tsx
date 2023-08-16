import React, { useState } from "react";
import {
  IonContent,
  IonInput,
  IonLabel,
  IonPage,
  IonButton,
  IonItem,
  // IonSelect,
  // IonSelectOption,
  IonCard,
  IonIcon,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { person, arrowForward } from "ionicons/icons";
import "./DocSignUp.css";

const DoctorSignUp: React.FC = () => {
  const router = useIonRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [pmdc, setPMDC] = useState("");
  // const [doctorType, setDoctorType] = useState("");

  const isAnyFieldEmpty = () => {
    return name.trim() === "" || email.trim() === "" || mobile.trim() === "" || password.trim() === "" || pmdc.trim() === "";
  };

  const submit = !isAnyFieldEmpty();
  const handleSignUp = (e: any) => {
    localStorage.clear();
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Mobile:", mobile);
    console.log("Password:", password);
    console.log("PMDC:", pmdc);
    // console.log("Doctor Type:", doctorType);

    localStorage.setItem(
      "drData",
      JSON.stringify({
        name,
        mobileNumber: mobile,
        password,
        // isApproved: false,
        // isEnabled: false,
        email,
        // doctorType,
        pmdc,
        // validUpto: new Date().toDateString(),
        clinics: "",
      })
    );
    router.push("/auth/reg_clinic");
  };

  // const handleInputBlur = () => {
  //   if (pmdc.trim() === "") {
  //     // If the input is empty, disable the button
  //     setPMDC(""); // This line is optional, it resets the input to an empty state immediately.
  //   }
  // };

  return (
    <IonPage>
      <IonContent className="sign-up-content-doctor">
        <IonToolbar color={"primary"}>
          {" "}
          &nbsp;&nbsp; <b>Doctor Registration</b>
        </IonToolbar>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <IonCard className="form-card-doctor">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "4px",
              }}
            >
              <IonIcon icon={person} className="signup-icon-doctor" />
            </div>
            <form className="form-wrapper-doctor" onSubmit={handleSignUp}>
              <IonItem>
                <IonLabel position="stacked" id="name">Name</IonLabel>
                <IonInput
                  required
                  type="text"
                  id="name"
                  value={name}
                  className="data"
                  onIonChange={(e) => setName(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  required
                  type="email"
                  value={email}
                  id="email"
                  onIonChange={(e) => setEmail(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Mobile Number</IonLabel>
                <IonInput
                  required
                  type="number"
                  value={mobile}
                  id="mobileNumber"
                  itemID="mobileNumber"
                  onIonChange={(e) => setMobile(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  required
                  type="password"
                  value={password}
                  id="password"
                  onIonChange={(e) => setPassword(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">PMDC</IonLabel>
                <IonInput
                  type="text"
                  required
                  value={pmdc}
                  id="pmdc"
                  onIonChange={(e) => setPMDC(e.detail.value!)}
                  // onIonBlur={handleInputBlur}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel>Doctor Type</IonLabel>
                <IonSelect
                
                  value={doctorType}
                  onIonChange={(e) => setDoctorType(e.detail.value)}
                >
                  <IonSelectOption value="GP">
                    General Practitioner
                  </IonSelectOption>
                  <IonSelectOption value="Specialist">
                    Specialist
                  </IonSelectOption>
                  <IonSelectOption value="Surgeon">Surgeon</IonSelectOption>
                </IonSelect>
              </IonItem> */}
              <IonButton id="signup" expand="full" type="submit" disabled={!submit}>
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

export default DoctorSignUp;
