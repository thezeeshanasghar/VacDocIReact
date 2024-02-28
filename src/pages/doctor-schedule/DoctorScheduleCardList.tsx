import React, { useEffect, useState } from "react";
import {
  IonButton,
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
  IonRouterLink,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { groupBy } from "lodash";
import { addCircleSharp, calendar } from "ionicons/icons";
// import { format } from "date-fns";
import MyDatePicker from "../../components/datepicker/MyDatePicker";
import DoctorScheduleCard from "./DoctorScheduleCard";
import Header from "../../components/header/Header";
import Toast from "../../components/custom-toast/Toast";
import { useHistory } from "react-router";
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
 
  const history = useHistory();
  const router = useIonRouter();
  console.log({vaccines: data})
  const handleVaccineClick = () => {
    //@ts-ignore
    localStorage.setItem("test", JSON.stringify(data))
    
    //@ts-ignore
    router.push("/members/alldosesforDoctor-defaultschedule", { state: { vaccines: data } });
  };

  const fetchDoseData = async () => {
    //@ts-ignore
    const storedValue = JSON.parse(sessionStorage.getItem("docData"));
    const DoctorId = storedValue && storedValue.Id;
    // try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }api/DoctorSchedule/Doctor_DoseSchedule_special?DoctorId=${DoctorId}`
    );
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched data:", data); // Log the fetched data

      setData(data);
      // console.log(data);
      setIsLoading(false);
    } else {
      console.log("Error fetching data");
      setIsLoading(false);
    }
  
  };

  return (
    <>
      <IonPage>
        <Header pageName="Doctor Schedule" />
        <IonContent className="ion-padding">
        
          <IonIcon color="primary" size="large" icon={addCircleSharp} onClick={handleVaccineClick} />
        
                
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
