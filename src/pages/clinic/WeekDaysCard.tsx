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
} from "@ionic/react";
import React, { useState, useEffect } from "react";

type WeekDayCardProps = {
  name: string;
  setSession?: React.Dispatch<React.SetStateAction<ISession[]>>;
};

export interface ISession {
  day: string;
  session: string;
  startTime: string;
  endTime: string;
}

const WeekDaysCard: React.FC<WeekDayCardProps> = ({ name, setSession }) => {
  const [showSession1, setShowSession1] = useState(false);
  const [showSession2, setShowSession2] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [mstart, setMStart] = useState("");
  const [mend, setMEnd] = useState("");
  const [mstart2, setMStart2] = useState("");
  const [mend2, setMEnd2] = useState("");
  const [dayData, setDayData] = useState<ISession[]>([]);

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
  }, [showCard, showSession1, mstart, mend, name]);

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
          <IonToggle checked={showCard} onIonChange={handleToggleCard} />
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
    </IonCard>
  );
};

export default WeekDaysCard;

//   IonCard,
//   IonCardTitle,
//   IonToggle,
//   IonCardContent,
//   IonLabel,
//   IonItem,
//   IonRow,
//   IonCol,
//   IonInput,
//   IonCardHeader,
//   InputChangeEventDetail,
// } from "@ionic/react";
// import React, { useState } from "react";
// type WeekDayCard = {
//   name: string;
//   SessionArray: React.Dispatch<React.SetStateAction<ISession[]>>;
// };
// export interface ISession {
//   Day: string;
//   Session: string;
//   StartTime: string;
//   EndTime: string;
// }
// const WeekDaysCard: React.FC<WeekDayCard> = ({ name, SessionArray }) => {
//   const [showSession1, setShowSession1] = useState(false);
//   const [showSession2, setShowSession2] = useState(false);
//   const [showCard, setShowCard] = useState(false);
//   const [mstart, setMStart] = useState("");
//   const [mend, setMEnd] = useState("");
//   const [mstart2, setMStart2] = useState("");
//   const [mend2, setMEnd2] = useState("");
//   const [dayData, setDayData] = useState<ISession[]>([]);
//   const handleToggleSession1 = (e: {
//     detail: { checked: boolean | ((prevState: boolean) => boolean) };
//   }) => {
//     setShowSession1(e.detail.checked);
//   };

//   const handleToggleSession2 = (e: {
//     detail: { checked: boolean | ((prevState: boolean) => boolean) };
//   }) => {
//     setShowSession2(e.detail.checked);
//   };
//   const handleToggleCard = (e: {
//     detail: { checked: boolean | ((prevState: boolean) => boolean) };
//   }) => {
//     setShowCard(e.detail.checked);
//   };

//   const handleTimeChange = (
//     e: IonInputCustomEvent<InputChangeEventDetail>,
//     input: string
//   ) => {
//     const { value } = e.target;
//     if (input === "start") {
//       //@ts-ignore
//       setMStart(value);
//     } else if (input === "end") {
//       //@ts-ignore
//       setMEnd(value);
//     } else if (input === "start2") {
//       //@ts-ignore
//       setMStart2(value);
//     } else if (input === "end2") {
//       //@ts-ignore
//       setMEnd2(value);
//     }
//   };
//   if (showCard && showSession1) {
//     if (mstart !== "" && mend !== "") {
//       // if index already exists
//       const existingIndex = dayData.findIndex(
//         (entry) => entry.Day === name && entry.Session === "Session1"
//       );

//       // If the entry exists, update the existing object
//       if (existingIndex !== -1) {
//         dayData[existingIndex].StartTime = mstart;
//         dayData[existingIndex].EndTime = mend;
//       } else {
//         // If the entry doesn't exist, push a new object to the array
//         dayData.push({
//           Day: name,
//           Session: "Session1",
//           StartTime: mstart,
//           EndTime: mend,
//         });
//       }
//     }
//   }
//   if (showCard && showSession2) {
//     if (mstart2 !== "" && mend2 !== "") {
//       const existingIndex = dayData.findIndex(
//         (entry) => entry.Day === name && entry.Session === "Session2"
//       );

//       if (existingIndex !== -1) {
//         dayData[existingIndex].StartTime = mstart2;
//         dayData[existingIndex].EndTime = mend2;
//       } else {
//         dayData.push({
//           Day: name,
//           Session: "Session2",
//           StartTime: mstart2,
//           EndTime: mend2,
//         });
//       }
//     }
//   }

//   return (
//     <IonCard>
//       <IonCardHeader>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "100%",
//           }}
//         >
//           <IonCardTitle>{name}</IonCardTitle>
//           <IonToggle checked={showCard} onIonChange={handleToggleCard} />
//         </div>
//       </IonCardHeader>

//       {showCard && (
//         <IonCardContent>
//           <IonItem lines="none">
//             <IonLabel>Session: 1</IonLabel>
//             <IonToggle
//               checked={showSession1}
//               onIonChange={handleToggleSession1}
//             />
//           </IonItem>

//           {showSession1 && (
//             <IonRow>
//               <IonCol>
//                 <IonItem>
//                   <IonLabel>Start Time</IonLabel>

//                   <IonInput
//                     type="time"
//                     value={mstart}
//                     onIonChange={(e) => handleTimeChange(e, "start")}
//                   />
//                 </IonItem>
//               </IonCol>
//               <IonCol>
//                 <IonItem>
//                   <IonLabel>End Time</IonLabel>
//                   <IonInput
//                     type="time"
//                     value={mend}
//                     onIonChange={(e) => handleTimeChange(e, "end")}
//                   />
//                 </IonItem>
//               </IonCol>
//             </IonRow>
//           )}

//           <IonItem lines="none">
//             <IonLabel>Session: 2</IonLabel>
//             <IonToggle
//               checked={showSession2}
//               onIonChange={handleToggleSession2}
//             />
//           </IonItem>

//           {showSession2 && (
//             <IonRow>
//               <IonCol>
//                 <IonItem>
//                   <IonLabel>Start Time</IonLabel>
//                   <IonInput
//                     type="time"
//                     value={mstart2}
//                     onIonChange={(e) => handleTimeChange(e, "start2")}
//                   />
//                 </IonItem>
//               </IonCol>
//               <IonCol>
//                 <IonItem>
//                   <IonLabel>End Time</IonLabel>
//                   <IonInput
//                     type="time"
//                     value={mend2}
//                     onIonChange={(e) => handleTimeChange(e, "end2")}
//                   />
//                 </IonItem>
//               </IonCol>
//             </IonRow>
//           )}
//         </IonCardContent>
//       )}
//     </IonCard>
//   );
// };

// export default WeekDaysCard;
