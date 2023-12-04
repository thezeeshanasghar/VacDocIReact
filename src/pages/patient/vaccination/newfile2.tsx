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
import { saveAs } from "file-saver";
import { groupBy } from "lodash";
import { useLocation } from "react-router";
import ErrorComponent from "../../Error/ErrorComponent";
export interface IPSchedule {
  Id: number;
  Date: string;
  DoseId: number;
  DoctorId: number;
  childId: number;
  isSkip: boolean;
  isDone: boolean;
  VaccineId: number;
}

interface IVaccine {
  Id: number;
  Name: string;
  MinAge: number;
  VaccineId: number;
}

interface IVaccineData {
  [date: string]: IVaccine[];
}

interface IParam {
  match: {
    params: {
      Id: number;
    };
  };
}
const VaccinationCardList: React.FC<IParam> = ({
  match: {
    params: { Id: childId },
  },
}) => {
  // extracting doctor id from query param;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctorId = searchParams.get("doctorId");
  const dob = searchParams.get("DOB");

  const date = dob && dob.split("T")[0];

  // const [date, time] = dob.split("T");

  const [count, setCount] = useState(1);
  // const [doctorId, setdoctorId] = useState(2)
  const [patientSchedule, setPatientSchedule] = useState<IPSchedule[]>([]);
  const [groupedPatientSchedule, setGroupedPatientSchedule] = useState<
    Record<string, IPSchedule[]>
  >({});
  const [patientName, setPatientName] = useState<string>();

  const fetchPatientScheduleData = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }api/PatientSchedule/PatientSchedule_by_childid/${childId}`
      )
      .then((res) => setPatientSchedule(res.data))
      .catch((err) => console.error(err));
  };
  // useEffect(() => {
  //   if (count === 1) {
  //     axios
  //       .post(
  //         `${
  //           import.meta.env.VITE_API_URL
  //         }api/PatientSchedule/PatientSchedule_by_childid/${childId}`
  //       )
  //       .then((res) => res.status === 200 && fetchPatientScheduleData())
  //       .catch((err) => console.log(err));
  //     setCount(2);
  //   }
  // }, [childId, doctorId]);

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
  const handleDownload = () => {
    axios({
      url: `${import.meta.env.VITE_API_URL}api/Child/pdf?childId=${childId}`, // Replace with the URL of your PDF file
      method: "GET",
      responseType: "blob", // Important! This tells axios to return a Blob object
    })
      .then((response) => {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        saveAs(pdfBlob, "downloaded.pdf"); // Specify the filename for the downloaded file
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {patientSchedule && (
        <IonPage>
          <IonHeader>
            <IonToolbar color={"primary"}>
              <IonTitle>Vaccination</IonTitle>
            </IonToolbar>
            <IonToolbar style={{ padding: "0px 10px" }}>
              <IonButton size="small" slot="start" onClick={handleDownload}>
                print
              </IonButton>
              <IonText slot="end">{patientName}</IonText>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {patientSchedule.length > 0 ? (
              <>
                {patientSchedule ? (
                  Object.entries(patientSchedule).map(([date, data]) => {
                    return (
                      <VaccinationCard
                        key={date}
                        date={date}
                        data={data}
                        forceRender={fetchPatientScheduleData}
                        setName={setName}
                      />
                    );
                  })
                ) : (
                  <h1>Patient schedule list is loading...</h1>
                )}
              </>
            ) : (
              <ErrorComponent title="Patients schedule" />
            )}
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default VaccinationCardList;
