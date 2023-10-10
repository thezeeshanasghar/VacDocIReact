import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonIcon,
  IonButton,
  IonImg,
  IonLabel,
  IonThumbnail,
  useIonRouter,
  IonText,
} from "@ionic/react";
import { create, trash, mail, call, person, calendar } from "ionicons/icons";
import maleThumbmail from "../../assets/male.png";
import { IPatientData } from "../../pages/patient/PatientCardList";
import Delete from "../delete/Delete";
import { useHistory } from "react-router";
interface IMalePatient {
  Id: number;
  Name: string;
  MobileNumber: string;
  Email: string;
  renderList: () => void;
  DoctorId: number;
  ClinicId: number;
  DOB: String;
}
const PatientMaleCard: React.FC<IMalePatient> = ({
  Name,
  Id,
  MobileNumber,
  Email,
  renderList,
  DoctorId,
  ClinicId,
  DOB,
}) => {
  const router = useIonRouter();
  const history = useHistory();
  const [deletePatient, setDeletePatient] = useState(false);

  const handleClick = () => {
    history.push(
      `/members/child/vaccine/${Id}?DOB=${DOB}&doctorId=${DoctorId}`,
      {
        state: { childId: Id, doctorId: DoctorId },
      }
    );
  };
  return (
    <IonCard style={{ border: "2px solid blue" }}>
      <Delete
        url={`${import.meta.env.VITE_API_URL}api/Child/${Id}`}
        confirmAlertOpen={deletePatient}
        setConfirmAlertOpen={setDeletePatient}
        title="Patient"
        renderList={renderList}
      />
      <IonItem className="item">
        <IonThumbnail slot="start" className="avatar">
          <IonImg className="avatar-image" src={maleThumbmail}></IonImg>
        </IonThumbnail>
        <IonLabel style={{ fontSize: "18px" }} className="name">
          {Name}
        </IonLabel>
      </IonItem>
      <IonItem className="ion-justify-content-center">
        <IonIcon
          className="iconchild"
          color="primary"
          icon={create}
          onClick={() => router.push(`/members/child/edit/${Id}`, "forward")}
          slot="start"
          tabIndex={0}
          aria-label="create"
        ></IonIcon>
        <IonIcon
          className="iconchild"
          color="primary"
          icon={trash}
          slot="start"
          role="img"
          aria-label="trash"
          onClick={() => setDeletePatient(true)}
        ></IonIcon>
      </IonItem>
      <IonCardContent>
        
          <div style={{display:  'flex', marginBottom: "1rem" }}>
            <div style={{display: 'flex', gap: '.3rem', marginRight: '1rem'}}>
              <IonIcon icon={call} color="primary" size="small"></IonIcon>
              <IonText style={{ fontSize: "12px" }}>{MobileNumber}</IonText>
            </div>
            <div style={{display: 'flex', gap: '.3rem'}}>
              <IonIcon icon={mail} color="primary" size="small"></IonIcon>
              <IonText style={{ fontSize: "12px" }}>{Email}</IonText>
            </div>
          </div>
        <IonButton
          color="tertiary"
          fill="outline"
          size="small"
          className="action-button"
          onClick={handleClick}
          id="male"
        >
          Vaccine
        </IonButton>
        {/* <IonButton
          color="tertiary"
          fill="outline"
          size="small"
          className="action-button"
        >
          Follow Up
        </IonButton> */}
        <IonButton
          color="tertiary"
          disabled
          fill="outline"
          size="small"
          className="action-button"
        >
          Invoice
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default PatientMaleCard;
