import {
  IonCard,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { groupBy } from "lodash";
import MyDatePicker from "../../components/datepicker/MyDatePicker";
import { format } from "date-fns";
import DoctorScheduleCard from "./DoctorScheduleCard";
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
  >([]);
  const Id = 1;
  const fetchScheduleData = () => {
    fetch(`http://localhost:5041/api/DoctorSchedule/doctor_schedule/${Id}`)
      .then((res) => res.json())
      .then((data: IDoctorSchedule[]) => setScheduleData(data));
  };

  useEffect(() => {
    fetchScheduleData();
  }, [Id]);

  useEffect(() => {
    if (scheduleData) {
      const groupedD: Record<string, IDoctorSchedule[]> = groupBy(
        scheduleData,
        (item: IDoctorSchedule) => item.Date.split("T")[0]
      );
      setGroupedData(groupedD);
    }
  }, [scheduleData]);
  return (
    <>
      {scheduleData && (
        <IonPage>
          <Header pageName="Doctor Schedule" />
          <IonContent className="ion-padding">
            <>
              {Object.entries(groupedData).map(([date, data]) => (
                <DoctorScheduleCard key={date} date={date} data={data} />
              ))}
            </>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default DoctorScheduleCardList;
