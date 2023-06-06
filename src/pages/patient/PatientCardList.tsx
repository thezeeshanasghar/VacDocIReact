import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "../../components/header/Header";
import PatientSearch from "../../components/patient/PatientSearch";
import PatientCard from "../../components/patient/PatientMaleCard";
import PatientMaleCard from "../../components/patient/PatientMaleCard";
import PatientFemaleCard from "../../components/patient/PatientFemaleCard";

const PatientCardList: React.FC = () => {
  return (
    <IonPage>
      <Header pageName="Patients" />
      <IonContent className="ion-padding">
        {/* patient component to render patient data */}
        <PatientSearch data={[]} />

        {/* list of patient cards to be rendered. */}
        {Array.from({ length: 12 }).flatMap((item, index) => {
          return (
            <React.Fragment key={index}>
              {index % 2 === 0 ? <PatientMaleCard /> : <PatientFemaleCard />}
            </React.Fragment>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default PatientCardList;
