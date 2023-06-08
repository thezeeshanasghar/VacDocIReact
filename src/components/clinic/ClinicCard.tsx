import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonBadge,
  IonIcon,
} from "@ionic/react";
import { trash, create, createOutline } from "ionicons/icons";

interface ClinicCardProps {
  initialConsultationFee?: number;
  initialOffDays?: string;
  initialTimings?: string;
  initialPatientCount?: number;
  initialIsOnline?: boolean;
}

const ClinicCard: React.FC<ClinicCardProps> = ({
  initialConsultationFee = 1500,
  initialOffDays = "Monday, Tuesday",
  initialTimings = "9:00 AM - 5:00 PM",
  initialPatientCount = 8383,
  initialIsOnline = false,
}) => {
  const [consultationFee, setConsultationFee] = useState(
    initialConsultationFee
  );
  const [offDays, setOffDays] = useState(initialOffDays);
  const [timings, setTimings] = useState(initialTimings);
  const [patientCount, setPatientCount] = useState(initialPatientCount);
  const [isOnline, setIsOnline] = useState(initialIsOnline);

  const handleUpdateConsultationFee = (value: number) => {
    setConsultationFee(value);
  };

  const handleUpdateOffDays = (value: string) => {
    setOffDays(value);
  };

  const handleUpdateTimings = (value: string) => {
    setTimings(value);
  };

  const handleUpdatePatientCount = (value: number) => {
    setPatientCount(value);
  };

  const handleUpdateIsOnline = (value: boolean) => {
    setIsOnline(value);
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>{"lahore"}</IonCardSubtitle>
        <IonCardTitle style={{display: 'flex', justifyContent: 'space-between'}}>
          <span>{"Baby Medics"}</span>
          <div style={{fontSize: '25px'}}>
            
              <IonIcon icon={create} color="primary"/>
              <IonIcon icon={trash} color="primary" />
             
          </div>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>Consultation Fee: {consultationFee}</p>
        <p>Off Days: {offDays}</p>
        <p>Timings: {timings}</p>
        <IonButton color="tertiary" fill="outline" size="small">
          Patients
          <IonBadge color="primary">{patientCount}</IonBadge>
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
  );
};

export default ClinicCard;
