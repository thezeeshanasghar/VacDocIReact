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
import { useHistory } from "react-router-dom";
import DaysCard, { ISession } from "./UpdateWeekDaysCard";
interface IClinic {
  Id: number;
  Name: string;
  City: string;
  Fees: string;
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
  const history = useHistory();
  const router = useIonRouter();
  const [clinic, setClinic] = useState<IClinic>();
  const [clinicName, setClinicName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [fees, setFees] = useState("");
  const [success, setSuccess] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [clinicArray, setClinicArray] = useState<any>([]);

  useEffect(() => {
    localStorage.clear();
    //@ts-ignore
    const storedValue = JSON.parse(sessionStorage.getItem("docData"));
    console.log(storedValue);
  }, []);

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
    if (city.trim().length > 0) {
      data_to_to_sent.push({
        path: "City",
        op: "replace",
        from: "",
        value: city,
      });
    }
    if (fees.trim().length > 0) {
      data_to_to_sent.push({
        path: "Fees",
        op: "replace",
        from: "",
        value: fees,
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
          history.push("/members/doctor/clinic", "back");
          window.location.reload();
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
      )
        .then((res) => {
          if (res.status === 200) {
            setSuccess(true);
            localStorage.clear();
            router.push("/members/doctor/clinic", "root");
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
          setCity(data.City);
          setFees(data.Fees);
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
        console.log("session data", data);
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
                  CIty
                </IonLabel>
                <IonInput
                  type="text"
                  required
                  value={city}
                  onIonChange={(e) => setCity(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Fee
                </IonLabel>
                <IonInput
                  type="number"
                  required
                  value={fees}
                  onIonChange={(e) => setFees(e.detail.value!)}
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

              <DaysCard
                name={"Monday"}
                session={clinicArray}
                clinicId={clinicId}
              />
              <DaysCard
                name={"Tuesday"}
                session={clinicArray}
                clinicId={clinicId}
              />
              <DaysCard
                name={"Wednesday"}
                session={clinicArray}
                clinicId={clinicId}
              />
              <DaysCard
                name={"Thursday"}
                session={clinicArray}
                clinicId={clinicId}
              />
              <DaysCard
                name={"Friday"}
                session={clinicArray}
                clinicId={clinicId}
              />
              <DaysCard
                name={"Saturday"}
                session={clinicArray}
                clinicId={clinicId}
              />
              <DaysCard
                name={"Sunday"}
                session={clinicArray}
                clinicId={clinicId}
              />
              <IonButton type="submit" disabled={!anSubmit}>
                Update
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

export default UpdateClinic;