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
import { format } from "date-fns";
import MyDatePicker from "../../components/datepicker/MyDatePicker";
import DoctorScheduleCard from './DoctorScheduleCard';
interface IVaccine {
  
  Id: number;
  Name: string;
  MinAge: number;
  VaccineId: number;
 
}

interface IVaccineData {
  [date: string]: IVaccine[];
}


const ScheduleList1: React.FC = () => {
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
  }, []);

  const fetchDoseData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/AdminSchedule/new`
      );
      if (response.ok) {
        const data = await response.json();

        setData(data);
        console.log(data);
        setIsLoading(false);
      } else {
        console.log("Error fetching data");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
    }
  };

  const handelonmouseover = (inputValue: string) => {
    const data1 = inputValue.split("T");
    const data2 = format(new Date(inputValue), "yyyy-MM-dd");
    setValue(data2);
    setSelectedDate(data2);
  };

  const handleDateChange = async (
    event: CustomEvent,
    key: string,
    inputValue: string
  ) => {
    console.log(value);
    closePopover();
    const data = event.detail.value;
    const data1 = data.split("T");
    const data2 = data1[0];
    console.log(data2);

    console.log(event.detail.value);

    const dataTobeSent = [
      {
        path: "Date",
        op: "replace",
        from: value,
        value: data2,
      },
    ];

    console.log("object item date : ", dataTobeSent);
    try {
      setShowLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/AdminSchedule/Admin_bulk_updateDate/${value}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataTobeSent),
        }
      );
      if (response.status === 204) {
        console.log(response.ok);
        setSuccess(true);
        setShowLoading(false);
        forceRender();
      } else if (!response.ok) {
        setError(true);
        setShowLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setShowLoading(false);
    }
  };

  const openPopover = () => {
    setShowPopover(true);
  };

  const closePopover = () => {
    setShowPopover(false);
  };

 
  return (
    <>
    <IonPage>
        <IonContent className="ion-padding">
          {Object.keys(data).map((date) => (
            <IonCard key={date}>
              <>
                <IonItem lines="none" className="centered-item">
                  <IonLabel style={{ textAlign: "center" }}>
                    <IonItem lines="none" slot="center" style={{ textAlign: "center", padding: 0 }}>
                      <IonIcon
                        color="primary"
                        onClick={() => setShowPopover(true)}
                        icon={calendar}
                        style={{ marginRight: "10px", PointerEvent: "cursor" }}
                        onMouseOver={() => handelonmouseover(date)}
                      />
                      <IonText>{format(new Date(date), "yyyy-MM-dd")}</IonText>
                      <IonPopover isOpen={showPopover} onDidDismiss={closePopover}>
                        <IonDatetime
                          placeholder="Select Date"
                          value={selectedDate || undefined}
                          onIonChange={(e) => handleDateChange(e, date, inputValue)}
                        ></IonDatetime>
                      </IonPopover>
                    </IonItem>
                  </IonLabel>
                </IonItem>
                {data[date].map((item: IVaccine) => (
  <DoctorScheduleCard
    key={item.Id}
    date={date}
    Id={item.Id}
    Name={item.Name}
    MinAge={item.MinAge}
    VaccineId={item.VaccineId}
    
    renderList={forceRender}
  />
))}
              </>
            </IonCard>
          ))}
        </IonContent>
      </IonPage>
    </>
  );
};

export default ScheduleList1;
