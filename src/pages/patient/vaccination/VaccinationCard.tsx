import React, { useEffect, useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonImg,
  IonIcon,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import { calendar } from "ionicons/icons";
import { IPSchedule } from "./VaccinationCardList";
import syringImage from "../../../assets/injectionFilled.png";
import { format } from "date-fns";
import DatePicker from "./DatePicker";
import { IDose } from "../../doctor-schedule/DoctorScheduleCard";
interface IPatientCardProps {
  date: string;
  data: IPSchedule[];
  forceRender: () => void;
}
const VaccinationCard: React.FC<IPatientCardProps> = ({
  date,
  data,
  forceRender,
}) => {
  const router = useIonRouter();
  const [BulkDate, setBulkDate] = useState<string>("");
  const [SingleDate, setSingleDate] = useState<string>("");
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [doses, setDoses] = useState<IDose[]>([]);
  const [doseId, setDoseId] = useState<number>();
  const [singlePatientSchedule, setSinglePatientSchedule] =
    useState<IPSchedule>();
  // const filterDoses = (doseId: number): string | undefined => {
  //   const filteredDose: IDose | undefined = doses.find((d) => d.Id === doseId);
  //   return filteredDose?.Name;
  // };

  const updateBulkDate = (user_selected_date: string) => {
    const data_to_update = [
      {
        path: "Date",
        op: "replace",
        from: date,
        value: user_selected_date.split("T")[0],
      },
    ];

    fetch(
      `http://localhost:5041/api/PatientSchedule/patient_bulk_updateDate/${date}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_to_update),
      }
    )
      .then((res) => {
        if (res.status === 204) {
          setSuccessToast(true);
          setTimeout(() => {
            forceRender();
          }, 500);
        } else {
          setErrorToast(true);
        }
      })
      .catch((err) => setErrorToast(true));
  };
  const updateSingleDate = (user_selected_date: string) => {
    const data_to_be_sent = {
      Date: user_selected_date.split("T")[0],
      doseId: singlePatientSchedule?.DoseId,
      doctorId: singlePatientSchedule?.DoctorId,
      childId: singlePatientSchedule?.childId,
    };
    fetch(`http://localhost:5041/api/PatientSchedule/single_updateDate`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_to_be_sent),
    })
      .then((res) => {
        if (res.status === 204) {
          forceRender();
          setSuccessToast(true);
        } else {
          setErrorToast(true);
        }
      })
      .catch((err) => setErrorToast(true));
  };

  const fetchDoses = () => {
    fetch("http://localhost:5041/alldoses")
      .then((res) => res.json())
      .then((doses: IDose[]) => setDoses(doses));
  };

  useEffect(() => {
    fetchDoses();
  }, [date, data]);
  // console.log(data);
  const formatedDate = (date: string) => format(new Date(date), "MMM d, yyyy");
  return (
    <>
      <IonGrid className="md hydrated">
        <IonRow className="md hydrated">
          <IonCol style={{ textAlign: "center" }} className="md hydrated">
            {formatedDate(date)}
            <IonImg
              src={syringImage}
              onClick={() =>
                router.push(`/members/child/vaccine/${423}/bulk/${"date"}`)
              }
              style={{
                height: "15px",
                display: "inline-block",
                margin: "0px 10px",
              }}
              className="ng-star-inserted md hydrated"
            />
            <DatePicker
              selectedDate={date || BulkDate}
              onDateSelected={setBulkDate}
              iconSize="20px"
              executeFunc="BulkDate"
            />
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonCard className="md hydrated">
        <IonCardContent className="md card-content-md hydrated">
          <div className="ng-star-inserted">
            <IonItem
              lines="none"
              className="item md item-lines-none ion-focusable item-label hydrated"
            >
              <IonLabel className="sc-ion-label-md-h sc-ion-label-md-s md hydrated">
                BCG
              </IonLabel>
              <p
                style={{ color: "rgb(55, 231, 10)" }}
                className="ng-star-inserted"
              >
                <IonIcon
                  color={"primary"}
                  icon={calendar}
                  className="md ion-color ion-color-primary hydrated"
                  aria-label="calendar"
                  style={{ fontSize: "20px" }}
                />
              </p>
              <IonImg
                src={syringImage}
                onClick={() =>
                  router.push(`/members/child/vaccine/${123}/fill/${3214}`)
                }
                style={{ height: "30px" }}
                className="ng-star-inserted md hydrated"
              />
              <IonButton size="small">skip</IonButton>
            </IonItem>
          </div>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default VaccinationCard;

{
  /* <div className="ng-star-inserted">
  <IonItem
    lines="none"
    className="item md item-lines-none ion-focusable item-label hydrated"
  >
    <IonLabel className="sc-ion-label-md-h sc-ion-label-md-s md hydrated">
      Hepatitis B #1
    </IonLabel>
    <p
      style={{ color: "rgb(55, 231, 10)" }}
      className="ng-star-inserted"
    >
      <IonIcon
        color={"primary"}
        icon={calendar}
        className="md ion-color ion-color-primary hydrated"
        aria-label="calendar"
        style={{ fontSize: "20px" }}
      />
    </p>
    <IonImg
      src={syringImage}
      style={{ height: "30px" }}
      className="ng-star-inserted md hydrated"
    />
    <IonButton size="small">skip</IonButton>
  </IonItem>
</div> */
}
{
  /* <div className="ng-star-inserted">
  <IonItem
    lines="none"
    className="item md item-lines-none ion-focusable item-label hydrated"
  >
    <IonLabel className="sc-ion-label-md-h sc-ion-label-md-s md hydrated">
      OPV #1
    </IonLabel>
    <p
      style={{ color: "rgb(55, 231, 10)" }}
      className="ng-star-inserted"
    >
      <IonIcon
        color={"primary"}
        icon={calendar}
        className="md ion-color ion-color-primary hydrated"
        aria-label="calendar"
        style={{ fontSize: "20px" }}
      />
    </p>
    <IonImg
      src={syringImage}
      style={{ height: "30px" }}
      className="ng-star-inserted md hydrated"
    />
    <IonButton size="small">skip</IonButton>
  </IonItem>
</div> */
}
