import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import WeekDaysCard from "../../clinic/WeekDaysCard";
import Toast from "../../../components/custom-toast/Toast";

const ClinicSchedule: React.FC = () => {
  const router = useIonRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [render, setRender] = useState(false);
  const handleUnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const Doc_data = localStorage.getItem("drData");
    //@ts-ignore
    const drData = JSON.parse(Doc_data);

    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const newArray = [].concat(
      ...Object.entries(localStorage)
        .filter(
          ([key, value]) =>
            weekdays.includes(key) &&
            Array.isArray(JSON.parse(value)) &&
            JSON.parse(value).length > 0
        )
        .map(([key, value]) => JSON.parse(value))
    );
    if (newArray.length > 0) {
      setCanSubmit(false);
    }
    // console.log("clinics timing array,", newArray);
    console.log("new Array ", newArray);
    drData.clinics[0]["clinicTimings"] = newArray;
    console.log("cdr  data ", drData);

    RegisterDoctor(drData);
  };

  const rerender = () => {
    window.location.reload();
    console.log("yes It worked");
  };

  const RegisterDoctor = (data_to_be_sent: any) => {
    fetch(`${import.meta.env.VITE_API_URL}api/Doctor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_to_be_sent),
    })
      .then((res) => {
        if (res.status === 200 || 204) {
          setSuccess(true);
          setTimeout(() => {
            router.push("/", "back");
          }, 1500);
        } else {
          setError(false);
        }
      })
      .catch((err) => setError(true));
    localStorage.clear();
  };

  return (
    <IonPage>
      <Toast
        isOpen={error}
        setOpen={setError}
        color="danger"
        errMsg="An error occurred while signing up, try again."
      />
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        color="success"
        errMsg="Registration successful. Kindly login now!"
      />
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Clinic Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form
          onSubmit={handleUnSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px 10px",
          }}
        >
          <WeekDaysCard name={"Monday"} renderFunc={rerender} id="name123" />
          <WeekDaysCard name={"Tuesday"} renderFunc={rerender} id="name122" />
          <WeekDaysCard name={"Wednesday"} renderFunc={rerender} id="name124" />
          <WeekDaysCard name={"Thursday"} renderFunc={rerender} id="name125" />
          <WeekDaysCard name={"Friday"} renderFunc={rerender} id="name126" />
          <WeekDaysCard name={"Saturday"} renderFunc={rerender} id="name127" />
          <WeekDaysCard name={"Sunday"} renderFunc={rerender} id="name128" />
          <IonText color={"danger"}>
            {canSubmit &&
              "please select any day's atleast one session to sign up"}
          </IonText>
          <IonButton type="submit" id="submitsch" disabled={canSubmit}>
            Submit
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ClinicSchedule;
