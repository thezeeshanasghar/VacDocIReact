import {
  IonContent,
  IonPage,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import ClinicCard from "../../components/clinic/ClinicCard";
interface Clinic {
  Id: number;
  Name: string;
  Address: string;
  Number: string;
  DoctorId: number;
}
const ClinicCardList: React.FC = () => {
  const [doctorId, setdocorId] = useState(2);
  const [Clinics, setClinics] = useState<Clinic[]>([]);
  const fetchClinicData = async () => {
    try {
      const res = await fetch("http://localhost:5041/api/Clinic");
      const data: Clinic[] = await res.json();
      setClinics(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchClinicData();
  }, []);
  return (
    <>
      {Clinics && (
        <IonPage>
          <Header pageName="Clinic" />
          <IonContent>
            {Clinics.map((item, index) => {
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
            })}
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default ClinicCardList;
