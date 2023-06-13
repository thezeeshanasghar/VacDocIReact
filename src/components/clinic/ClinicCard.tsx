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
}) => {
  const [offDays, setOffDays] = useState(initialOffDays);
  const [timings, setTimings] = useState(initialTimings);
  const [isOnline, setIsOnline] = useState(initialIsOnline);
  const [clinicTimings, setclinicTimings] = useState<Session[]>([]);
  const [sameClinics, setSameClinics] = useState<Session[]>([]);
  const fetchClinicTimings = async () => {
    try {
      const res = await fetch("http://localhost:5041/api/Clinictiming");
      const data: Session[] = await res.json();
      setclinicTimings(data);
      setSameClinics(clinicTimings.filter(item => item.ClinicId === Id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchClinicTimings();
  }, []);

  //time formating
  function formatedTime(timeString: string) {
    const time = new Date(`2000-01-01T${timeString}`);
    const formattedTime = format(time, "h:mm a");

    return formattedTime;
  }
  return (
    <>
      {clinicTimings && (
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{Address}</IonCardSubtitle>
            <IonCardTitle
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>{Name}</span>
              <div style={{ fontSize: "25px" }}>
                <IonIcon icon={create} color="primary" />
                <IonIcon icon={trash} color="primary" />
              </div>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
               
               <IonRow>
                {clinicTimings
                  .map((item, index) => {
                    if (item.ClinicId === Id) {
                      const count = clinicTimings.filter(i => i.ClinicId === Id);
                      return (
                        <>
                              <IonCol size="6" >
                                <p><b>On Day : </b> {item.Day}</p>
                                <p><b>Session :</b> {item.Session}</p>
                                <p><b>Start Time :</b> {formatedTime(item.StartTime)} | <b>End Time :</b> {formatedTime(item.EndTime)}</p>
                              </IonCol>
                              {count.length + 1 % 2 === 0 && <hr/>}
                        </>
                      )
                    }
                  })
                }
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
