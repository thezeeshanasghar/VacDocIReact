import { IonInputCustomEvent } from "@ionic/core";
import {
  IonCard,
  IonCardTitle,
  IonToggle,
  IonCardContent,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonInput,
  IonCardHeader,
  InputChangeEventDetail,
  IonButton,
} from "@ionic/react";
import React, { useState, useEffect } from "react";

type UpdateWeekDayCardProps = {
  name: string;
  renderFunc: () => void;
  isRendering: boolean;
  session: ISession[];
  clinicId: string;
  setSession?: React.Dispatch<React.SetStateAction<ISession[]>>;
};

export interface ISession {
  day: string;
  session: string;
  startTime: string;
  endTime: string;
  
}
interface CData {
    Id: number;
    Day: string;
    Session: string;
    StartTime: string;
    EndTime: string;
    ClinicId: number;
  }

const UpdateWeekDaysCard: React.FC<UpdateWeekDayCardProps> = ({ name, setSession,session ,clinicId, renderFunc,isRendering,}) => {
  const [showSession1, setShowSession1] = useState(false);
  const [showSession2, setShowSession2] = useState(false);
  const [clinicSession, setClinicSession] = useState("")
  const [showCard, setShowCard] = useState(false);
  const [mstart, setMStart] = useState("");
  const [mend, setMEnd] = useState("");
  const [mstart2, setMStart2] = useState("");
  const [mend2, setMEnd2] = useState("");
  const [dayData, setDayData] = useState<ISession[]>([]);
  const [clinicArray,setClinicArray]= useState([]);
// console.log("session data",session)
// const {Id, Day} = session && session[0];
// console.log(clinicId)
  useEffect(() => {
    if (showCard && showSession1 && mstart !== "" && mend !== "") {
      const existingIndex = dayData.findIndex(
        (entry) => entry.day === name && entry.session === "Morning"
      );

      if (existingIndex !== -1) {
        const updatedDayData = [...dayData];
        updatedDayData[existingIndex].startTime = mstart;
        updatedDayData[existingIndex].endTime = mend;
        setDayData(updatedDayData);
      } else {
        setDayData((prevDayData) => [
          ...prevDayData,
          {
            day: name,
            session: "Morning",
            startTime: mstart,
            endTime: mend,
            
          },
        ]);
      }
    }
  },[showCard, showSession1, mstart, mend, name, ]);

  useEffect(() => {
    if (showCard && showSession2 && mstart2 !== "" && mend2 !== "") {
      const existingIndex = dayData.findIndex(
        (entry) => entry.day === name && entry.session === "Evening"
      );
  
      if (existingIndex !== -1) {
        const updatedDayData = [...dayData];
        updatedDayData[existingIndex].startTime = mstart2;
        updatedDayData[existingIndex].endTime = mend2;
        setDayData(updatedDayData);
      } else {
        setDayData((prevDayData) => [
          ...prevDayData,
          {
            day: name,
            session: "Evening",
            startTime: mstart2,
            endTime: mend2,
          },
        ]);
      }
    }
  },[showCard, showSession2, mstart2, mend2, name]);
  // const doRender = () => setRerender(!rerender);

  useEffect(() => {
    dayData.length >= 1 && localStorage.setItem(name, JSON.stringify(dayData));
  },[dayData]);
  useEffect(() => {
    setShowCard(false);
    setShowSession1(false);
    setShowSession2(false);
    setMStart("");
    setMEnd("");
    setMStart2("");
    setMEnd2("");
    fetch(`${import.meta.env.VITE_API_URL}api/ClinicTiming/GET-ClinicTiming/${clinicId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const morningData = data.find(
            (entry: { Session: string; Day: string; }) => entry.Session === "Morning" && entry.Day === name
          );
          const eveningData = data.find(
            (entry: { Session: string; Day: string; }) => entry.Session === "Evening" && entry.Day === name
          );
  
          setShowCard(!!morningData || !!eveningData);
          setShowSession1(!!morningData);
          setShowSession2(!!eveningData);
          setMStart(morningData ? morningData.StartTime : null);
          setMEnd(morningData ? morningData.EndTime : null);
          setMStart2(eveningData ? eveningData.StartTime : null);
          setMEnd2(eveningData ? eveningData.EndTime : null);
        } 
      })
      .catch((error) => {
        console.error("Error fetching clinic timing:", error);
      });
  }, []);

  const ApplyTimingToAll = () => {
    if (name === "Monday") {
      const otherWeekdays = ["Tuesday", "Wednesday", "Thursday", "Friday"];

      // const otherWeekdaysNotInLocalStorage = otherWeekdays.every((weekday) => {
      //   return localStorage.getItem(weekday) === null;
      // });

      // if (otherWeekdaysNotInLocalStorage) {
      const daysToStore = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ];
      // dayData.length >= 1 &&
      daysToStore.forEach((day, index) => {
        const lastIndex = index === daysToStore.length - 1;
        localStorage.setItem(day, JSON.stringify(dayData));

        // if (lastIndex) {
        //   //@ts-ignore
        //   let count = JSON.parse(localStorage.getItem("count")) || null;
        //   if (count === 0 || count === null) {
        //     renderFunc();
        //     // window.location.reload();
        //   }
        // }
      });
      // localStorage.setItem("count", JSON.stringify(0));
      renderFunc();
      // }
    }
  };
  

  const handleToggleSession1 = (e: {
    detail: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowSession1(e.detail.checked);
  };

  const handleToggleSession2 = (e: {
    detail: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowSession2(e.detail.checked);
  };

  const handleToggleCard = (e: {
    detail: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowCard(e.detail.checked);
  };

  const handleTimeChange = (
    e: IonInputCustomEvent<InputChangeEventDetail>,
    input: string
  ) => {
    const { value } = e.target;
    if (input === "start") {
      //@ts-ignore
      setMStart(value);
    } else if (input === "end") {
      //@ts-ignore
      setMEnd(value);
    } else if (input === "start2") {
      //@ts-ignore
      setMStart2(value);
    } else if (input === "end2") {
      //@ts-ignore
      setMEnd2(value);
    }
  };
// console.log(showCard,showSession1,showSession2)
  return (
    
    <IonCard style={{ width: "100%" }}>
      <IonCardHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
            
          <IonCardTitle>{name}</IonCardTitle>
          <IonToggle 
          checked={showCard} 
          onIonChange={handleToggleCard}
          />
        </div>
      </IonCardHeader>
      
      {showCard && (
        
        <IonCardContent>
          <IonItem lines="none">
            <IonLabel>Session: 1</IonLabel>
            <IonToggle
              checked={showSession1}
              onIonChange={handleToggleSession1}
            />
          </IonItem>

          {showSession1 && (
            
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Start Time</IonLabel>
                  <IonInput
                    type="time"
                    value={mstart}
                    onIonChange={(e) => handleTimeChange(e, "start")}
                  />
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel>End Time</IonLabel>
                  <IonInput
                    type="time"
                    value={mend}
                    onIonChange={(e) => handleTimeChange(e, "end")}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
          )}

          <IonItem lines="none">
            <IonLabel>Session: 2</IonLabel>
            <IonToggle
              checked={showSession2}
              onIonChange={handleToggleSession2}
            />
          </IonItem>

          {showSession2 && (
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Start Time</IonLabel>
                  <IonInput
                    type="time"
                    value={mstart2}
                    onIonChange={(e) => handleTimeChange(e, "start2")}
                  />
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel>End Time</IonLabel>
                  <IonInput
                    type="time"
                    value={mend2}
                    onIonChange={(e) => handleTimeChange(e, "end2")}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
          )}
        </IonCardContent>
      )}
        <div
        style={{
          textAlign: "center",
          display: name === "Monday" ? "block" : "none",
        }}
      >
        <IonButton
          size="small"
          style={{
            textTransform: "capitalize",
            display:
              (showCard && showSession1) || showSession2 ? "block" : "none",
          }}
          onClick={ApplyTimingToAll}
        >
          Apply to all
        </IonButton>
      </div>
    </IonCard>
  );
};

export default UpdateWeekDaysCard;