// import { IonInputCustomEvent } from "@ionic/core";
// import {
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
// import React, { useState, useEffect } from "react";

// type AddWeekDayCardProps = {
//   name: string;
  
//   setSession?: React.Dispatch<React.SetStateAction<ISession[]>>;
// };

// export interface ISession {
//   day: string;
//   session: string;
//   startTime: string;
//   endTime: string;
  
// }

// const AddWeekDaysCard: React.FC<AddWeekDayCardProps> = ({ name, setSession}) => {
//   const [showSession1, setShowSession1] = useState(false);
//   const [showSession2, setShowSession2] = useState(false);
//   const [showCard, setShowCard] = useState(false);
//   const [mstart, setMStart] = useState("09:00");
//   const [mend, setMEnd] = useState("12:00");
//   const [mstart2, setMStart2] = useState("09:00");
//   const [mend2, setMEnd2] = useState("12:00");
//   const [dayData, setDayData] = useState<ISession[]>([]);
//   useEffect(() => {
//     setMStart("09:00");
//     setMEnd("12:00");
//     setMStart2("09:00");
//     setMEnd2("12:00");
//   }, [])

//   useEffect(() => {
//     if (showCard && showSession1 && mstart !== "" && mend !== "") {
//       const existingIndex = dayData.findIndex(
//         (entry) => entry.day === name && entry.session === "Morning"
//       );

//       if (existingIndex !== -1) {
//         const updatedDayData = [...dayData];
//         updatedDayData[existingIndex].startTime = mstart;
//         updatedDayData[existingIndex].endTime = mend;
//         setDayData(updatedDayData);
//       } else {
//         setDayData((prevDayData) => [
//           ...prevDayData,
//           {
//             day: name,
//             session: "Morning",
//             startTime: mstart,
//             endTime: mend,
            
//           },
//         ]);
//       }
//     }
//   }, [showCard, showSession1, mstart, mend, name, ]);

//   useEffect(() => {
//     if (showCard && showSession2 && mstart2 !== "" && mend2 !== "") {
//       const existingIndex = dayData.findIndex(
//         (entry) => entry.day === name && entry.session === "Evening"
//       );

//       if (existingIndex !== -1) {
//         const updatedDayData = [...dayData];
//         updatedDayData[existingIndex].startTime = mstart2;
//         updatedDayData[existingIndex].endTime = mend2;
//         setDayData(updatedDayData);
//       } else {
//         setDayData((prevDayData) => [
//           ...prevDayData,
//           {
//             day: name,
//             session: "Evening",
//             startTime: mstart2,
//             endTime: mend2,
            
//           },
//         ]);
//       }
//     }
//   }, [showCard, showSession2, mstart2, mend2, name, ]);
//   useEffect(() => {
//     console.log("showCard:", showCard);
//     console.log("dayData:", dayData);
//   }, [showCard, dayData]);
  
//   useEffect(() => {
//     dayData.length >= 1 && localStorage.setItem(name, JSON.stringify(dayData));
//   }, [dayData]);

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

//   return (
//     <IonCard style={{ width: "100%" }}>
//       <IonCardHeader>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "100%",
//           }}
//         >
//           {}
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

// export default AddWeekDaysCard;