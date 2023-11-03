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
  useIonRouter,
  IonButton,
} from "@ionic/react";
import React, { useState, useEffect } from "react";

type WeekDayCardProps = {
  name: string;
  id: string;
  renderFunc: () => void;
  isRendering: boolean;
};

export interface ISession {
  day: string;
  session: string;
  startTime: string;
  endTime: string;
}

interface SessionData {
  day: string;
  session: "Morning" | "Evening";
  startTime: string;
  endTime: string;
}

const WeekDaysCard: React.FC<WeekDayCardProps> = ({
  name,
  renderFunc,
  isRendering,
}) => {
  const [showSession1, setShowSession1] = useState(false);
  const [showSession2, setShowSession2] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [mstart, setMStart] = useState("");
  const [mend, setMEnd] = useState("");
  const [mstart2, setMStart2] = useState("");
  const [mend2, setMEnd2] = useState("");
  const [dayData, setDayData] = useState<ISession[]>([]);
  const [clickRender, setClickRender] = useState(0);
  useEffect(() => {
    const storageData: SessionData[] | null = JSON.parse(
      localStorage.getItem(name) || "null"
    );

    if (storageData) {
      const morningSessions = storageData.filter(
        (session) => session.session === "Morning"
      );
      const eveningSessions = storageData.filter(
        (session) => session.session === "Evening"
      );

      if (morningSessions.length > 0) {
        const firstMorningSession = morningSessions[0];
        const { startTime, endTime } = firstMorningSession;
        setMStart(startTime);
        setMEnd(endTime);
        setShowSession1(true);
        setShowCard(true);
        console.log("Morning session data:", firstMorningSession);
      } else {
        console.log("No Morning sessions found.");
      }

      if (eveningSessions.length > 0) {
        const firstEveningSession = eveningSessions[0];
        const { startTime, endTime } = firstEveningSession;
        setMStart2(startTime);
        setMEnd2(endTime);
        setShowSession2(true);
        setShowCard(true);
        console.log("Evening session data:", firstEveningSession);
      } else {
        console.log("No Evening sessions found.");
      }
    } else {
      console.log("No data found in localStorage for", name);
    }
  }, [isRendering]);

  const removeDatabyToggle = () => {
    if (!showCard) {
      localStorage.removeItem(name);
      setMStart("");
      setMEnd("");
      setMStart2("");
      setMEnd2("");
      setShowSession1(false)
      setShowSession2(false)
    }
    if (!showSession1) {
      setMStart("");
      setMEnd("");
      //@ts-ignore
      let LocalData = dayData;
      if (LocalData && LocalData.length < 2) {
        localStorage.removeItem(name);
      }
      if (LocalData && LocalData.length > 1) {
        let newData = [LocalData[1]];
        setDayData(newData);
      }
    }
    if (!showSession2) {
      setMStart2("");
      setMEnd2("");
      //@ts-ignore
      let LocalData = dayData;
      if (LocalData && LocalData.length < 2) {
        localStorage.removeItem(name);
      }
      if (LocalData && LocalData.length > 1) {
        //@ts-ignore
        let newData = [LocalData[0]];
        setDayData(newData);
      }
    }
  };

  const removeAllData = () => {
    if (!showSession1 || showSession1) {
      setMStart("");
      setMEnd("");
      setShowSession1(false);
    }
    if (!showSession2 || showSession2) {
      setMStart2("");
      setMEnd2("");
      setShowSession2(false);
    }
    if (!showCard || showCard) {
      setShowCard(false);
    }
  };

  useEffect(() => {
    removeDatabyToggle();
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
  }, [showCard, showSession1, mstart, mend, name]);

  useEffect(() => {
    removeDatabyToggle();
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
  }, [showCard, showSession2, mstart2, mend2, name]);

  useEffect(() => {
    dayData.length >= 1 && localStorage.setItem(name, JSON.stringify(dayData));
  }, [dayData]);

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
        "Saturday",
        "Sunday",
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
  const resetAppliedTiming = () => {
    // const otherWeekdays = [
    //   "Monday",
    //   "Tuesday",
    //   "Wednesday",
    //   "Thursday",
    //   "Friday",
    // ];

    // const filteredDays = otherWeekdays.filter((weekday) => {
    //   return localStorage.getItem(weekday) !== null;
    // });
    // filteredDays.forEach((day) => {
    //   localStorage.removeItem(day);
    // });
    removeAllData();
    renderFunc();
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
            id="test"
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
              id="test1"
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
                    id="test2"
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
                    id="test3"
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

export default WeekDaysCard;
