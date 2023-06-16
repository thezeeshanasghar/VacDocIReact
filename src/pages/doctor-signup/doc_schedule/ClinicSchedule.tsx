import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import WeekDaysCard from "../../clinic/WeekDaysCard";

const ClinicSchedule: React.FC = () => {
  const handleUnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const Doc_data = localStorage.getItem("drData");
    //@ts-ignore
    const drData = JSON.parse(Doc_data);
    drData.clinic = {};
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

    console.log("New Array:", newArray);
  };
  return (
    <IonPage>
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
          <WeekDaysCard name={"Monday"} />
          <WeekDaysCard name={"Tuesday"} />
          <WeekDaysCard name={"Wednesday"} />
          <WeekDaysCard name={"Thursday"} />
          <WeekDaysCard name={"Friday"} />
          <WeekDaysCard name={"Saturday"} />
          <WeekDaysCard name={"Sunday"} />
          <IonButton type="submit"> Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ClinicSchedule;
