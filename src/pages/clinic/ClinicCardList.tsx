import { IonContent, IonFab, IonFabButton, IonIcon, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import ClinicCard from "../../components/clinic/ClinicCard";
import ErrorComponent from "../Error/ErrorComponent";
import { useLocation } from "react-router";

import { add } from "ionicons/icons";
interface Clinic {
  Id: number;
  Name: string;
  Address: string;
  Number: string;
  DoctorId: number;
}
const ClinicCardList: React.FC = () => {
  const location = useLocation();
  const [doctorId, setdocorId] = useState(1);
  const [Clinics, setClinics] = useState<Clinic[]>([]);
  const fetchClinicData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}api/Clinic`);
      const data: Clinic[] = await res.json();
      setClinics(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchClinicData();
  }, [location]);
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
                      />
                    </React.Fragment>
                  );
                }
              })
            ) : (
              <ErrorComponent title="Vaccines" />
            )}
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
              <IonFabButton
                size="small"
                routerLink="/members/doctor/clinic/add"
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
