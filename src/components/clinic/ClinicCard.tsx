import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonItemDivider,
} from "@ionic/react";
import { trash, create, createOutline } from "ionicons/icons";
import { format } from "date-fns";
import { useIonRouter } from "@ionic/react";
import Toast from "../custom-toast/Toast";
import AlertSuccess from "../Alerts/ALertSuccess";
import DeletePopup from "../deletepopup/DeletePopup";

interface Session {
  Id: number;
  Day: string;
  Session: string;
  StartTime: string;
  EndTime: string;
  ClinicId: number;
}

interface ClinicCardProps {
  initialOffDays?: string;
  initialTimings?: string;
  initialIsOnline?: boolean;
  Id: number;
  Name: string;
  Address: string;
  Number: string;
  DoctorId: number;
  Renderlist: () => void;
}

const ClinicCard: React.FC<ClinicCardProps> = ({
  initialOffDays = "Monday, Tuesday",
  initialTimings = "9:00 AM - 5:00 PM",
  initialIsOnline = false,
  Id,
  Name,
  Address,
  Number,
  DoctorId,
  Renderlist
}) => {
  const [offDays, setOffDays] = useState(initialOffDays);
  const [timings, setTimings] = useState(initialTimings);
  const [isOnline, setIsOnline] = useState(initialIsOnline);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [clinicTimings, setclinicTimings] = useState<Session[]>([]);
  const [sameClinics, setSameClinics] = useState<Session[]>([]);

  const fetchClinicTimings = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}api/Clinictiming?clinicId=${Id}`
      );
      const data: Session[] = await res.json();
      setclinicTimings(data);
      setSameClinics(clinicTimings.filter((item) => item.ClinicId === Id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchClinicTimings();
  }, []);

  // Time formatting
  function formattedTime(timeString: string) {
    const time = new Date(`2000-01-01T${timeString}`);
    const formattedTime = format(time, "h:mm a");

    return formattedTime;
  }

  const data = useIonRouter();

  const handleClick = () => {
    data.push(`/members/doctor/clinic/update/${Id}`, "forward");
  };



  return (
    <>
      <DeletePopup
        url={`${import.meta.env.VITE_API_URL}api/Clinic/${Id}`}
        title="Clinic"
        confirmAlertOpen={showPopup}
        setConfirmAlertOpen={setShowPopup}
        renderList={Renderlist}
      />
      {clinicTimings && (
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{Address}</IonCardSubtitle>
            <IonCardTitle
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>{Name}</span>
              <div style={{ fontSize: "25px" }}>
                <IonIcon icon={create} color="primary" onClick={handleClick} />
                <IonIcon icon={trash} color="primary" onClick={() => setShowPopup(true)} />
              </div>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {clinicTimings.map((item, index) => {
                  if (item.ClinicId === Id) {
                    const count = clinicTimings.filter(
                      (i) => i.ClinicId === Id
                    );
                    return (
                      <React.Fragment key={index}>
                        <IonCol size="6">
                          <p>
                            <b>On Day : </b> {item.Day}
                          </p>
                          <p>
                            <b>Session :</b> {item.Session}
                          </p>
                          <p>
                            <b>Start Time :</b> {formattedTime(item.StartTime)} |{" "}
                            <b>End Time :</b> {formattedTime(item.EndTime)}
                          </p>
                        </IonCol>
                        {count.length + (1 % 2) === 0 && <hr />}
                      </React.Fragment>
                    );
                  }
                })}
              </IonRow>
            </IonGrid>
            <IonButton color="tertiary" fill="outline" size="small">
              Patients
            </IonButton>
            <IonButton
              color="success"
              disabled={!isOnline}
              routerLink="/members/dashboard"
              size="small"
            >
              <IonIcon icon={createOutline} slot="start" />
              Online
            </IonButton>
            <br />
          </IonCardContent>
        </IonCard>
      )}
    </>
  );
};

export default ClinicCard;
