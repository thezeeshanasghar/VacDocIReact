import React from "react";
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
type PatientFemaleType = Pick<IPatientData, 'Name' | 'Guardian' | 'DOB'>;
const PatientFemaleCard : React.FC<PatientFemaleType> = ({Name, DOB,Guardian}) => {
  const router = useIonRouter();
  return (
    <IonCard style={{ border: "2px solid #f50ca7" }}>
      <IonItem className="item">
        <IonThumbnail slot="start" className="avatar">
          <IonImg className="avatar-image" src={femaleThumbmail}></IonImg>
        </IonThumbnail>
        <IonLabel className="name">{Name}</IonLabel>
      </IonItem>
      <IonItem className="ion-justify-content-center">
        <IonIcon
          className="iconchild"
          color="primary"
          icon={create}
          onClick={() => router.push(`/members/child/edit/${1}`, "forward")}
          slot="start"
          tabIndex={0}
          aria-label="create"
          style={{ marginRight: "50px" }}
        ></IonIcon>
        <IonIcon
          className="iconchild"
          color="primary"
          icon={trash}
          slot="start"
          role="img"
          aria-label="trash"
          style={{ marginRight: "50px" }}
        ></IonIcon>
        <IonIcon
          className="iconchild"
          color="primary"
          icon={mail}
          slot="start"
          tabIndex={0}
          aria-label="mail"
          style={{ marginRight: "60px" }}
        ></IonIcon>
        <IonIcon
          className="iconchild"
          color="primary"
          icon={call}
          slot="start"
          role="img"
          aria-label="call"
        ></IonIcon>
      </IonItem>
      <IonCardContent>
        <IonIcon
          color="primary"
          icon={person}
          role="img"
          className="icon"
          aria-label="person"
        ></IonIcon>
        &nbsp;{Guardian} &nbsp;
        <IonIcon
          color="primary"
          icon={calendar}
          role="img"
          className="icon"
          aria-label="calendar"
        ></IonIcon>
        &nbsp;{DOB} &nbsp;
        <IonIcon
          color="primary"
          icon={call}
          role="img"
          className="icon"
          aria-label="call"
        ></IonIcon>
        &nbsp;3335408191 &nbsp;
        <br />
        <IonButton
          color="tertiary"
          fill="outline"
          size="small"
          className="action-button"
          routerLink="/members/child/vaccine/9011"
          routerDirection="forward"
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
