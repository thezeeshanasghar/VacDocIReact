import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import PatientSearch from "../../components/patient/PatientSearch";
import PatientMaleCard from "../../components/patient/PatientMaleCard";
import PatientFemaleCard from "../../components/patient/PatientFemaleCard";
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
  const [patientData, setPatientData] = useState<IPatientData[]>([]);
  const [hideCards, setHideCards] = useState(false);
  const fetchPatientData = () => {
    fetch(`${import.meta.env.VITE_API_URL}patients?doctorId=${1}`)
      .then((response) => response.json())
      .then((data: IPatientData[]) => setPatientData(data))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPatientData();
  }, []);
  return (
    <>
      {patientData.length >= 1 ? (
        <IonPage>
          <Header pageName="Patients" />
          <IonContent className="ion-padding">
            {/* patient component to render patient data */}
            <PatientSearch data={patientData} hideCards={setHideCards} />
            {/* list of patient cards to be rendered. */}
            {patientData &&
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
                  />
                );
              })}
          </IonContent>
        </IonPage>
      ) : (
        <h1>Patients list could not load</h1>
      )}
    </>
  );
};

export default PatientCardList;
