import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonPopover,
  IonRow,
  IonText,
} from "@ionic/react";
import { groupBy } from "lodash";
import { calendar } from "ionicons/icons";
// import { format } from "date-fns";
import MyDatePicker from "../../components/datepicker/MyDatePicker";
import DoctorScheduleCard from "./DoctorScheduleCard";
import Header from "../../components/header/Header";
import Toast from "../../components/custom-toast/Toast";
interface IVaccine {
  Id: number;
  Name: string;
  MinAge: number;
  VaccineId: number;
}

interface IVaccineData {
  [date: string]: IVaccine[];
}

const DoctorScheduleCardList: React.FC = () => {
  const [data, setData] = useState<IVaccine[]>([]);
  const [groupedData, setGroupedData] = useState<IVaccineData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [renderList, setRenderList] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const forceRender = () => {
    fetchDoseData();
  };

  useEffect(() => {
    fetchDoseData();
    // window.location.reload();
  }, []);

  const fetchDoseData = async () => {
    //@ts-ignore
    const storedValue = JSON.parse(sessionStorage.getItem("docData"));
    const DoctorId = storedValue && storedValue.Id;
    // try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }api/DoctorSchedule/Doctor_DoseSchedule?doctorId=${DoctorId}`
    );
    console.log(response);
    if (response.ok) {
      const data = await response.json();

      setData(data);
      // console.log(data);
      setIsLoading(false);
    } else {
      console.log("Error fetching data");
      setIsLoading(false);
    }
    // } catch (error) {
    //   console.log("Error:", error);
    //   setIsLoading(false);
    // }
  };

  return (
    <>
      <IonPage>
        <Header pageName="Doctor Schedule" />
        <IonContent className="ion-padding">
          {Object.keys(data).map((date) => (
            <DoctorScheduleCard
            //@ts-ignore
              key={data[date].Id}
              scheduleKey={date}
              date={date}
              //@ts-ignore
              data={data[date]}
              renderList={forceRender}
            />
          ))}
        </IonContent>
      </IonPage>
    </>
  );
};

export default DoctorScheduleCardList;
