import {
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonGrid,
  IonButton,
  IonCol,
  IonRow,
  IonCheckbox,
  IonListHeader,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./css/addpatient.css";
import { useHistory, useLocation } from "react-router-dom";
// import { format } from "date-fns";
import Toast from "../../components/custom-toast/Toast";
import cities from "../test/citiesData";
import secureRandomPassword from "secure-random-password";
import { isValidEmail } from "../../util/util";
import axios from "axios";
type DoctorClinicType = { Id: number; Name: string };
const AddPatient: React.FC = () => {
  const [Cities, setCities] = useState(cities);
  const [scheduleType, setScheduleType] = useState("regular");
  const [gender, setGender] = useState("");

  const [name, setName] = useState("");
  const [guardian, setGuardian] = useState("");
  const [cnic, setCnic] = useState("");

  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("auto");
  const [mobileNumber, setMobileNumber] = useState("");
  const [toDay, setToDay] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<number>();
  const [selectedClinic, setSelectedClinic] = useState<number>();
  const [city, setCity] = useState<string>("");
  const [isEPIDone, setIsEPIDone] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const history = useHistory();
  const location = useLocation();
  // const [clinicData, setClinicData] = useState<DoctorClinicType[]>([]);
  // const [doctorData, setDoctorData] = useState<DoctorClinicType[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [noClinic, setNoClinic] = useState<boolean>(false);
  const [cnicOrPassPort, setCnicOrPassPort] = useState("");
  const [selectCnicOrPassport, setSelectCnicOrPassport] = useState("CNIC");
  const [errMsg, setErrMsg] = useState("");

  const isNumber = (value: string) => /^\d+$/.test(value);

  const handleMobileNumberChange = (e: CustomEvent) => {
    const inputValue = e.detail.value;
    if (!isNumber(inputValue)) {
      setErrMsg("Mobile Number Must be In 3331234567 Format");
      setError(true);
      setMobileNumber("");
    } else if (inputValue.length > 10) {
      setErrMsg("Mobile Number Must contain 10 digit");
      setError(true);
      setMobileNumber("");
    } else if (!inputValue.startsWith("3")) {
      setErrMsg("Mobile Number Must Start wth 3");
      setError(true);
      setMobileNumber("");
    } else {
      setMobileNumber(inputValue);
      setError(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClinic) {
      setNoClinic(true);
      return;
    }
    // if (mobileNumber.trim().length < 10) {
    //   alert("Mobile Number must be at least 10 digit");
    //   return;
    // }
    // else if (mobileNumber.trim().length > 10) {
    //   alert("Mobile Number must be at least 10 digit long.");
    //   return;
    // }
    // else if (
    //   cnicOrPassPort.trim().length >= 1 &&
    //   (cnicOrPassPort.trim().length < 13 || cnicOrPassPort.trim().length > 13)
    // ) {
    //   alert("CNIC Number must be 13 digits long.");
    //   return;
    // }
    //  else if (cnicOrPassPort.trim().length >= 1 && /\D/.test(cnicOrPassPort)) {
    //   alert("CNIC Number can not contain any non digit");
    //   return;
    // }
    if (email.trim().length >= 1 && !isValidEmail(email)) {
      alert("Please enter correct email address");
      return;
    } else {
      const data_to_be_sent = {
        name,
        guardianName: guardian,
        email,
        dob,
        gender: gender.trim() === "boy" ? 0 : 1,
        isSpecial: scheduleType.trim() == "regular" ? 0 : 1,
        password: generateRandomPassword(),
        city,
        selectCnicOrPassport,
        cnicOrPassPort,
        mobileNumber,

        isEPIDone,
        isVerified,
        isInactive: false,

        clinicId: selectedClinic,
        doctorId: selectedDoctor,
      };
      console.log(data_to_be_sent);

      fetch(`${import.meta.env.VITE_API_URL}api/Child`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_to_be_sent),
      })
        .then((res) => {
          if (res.status === 200) {
            setSuccess(true);
            return res.json().then((data) => {
              console.log(data);
              const childId = data.Id;
              console.log(childId);

              axios
                .get(
                  `${
                    import.meta.env.VITE_API_URL
                  }api/PatientSchedule/Patient_DoseSchedule?ChildId=${childId}&DoctorId=${selectedDoctor}`
                )
                .then((res: any) => {
                  console.log("schedule created");
                  const isspecial = data.IsSpecial;
                  console.log(isspecial);
                  if (isspecial == true) {
                    history.push(`/members/child/special-vaccine/${childId}`);
                  } else {
                    history.push(`/members/child`);
                  }
                })
                .catch((error: any) => {
                  console.log(error);
                });
              // .then(res => {
              //   history.push("/members/child", "back");
              //   clearStateVariables();
              // })
            });
          } else {
            setError(true);
          }
        })
        .catch((err) => setError(true))
        .finally(() => {});
    }
  };
  // function to clear all state variables
  const clearStateVariables = () => {
    setName("");
    setGuardian("");
    setGender("");
    setScheduleType("regular");
    setDob("");
    setEmail("");
    setMobileNumber("");

    setCity("");
    setIsEPIDone(false);
    setIsVerified(false);
    setCnicOrPassPort("");
    setSelectCnicOrPassport("CNIC");
  };

  // getting doctors list for dropdown and clinic;
  useEffect(() => {
    //@ts-ignore
    const doctorData = JSON.parse(sessionStorage.getItem("docData"));
    if (doctorData) {
      // const lastIndex = doctorData.Clinics && doctorData.Clinics.length - 1;
      // const clinic = doctorData.Clinics.find(
      //   (item: any) => item.IsOnline === true
      // );
      setSelectedDoctor(doctorData["Id"]);
      // setSelectedClinic(clinic.Id);
    }

    // fetch(`${import.meta.env.VITE_API_URL}api/Doctor`)
    //   .then((res) => res.json())
    //   .then((data) => setDoctorData(data))
    //   .catch((err) => console.error(err));

    fetch(
      `${import.meta.env.VITE_API_URL}api/Clinic/clinicByDoctor?doctorId=${
        doctorData["Id"]
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item: any) => {
          if (item.IsOnline) {
            setSelectedClinic(item.Id);
          }
        });
      })
      .catch((err) => console.error(err));

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const today = `${year}-${month}-${day}`;

    // console.log(today);
    setToDay(today);
    clearStateVariables();
  }, [location, success, error]);

  const canSubmit =
    name !== "" &&
    guardian !== "" &&
    gender !== "" &&
    dob !== "" &&
    mobileNumber !== "" &&
    city !== "" &&
    scheduleType !== "";

  function generateRandomPassword() {
    return secureRandomPassword.randomPassword({
      length: 8,
      characters: [secureRandomPassword.digits],
    });
  }
  return (
    <IonPage>
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        message="Patient added successfully."
        color="success"
      />
      <Toast isOpen={error} setOpen={setError} color="danger" errMsg={errMsg} />
      <Toast
        isOpen={noClinic}
        setOpen={setNoClinic}
        message="currently there is no ONLINE clinic, please make one online."
        color="danger"
      />
      <Header pageName="Add Patient" />
      <IonCard style={{ overflowY: "scroll" }}>
        <IonCardContent>
          <form onSubmit={handleFormSubmit}>
            <IonItem>
              <IonInput
                placeholder="Name"
                type="text"
                value={name}
                onIonChange={(e) => setName(e.detail.value!)}
                required
                id="name"
              />
            </IonItem>

            <IonItem lines="full">
              <IonInput
                type="text"
                placeholder="Guardian's Name"
                value={guardian}
                onIonChange={(e) => setGuardian(e.detail.value!)}
                required
                id="fname"
              />
            </IonItem>
            <IonItem>
              <IonInput
                type="email"
                placeholder="Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                id="email"
              />
            </IonItem>

            <IonItem lines="full">
              <IonItem lines="none">
                <IonInput
                  type="text"
                  placeholder="Identity Number"
                  value={cnicOrPassPort}
                  onIonChange={(e) => setCnicOrPassPort(e.detail.value!)}
                  id="fname"
                />
              </IonItem>
              <IonItem lines="none">
                <IonRadioGroup
                  value={selectCnicOrPassport}
                  onIonChange={(e) => setSelectCnicOrPassport(e.detail.value)}
                >
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonItem lines="none">
                          <IonLabel style={{ fontSize: "14px" }}>
                            CNIC #
                          </IonLabel>
                          <IonRadio slot="start" value="CNIC" />
                        </IonItem>
                      </IonCol>
                      <IonCol>
                        <IonItem lines="none">
                          <IonLabel style={{ fontSize: "14px" }}>
                            Passport #
                          </IonLabel>
                          <IonRadio slot="start" value="Passport" />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonRadioGroup>
              </IonItem>
            </IonItem>
            <IonItem>
              <IonInput
                required
                placeholder="3345678912"
                type="text"
                id="mobileNumber"
                title="Please enter exactly 10 digits"
                itemID="mobileNumber"
                value={mobileNumber}
                style={{
                  color:
                    mobileNumber.startsWith("0") || mobileNumber.startsWith("+")
                      ? "red"
                      : "",
                }}
                onIonChange={handleMobileNumberChange}
              />
            </IonItem>
            <IonText
              color={"danger"}
              style={{
                fontSize: "10px",
                marginBottom: "11px",
                display:
                  mobileNumber.startsWith("0") || mobileNumber.startsWith("+")
                    ? "block"
                    : "none",
              }}
            >
              Mobile Number Must be In 333-1434567 Format
            </IonText>
            <IonItem>
              {/* <IonLabel position="stacked">Date of Birth</IonLabel> */}
              <IonInput
                // slot="end"
                placeholder="Date of Birth"
                type="date"
                max={toDay}
                value={dob}
                onIonChange={(e) => setDob(e.detail.value!)}
                id="db"
              />
            </IonItem>
            <IonRadioGroup
              value={scheduleType}
              onIonChange={(e) => setScheduleType(e.detail.value!)}
            >
              <IonListHeader>Schedule Type</IonListHeader>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel>Regular</IonLabel>
                      <IonRadio slot="start" value="regular" />
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonLabel>Special</IonLabel>
                      <IonRadio slot="start" value="IsSpecial" />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonRadioGroup>
            <IonRadioGroup
              value={gender}
              onIonChange={(e) => setGender(e.detail.value!)}
            >
              <IonListHeader>Gender</IonListHeader>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel style={{ fontSize: "14px" }}>Boy</IonLabel>
                      <IonRadio slot="start" value="boy" />
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonLabel style={{ fontSize: "14px" }}>Girl</IonLabel>
                      <IonRadio slot="start" value="girl" />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonRadioGroup>

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
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel>Is EPI done?</IonLabel>
                    <IonCheckbox
                      slot="start"
                      name="isEPIDone"
                      checked={isEPIDone}
                      onIonChange={(e) => setIsEPIDone(e.detail.checked)}
                      id="epi"
                    />
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonLabel>Is Verified?</IonLabel>
                    <IonCheckbox
                      slot="start"
                      name="IsVerified"
                      checked={isVerified}
                      onIonChange={(e) => setIsVerified(e.detail.checked)}
                      id="verified"
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonButton
              expand="full"
              type="submit"
              id="submit"
              disabled={!canSubmit}
            >
              Add Patient
            </IonButton>
          </form>
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default AddPatient;
