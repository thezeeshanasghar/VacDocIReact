import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonPage,
  IonRow,
  IonThumbnail,
  useIonRouter,
} from "@ionic/react";
import { format } from "date-fns";
import {
  person,
  mail,
  calendar,
  personCircle,
  location,
  documentText,
  time,
  call,
  create,
  trash,
} from "ionicons/icons";
import thumbnail from "../../assets/male.png";
import Header from "../../components/header/Header";

const ChildCard: React.FC = () => {
  const dummyData = {
    name: "Child 1",
    guardian: "Child Uncle",
    fatherName: "Father",
    email: "abc@gmail.com",
    dob: "2023-06-22T20:48:51",
    type: "Special",
    city: "Islamabad",
    cnic: "12312",
    preferredSchedule: "Evening",
  };

  const formattedDob = format(new Date(dummyData.dob), "dd MMMM yyyy");
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent>
        <Header pageName="Patients" />
        <IonCard style={{border: '2px solid blue'}}>
          <IonCardHeader style={{ textAlign: "center" }}>
            <IonItem lines="none">
              <IonItem slot="start">
                <IonThumbnail style={{ marginRight: "3rem" }}>
                  <img src={thumbnail} alt="Thumbnail" />
                </IonThumbnail>
                <IonCardTitle>{dummyData.name}</IonCardTitle>
              </IonItem>
              <IonItem slot="end" lines="none">
                <IonIcon
                  className="iconchild"
                  color="primary"
                  icon={create}
                  onClick={() =>
                    router.push(`/members/child/edit/${0}`, "forward")
                  }
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
            </IonItem>
            <IonCardSubtitle>Guardian: {dummyData.guardian}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <p
                    style={{
                      borderBottom: "3px solid rgba(0, 0, 0, 0.1)",
                      paddingBottom: "9px",
                    }}
                  >
                    <IonIcon
                      icon={person}
                      style={{ marginRight: "8px" }}
                    ></IonIcon>
                    {dummyData.fatherName}
                  </p>
                </IonCol>
                <IonCol>
                  <p
                    style={{
                      borderBottom: "3px solid rgba(0, 0, 0, 0.1)",
                      paddingBottom: "9px",
                    }}
                  >
                    <IonIcon
                      icon={mail}
                      style={{ marginRight: "8px" }}
                    ></IonIcon>
                    {dummyData.email}
                  </p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <p
                    style={{
                      borderBottom: "3px solid rgba(0, 0, 0, 0.1)",
                      paddingBottom: "9px",
                    }}
                  >
                    <IonIcon
                      icon={calendar}
                      style={{ marginRight: "8px" }}
                    ></IonIcon>
                    {formattedDob}
                  </p>
                </IonCol>
                <IonCol>
                  <p
                    style={{
                      borderBottom: "3px solid rgba(0, 0, 0, 0.1)",
                      paddingBottom: "9px",
                    }}
                  >
                    <IonIcon
                      icon={personCircle}
                      style={{ marginRight: "8px" }}
                    ></IonIcon>
                    {dummyData.type}
                  </p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <p
                    style={{
                      borderBottom: "3px solid rgba(0, 0, 0, 0.1)",
                      paddingBottom: "9px",
                    }}
                  >
                    <IonIcon
                      icon={location}
                      style={{ marginRight: "8px" }}
                    ></IonIcon>
                    {dummyData.city}
                  </p>
                </IonCol>
                <IonCol>
                  <p
                    style={{
                      borderBottom: "3px solid rgba(0, 0, 0, 0.1)",
                      paddingBottom: "9px",
                    }}
                  >
                    <IonIcon
                      icon={documentText}
                      style={{ marginRight: "8px" }}
                    ></IonIcon>
                    {dummyData.cnic}
                  </p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <p
                    style={{
                      borderBottom: "3px solid rgba(0, 0, 0, 0.1)",
                      paddingBottom: "9px",
                    }}
                  >
                    <IonIcon
                      icon={time}
                      style={{ marginRight: "8px" }}
                    ></IonIcon>
                    {dummyData.preferredSchedule}
                  </p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ChildCard;
