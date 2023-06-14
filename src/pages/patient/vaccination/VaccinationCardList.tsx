import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import VaccinationCard from "./VaccinationCard";
import axios from "axios";
import { groupBy } from "lodash";
interface IParam {
  location: {
    search: string;
  };
  match: {
    params: {
      Id: number;
    };
  };
}
export interface IPSchedule {
  Id: number;
  Date: string;
  DoseId: number;
  DoctorId: number;
  childId: number;
  isSkip: boolean;
  isDone: boolean;
}

const VaccinationCardList: React.FC<IParam> = ({
  location: { search },
  match: {
    params: { Id: childId },
  },
}) => {
  // extracting doctor id from query param;
//   const id = search && search.substring(1).split("=")[1];
  const [doctorId, setdoctorId] = useState(2)
  const [patientSchedule, setPatientSchedule] = useState<IPSchedule[]>([]);
  const [groupedPatientSchedule, setGroupedPatientSchedule] = useState<
    Record<string, IPSchedule[]>
  >({});
  const [patientName, setPatientName] = useState<string>();
  // initialize patient schedule
//   const initializePatientSchedule = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5041/api/PatientSchedule/doctor_post_schedule/child?doctorId=${doctorId}&childId=${+childId}`
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
  const fetchPatientScheduleData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5041/api/PatientSchedule/patient_schedule/${childId}`
      );
      setPatientSchedule(res.data);
    } catch (error) {
      console.log("error occurred while getting patient schedule", error);
    }
  };
  useEffect(() => {
    //exectution in order;
    async function executeOrderly() {
    //   await initializePatientSchedule();
      await fetchPatientScheduleData();
    }
    
        executeOrderly();
  
  }, [childId,]);

  useEffect(() => {
    if (patientSchedule) {
      const groupedD: Record<string, IPSchedule[]> = groupBy(
        patientSchedule,
        (item: IPSchedule) => item.Date.split("T")[0]
      );
      setGroupedPatientSchedule(groupedD);
    }
  }, [patientSchedule]);

  function setName(name: string) {
    setPatientName(name);
  }
  return (
    <>
      {patientSchedule && (
        <IonPage>
          <IonHeader>
            <IonToolbar color={"primary"}>
              <IonTitle>Vaccination</IonTitle>
            </IonToolbar>
            <IonToolbar style={{ padding: "0px 10px" }}>
              <IonButton size="small" slot="start">
                print
              </IonButton>
              <IonText slot="end">{patientName}</IonText>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          { patientSchedule.length >= 1 ?
              <> 
                {groupedPatientSchedule ? Object.entries(groupedPatientSchedule).map(([date, data]) => {
                  return (
                    <VaccinationCard
                      key={date}
                      date={date}
                      data={data}
                      forceRender={fetchPatientScheduleData}
                      setName={setName}
                    />
                  );
                }) : <h1>Patient schedule list is loading...</h1>}
            </>
            : <h1>patient schedule list could not Load</h1>
            }
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default VaccinationCardList;
