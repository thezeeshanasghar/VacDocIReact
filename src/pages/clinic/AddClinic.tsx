import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import WeekDaysCard, { ISession } from "./WeekDaysCard";
import Header from "../../components/header/Header";
import Toast from "../../components/custom-toast/Toast";
// import AddWeekDaysCard from "./AddWeekDaysCard";
import { useHistory } from "react-router-dom";
import cities from "../test/citiesData";
const AddClinic: React.FC = () => {
  const history = useHistory();
  //@ts-ignore
  const storedValue = JSON.parse(sessionStorage.getItem("docData"));
  console.log(storedValue);
  const router = useIonRouter();
  const [doctorId, setDoctorId] = useState(storedValue.Id);
  const [clinicName, setClinicName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [fees, setFees] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [cId, setCId] = useState(null);
  const [data, setData] = useState<any>(null);
  const [rerender, setRerender] = useState(false);

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(phoneNumber.trim().length < 10 || phoneNumber.trim().length > 10 ){
        alert("Phone Number must be be 10 digit")
    }else {
      postClinic();
    }
  };
  const doRender = () => setRerender(!rerender);

  const postClinic = async () => {
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
    }

    const data_to_be_sent = {
      name: clinicName,
      address,
      number: phoneNumber,
      city,
      fees,
      doctorId,
      clinicTimings: newArray,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/Clinic`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data_to_be_sent),
        }
      );

      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        
        if (typeof sessionStorage !== 'undefined') {
          const key = 'docData';
      
          // Retrieve the existing data from session storage
          const existingData = sessionStorage.getItem(key);
      
          if (existingData) {
            // Parse the existing data into a JavaScript object
            const parsedData = JSON.parse(existingData);
      
            // Push the new data into the "ClinicTimings" array
            parsedData.Clinics[0].ClinicTimings.push(...data.ClinicTimings);
      
            // Store the updated data in session storage
            sessionStorage.setItem(key, JSON.stringify(parsedData));
            
            // Retrieve and log the updated value (optional)
            const retrievedValue = sessionStorage.getItem(key);
            console.log('Retrieved Value:', retrievedValue);
          } else {
            console.error('Existing data not found in session storage.');
          }
        } else {
          console.error('Session storage is not supported in this browser.');
        }
        
        setSuccess(true);
        localStorage.clear();
        history.push("/members/doctor/clinic", "back");
      } else {
        throw new Error("Failed to create clinic");
      }
      
      
    } catch (error) {
      localStorage.clear();
      setError(true);
    }
  };

  

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
              <IonLabel position="floating" color="primary">Mobile Number</IonLabel>
              <IonInput
                required
                type="number"
                value={phoneNumber}
                id="mobileNumber"
                itemID="mobileNumber"
                style={{
                  color:
                    phoneNumber.startsWith("0") || phoneNumber.startsWith("+")
                      ? "red"
                      : "",
                }}
                placeholder="3331234567"
                onIonChange={(e) => setPhoneNumber(e.detail.value!)}
              />
            </IonItem>
            <IonText
              color={"danger"}
              style={{
                fontSize: "10px",
                marginBottom: "11px",
                display:
                  phoneNumber.startsWith("0") || phoneNumber.startsWith("+")
                    ? "block"
                    : "none",
              }}
            >
              Mobile Number Must be In 333-1234567 Format
            </IonText>
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
          <IonItem>
              <input
                type="text"
                list="cityOptions"
                value={city}
                placeholder="Choose City"
                className="custom-input-search"
                style={{
                  border: "none",
                  width: "100%",
                  height: "2.8rem",
                  marginTop: "0.3px",
                  paddingLeft: "6px",
                }}
                onChange={(e) => setCity(e.target.value)}
              />
              <datalist
                id="cityOptions"
                style={{ width: "100%", border: "none" }}
              >
                {cities.map((city, index) => (
                  <option key={index} value={city} />
                ))}
              </datalist>
            </IonItem>
          <IonItem>
            <IonLabel position="floating" color="primary">
              Fee
            </IonLabel>
            <IonInput
              type="number"
              placeholder="PKR"
              required
              value={fees}
              onIonChange={(e) => setFees(e.detail.value!)}
            />
          </IonItem>
          <WeekDaysCard name={"Monday"} renderFunc={doRender} id="name123" isRendering={rerender}/>
          <WeekDaysCard name={"Tuesday"} renderFunc={doRender} id="name122" isRendering={rerender}/>
          <WeekDaysCard name={"Wednesday"} renderFunc={doRender} id="name124" isRendering={rerender}/>
          <WeekDaysCard name={"Thursday"} renderFunc={doRender} id="name125" isRendering={rerender}/>
          <WeekDaysCard name={"Friday"} renderFunc={doRender} id="name126" isRendering={rerender}/>
          <WeekDaysCard name={"Saturday"} renderFunc={doRender} id="name127" isRendering={rerender}/>
          <WeekDaysCard name={"Sunday"} renderFunc={doRender} id="name128" isRendering={rerender}/>
          <IonButton disabled={!anSubmit} type="submit">
            Add
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddClinic;
