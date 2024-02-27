import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import WeekDaysCard from "../../clinic/WeekDaysCard";
import Toast from "../../../components/custom-toast/Toast";

const ClinicSchedule: React.FC = () => {
  const router = useIonRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [render, setRender] = useState(false);
  //@ts-ignore
  const storedValue = JSON.parse(sessionStorage.getItem("docData"));
  console.log('clinic',storedValue);
  const [doctorId, setdocorId] = useState(storedValue.Id);
  const handleUnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const Doc_data = localStorage.getItem("docData");
    const clinics = localStorage.getItem("clinic");
    //@ts-ignore
    const drData = JSON.parse(Doc_data);
    //@ts-ignore
    const clinic=JSON.parse(clinics);
    console.log('parse',drData);
    console.log('parse',clinic);
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const newArray = [].concat(
      ...Object.entries(localStorage)
        .filter(
          ([key, value]) =>
            weekdays.includes(key) &&
            Array.isArray(JSON.parse(value)) &&
            JSON.parse(value).length > 0
        )
        .map(([key, value]) => JSON.parse(value))
    );
    if (newArray.length > 0) {
      setCanSubmit(false);
      console.log("new Array ", newArray);
      drData.Clinics[0]["clinicTimings"] = newArray;
      console.log("cdr  data ", drData);
      clinic.clinicTimings = newArray;
      
      console.log("cdr  timing ", clinic);
     //@ts-ignore
    
    console.log('final data',drData)
    console.log('register',clinic)
    // localStorage.clear()
    // localStorage.setItem('docData',drData);
   fetch(`${import.meta.env.VITE_API_URL}api/Clinic/${doctorId}`, {
    method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clinic)
      
    })
      .then((res) => {
        if (res.status === 200 || 204) {
         
          localStorage.clear();

          // Store new data in local storage
          localStorage.setItem('docData', JSON.stringify(drData));
          fetch(
            `${import.meta.env.VITE_API_URL}api/DoctorSchedule/Doctor_DoseSchedule?doctorId=${doctorId}`,
            {
              method: "GET",
            }
          )
            .then((res) => {
              if (res.status === 200) {
                setSuccess(true);
                
              }})
          setTimeout(() => {
            router.push("/members/alldosesforDoctor");
            
          
          }, 1500);
  
        } else {

          setError(false);
          Object.keys(localStorage).forEach(key => {
            if (key !== 'docData') {
              localStorage.removeItem(key);
            }
          });
          router.push("/auth/reg_clinic");
          localStorage.clear()
        }
      })
      .catch((err) => setError(true));
      
    }else {
      setCanSubmit(true); // No data present, disable submit button
      setTimeout(() => {
        setCanSubmit(false);
      }, 1000);
    }
  };

  const rerender = () => {
    // window.location.reload();
    console.log("Rerender function called");
    setRender(!render);
  };


  // const RegisterDoctor = (data_to_be_sent: any) => {
  //   //@ts-ignore
  //   const DrData = JSON.parse(localStorage.getItem('docData'));
  //   console.log('final data',DrData)
  //   console.log('register',data_to_be_sent)
  //   // fetch(`${import.meta.env.VITE_API_URL}api/Doctor`, {
      
  //   // })
  //   //   .then((res) => {
  //   //     if (res.status === 200 || 204) {
  //   //       setSuccess(true);

  //   //       setTimeout(() => {
  //   //         router.push("/members/Dashboard", "root");
  //   //       }, 1500);
          
          
  //   //     } else {
  //   //       setError(false);
  //   //     }
  //   //   })
  //   //   .catch((err) => setError(true));
  //   // localStorage.clear();
  // };

  return (
    <IonPage>
      <Toast
        isOpen={error}
        setOpen={setError}
        color="danger"
        errMsg="An error occurred while signing up, try again."
      />
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        color="success"
        errMsg="Clinic and schedule is added now!"
      />
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Clinic Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form
          onSubmit={handleUnSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px 10px",
          }}
        >
          <WeekDaysCard name={"Monday"} renderFunc={rerender} id="name123" isRendering={render}/>
          <WeekDaysCard name={"Tuesday"} renderFunc={rerender} id="name122" isRendering={render}/>
          <WeekDaysCard name={"Wednesday"} renderFunc={rerender} id="name124" isRendering={render}/>
          <WeekDaysCard name={"Thursday"} renderFunc={rerender} id="name125" isRendering={render}/>
          <WeekDaysCard name={"Friday"} renderFunc={rerender} id="name126" isRendering={render}/>
          <WeekDaysCard name={"Saturday"} renderFunc={rerender} id="name127" isRendering={render}/>
          <WeekDaysCard name={"Sunday"} renderFunc={rerender} id="name128" isRendering={render}/>
          <IonText color={"danger"}>
            {canSubmit &&
              "please select any day's atleast one session to sign up"}
          </IonText>
          <IonButton type="submit" id="submitsch" disabled={canSubmit}>
            Submit
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ClinicSchedule;
