import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { groupBy } from "lodash";
import MyDatePicker from "../../components/datepicker/MyDatePicker";
// import { format } from "date-fns";
import DoctorScheduleCard from "./DoctorScheduleCard";
import axios from "axios";
import ErrorComponent from "../Error/ErrorComponent";
export interface IDoctorSchedule {
  Id: number;
  Date: string;
  DoseId: number;
  DoctorId: number;
}
interface IVaccine {
  Id: number;
  Name: string;
  MinAge: number;
  VaccineId: number;
}


const DoctorScheduleCardList: React.FC = () => {
  const storedValue = JSON.parse(sessionStorage.getItem("docData"));
  console.log(storedValue);
  const [scheduleData, setScheduleData] = useState<IDoctorSchedule[]>();
  const [groupedData, setGroupedData] = useState<
    Record<string, IDoctorSchedule[]>
  >({});
  const [count, setCount] = useState(1);
  const [doctorId, setdoctorId] = useState(1);
  const fetchScheduleData = () => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }api/DoctorSchedule/new?doctorId=${storedValue.Id}`
    )
      .then((res) => res.json())
      .then((data: IDoctorSchedule[]) => {setScheduleData(data)
      console.log('new data ', data)
      });
  };

  useEffect(() => {
    if (count === 1) {
      axios
        .post(
          `${
            import.meta.env.VITE_API_URL
          }api/DoctorSchedule/doctor_post_schedule?doctorId=${storedValue.Id}`
        )
        .then(res => res.status === 200 && fetchScheduleData())
        .catch((err) => console.log(err));
        console.log("use effect : ", count)
        setCount(2)
    }
    // fetchScheduleData();
  }, []);

  useEffect(() => {
    if (scheduleData) {
      // const groupedD: Record<string, IDoctorSchedule[]> = groupBy(
      //   scheduleData,
      //   (item: IDoctorSchedule) => item.Date.split("T")[0]
      // );
      // setGroupedData(groupedD);
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
                  {Object.length>0?(Object.entries(scheduleData).map(([date, data]) => (
                    <DoctorScheduleCard
                      key={date}
                      date={date}
                      data={data}
                      forceRender={forceRender}
                    />
                  ))):(
                    <ErrorComponent title="Doctor schedule" />
                  )}
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
