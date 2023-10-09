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
  IonText,
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
  const isInvalid = mobile.startsWith("0") || mobile.startsWith("+");
  // const [doctorType, setDoctorType] = useState("");

  const canSubmit =
    name.trim() === "" &&
    email.trim() === "" &&
    mobile.trim() === "" &&
    password.trim() === "" &&
    pmdc.trim() === "";

  const handleSignUp = (e: any) => {
    e.preventDefault();
    if (canSubmit) {
      alert("Please fill in all the fields.");
    } else {
      if (mobile.trim().length < 10) {
        alert("Mobile Number must be at least 10 digit");
      } else if (mobile.trim().length > 10) {
        alert("Mobile Number must be at least 10 digit long.");
      } else {
        localStorage.clear();
        e.preventDefault();
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
        clearForm();
      }
    }
  };
  const clearForm = () => {
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setPMDC("");
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
              <IonIcon
                icon={person}
                className="signup-icon-doctor"
                style={{ margin: "1rem" }}
              />
            </div>
            <form className="form-wrapper-doctor" onSubmit={handleSignUp}>
              <IonItem>
                <IonLabel position="stacked" id="name">
                  Doctor Name
                </IonLabel>
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
                  style={{ color: isInvalid ? "red" : "" }}
                  placeholder="3331234567"
                  onIonChange={(e) => setMobile(e.detail.value!)}
                />
              </IonItem>
              <IonText
                color={"danger"}
                style={{
                  fontSize: "10px",
                  marginBottom: "11px",
                  display:
                    mobile.startsWith("0") || mobile.startsWith("+")
                      ? "block"
                      : "none",
                }}
              >
                Mobile Number Must be In 333-1234567 Format
              </IonText>
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
              <IonButton id="signup" expand="full" type="submit">
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
