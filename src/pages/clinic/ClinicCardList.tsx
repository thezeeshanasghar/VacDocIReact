import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import Header from "../../components/header/Header";
import ClinicCard from "../../components/clinic/ClinicCard";

const ClinicCardList: React.FC = () => {
  return (
    <IonPage>
      <Header pageName="Clinic" />
      <IonContent>
      {Array.from({length: 3}).flatMap((item, index) => (
                <React.Fragment key={index}>
                    <ClinicCard/>
                </React.Fragment>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default ClinicCardList;
