import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import PatientSearch from "../../components/patient/PatientSearch";
import PatientMaleCard from "../../components/patient/PatientMaleCard";
import PatientFemaleCard from "../../components/patient/PatientFemaleCard";
import ErrorComponent from "../Error/ErrorComponent";
import { useLocation } from "react-router";
import { add } from "ionicons/icons";
export interface IPatientData {
  Id: number;
  Name: string;
  Guardian: string;
  FatherName: string;
  Email: string;
  DOB: string;
  Gender: string;
  Type: string;
  City: string;
  CNIC: string;
  PreferredSchedule: string;
  IsEPIDone: boolean;
  IsVerified: boolean;
  IsInactive: boolean;
  ClinicId: number;
  DoctorId: number;
}

const PatientCardList: React.FC = () => {
  const storedValue = JSON.parse(sessionStorage.getItem("docData"));
    console.log(storedValue);
  const location = useLocation();
  const [patientData, setPatientData] = useState<IPatientData[]>([]);
  const [hideCards, setHideCards] = useState(false);
  const fetchPatientData = () => {
    fetch(`${import.meta.env.VITE_API_URL}patients?doctorId=${storedValue.Id}`)
      .then((response) => response.json())
      .then((data: IPatientData[]) => setPatientData(data))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPatientData();
  }, [location]);
  return (
    <>
      <IonPage>
        <Header pageName="Patients" />
        <IonContent className="ion-padding">
          {/* patient component to render patient data */}
          <PatientSearch
            renderList={fetchPatientData}
            hideCards={setHideCards}
          />
          {/* list of patient cards to be rendered. */}
          {patientData.length > 0 ? (
            patientData &&
            !hideCards &&
            patientData.map((item, index) => {
              if (item.Gender.includes("boy" || "male")) {
                return (
                  <PatientMaleCard
                    key={index * 3 * 2}
                    Name={item.Name}
                    Id={item.Id}
                    renderList={fetchPatientData}
                    DoctorId={item.DoctorId}
                    ClinicId={item.ClinicId}
                    DOB={item.DOB}
                  />
                );
              }
              return (
                <PatientFemaleCard
                  key={index * 3}
                  Name={item.Name}
                  Id={item.Id}
                  renderList={fetchPatientData}
                  DoctorId={item.DoctorId}
                  ClinicId={item.ClinicId}
                  DOB={item.DOB}
                />
              );
            })
          ) : (
            <ErrorComponent title="Patients list" />
          )}

          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton
              size="small"
              routerLink="/members/child/add"
              routerDirection="forward"
            >
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    </>
  );
};

export default PatientCardList;
