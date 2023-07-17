import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import WeekDaysCard, { ISession } from "./WeekDaysCard";
import Header from "../../components/header/Header";
import Toast from "../../components/custom-toast/Toast";
import AddWeekDaysCard from "./AddWeekDaysCard";
import { useHistory } from "react-router-dom";
const AddClinic: React.FC = () => {
  const history = useHistory();
  const storedValue = JSON.parse(sessionStorage.getItem("docData"));
  console.log(storedValue);
  const router = useIonRouter();
  const [doctorId, setDoctorId] = useState(storedValue.Id);
  const [clinicName, setClinicName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [canSubmit, setCanSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [cId,setCId] = useState(null)
  const [data, setData] = useState<any>(null);

  // const handleUnSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const weekdays = [
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //     "Sunday",
  //   ];
  //   const newArray = weekdays.filter((day) => {
  //     const storedData = localStorage.getItem(day);
  //     return (
  //       storedData &&
  //       Array.isArray(JSON.parse(storedData)) &&
  //       JSON.parse(storedData).length > 0
  //     );
  //   });

  //   if (newArray.length > 0) {
  //     setCanSubmit(false);
  //   }

  //   const data = newArray.map((day) => {
  //     const storedData = localStorage.getItem(day);
  //     console.log(storedData, "this is storedData"); // Retrieve the data from localStorage
  //     return JSON.parse(storedData);
  //   });

  //   try {
  //     const allData = data.map(i => i[0]);
  //     await registerDoctor(allData);
  //     setSuccess(true);
  //     localStorage.clear();
  //   } catch (error) {
  //     setError(true);
  //   }
  // };

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Perform submit logic with clinicName, phoneNumber, address, and sessions data
    postClinic();
  };
  
  const postClinic = async () => {
    const data_to_be_sent = {
      name: clinicName,
      address,
      number: phoneNumber,
      doctorId,
    };
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/Clinic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_to_be_sent),
      });
  
      if (response.status === 201) {
        const data = await response.json();
        const clinicId = data.Id;
        console.log(clinicId);
        postclinictiming(clinicId);
        setSuccess(true);
        history.push("/members/doctor/clinic", "back");
        window.location.reload();
      } else {
        throw new Error("Failed to create clinic");
      }
    } catch (error) {
      setError(true);
    }
  };
  
  const postclinictiming = async (cid: string) => {
    // localStorage.clear();
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
      console.log(storedData, "this is storedData");
      // console.log(storedData.length)
      
        const parsedData = storedData ? JSON.parse(storedData) : null;
        console.log(parsedData)
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}api/Clinictiming/api/clintimings/AddorUpdate/${cid}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedData),
          }
        )
        .then((res) => {
          if (res.status === 200) {
            localStorage.clear()
          } else {
            setError(false);
            localStorage.clear()
          }
        })
        .catch((err) => setError(true));
       
        localStorage.clear()
        // return parsedData;
      
      // localStorage.clear()
    });
  
    // const allData = data.map((i) => i[0]);
    // console.log(cid);
    // registerDoctor(allData, cid);
    // setSuccess(true);
    localStorage.clear();
  };
  
  // const registerDoctor = async (data_to_be_sent: any, cid: string) => {
  //   console.log("atta", data_to_be_sent);
  //   console.log("clinic id", cid);
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}api/Clinictiming?clinicId=${cid}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data_to_be_sent),
  //       }
  //     );
  
  //     if (response.status !== 200) {
  //       throw new Error("Failed to register doctor");
  //     }
  //   } catch (error) {
  //     throw new Error();
  //   }
  
  
   
  //     const weekdays = [
  //       "Monday",
  //       "Tuesday",
  //       "Wednesday",
  //       "Thursday",
  //       "Friday",
  //       "Saturday",
  //       "Sunday",
  //     ];
  //     const newArray = weekdays.filter((day) => {
  //       const storedData = localStorage.getItem(day);
  //       return (
  //         storedData &&
  //         Array.isArray(JSON.parse(storedData)) &&
  //         JSON.parse(storedData).length > 0
  //       );
  //     });
  
  //     if (newArray.length > 0) {
  //       setCanSubmit(false);
  //     }
  
  //     const data = newArray.map((day) => {
  //       const storedData = localStorage.getItem(day);
  //       console.log(storedData, "this is storedData"); // Retrieve the data from localStorage
  //       return JSON.parse(storedData);
  //     });
  
  //     try {
  //       const allData = data.map(i => i[0]);
  //       console.log(cId)
  //       await registerDoctor(allData, cId);
  //       setSuccess(true);
  //       localStorage.clear();
  //     } catch (error) {
  //       setError(true);
  //     }
  // };

  // const registerDoctor = async (data_to_be_sent: any,clinicId: string) => {
  //   console.log("atta", data_to_be_sent);
  //   console.log("clinic id", clinicId);
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}api/Clinictiming/${cId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data_to_be_sent),
  //       }
  //     );

  //     if (response.status !== 200) {
  //       throw new Error("Failed to register doctor");
  //     }
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
 

  const anSubmit =
    clinicName.trim() !== "" &&
    address.trim() !== "" &&
    phoneNumber.trim() !== "";
  return (
    <IonPage>
      <Toast
        isOpen={error}
        setOpen={setError}
        color="danger"
        errMsg="an error occurred while adding new clinic, try again"
      />
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        color="success"
        errMsg="clinic added successfully"
      />
      <IonContent>
        <Header pageName="Add Clinic" />
        <form noValidate className="ion-padding" onSubmit={handleSubmit}>
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
              type="number"
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
            {/* <IonButton disabled={!anSubmit} type="submit">
              Submit
            </IonButton> */}
          </IonItem>
        
          <AddWeekDaysCard name={"Monday"} />
          <AddWeekDaysCard name={"Tuesday"}/>
          <AddWeekDaysCard name={"Wednesday"}/>
          <AddWeekDaysCard name={"Thursday"}/>
          <AddWeekDaysCard name={"Friday"}/>
          <AddWeekDaysCard name={"Saturday"}/>
          <AddWeekDaysCard name={"Sunday"}/>
            <IonButton disabled={!anSubmit} type="submit">
              Add
            </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddClinic;

// const handleUnSubmit = (e: React.FormEvent) => {
//   e.preventDefault();
//   const weekdays = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];
//   const newArray = weekdays.filter((day) => {
//     const storedData = localStorage.getItem(day);
//     // console.log(storedData);
//     return (
//       storedData &&
//       Array.isArray(JSON.parse(storedData)) &&
//       JSON.parse(storedData).length > 0
//     );
//   });

//   newArray.forEach((day) => {
//     const storedData = localStorage.getItem(day);
//     console.log(storedData); // Retrieve the data from localStorage

//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
//       // console.log(`Data for ${day}:`, parsedData);
//       setData(parsedData)
//       // Perform actions with the retrieved data as needed
//       console.log(data)
//     }
//   });

// Call the API endpoint with the updated data
// fetch(`${import.meta.env.VITE_API_URL}api/Clinictiming?clinicId=1`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(""), // Pass the updated data to the API
// })
//   .then((res) => {
//     if (res.status === 200) {
//       setSuccess(true);
//       // setTimeout(() => {
//       //   router.push("/", "back");
//       // }, 1500);
//     } else {
//       setError(false);
//     }
//   })
//   .catch((err) => setError(true));

//   localStorage.clear(); // Clear the localStorage
// };
