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
  IonIcon,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
// import "./css/addpatient.css";
import Toast from "../../../components/custom-toast/Toast";
import Header from "../../../components/header/Header";
import { format } from "date-fns";
import { checkbox, checkmarkOutline } from "ionicons/icons";
type DoctorClinicType = { Id: number; Name: string };
type UpdateType = { match: { params: { Id: number } } };
interface IPatientData {
  Id: number;
  Name: string;
  Guardian: string;
  FatherName: string;
  Email: string;
  DOB: string;
  Gender: string;
  Type: string;
  City: string;
  CNIC: string;
  PreferredSchedule: string;
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
  const [fatherName, setFatherName] = useState("");
  const [guardian, setGuardian] = useState("");
  const [cnic, setCnic] = useState("");
  const [gender, setGender] = useState("boy");
  const [scheduleType, setScheduleType] = useState("special");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [preferredSchedule, setpreferredSchedule] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<number>();
  const [selectedClinic, setSelectedClinic] = useState<number>();
  const [city, setCity] = useState<string>("");
  const [isEPIDone, setIsEPIDone] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isInactive, setIsInactive] = useState(false);

  const [clinicData, setClinicData] = useState<DoctorClinicType[]>([]);
  const [doctorData, setDoctorData] = useState<DoctorClinicType[]>([]);

  const [singleClinicData, setSignleClinicData] = useState<DoctorClinicType>();
  const [singleDoctorData, setSingleDoctorData] = useState<DoctorClinicType>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const formatedDate = format(
    //   new Date(dob),
    //   "yyyy-MM-dd'T'HH:mm:ss.SSSX"
    // );
    const data_to_be_sent = {
      name: name ? name : patientData?.Name,
      guardian: guardian ? guardian : patientData?.Guardian,
      fatherName: fatherName ? fatherName : patientData?.FatherName,
      email: email ? email : patientData?.Email,
      dob: dob ? dob : patientData?.DOB,
      gender: gender ? gender : patientData?.Gender,
      type: scheduleType ? scheduleType : patientData?.Type,
      city: city ? city : patientData?.City,
      cnic: cnic ? cnic : patientData?.CNIC,
      preferredSchedule: preferredSchedule
        ? preferredSchedule
        : patientData?.PreferredSchedule,
      isEPIDone: isEPIDone ? isEPIDone : patientData?.IsEPIDone,
      isVerified: isVerified ? isVerified : patientData?.IsVerified,
      isInactive: isInactive ? isInactive : patientData?.IsInactive,
      clinicId: selectedClinic ? selectedClinic : patientData?.ClinicId,
      doctorId: selectedDoctor ? selectedDoctor : patientData?.DoctorId,
    };

    fetch("http://localhost:5041/api/Child", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_to_be_sent),
    })
      .then((res) => (res.status === 201 ? setSuccess(true) : setError(true)))
      .catch((err) => setError(true))
      .finally(() => {
        clearStateVariables();
      });
  };
  // function to clear all state variables
  const clearStateVariables = () => {
    setName("");
    setFatherName("");
    setGuardian("");
    setCnic("");
    setGender("Boy");
    setScheduleType("special");
    setDob("");
    setEmail("");
    setMobileNumber("");
    setpreferredSchedule("");
    setSelectedDoctor(0);
    setSelectedClinic(0);
    setCity("");
    setIsEPIDone(false);
    setIsVerified(false);
    setIsInactive(false);
  };

  // getting doctors list for dropdown and clinic;
  useEffect(() => {
    fetch(`http://localhost:5041/api/Child/${Id}`)
      .then((res) => res.json())
      .then((data: IPatientData) => setPatientData(data))
      .catch((err) => console.error(err));
    fetch("http://localhost:5041/api/Doctor")
      .then((res) => res.json())
      .then((data: DoctorClinicType[]) => setDoctorData(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:5041/api/Clinic")
      .then((res) => res.json())
      .then((data: DoctorClinicType[]) => setClinicData(data))
      .catch((err) => console.error(err));

    const filterDoctor = doctorData.filter(
      (item) => item.Id === patientData?.Id
    );
    const filterClinic = clinicData.filter(
      (item) => item.Id === patientData?.Id
    );
    setSingleDoctorData(filterDoctor[0]);
    setSignleClinicData(filterClinic[0]);
  }, []);

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
                <IonItem>
                  <IonLabel position="floating">Guardian's Name</IonLabel>
                  <IonInput
                    type="text"
                    value={guardian || patientData.Guardian}
                    onIonChange={(e) => setGuardian(e.detail.value!)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Father's Name</IonLabel>
                  <IonInput
                    type="text"
                    value={fatherName || patientData.FatherName}
                    onIonChange={(e) => setFatherName(e.detail.value!)}
                    required
                  />
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
                <IonItem>
                  <IonLabel position="floating">Mobile Number</IonLabel>
                  <IonInput
                    type="tel"
                    placeholder="3331231231"
                    value={mobileNumber}
                    onIonChange={(e) => setMobileNumber(e.detail.value!)}
                  />
                </IonItem>
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
                          <IonRadio slot="start" value="boy" />
                        </IonItem>
                      </IonCol>
                      <IonCol>
                        <IonItem>
                          <IonLabel>Girl</IonLabel>
                          <IonRadio slot="start" value="girl" />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonRadioGroup>
                <IonRadioGroup
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
                </IonRadioGroup>
                <IonItem>
                  <IonLabel position="floating">Preferred Schedule</IonLabel>
                  <IonInput
                    type="text"
                    value={preferredSchedule || patientData.PreferredSchedule}
                    onIonChange={(e) => setpreferredSchedule(e.detail.value!)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">{"selected doctor"}</IonLabel>
                  <IonSelect
                    value={selectedDoctor}
                    onIonChange={(e) => setSelectedDoctor(e.detail.value)}
                  >
                    {singleDoctorData && (
                      <IonSelectOption value={singleDoctorData.Id}>
                        {singleDoctorData.Name}
                      </IonSelectOption>
                    )}
                    {doctorData &&
                      doctorData.map((item, index) => {
                        if (item.Id !== singleDoctorData?.Id) {
                          return (
                            <IonSelectOption key={index} value={item.Id}>
                              {item.Name}
                            </IonSelectOption>
                          );
                        }
                        return null;
                      })}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">{"selected clinic"}</IonLabel>
                  <IonSelect
                    value={selectedClinic || singleClinicData?.Name}
                    onIonChange={(e) => setSelectedClinic(e.detail.value)}
                  >
                    {singleClinicData && (
                      <IonSelectOption value={singleClinicData.Id}>
                        {singleClinicData.Name}
                      </IonSelectOption>
                    )}
                    {clinicData &&
                      clinicData.map((item, index) => {
                        if (item.Id !== singleClinicData?.Id) {
                          return (
                            <IonSelectOption key={index} value={item.Id}>
                              {item.Name}
                            </IonSelectOption>
                          );
                        }
                        return null;
                      })}
                  </IonSelect>
                </IonItem>
                {/* <IonItem>
                  <IonSelect
                    label="Select City"
                    value={city || patientData.City}
                    onIonChange={(e) => setCity(e.detail.value!)}
                    labelPlacement="floating"
                  >
                    <IonSelectOption value="">
                      <em> Choose...</em>
                    </IonSelectOption>
                    <IonSelectOption value="Abbottabad">
                      Abbottabad
                    </IonSelectOption>
                    <IonSelectOption value="Adezai">Adezai</IonSelectOption>
                    <IonSelectOption value="Ali Bandar">
                      Ali Bandar
                    </IonSelectOption>
                    <IonSelectOption value="Amir Chah">
                      Amir Chah
                    </IonSelectOption>
                    <IonSelectOption value="Attock">Attock</IonSelectOption>
                    <IonSelectOption value="Ayubia">Ayubia</IonSelectOption>
                    <IonSelectOption value="Bahawalpur">
                      Bahawalpur
                    </IonSelectOption>
                    <IonSelectOption value="Baden">Baden</IonSelectOption>
                    <IonSelectOption value="Bagh">Bagh</IonSelectOption>
                    <IonSelectOption value="Bahawalnagar">
                      Bahawalnagar
                    </IonSelectOption>
                    <IonSelectOption value="Burewala">Burewala</IonSelectOption>
                    <IonSelectOption value="Banda Daud Shah">
                      Banda Daud Shah
                    </IonSelectOption>
                    <IonSelectOption value="Bannu district|Bannu">
                      Bannu
                    </IonSelectOption>
                    <IonSelectOption value="Batagram">Batagram</IonSelectOption>
                    <IonSelectOption value="Bazdar">Bazdar</IonSelectOption>
                    <IonSelectOption value="Bela">Bela</IonSelectOption>
                    <IonSelectOption value="Bellpat">Bellpat</IonSelectOption>
                    <IonSelectOption value="Bhag">Bhag</IonSelectOption>
                    <IonSelectOption value="Bhakkar">Bhakkar</IonSelectOption>
                    <IonSelectOption value="Bhalwal">Bhalwal</IonSelectOption>
                    <IonSelectOption value="Bhimber">Bhimber</IonSelectOption>
                    <IonSelectOption value="Birote">Birote</IonSelectOption>
                    <IonSelectOption value="Buner">Buner</IonSelectOption>
                    <IonSelectOption value="Burj">Burj</IonSelectOption>
                    <IonSelectOption value="Chiniot">Chiniot</IonSelectOption>
                    <IonSelectOption value="Chachro">Chachro</IonSelectOption>
                    <IonSelectOption value="Chagai">Chagai</IonSelectOption>
                    <IonSelectOption value="Chah Sandan">
                      Chah Sandan
                    </IonSelectOption>
                    <IonSelectOption value="Chailianwala">
                      Chailianwala
                    </IonSelectOption>
                    <IonSelectOption value="Chakdara">Chakdara</IonSelectOption>
                    <IonSelectOption value="Chakku">Chakku</IonSelectOption>
                    <IonSelectOption value="Chakwal">Chakwal</IonSelectOption>
                    <IonSelectOption value="Chaman">Chaman</IonSelectOption>
                    <IonSelectOption value="Charsadda">
                      Charsadda
                    </IonSelectOption>
                    <IonSelectOption value="Chhatr">Chhatr</IonSelectOption>
                    <IonSelectOption value="Chichawatni">
                      Chichawatni
                    </IonSelectOption>
                    <IonSelectOption value="Chitral">Chitral</IonSelectOption>
                    <IonSelectOption value="Dadu">Dadu</IonSelectOption>
                    <IonSelectOption value="Dera Ghazi Khan">
                      Dera Ghazi Khan
                    </IonSelectOption>
                    <IonSelectOption value="Dera Ismail Khan">
                      Dera Ismail Khan
                    </IonSelectOption>
                    <IonSelectOption value="Dalbandin">
                      Dalbandin
                    </IonSelectOption>
                    <IonSelectOption value="Dargai">Dargai</IonSelectOption>
                    <IonSelectOption value="Darya Khan">
                      Darya Khan
                    </IonSelectOption>
                    <IonSelectOption value="Daska">Daska</IonSelectOption>
                    <IonSelectOption value="Dera Bugti">
                      Dera Bugti
                    </IonSelectOption>
                    <IonSelectOption value="Dhana Sar">
                      Dhana Sar
                    </IonSelectOption>
                    <IonSelectOption value="Digri">Digri</IonSelectOption>
                    <IonSelectOption value="Dina City|Dina">
                      Dina
                    </IonSelectOption>
                    <IonSelectOption value="Dinga">Dinga</IonSelectOption>
                    <IonSelectOption value="Diplo, Pakistan|Diplo">
                      Diplo
                    </IonSelectOption>
                    <IonSelectOption value="Diwana">Diwana</IonSelectOption>
                    <IonSelectOption value="Dokri">Dokri</IonSelectOption>
                    <IonSelectOption value="Drosh">Drosh</IonSelectOption>
                    <IonSelectOption value="Duki">Duki</IonSelectOption>
                    <IonSelectOption value="Dushi">Dushi</IonSelectOption>
                    <IonSelectOption value="Duzab">Duzab</IonSelectOption>
                    <IonSelectOption value="Faisalabad">
                      Faisalabad
                    </IonSelectOption>
                    <IonSelectOption value="Fateh Jang">
                      Fateh Jang
                    </IonSelectOption>
                    <IonSelectOption value="Ghotki">Ghotki</IonSelectOption>
                    <IonSelectOption value="Gwadar">Gwadar</IonSelectOption>
                    <IonSelectOption value="Gujranwala">
                      Gujranwala
                    </IonSelectOption>
                    <IonSelectOption value="Gujrat">Gujrat</IonSelectOption>
                    <IonSelectOption value="Gadra">Gadra</IonSelectOption>
                    <IonSelectOption value="Gajar">Gajar</IonSelectOption>
                    <IonSelectOption value="Gandava">Gandava</IonSelectOption>
                    <IonSelectOption value="Garhi Khairo">
                      Garhi Khairo
                    </IonSelectOption>
                    <IonSelectOption value="Garruck">Garruck</IonSelectOption>
                    <IonSelectOption value="Ghakhar Mandi">
                      Ghakhar Mandi
                    </IonSelectOption>
                    <IonSelectOption value="Ghanian">Ghanian</IonSelectOption>
                    <IonSelectOption value="Ghauspur">Ghauspur</IonSelectOption>
                    <IonSelectOption value="Ghazluna">Ghazluna</IonSelectOption>
                    <IonSelectOption value="Girdan">Girdan</IonSelectOption>
                    <IonSelectOption value="Gulistan">Gulistan</IonSelectOption>
                    <IonSelectOption value="Gwash">Gwash</IonSelectOption>
                    <IonSelectOption value="Hyderabad">
                      Hyderabad
                    </IonSelectOption>
                    <IonSelectOption value="Hala">Hala</IonSelectOption>
                    <IonSelectOption value="Haripur">Haripur</IonSelectOption>
                    <IonSelectOption value="Hab Chauki">
                      Hab Chauki
                    </IonSelectOption>
                    <IonSelectOption value="Hafizabad">
                      Hafizabad
                    </IonSelectOption>
                    <IonSelectOption value="Hameedabad">
                      Hameedabad
                    </IonSelectOption>
                    <IonSelectOption value="Hangu">Hangu</IonSelectOption>
                    <IonSelectOption value="Harnai">Harnai</IonSelectOption>
                    <IonSelectOption value="Hasilpur">Hasilpur</IonSelectOption>
                    <IonSelectOption value="Haveli Lakha">
                      Haveli Lakha
                    </IonSelectOption>
                    <IonSelectOption value="Hinglaj">Hinglaj</IonSelectOption>
                    <IonSelectOption value="Hoshab">Hoshab</IonSelectOption>
                    <IonSelectOption value="Islamabad">
                      Islamabad
                    </IonSelectOption>
                    <IonSelectOption value="Islamkot">Islamkot</IonSelectOption>
                    <IonSelectOption value="Ispikan">Ispikan</IonSelectOption>
                    <IonSelectOption value="Jacobabad">
                      Jacobabad
                    </IonSelectOption>
                    <IonSelectOption value="Jamshoro">Jamshoro</IonSelectOption>
                    <IonSelectOption value="Jhang">Jhang</IonSelectOption>
                    <IonSelectOption value="Jhelum">Jhelum</IonSelectOption>
                    <IonSelectOption value="Jamesabad">
                      Jamesabad
                    </IonSelectOption>
                    <IonSelectOption value="Jampur">Jampur</IonSelectOption>
                    <IonSelectOption value="Janghar">Janghar</IonSelectOption>
                    <IonSelectOption value="Jati, Jati(Mughalbhin)">
                      Jati
                    </IonSelectOption>
                    <IonSelectOption value="Jauharabad">
                      Jauharabad
                    </IonSelectOption>
                    <IonSelectOption value="Jhal">Jhal</IonSelectOption>
                    <IonSelectOption value="Jhal Jhao">
                      Jhal Jhao
                    </IonSelectOption>
                    <IonSelectOption value="Jhatpat">Jhatpat</IonSelectOption>
                    <IonSelectOption value="Jhudo">Jhudo</IonSelectOption>
                    <IonSelectOption value="Jiwani">Jiwani</IonSelectOption>
                    <IonSelectOption value="Jungshahi">
                      Jungshahi
                    </IonSelectOption>
                    <IonSelectOption value="Karachi">Karachi</IonSelectOption>
                    <IonSelectOption value="Kotri">Kotri</IonSelectOption>
                    <IonSelectOption value="Kalam">Kalam</IonSelectOption>
                    <IonSelectOption value="Kalandi">Kalandi</IonSelectOption>
                    <IonSelectOption value="Kalat">Kalat</IonSelectOption>
                    <IonSelectOption value="Kamalia">Kamalia</IonSelectOption>
                    <IonSelectOption value="Kamararod">
                      Kamararod
                    </IonSelectOption>
                    <IonSelectOption value="Kamber">Kamber</IonSelectOption>
                    <IonSelectOption value="Kamokey">Kamokey</IonSelectOption>
                    <IonSelectOption value="Kanak">Kanak</IonSelectOption>
                    <IonSelectOption value="Kandi">Kandi</IonSelectOption>
                    <IonSelectOption value="Kandiaro">Kandiaro</IonSelectOption>
                    <IonSelectOption value="Kanpur">Kanpur</IonSelectOption>
                    <IonSelectOption value="Kapip">Kapip</IonSelectOption>
                    <IonSelectOption value="Kappar">Kappar</IonSelectOption>
                    <IonSelectOption value="Karak City">
                      Karak City
                    </IonSelectOption>
                    <IonSelectOption value="Karodi">Karodi</IonSelectOption>
                    <IonSelectOption value="Kashmor">Kashmor</IonSelectOption>
                    <IonSelectOption value="Kasur">Kasur</IonSelectOption>
                    <IonSelectOption value="Katuri">Katuri</IonSelectOption>
                    <IonSelectOption value="Keti Bandar">
                      Keti Bandar
                    </IonSelectOption>
                    <IonSelectOption value="Khairpur">Khairpur</IonSelectOption>
                    <IonSelectOption value="Khanaspur">
                      Khanaspur
                    </IonSelectOption>
                    <IonSelectOption value="Khanewal">Khanewal</IonSelectOption>
                    <IonSelectOption value="Kharan">Kharan</IonSelectOption>
                    <IonSelectOption value="kharian">kharian</IonSelectOption>
                    <IonSelectOption value="Khokhropur">
                      Khokhropur
                    </IonSelectOption>
                    <IonSelectOption value="Khora">Khora</IonSelectOption>
                    <IonSelectOption value="Khushab">Khushab</IonSelectOption>
                    <IonSelectOption value="Khuzdar">Khuzdar</IonSelectOption>
                    <IonSelectOption value="Kikki">Kikki</IonSelectOption>
                    <IonSelectOption value="Klupro">Klupro</IonSelectOption>
                    <IonSelectOption value="Kohan">Kohan</IonSelectOption>
                    <IonSelectOption value="Kohat">Kohat</IonSelectOption>
                    <IonSelectOption value="Kohistan">Kohistan</IonSelectOption>
                    <IonSelectOption value="Kohlu">Kohlu</IonSelectOption>
                    <IonSelectOption value="Korak">Korak</IonSelectOption>
                    <IonSelectOption value="Korangi">Korangi</IonSelectOption>
                    <IonSelectOption value="Kot Sarae">
                      Kot Sarae
                    </IonSelectOption>
                    <IonSelectOption value="Kotli">Kotli</IonSelectOption>
                    <IonSelectOption value="Lahore">Lahore</IonSelectOption>
                    <IonSelectOption value="Larkana">Larkana</IonSelectOption>
                    <IonSelectOption value="Lahri">Lahri</IonSelectOption>
                    <IonSelectOption value="Lakki Marwat">
                      Lakki Marwat
                    </IonSelectOption>
                    <IonSelectOption value="Lasbela">Lasbela</IonSelectOption>
                    <IonSelectOption value="Latamber">Latamber</IonSelectOption>
                    <IonSelectOption value="Layyah">Layyah</IonSelectOption>
                    <IonSelectOption value="Leiah">Leiah</IonSelectOption>
                    <IonSelectOption value="Liari">Liari</IonSelectOption>
                    <IonSelectOption value="Lodhran">Lodhran</IonSelectOption>
                    <IonSelectOption value="Loralai">Loralai</IonSelectOption>
                    <IonSelectOption value="Lower Dir">
                      Lower Dir
                    </IonSelectOption>
                    <IonSelectOption value="Shadan Lund">
                      Shadan Lund
                    </IonSelectOption>
                    <IonSelectOption value="Multan">Multan</IonSelectOption>
                    <IonSelectOption value="Mandi Bahauddin">
                      Mandi Bahauddin
                    </IonSelectOption>
                    <IonSelectOption value="Mansehra">Mansehra</IonSelectOption>
                    <IonSelectOption value="Mian Chanu">
                      Mian Chanu
                    </IonSelectOption>
                    <IonSelectOption value="Mirpur">Mirpur</IonSelectOption>
                    <IonSelectOption value="Moro, Pakistan|Moro">
                      Moro
                    </IonSelectOption>
                    <IonSelectOption value="Mardan">Mardan</IonSelectOption>
                    <IonSelectOption value="Mach">Mach</IonSelectOption>
                    <IonSelectOption value="Madyan">Madyan</IonSelectOption>
                    <IonSelectOption value="Malakand">Malakand</IonSelectOption>
                    <IonSelectOption value="Mand">Mand</IonSelectOption>
                    <IonSelectOption value="Manguchar">
                      Manguchar
                    </IonSelectOption>
                    <IonSelectOption value="Mashki Chah">
                      Mashki Chah
                    </IonSelectOption>
                    <IonSelectOption value="Maslti">Maslti</IonSelectOption>
                    <IonSelectOption value="Mastuj">Mastuj</IonSelectOption>
                    <IonSelectOption value="Mastung">Mastung</IonSelectOption>
                    <IonSelectOption value="Mathi">Mathi</IonSelectOption>
                    <IonSelectOption value="Matiari">Matiari</IonSelectOption>
                    <IonSelectOption value="Mehar">Mehar</IonSelectOption>
                    <IonSelectOption value="Mekhtar">Mekhtar</IonSelectOption>
                    <IonSelectOption value="Merui">Merui</IonSelectOption>
                    <IonSelectOption value="Mianwali">Mianwali</IonSelectOption>
                    <IonSelectOption value="Mianez">Mianez</IonSelectOption>
                    <IonSelectOption value="Mirpur Batoro">
                      Mirpur Batoro
                    </IonSelectOption>
                    <IonSelectOption value="Mirpur Khas">
                      Mirpur Khas
                    </IonSelectOption>
                    <IonSelectOption value="Mirpur Sakro">
                      Mirpur Sakro
                    </IonSelectOption>
                    <IonSelectOption value="Mithi">Mithi</IonSelectOption>
                    <IonSelectOption value="Mongora">Mongora</IonSelectOption>
                    <IonSelectOption value="Murgha Kibzai">
                      Murgha Kibzai
                    </IonSelectOption>
                    <IonSelectOption value="Muridke">Muridke</IonSelectOption>
                    <IonSelectOption value="Musa Khel Bazar">
                      Musa Khel Bazar
                    </IonSelectOption>
                    <IonSelectOption value="Muzaffar Garh">
                      Muzaffar Garh
                    </IonSelectOption>
                    <IonSelectOption value="Muzaffarabad">
                      Muzaffarabad
                    </IonSelectOption>
                    <IonSelectOption value="Nawabshah">
                      Nawabshah
                    </IonSelectOption>
                    <IonSelectOption value="Nazimabad">
                      Nazimabad
                    </IonSelectOption>
                    <IonSelectOption value="Nowshera">Nowshera</IonSelectOption>
                    <IonSelectOption value="Nagar Parkar">
                      Nagar Parkar
                    </IonSelectOption>
                    <IonSelectOption value="Nagha Kalat">
                      Nagha Kalat
                    </IonSelectOption>
                    <IonSelectOption value="Nal">Nal</IonSelectOption>
                    <IonSelectOption value="Naokot">Naokot</IonSelectOption>
                    <IonSelectOption value="Nasirabad">
                      Nasirabad
                    </IonSelectOption>
                    <IonSelectOption value="Nauroz Kalat">
                      Nauroz Kalat
                    </IonSelectOption>
                    <IonSelectOption value="Naushara">Naushara</IonSelectOption>
                    <IonSelectOption value="Nur Gamma">
                      Nur Gamma
                    </IonSelectOption>
                    <IonSelectOption value="Nushki">Nushki</IonSelectOption>
                    <IonSelectOption value="Nuttal">Nuttal</IonSelectOption>
                    <IonSelectOption value="Okara">Okara</IonSelectOption>
                    <IonSelectOption value="Ormara">Ormara</IonSelectOption>
                    <IonSelectOption value="Peshawar">Peshawar</IonSelectOption>
                    <IonSelectOption value="Panjgur">Panjgur</IonSelectOption>
                    <IonSelectOption value="Pasni City">
                      Pasni City
                    </IonSelectOption>
                    <IonSelectOption value="Paharpur">Paharpur</IonSelectOption>
                    <IonSelectOption value="Palantuk">Palantuk</IonSelectOption>
                    <IonSelectOption value="Pendoo">Pendoo</IonSelectOption>
                    <IonSelectOption value="Piharak">Piharak</IonSelectOption>
                    <IonSelectOption value="Pirmahal">Pirmahal</IonSelectOption>
                    <IonSelectOption value="Pishin">Pishin</IonSelectOption>
                    <IonSelectOption value="Plandri">Plandri</IonSelectOption>
                    <IonSelectOption value="Pokran">Pokran</IonSelectOption>
                    <IonSelectOption value="Pounch">Pounch</IonSelectOption>
                    <IonSelectOption value="Quetta">Quetta</IonSelectOption>
                    <IonSelectOption value="Qambar">Qambar</IonSelectOption>
                    <IonSelectOption value="Qamruddin Karez">
                      Qamruddin Karez
                    </IonSelectOption>
                    <IonSelectOption value="Qazi Ahmad">
                      Qazi Ahmad
                    </IonSelectOption>
                    <IonSelectOption value="Qila Abdullah">
                      Qila Abdullah
                    </IonSelectOption>
                    <IonSelectOption value="Qila Ladgasht">
                      Qila Ladgasht
                    </IonSelectOption>
                    <IonSelectOption value="Qila Safed">
                      Qila Safed
                    </IonSelectOption>
                    <IonSelectOption value="Qila Saifullah">
                      Qila Saifullah
                    </IonSelectOption>
                    <IonSelectOption value="Rawalpindi">
                      Rawalpindi
                    </IonSelectOption>
                    <IonSelectOption value="Rabwah">Rabwah</IonSelectOption>
                    <IonSelectOption value="Rahim Yar Khan">
                      Rahim Yar Khan
                    </IonSelectOption>
                    <IonSelectOption value="Rajan Pur">
                      Rajan Pur
                    </IonSelectOption>
                    <IonSelectOption value="Rakhni">Rakhni</IonSelectOption>
                    <IonSelectOption value="Ranipur">Ranipur</IonSelectOption>
                    <IonSelectOption value="Ratodero">Ratodero</IonSelectOption>
                    <IonSelectOption value="Rawalakot">
                      Rawalakot
                    </IonSelectOption>
                    <IonSelectOption value="Renala Khurd">
                      Renala Khurd
                    </IonSelectOption>
                    <IonSelectOption value="Robat Thana">
                      Robat Thana
                    </IonSelectOption>
                    <IonSelectOption value="Rodkhan">Rodkhan</IonSelectOption>
                    <IonSelectOption value="Rohri">Rohri</IonSelectOption>
                    <IonSelectOption value="Sialkot">Sialkot</IonSelectOption>
                    <IonSelectOption value="Sadiqabad">
                      Sadiqabad
                    </IonSelectOption>
                    <IonSelectOption value="Safdar Abad- (Dhaban Singh)">
                      SafdarAbad
                    </IonSelectOption>
                    <IonSelectOption value="Sahiwal">Sahiwal</IonSelectOption>
                    <IonSelectOption value="Saidu Sharif">
                      Saidu Sharif
                    </IonSelectOption>
                    <IonSelectOption value="Saindak">Saindak</IonSelectOption>
                    <IonSelectOption value="Sakrand">Sakrand</IonSelectOption>
                    <IonSelectOption value="Sanjawi">Sanjawi</IonSelectOption>
                    <IonSelectOption value="Sargodha">Sargodha</IonSelectOption>
                    <IonSelectOption value="Saruna">Saruna</IonSelectOption>
                    <IonSelectOption value="Shabaz Kalat">
                      Shabaz Kalat
                    </IonSelectOption>
                    <IonSelectOption value="Shadadkhot">
                      Shadadkhot
                    </IonSelectOption>
                    <IonSelectOption value="Shahbandar">
                      Shahbandar
                    </IonSelectOption>
                    <IonSelectOption value="Shahpur">Shahpur</IonSelectOption>
                    <IonSelectOption value="Shahpur Chakar">
                      Shahpur Chakar
                    </IonSelectOption>
                    <IonSelectOption value="Shakargarh">
                      Shakargarh
                    </IonSelectOption>
                    <IonSelectOption value="Shangla">Shangla</IonSelectOption>
                    <IonSelectOption value="Sharam Jogizai">
                      Sharam Jogizai
                    </IonSelectOption>
                    <IonSelectOption value="Sheikhupura">
                      Sheikhupura
                    </IonSelectOption>
                    <IonSelectOption value="Shikarpur">
                      Shikarpur
                    </IonSelectOption>
                    <IonSelectOption value="Shingar">Shingar</IonSelectOption>
                    <IonSelectOption value="Shorap">Shorap</IonSelectOption>
                    <IonSelectOption value="Sibi">Sibi</IonSelectOption>
                    <IonSelectOption value="Sohawa">Sohawa</IonSelectOption>
                    <IonSelectOption value="Sonmiani">Sonmiani</IonSelectOption>
                    <IonSelectOption value="Sooianwala">
                      Sooianwala
                    </IonSelectOption>
                    <IonSelectOption value="Spezand">Spezand</IonSelectOption>
                    <IonSelectOption value="Spintangi">
                      Spintangi
                    </IonSelectOption>
                    <IonSelectOption value="Sui">Sui</IonSelectOption>
                    <IonSelectOption value="Sujawal">Sujawal</IonSelectOption>
                    <IonSelectOption value="Sukkur">Sukkur</IonSelectOption>
                    <IonSelectOption value="Suntsar">Suntsar</IonSelectOption>
                    <IonSelectOption value="Surab">Surab</IonSelectOption>
                    <IonSelectOption value="Swabi">Swabi</IonSelectOption>
                    <IonSelectOption value="Swat">Swat</IonSelectOption>
                    <IonSelectOption value="Tando Adam">
                      Tando Adam
                    </IonSelectOption>
                    <IonSelectOption value="Tando Bago">
                      Tando Bago
                    </IonSelectOption>
                    <IonSelectOption value="Tangi">Tangi</IonSelectOption>
                    <IonSelectOption value="Tank City">
                      Tank City
                    </IonSelectOption>
                    <IonSelectOption value="Tar Ahamd Rind">
                      Tar Ahamd Rind
                    </IonSelectOption>
                    <IonSelectOption value="Thalo">Thalo</IonSelectOption>
                    <IonSelectOption value="Thatta">Thatta</IonSelectOption>
                    <IonSelectOption value="Toba Tek Singh">
                      Toba Tek Singh
                    </IonSelectOption>
                    <IonSelectOption value="Tordher">Tordher</IonSelectOption>
                    <IonSelectOption value="Tujal">Tujal</IonSelectOption>
                    <IonSelectOption value="Tump">Tump</IonSelectOption>
                    <IonSelectOption value="Turbat">Turbat</IonSelectOption>
                    <IonSelectOption value="Umarao">Umarao</IonSelectOption>
                    <IonSelectOption value="Umarkot">Umarkot</IonSelectOption>
                    <IonSelectOption value="Upper Dir">
                      Upper Dir
                    </IonSelectOption>
                    <IonSelectOption value="Uthal">Uthal</IonSelectOption>
                    <IonSelectOption value="Vehari">Vehari</IonSelectOption>
                    <IonSelectOption value="Veirwaro">Veirwaro</IonSelectOption>
                    <IonSelectOption value="Vitakri">Vitakri</IonSelectOption>
                    <IonSelectOption value="Wadh">Wadh</IonSelectOption>
                    <IonSelectOption value="Wah Cantt">
                      Wah Cantt
                    </IonSelectOption>
                    <IonSelectOption value="Warah">Warah</IonSelectOption>
                    <IonSelectOption value="Washap">Washap</IonSelectOption>
                    <IonSelectOption value="Wasjuk">Wasjuk</IonSelectOption>
                    <IonSelectOption value="Wazirabad">
                      Wazirabad
                    </IonSelectOption>
                    <IonSelectOption value="Yakmach">Yakmach</IonSelectOption>
                    <IonSelectOption value="Zhob">Zhob</IonSelectOption>
                    <IonSelectOption value="Other">Other</IonSelectOption>
                  </IonSelect>
                </IonItem> */}
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
                <IonButton
                  expand="block"
                  onClick={() => console.log("updated")}
                >
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
