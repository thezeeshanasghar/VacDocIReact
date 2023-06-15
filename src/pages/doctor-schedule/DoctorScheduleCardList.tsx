import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { groupBy } from "lodash";
import MyDatePicker from "../../components/datepicker/MyDatePicker";
// import { format } from "date-fns";
import DoctorScheduleCard from "./DoctorScheduleCard";
import axios from "axios";
export interface IDoctorSchedule {
  Id: number;
  Date: string;
  DoseId: number;
  DoctorId: number;
}

const DoctorScheduleCardList: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<IDoctorSchedule[]>();
  const [groupedData, setGroupedData] = useState<
    Record<string, IDoctorSchedule[]>
  >({});
  const doctorId = 1;
  const fetchScheduleData = () => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }api/DoctorSchedule/doctor_schedule/${doctorId}`
    )
      .then((res) => res.json())
      .then((data: IDoctorSchedule[]) => setScheduleData(data));
  };

  useEffect(() => {
    axios
      .post(
        `${
          import.meta.env.VITE_API_URL
        }api/DoctorSchedule/doctor_post_schedule?doctorId=${doctorId}`
      )
      .then((response) => response.status === 200 && fetchScheduleData())
      .catch((err) => console.log(err));
  }, [doctorId]);

  useEffect(() => {
    if (scheduleData) {
      const groupedD: Record<string, IDoctorSchedule[]> = groupBy(
        scheduleData,
        (item: IDoctorSchedule) => item.Date.split("T")[0]
      );
      setGroupedData(groupedD);
    }
  }, [scheduleData]);

  const forceRender = () => {
    fetchScheduleData();
  };

  return (
    <>
      {scheduleData && scheduleData.length >= 1 ? (
        <>
          {scheduleData ? (
            <IonPage>
              <Header pageName="Doctor Schedule" />
              <IonContent className="ion-padding">
                <>
                  {Object.entries(groupedData).map(([date, data]) => (
                    <DoctorScheduleCard
                      key={date}
                      date={date}
                      data={data}
                      forceRender={forceRender}
                    />
                  ))}
                </>
              </IonContent>
            </IonPage>
          ) : (
            <h1>Doctor Schedule is loading...</h1>
          )}
        </>
      ) : (
        <h1>an error occurred while getting Doctor schedule</h1>
      )}
    </>
  );
};

export default DoctorScheduleCardList;
