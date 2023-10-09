import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import ClinicCard from "../../components/clinic/ClinicCard";
import ErrorComponent from "../Error/ErrorComponent";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
// import { useIonViewWillEnter } from "@ionic/react";

import { add } from "ionicons/icons";
interface Clinic {
  Id: number;
  Name: string;
  City: string;
  Fees: string;
  Address: string;
  Number: string;
  DoctorId: number;
  IsOnline: string;
}

const ClinicCardList: React.FC = (DoctorId, Id) => {
  //@ts-ignore
  const storedValue = JSON.parse(sessionStorage.getItem("docData"));
  const location = useLocation();
  const history = useHistory();
  const [id, setId] = useState("");
  const [doctorId, setdocorId] = useState(storedValue.Id);
  const [rerender, setRerender] = useState(false);

  const [Clinics, setClinics] = useState<Clinic[]>([]);
  const fetchClinicData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}api/Clinic`);
      const data: Clinic[] = await res.json();
      console.log(data);
      setClinics(data);
      // setRerender(!rerender);
    } catch (err) {
      console.log(err);
    }
  };

  const renderList = () => {
    setRerender((prev) => !prev);
  };
  // useEffect(() => {
  //   // Code to run once

  //   // Cleanup code (if necessary)
  //   return () => {
  //     // Cleanup logic
  //     window.location.reload();
  //   };
  // }, []);
  useEffect(() => {
    fetchClinicData();
  }, [location, rerender]);
  // useIonViewWillEnter(() => {
  //   // Fetch clinics data when the view will enter (navigated back to the component)
  //   fetchClinicData();
  // });

  return (
    <>
      {Clinics && (
        <IonPage>
          <Header pageName="Clinic" />
          <IonContent>
            {Clinics.length > 0 ? (
              Clinics.map((item, index) => {
                if (item.DoctorId === doctorId) {
                  return (
                    <React.Fragment key={index}>
                      <ClinicCard
                        Id={item.Id}
                        Name={item.Name}
                        Number={item.Number}
                        Address={item.Address}
                        DoctorId={item.DoctorId}
                        Fees={item.Fees}
                        IsOnline={item.IsOnline}
                        Renderlist={renderList}
                      />
                    </React.Fragment>
                  );
                }
              })
            ) : (
              <ErrorComponent title="Clinics" />
            )}
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
              <IonFabButton
                size="small"
                routerLink={`/members/doctor/clinic/add?doctorId=${doctorId}`}
                routerDirection="forward"
              >
                <IonIcon icon={add}></IonIcon>
              </IonFabButton>
            </IonFab>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default ClinicCardList;
