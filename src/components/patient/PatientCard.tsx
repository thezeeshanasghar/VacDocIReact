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
import { create, trash, mail, call, person, calendar } from "ionicons/icons";
import maleThumbmail from "../../assets/male.png";
const PatientCard = () => {
  const router = useIonRouter();
  return (
    <IonCard className="girl">
      <IonItem className="item">
        <IonThumbnail slot="start" className="avatar">
          <IonImg className="avatar-image" src={maleThumbmail}></IonImg>
        </IonThumbnail>
        <IonLabel className="name">Umar</IonLabel>
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
        ></IonIcon>
        <IonIcon
          className="iconchild"
          color="primary"
          icon={trash}
          slot="start"
          role="img"
          aria-label="trash"
        ></IonIcon>
        <IonIcon
          className="iconchild"
          color="primary"
          icon={mail}
          slot="start"
          tabIndex={0}
          aria-label="mail"
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
        Umar Fayaz &nbsp;
        <IonIcon
          color="primary"
          icon={calendar}
          role="img"
          className="icon"
          aria-label="calendar"
        ></IonIcon>
        09-05-2023 &nbsp;
        <IonIcon
          color="primary"
          icon={call}
          role="img"
          className="icon"
          aria-label="call"
        ></IonIcon>
        3335408191 &nbsp;
        <br />
        <IonButton
          color="tertiary"
          fill="outline"
          size="small"
          className="action-button"
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

export default PatientCard;
