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
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonListHeader,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
// import "./css/addpatient.css";
import Toast from "../../../components/custom-toast/Toast";
import Header from "../../../components/header/Header";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { checkbox, checkmarkOutline } from "ionicons/icons";
import cities from "../../test/citiesData";
type DoctorClinicType = { Id: number; Name: string };
type UpdateType = { match: { params: { Id: number } } };
interface IPatientData {
  Id: number;
  Name: string;
  GuardianName: string;
  Guardian: string;
  Email: string;
  DOB: string;
  Gender: number;
  Type: string;
  City: string;
  CNIC: string;
  // PreferredSchedule: string;
  IsEPIDone: boolean;
  IsVerified: boolean;
  IsInactive: boolean;
  ClinicId: number;
  DoctorId: number;
}
const UpdatePatient: React.FC<UpdateType> = ({
  match: {
    params: { Id },
  },
}) => {
  const [patientData, setPatientData] = useState<IPatientData>();
  const [name, setName] = useState("");
  // const [fatherName, setFatherName] = useState("");
  const [guardian, setGuardian] = useState("");
  const [guardianText, setGuardianText] = useState("");
  const [cnic, setCnic] = useState("");
  const [gender, setGender] = useState("");
  // const [scheduleType, setScheduleType] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  // const [preferredSchedule, setpreferredSchedule] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<number>();
  const [selectedClinic, setSelectedClinic] = useState<number>();
  const [city, setCity] = useState<string>("");
  const [isEPIDone, setIsEPIDone] = useState<boolean>();
  const [isVerified, setIsVerified] = useState<boolean>();
  const [isInactive, setIsInactive] = useState<boolean>();
  const history = useHistory();
  const [clinicData, setClinicData] = useState<DoctorClinicType[]>([]);
  const [doctorData, setDoctorData] = useState<DoctorClinicType[]>([]);

  const [singleClinicData, setSignleClinicData] = useState<DoctorClinicType>();
  const [singleDoctorData, setSingleDoctorData] = useState<DoctorClinicType>();

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const patchOperations = [];

    if (name) {
      patchOperations.push({
        path: "Name",
        op: "replace",
        from: "",
        value: name,
      });
    }

    if (guardian) {
      patchOperations.push({
        path: "GuardianName",
        op: "replace",
        from: "",
        value: guardian,
      });
    }

    // if (fatherName) {
    //   patchOperations.push({
    //     path: "FatherName",
    //     op: "replace",
    //     from: "",
    //     value: fatherName,
    //   });
    // }

    if (email) {
      patchOperations.push({
        path: "Email",
        op: "replace",
        from: "",
        value: email,
      });
    }

    if (dob) {
      patchOperations.push({
        path: "DOB",
        op: "replace",
        from: "",
        value: dob,
      });
    }

    if (gender) {
      patchOperations.push({
        path: "Gender",
        op: "replace",
        from: "",
        value: +gender,
      });
    }

    // if (scheduleType) {
    //   patchOperations.push({
    //     path: "Type",
    //     op: "replace",
    //     from: "",
    //     value: scheduleType,
    //   });
    // }

    if (city) {
      patchOperations.push({
        path: "City",
        op: "replace",
        from: "",
        value: city,
      });
    }

    if (cnic) {
      patchOperations.push({
        path: "CNIC",
        op: "replace",
        from: "",
        value: cnic,
      });
    }

    // if (preferredSchedule) {
    //   patchOperations.push({
    //     path: "PreferredSchedule",
    //     op: "replace",
    //     from: "",
    //     value: preferredSchedule,
    //   });
    // }

    if (isEPIDone !== null) {
      patchOperations.push({
        path: "IsEPIDone",
        op: "replace",
        from: "",
        value: isEPIDone ? 1 : 0,
      });
    }

    if (isVerified !== null) {
      patchOperations.push({
        path: "IsVerified",
        op: "replace",
        from: "",
        value: isVerified ? 1 : 0,
      });
    }

    if (isInactive !== null) {
      patchOperations.push({
        path: "IsInactive",
        op: "replace",
        from: "",
        value: isInactive ? 1 : 0,
      });
    }

    if (selectedClinic) {
      patchOperations.push({
        path: "ClinicId",
        op: "replace",
        from: "",
        value: selectedClinic,
      });
    }

    if (selectedDoctor) {
      patchOperations.push({
        path: "DoctorId",
        op: "replace",
        from: "",
        value: selectedDoctor,
      });
    }

    const requestBody = JSON.stringify(patchOperations);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/Child/${Id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        }
      );
      console.log(response.status);
      if (response.status === 204) {
        setSuccess(true);
        refetchAfterUpdate();
        history.push("/members/child", "back");
        // window.location.reload();
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      clearStateVariables();
    }
  };

  // function to clear all state variables
  const clearStateVariables = () => {
    setName("");
    // setFatherName("");
    setGuardian("");
    setCnic("");
    setGender("");
    setGuardian("");
    // setScheduleType("special");
    setDob("");
    setEmail("");
    setMobileNumber("");
    // setpreferredSchedule("");
    setSelectedDoctor(0);
    setSelectedClinic(0);
    setCity("");
    setIsEPIDone(false);
    setIsVerified(false);
    setIsInactive(false);
  };

  useEffect(() => {
    //prefetching doctor data to pre-populate patient doctor dropdown list
    preFetchPatientDoctorList();

    //prefetching doctor data to pre-populate patient choosen clinic dropdown list
    preFetchPatientClinicList();

    //fetching childData with id to pre-populate form
    preFetchPatientData();
  }, [Id]);
  const preFetchPatientData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}api/Child/${Id}`);
      const PatientData: IPatientData = await res.json();
      //@ts-ignore
      setGender(patientData?.Gender.toString());

      if (res.ok) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}api/Doctor/${PatientData.DoctorId}`
        );
        const singleDoctorData = await response.json();
        setSingleDoctorData(singleDoctorData);

        const anotherResponse = await fetch(
          `${import.meta.env.VITE_API_URL}api/Clinic/${PatientData.ClinicId}`
        );
        const singleClinicData = await anotherResponse.json();
        setSignleClinicData(singleClinicData);
        //@ts-ignore
        setGender(patientData?.Gender);
        setPatientData(PatientData);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const preFetchPatientDoctorList = () => {
    fetch(`${import.meta.env.VITE_API_URL}api/Doctor`)
      .then((res) => res.json())
      .then((data: DoctorClinicType[]) => {
        setDoctorData(data);
      })
      .catch((err) => console.error(err));
  };
  const preFetchPatientClinicList = () => {
    fetch(`${import.meta.env.VITE_API_URL}api/Clinic`)
      .then((res) => res.json())
      .then((data: DoctorClinicType[]) => setClinicData(data))
      .catch((err) => console.error(err));
  };

  const refetchAfterUpdate = () => {
    preFetchPatientDoctorList();
    preFetchPatientClinicList();
    preFetchPatientData();
  };
  return (
    <>
      {patientData && (
        <IonPage>
          <Toast
            isOpen={success}
            setOpen={setSuccess}
            message="Patient added successfully."
            color="success"
          />
          <Toast
            isOpen={error}
            setOpen={setError}
            message="An error occurred while adding patient. plz try again"
            color="danger"
          />
          <Header pageName="Update Patient" />
          <IonCard style={{ overflowY: "scroll" }}>
            <IonCardContent>
              <form onSubmit={handleFormSubmit}>
                <IonItem>
                  <IonLabel position="floating">Patient Name</IonLabel>
                  <IonInput
                    type="text"
                    value={name || patientData.Name}
                    onIonChange={(e) => setName(e.detail.value!)}
                    required
                  />
                </IonItem>
                {/* <IonItem>
                  <IonLabel position="floating">Guardian's Name</IonLabel>
                  <IonInput
                    type="text"
                    value={guardian || patientData.guardian}
                    onIonChange={(e) => setGuardian(e.detail.value!)}
                  />
                </IonItem> */}
                <IonItem lines="full">
                  <IonItem lines="none">
                    <IonLabel position="floating">Guardian's Name</IonLabel>
                    <IonInput
                      type="text"
                      value={guardian || patientData.GuardianName}
                      onIonChange={(e) => setGuardian(e.detail.value!)}
                      required
                      id="fname"
                    />
                  </IonItem>
                  <IonItem lines="none">
                    <IonRadioGroup
                      value={guardianText || patientData.Guardian}
                      onIonChange={(e) => setGuardianText(e.detail.value)}
                    >
                      <IonGrid>
                        <IonRow>
                          <IonCol>
                            <IonItem>
                              <IonLabel>Father</IonLabel>
                              <IonRadio slot="start" value="father" />
                            </IonItem>
                          </IonCol>
                          <IonCol>
                            <IonItem>
                              <IonLabel>Mother</IonLabel>
                              <IonRadio slot="start" value="mother" />
                            </IonItem>
                          </IonCol>
                          <IonCol>
                            <IonItem>
                              <IonLabel>Husband</IonLabel>
                              <IonRadio slot="start" value="husband" />
                            </IonItem>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonRadioGroup>
                  </IonItem>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={email || patientData.Email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">CNIC</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="CNIC"
                    value={cnic || patientData.CNIC}
                    onIonChange={(e) => setCnic(e.detail.value!)}
                    required
                  />
                </IonItem>
                {/* <IonItem>
                  <IonLabel position="floating">Mobile Number</IonLabel>
                  <IonInput
                    type="tel"
                    placeholder="3331231231"
                    value={mobileNumber}
                    onIonChange={(e) => setMobileNumber(e.detail.value!)}
                  />
                </IonItem> */}
                <IonItem>
                  <IonLabel position="floating">Date of Birth</IonLabel>
                  <IonInput
                    slot="end"
                    type="date"
                    value={
                      dob || format(new Date(patientData.DOB), "yyyy-MM-dd")
                    }
                    onIonChange={(e) => setDob(e.detail.value!)}
                  />
                </IonItem>
                <IonRadioGroup
                  value={gender || patientData.Gender}
                  onIonChange={(e) => setGender(e.detail.value)}
                >
                  <IonListHeader>Gender</IonListHeader>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonItem>
                          <IonLabel>Boy</IonLabel>
                          <IonRadio slot="start" value={"0"} />
                        </IonItem>
                      </IonCol>
                      <IonCol>
                        <IonItem>
                          <IonLabel>Girl</IonLabel>
                          <IonRadio slot="start" value={"1"} />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonRadioGroup>
                {/* <IonRadioGroup
                  value={scheduleType || patientData.Type}
                  onIonChange={(e) => setScheduleType(e.detail.value)}
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
                          <IonRadio slot="start" value="special" />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonRadioGroup> */}
                {/* <IonItem>
                  <IonLabel position="floating">Preferred Schedule</IonLabel>
                  <IonInput
                    type="text"
                    value={preferredSchedule || patientData.PreferredSchedule}
                    onIonChange={(e) => setpreferredSchedule(e.detail.value!)}
                  />
                </IonItem> */}
                <IonItem lines="full">
                  <IonInput
                    disabled
                    color={"primary"}
                    label="Doctor: "
                    value={" " + singleDoctorData?.Name}
                    style={{ margin: 0, padding: 0 }}
                    slot="start"
                  />
                  <IonItem lines="none" slot="end">
                    <IonSelect
                      label="Change Doctor"
                      labelPlacement="stacked"
                      color={"primary"}
                      value={selectedDoctor}
                      onIonChange={(e) => setSelectedDoctor(e.detail.value)}
                    >
                      {doctorData &&
                        doctorData.map((item, index) => (
                          <IonSelectOption key={index} value={item.Id}>
                            {item.Name}
                          </IonSelectOption>
                        ))}
                    </IonSelect>
                  </IonItem>
                </IonItem>
                <IonItem lines="full">
                  <IonInput
                    disabled
                    color={"primary"}
                    label="Clinic: "
                    value={" " + singleClinicData?.Name}
                    style={{ margin: 0, padding: 0 }}
                    slot="start"
                  />

                  <IonItem lines="none" slot="end">
                    <IonSelect
                      label="Change Clinic"
                      labelPlacement="stacked"
                      value={selectedClinic}
                      onIonChange={(e) => setSelectedClinic(e.detail.value)}
                    >
                      {clinicData &&
                        clinicData.map((item, index) => (
                          <IonSelectOption key={index} value={item.Id}>
                            {item.Name}
                          </IonSelectOption>
                        ))}
                    </IonSelect>
                  </IonItem>
                </IonItem>
                <IonItem lines="full">
                  <IonInput
                    disabled
                    color={"primary"}
                    label="City: "
                    value={" " + patientData.City}
                    style={{ margin: 0, padding: 0 }}
                    slot="start"
                  />
                  <IonItem slot="end" lines="none">
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
                </IonItem>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Set as Inactive?</IonLabel>
                        <IonCheckbox
                          slot="start"
                          name="IsInactive"
                          checked={isInactive || patientData.IsInactive}
                          onIonChange={(e) => setIsInactive(e.detail.checked)}
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Is EPI done?</IonLabel>
                        <IonCheckbox
                          slot="start"
                          name="IsEpiDone"
                          checked={isEPIDone || patientData.IsEPIDone}
                          onIonChange={(e) => setIsEPIDone(e.detail.checked)}
                        />
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Is Verified?</IonLabel>
                        <IonCheckbox
                          slot="start"
                          name="IsVerified"
                          checked={isVerified || patientData.IsVerified}
                          onIonChange={(e) => setIsVerified(e.detail.checked)}
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <IonButton expand="block" type="submit">
                  Update
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </IonPage>
      )}
    </>
  );
};

export default UpdatePatient;
