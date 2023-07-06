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
  IonPage,
  IonContent,
  IonTextarea,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Toast from "../../components/custom-toast/Toast";
import WeekDaysCard from "./WeekDaysCard";
import DaysCard, { ISession } from "./UpdateWeekDaysCard"
interface IClinic {
  Id: number;
  Name: string;
  Address: string;
  Number: string;
  DoctorId: number;
}
interface CData {
  Id: number;
  Day: string;
  Session: string;
  StartTime: string;
  EndTime: string;
  ClinicId: number;
}
type ClinicProps = { match: { params: { clinicId: string } } };
const UpdateClinic: React.FC<ClinicProps> = ({
  match: {
    params: { clinicId },
  },
}) => {
  const router = useIonRouter();
  const [clinic, setClinic] = useState<IClinic>();
  const [clinicName, setClinicName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [success, setSuccess] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [clinicArray, setClinicArray] = useState<any>([]);

  const handleUnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     let data_to_to_sent = [];
    if (clinicName.trim().length > 0) {
      data_to_to_sent.push({
        path: "Name",
        op: "replace",
        from: "",
        value: clinicName,
      });
    }
    if (address.trim().length > 0) {
      data_to_to_sent.push({
        path: "Address",
        op: "replace",
        from: "",
        value: address,
      });
    }
    if (phoneNumber.trim().length > 0) {
      data_to_to_sent.push({
        path: "Number",
        op: "replace",
        from: "",
        value: phoneNumber,
      });
    }
    fetch(`${import.meta.env.VITE_API_URL}api/Clinic/${clinicId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_to_to_sent),
    })
      .then((res) => {
        if (res.status === 204) {
          setSuccess(true);
          setTimeout(() => {
            router.push("/members/doctor/clinic", "back");
          }, 1000);
        } else {
          setError(false);
        }
      })
      .catch((err) => setError(true));
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const newArray = weekdays.filter((day) => {
      const storedData = localStorage.getItem(day);
      return (
        storedData &&
        Array.isArray(JSON.parse(storedData)) &&
        JSON.parse(storedData).length > 0
      );
    });

    if (newArray.length > 0) {
      setCanSubmit(false);
    }

    const data = newArray.map(async (day) => {
      const storedData = localStorage.getItem(day);
      console.log(storedData, "this is storedData"); // Retrieve the data from localStorage
    
        const parsedData = storedData ? JSON.parse(storedData) : null;
        // return parsedData;
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }api/Clinictiming/api/clintimings/AddorUpdate/${clinicId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedData),
          }
        ).then((res) => {
          if (res.status === 200) {
            setSuccess(true);
            localStorage.clear()
            setTimeout(() => {
              router.push("/members/doctor/clinic", "back");
            }, 1000);
          } else {
            setError(false);
          }
        })
        .catch((err) => setError(true));
    });
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Perform submit logic with clinicName, phoneNumber, address, and sessions data
  //   console.log(sessions);
  //   updateClinic();
  // };

  // const updateClinic = () => {
  //   // let data_to_to_sent = [];
  //   // if (clinicName.trim().length > 0) {
  //   //   data_to_to_sent.push({
  //   //     path: "Name",
  //   //     op: "replace",
  //   //     from: "",
  //   //     value: clinicName,
  //   //   });
  //   // }
  //   // if (address.trim().length > 0) {
  //   //   data_to_to_sent.push({
  //   //     path: "Address",
  //   //     op: "replace",
  //   //     from: "",
  //   //     value: address,
  //   //   });
  //   // }
  //   // if (phoneNumber.trim().length > 0) {
  //   //   data_to_to_sent.push({
  //   //     path: "Number",
  //   //     op: "replace",
  //   //     from: "",
  //   //     value: phoneNumber,
  //   //   });
  //   // }
  //   // fetch(`${import.meta.env.VITE_API_URL}api/Clinic/${clinicId}`, {
  //   //   method: "PATCH",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify(data_to_to_sent),
  //   // })
  //   //   .then((res) => {
  //   //     if (res.status === 204) {
  //   //       setSuccess(true);
  //   //       setTimeout(() => {
  //   //         router.push("/members/doctor/clinic", "back");
  //   //       }, 1000);
  //   //     } else {
  //   //       setError(false);
  //   //     }
  //   //   })
  //   //   .catch((err) => setError(true));
  // };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}api/Clinic/${clinicId}`)
      .then((response) => response.json())
      .then((data: IClinic) => {
        if (Object.keys(data).length !== 0) {
          setClinicName(data.Name);
          setPhoneNumber(data.Number);
          setAddress(data.Address);
          setClinic(data);
        }
        console.log(data);
      });
    fetch(
      `${import.meta.env.VITE_API_URL}api/Clinictiming?clinicId=${clinicId}`
    )
      .then((response) => response.json())
      .then((data: CData) => {
        if (Object.keys(data).length !== 0) {
          // setClinicName(data.Name);
          // setPhoneNumber(data.Number);
          // setAddress(data.Address);
          // setClinic(data);
        }
        setClinicArray(data);
        console.log("session data",data)
      });
  }, []);
  const anSubmit =
    clinicName.trim() !== "" &&
    address.trim() !== "" &&
    phoneNumber.trim() !== "";
  return (
    <>
      <Toast
        isOpen={error}
        setOpen={setError}
        color="danger"
        errMsg="an error occurred while updating clinic, try again"
      />
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        color="success"
        errMsg="clinic updated successfully"
      />
      {clinic && Object.keys(clinic).length > 0 ? (
        <IonPage>
          <IonContent>
            <Header pageName="Update Clinic" />
            <form noValidate className="ion-padding" onSubmit={handleUnSubmit}>
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Name
                </IonLabel>
                <IonInput
                  type="text"
                  required
                  value={clinicName}
                  onIonChange={(e) => setClinicName(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Phone Number
                </IonLabel>
                <IonInput
                  type="text"
                  required
                  value={phoneNumber}
                  onIonChange={(e) => setPhoneNumber(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Address
                </IonLabel>
                <IonTextarea
                  required
                  value={address}
                  onIonChange={(e) => setAddress(e.detail.value!)}
                ></IonTextarea>
               
              </IonItem>
            
             
              <DaysCard name={"Monday"} session={clinicArray} clinicId={clinicId}/>
              <DaysCard name={"Tuesday"} session={clinicArray} clinicId={clinicId}/>
              <DaysCard name={"Wednesday"} session={clinicArray} clinicId={clinicId}/>
              <DaysCard name={"Thursday"} session={clinicArray} clinicId={clinicId}/>
              <DaysCard name={"Friday"} session={clinicArray} clinicId={clinicId}/>
              <DaysCard name={"Saturday"} session={clinicArray} clinicId={clinicId}/>
              <DaysCard name={"Sunday"} session={clinicArray} clinicId={clinicId}/>
              <IonButton type="submit" disabled={!anSubmit}>
                Submit
              </IonButton>
            </form>
          </IonContent>
        </IonPage>
      ) : (
        <h1>error</h1>
      )}
    </>
  );
};

// type WeekDayCardProps = {
//   name: string;
//   session1?: boolean;
//   s1StartTime?: string;
//   s1EndTime?: string;

//   session2?: boolean;
//   s2StartTime?: string;
//   s2EndTime?: string;
// };

// export interface ISession {
//   Day: string;
//   Session: string;
//   StartTime: string;
//   EndTime: string;
// }

// const UpdateWeekDays: React.FC<WeekDayCardProps> = ({ name }) => {
//   const [showSession1, setShowSession1] = useState(false);
//   const [showSession2, setShowSession2] = useState(false);
//   const [showCard, setShowCard] = useState(false);
//   const [mstart, setMStart] = useState("");
//   const [mend, setMEnd] = useState("");
//   const [mstart2, setMStart2] = useState("");
//   const [mend2, setMEnd2] = useState("");
//   const [dayData, setDayData] = useState<ISession[]>([]);

//   useEffect(() => {
//     if (showCard && showSession1 && mstart !== "" && mend !== "") {
//       const existingIndex = dayData.findIndex(
//         (entry) => entry.Day === name && entry.Session === "Session1"
//       );

//       if (existingIndex !== -1) {
//         const updatedDayData = [...dayData];
//         updatedDayData[existingIndex].StartTime = mstart;
//         updatedDayData[existingIndex].EndTime = mend;
//         setDayData(updatedDayData);
//       } else {
//         setDayData((prevDayData) => [
//           ...prevDayData,
//           {
//             Day: name,
//             Session: "Session1",
//             StartTime: mstart,
//             EndTime: mend,
//           },
//         ]);
//       }
//     }
//   }, [showCard, showSession1, mstart, mend, name]);

//   useEffect(() => {
//     if (showCard && showSession2 && mstart2 !== "" && mend2 !== "") {
//       const existingIndex = dayData.findIndex(
//         (entry) => entry.Day === name && entry.Session === "Session2"
//       );

//       if (existingIndex !== -1) {
//         const updatedDayData = [...dayData];
//         updatedDayData[existingIndex].StartTime = mstart2;
//         updatedDayData[existingIndex].EndTime = mend2;
//         setDayData(updatedDayData);
//       } else {
//         setDayData((prevDayData) => [
//           ...prevDayData,
//           {
//             Day: name,
//             Session: "Session2",
//             StartTime: mstart2,
//             EndTime: mend2,
//           },
//         ]);
//       }
//     }
//   }, [showCard, showSession2, mstart2, mend2, name]);

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

export default UpdateClinic;
