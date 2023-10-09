import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
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
  MobileNumber: string;
  Email: string;
  DOB: string;
  Gender: number;
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
  //@ts-ignore
  const storedValue = JSON.parse(sessionStorage.getItem("docData"));
  const location = useLocation();
  const [patientData, setPatientData] = useState<IPatientData[]>([]);
  const [hideCards, setHideCards] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchPatientData = () => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }api/Child/children_get_by_doctor_id?doctorId=${
        storedValue.Id
      }&page=1&perPage=20`
    )
      .then((response) => response.json())
      .then((data: IPatientData[]) => {
        setPatientData(data);
        console.log(data);
        setCurrentPage(2);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMoreData = () => {
    if (hasMoreData) {
      fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/Child/children_get_by_doctor_id?doctorId=${
          storedValue.Id
        }&page=${currentPage}&perPage=20`
      )
        .then((response) => response.json())
        .then((data: IPatientData[]) => {
          if (data.length > 0) {
            setPatientData((prevData) => [...prevData, ...data]);
            setCurrentPage((prevPage) => prevPage + 1);
          } else {
            setHasMoreData(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, [location]);

  return (
    <>
      <IonPage>
        <Header pageName="Patients" />
        <IonContent className="ion-padding">
          <PatientSearch
            renderList={fetchPatientData}
            hideCards={setHideCards}
          />
          {patientData.length > 0 ? (
            patientData &&
            !hideCards &&
            patientData.map((item, index) => {
              if (item.Gender === 0) {
                return (
                  <PatientMaleCard
                    key={item.Id}
                    Name={item.Name}
                    Id={item.Id}
                    MobileNumber={item.MobileNumber}
                    Email={item.Email}
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
                  MobileNumber={item.MobileNumber}
                  Email={item.Email}
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

          <IonInfiniteScroll
            threshold="100px"
            disabled={!hasMoreData}
            onIonInfinite={(e: CustomEvent<void>) => {
              e.preventDefault();
              fetchMoreData();
              (e.target as HTMLIonInfiniteScrollElement).complete();
            }}
          >
            <IonInfiniteScrollContent loadingText="Loading more data..."></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonContent>
      </IonPage>
    </>
  );
};

export default PatientCardList;

