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
  IonSelectOption,
  IonSelect,
  IonTextarea,
  IonText,
} from "@ionic/react";
import { person, arrowForward } from "ionicons/icons";
import IconBuilding from "../../../icons/IconBuilding";
import "./clinicReg.css";
import cities from "../../test/citiesData";
import Toast from "../../../components/custom-toast/Toast";

const ClinicRegistration: React.FC = () => {
  const router = useIonRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [clinicFee, setClinicFee] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  // const isInvalid = mobile.startsWith("0") || mobile.startsWith("+");
  const Captalize = (input: string) => {
    return input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const canSubmit =
    name.trim() === "" &&
    address.trim() === "" &&
    // mobile.trim() === "" &&
    city.trim() === "" &&
    clinicFee.trim() === "";

  const handleClinicRegistration = (e: any) => {
    e.preventDefault();
    if (canSubmit) {
      alert("Please fill in all the fields.");
    } else {
      const Doc_data = localStorage.getItem("drData");
      //@ts-ignore
      const drData = JSON.parse(Doc_data);
      drData.clinics = [
        {
          name,
          address,
          city,
          fees: clinicFee,
          number: mobile,
          clinicTimings: "",
        },
      ];
      localStorage.setItem("drData", JSON.stringify(drData));
      router.push("/auth/clinic_schedule");
      clearClinicForm();
    }
  };
  const clearClinicForm = () => {
    setName("");
    setAddress("");
    setMobile("");
    setClinicFee("");
    setCity("");
  };
  return (
    <IonPage>
      <Toast
        isOpen={error}
        setOpen={setError}
        color="danger"
        errMsg="An error occurred while signing up, try again."
      />
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
              <IconBuilding />
            </div>
            <form
              className="form-wrapper-clinic"
              onSubmit={handleClinicRegistration}
            >
              <IonItem style={{ width: "100%" }}>
                <IonLabel position="floating">Clinic Name</IonLabel>
                <IonInput
                  required
                  type="text"
                  value={name}
                  onIonChange={(e) => setName(Captalize(e.detail.value!))}
                  id="names"
                />
              </IonItem>
              <IonItem style={{ width: "100%" }}>
                <IonLabel position="floating"> Address</IonLabel>
                <IonTextarea
                  required
                  value={address}
                  onIonChange={(e) => setAddress(Captalize(e.detail.value!))}
                  id="address"
                />
              </IonItem>
              <IonItem style={{ width: "100%" }}>
                <input
                  type="text"
                  list="cityOptions"
                  value={city}
                  placeholder="Choose City"
                  className="custom-input-search"
                  style={{
                    border: "none",
                    width: "100%",
                    height: "2.8rem",
                    marginTop: "0.3px",
                    paddingLeft: "6px",
                  }}
                  onChange={(e) => setCity(e.target.value)}
                />
                <datalist
                  id="cityOptions"
                  style={{ width: "100%", border: "none" }}
                >
                  {cities.map((city, index) => (
                    <option key={index} value={city} />
                  ))}
                </datalist>
              </IonItem>

              <IonItem style={{ width: "100%" }}>
                <IonLabel position="floating">Contact number</IonLabel>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <IonInput
                    required
                    type={ "text" }
                    value={mobile}
                    id="mobile"
                    // readonly
                    onIonChange={(e) => setMobile(e.detail.value!)}
                  />
                  
                   
                </div>
              </IonItem>
              <IonText
                color={"danger"}
                style={{
                  fontSize: "8px",
                  marginBottom: "11px",
                  display:
                  mobile.trim() !== "" &&
                  !/^\d+$/.test(mobile)
        ? "block"
        : "none",
                }}
              >
                Contact should contain only number
              </IonText>
              
              <IonItem style={{ width: "100%" }}>
                <IonLabel position="floating">Fee</IonLabel>
                <IonInput
                  required
                  type="number"
                  value={clinicFee}
                  onIonChange={(e) => setClinicFee(e.detail.value!)}
                  id="Fee"
                  placeholder="PKR"
                />
              </IonItem>
              <IonButton expand="full" type="submit" id="submits">
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
