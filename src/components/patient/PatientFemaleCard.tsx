import React, { useEffect, useState } from "react";
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
} from "@ionic/react";
import { IPatientData } from "../../pages/patient/PatientCardList";
import { create, trash, mail, call, person, calendar } from "ionicons/icons";
import femaleThumbmail from "../../assets/female.png";
import Delete from "../delete/Delete";
import { useHistory } from "react-router";
interface IFemalePatient {
  Id: number;
  Name: string;
  renderList: () => void;
  DoctorId: number;
  ClinicId: number;
  DOB: string;
}
const PatientFemaleCard: React.FC<IFemalePatient> = ({
  Name,
  Id,
  renderList, 
  DoctorId,
  DOB,
  ClinicId
}) => {
  const router = useIonRouter();
  const history = useHistory();
  const [deletePatient, setDeletePatient] = useState(false);


  const handleClick = () => {
    history.push(`/members/child/vaccine/${Id}?doctorId=${DoctorId}&DOB=${DOB}`, {
      state: { childId: Id, doctorId: DoctorId },
    });
  };
  return (
    <IonCard style={{ border: "2px solid #f50ca7" }}>
      <Delete
        url={`${import.meta.env.VITE_API_URL}api/Child/${Id}`}
        confirmAlertOpen={deletePatient}
        setConfirmAlertOpen={setDeletePatient}
        title="Patient"
        renderList={renderList}
      />
      <IonItem className="item">
        <IonThumbnail slot="start" className="avatar">
          <IonImg className="avatar-image" src={femaleThumbmail}></IonImg>
        </IonThumbnail>
        <IonLabel style={{fontSize : "18px"}} className="name">{Name}</IonLabel>
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
        <IonButton
          color="tertiary"
          fill="outline"
          size="small"
          className="action-button"
          onClick={handleClick}
        >
          Vaccine
        </IonButton>
        <IonButton
          color="tertiary"
          fill="outline"
          size="small"
          className="action-button"
        >
          Follow Up
        </IonButton>
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

export default PatientFemaleCard;
