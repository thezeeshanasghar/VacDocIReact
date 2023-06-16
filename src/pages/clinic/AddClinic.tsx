import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import WeekDaysCard, { ISession } from "./WeekDaysCard";
import Header from "../../components/header/Header";
import Toast from "../../components/custom-toast/Toast";

const AddClinic: React.FC = () => {
  const router = useIonRouter();
  const [doctorId, setDoctorId] = useState(1);
  const [clinicName, setClinicName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform submit logic with clinicName, phoneNumber, address, and sessions data
    postClinic();
  };
  const postClinic = () => {
    const data_to_be_sent = {
      name: clinicName,
      address,
      number: phoneNumber,
      doctorId,
    };

    fetch(`${import.meta.env.VITE_API_URL}api/Clinic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_to_be_sent),
    })
      .then((res) => {
        if (res.status === 201) {
          setSuccess(true);
          setTimeout(() => {
            router.push("/members/doctor/clinic", "back");
          }, 1000);
        } else {
          setError(false);
        }
      })
      .catch((err) => setError(true));
  };

  const canSubmit = clinicName && address && phoneNumber;
  return (
    <IonPage>
      <Toast
        isOpen={error}
        setOpen={setError}
        color="danger"
        errMsg="an error occurred while adding new clinic, try again"
      />
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        color="success"
        errMsg="clinic added successfully"
      />
      <IonContent>
        <Header pageName="Add Clinic" />
        <form noValidate className="ion-padding" onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating" color="primary">
              Name
            </IonLabel>
            <IonInput
              type="text"
              required
              value={clinicName}
              onIonChange={(e) => setClinicName(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="primary">
              Phone Number
            </IonLabel>
            <IonInput
              type="number"
              required
              value={phoneNumber}
              onIonChange={(e) => setPhoneNumber(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="primary">
              Address
            </IonLabel>
            <IonTextarea
              required
              value={address}
              onIonChange={(e) => setAddress(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
          {/* {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((item, index) => (
            <WeekDaysCard
              name={item}
              key={index * 3}
              setSession={setSessions}
            />
          ))} */}
          {/* <IonItem style={{ minHeight: "300px" }}>
            <div
              className="map"
              style={{
                minHeight: "300px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Google Maps component or placeholder */}
          {/* </div>
          </IonItem> */}
          <IonButton disabled={!canSubmit} type="submit">
            Submit
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddClinic;
