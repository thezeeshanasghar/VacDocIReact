import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
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
        setSuccess(true);
        localStorage.clear();
        history.push("/members/doctor/clinic", "back");
        window.location.reload();
      } else {
        throw new Error("Failed to create clinic");
      }
    } catch (error) {
      localStorage.clear();
      setError(true);
    }
  };

  // const postclinictiming = async (cid: string) => {
  //   // localStorage.clear();
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

  //   const data = newArray.map(async (day) => {
  //     const storedData = localStorage.getItem(day);
  //     console.log(storedData, "this is storedData");
  //     // console.log(storedData.length)

  //     const parsedData = storedData ? JSON.parse(storedData) : null;
  //     console.log(parsedData);
  //     const response = await fetch(
  //       `${
  //         import.meta.env.VITE_API_URL
  //       }api/Clinictiming/api/clintimings/AddorUpdate/${cid}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(parsedData),
  //       }
  //     )
  //       .then((res) => {
  //         if (res.status === 200) {
  //           localStorage.clear();
  //         } else {
  //           setError(false);
  //           localStorage.clear();
  //         }
  //       })
  //       .catch((err) => setError(true));

  //     // localStorage.clear();
  //     // return parsedData;

  //     // localStorage.clear()
  //   });

  //   // const allData = data.map((i) => i[0]);
  //   // console.log(cid);
  //   // registerDoctor(allData, cid);
  //   // setSuccess(true);
  //   localStorage.clear();
  // };

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
          <IonItem>
            <IonLabel position="stacked" color="primary">
              {" "}
              City
            </IonLabel>
            <IonSelect
              value={city}
              onIonChange={(e) => setCity(e.detail.value!)}
              id="city"
            >
              <IonSelectOption value="">
                <em> Choose...</em>
              </IonSelectOption>
              <IonSelectOption value="Abbottabad">Abbottabad</IonSelectOption>
              <IonSelectOption value="Adezai">Adezai</IonSelectOption>
              <IonSelectOption value="Ali Bandar">Ali Bandar</IonSelectOption>
              <IonSelectOption value="Amir Chah">Amir Chah</IonSelectOption>
              <IonSelectOption value="Attock">Attock</IonSelectOption>
              <IonSelectOption value="Ayubia">Ayubia</IonSelectOption>
              <IonSelectOption value="Bahawalpur">Bahawalpur</IonSelectOption>
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
              <IonSelectOption value="Chah Sandan">Chah Sandan</IonSelectOption>
              <IonSelectOption value="Chailianwala">
                Chailianwala
              </IonSelectOption>
              <IonSelectOption value="Chakdara">Chakdara</IonSelectOption>
              <IonSelectOption value="Chakku">Chakku</IonSelectOption>
              <IonSelectOption value="Chakwal">Chakwal</IonSelectOption>
              <IonSelectOption value="Chaman">Chaman</IonSelectOption>
              <IonSelectOption value="Charsadda">Charsadda</IonSelectOption>
              <IonSelectOption value="Chhatr">Chhatr</IonSelectOption>
              <IonSelectOption value="Chichawatni">Chichawatni</IonSelectOption>
              <IonSelectOption value="Chitral">Chitral</IonSelectOption>
              <IonSelectOption value="Dadu">Dadu</IonSelectOption>
              <IonSelectOption value="Dera Ghazi Khan">
                Dera Ghazi Khan
              </IonSelectOption>
              <IonSelectOption value="Dera Ismail Khan">
                Dera Ismail Khan
              </IonSelectOption>
              <IonSelectOption value="Dalbandin">Dalbandin</IonSelectOption>
              <IonSelectOption value="Dargai">Dargai</IonSelectOption>
              <IonSelectOption value="Darya Khan">Darya Khan</IonSelectOption>
              <IonSelectOption value="Daska">Daska</IonSelectOption>
              <IonSelectOption value="Dera Bugti">Dera Bugti</IonSelectOption>
              <IonSelectOption value="Dhana Sar">Dhana Sar</IonSelectOption>
              <IonSelectOption value="Digri">Digri</IonSelectOption>
              <IonSelectOption value="Dina City|Dina">Dina</IonSelectOption>
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
              <IonSelectOption value="Faisalabad">Faisalabad</IonSelectOption>
              <IonSelectOption value="Fateh Jang">Fateh Jang</IonSelectOption>
              <IonSelectOption value="Ghotki">Ghotki</IonSelectOption>
              <IonSelectOption value="Gwadar">Gwadar</IonSelectOption>
              <IonSelectOption value="Gujranwala">Gujranwala</IonSelectOption>
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
              <IonSelectOption value="Hyderabad">Hyderabad</IonSelectOption>
              <IonSelectOption value="Hala">Hala</IonSelectOption>
              <IonSelectOption value="Haripur">Haripur</IonSelectOption>
              <IonSelectOption value="Hab Chauki">Hab Chauki</IonSelectOption>
              <IonSelectOption value="Hafizabad">Hafizabad</IonSelectOption>
              <IonSelectOption value="Hameedabad">Hameedabad</IonSelectOption>
              <IonSelectOption value="Hangu">Hangu</IonSelectOption>
              <IonSelectOption value="Harnai">Harnai</IonSelectOption>
              <IonSelectOption value="Hasilpur">Hasilpur</IonSelectOption>
              <IonSelectOption value="Haveli Lakha">
                Haveli Lakha
              </IonSelectOption>
              <IonSelectOption value="Hinglaj">Hinglaj</IonSelectOption>
              <IonSelectOption value="Hoshab">Hoshab</IonSelectOption>
              <IonSelectOption value="Islamabad">Islamabad</IonSelectOption>
              <IonSelectOption value="Islamkot">Islamkot</IonSelectOption>
              <IonSelectOption value="Ispikan">Ispikan</IonSelectOption>
              <IonSelectOption value="Jacobabad">Jacobabad</IonSelectOption>
              <IonSelectOption value="Jamshoro">Jamshoro</IonSelectOption>
              <IonSelectOption value="Jhang">Jhang</IonSelectOption>
              <IonSelectOption value="Jhelum">Jhelum</IonSelectOption>
              <IonSelectOption value="Jamesabad">Jamesabad</IonSelectOption>
              <IonSelectOption value="Jampur">Jampur</IonSelectOption>
              <IonSelectOption value="Janghar">Janghar</IonSelectOption>
              <IonSelectOption value="Jati, Jati(Mughalbhin)">
                Jati
              </IonSelectOption>
              <IonSelectOption value="Jauharabad">Jauharabad</IonSelectOption>
              <IonSelectOption value="Jhal">Jhal</IonSelectOption>
              <IonSelectOption value="Jhal Jhao">Jhal Jhao</IonSelectOption>
              <IonSelectOption value="Jhatpat">Jhatpat</IonSelectOption>
              <IonSelectOption value="Jhudo">Jhudo</IonSelectOption>
              <IonSelectOption value="Jiwani">Jiwani</IonSelectOption>
              <IonSelectOption value="Jungshahi">Jungshahi</IonSelectOption>
              <IonSelectOption value="Karachi">Karachi</IonSelectOption>
              <IonSelectOption value="Kotri">Kotri</IonSelectOption>
              <IonSelectOption value="Kalam">Kalam</IonSelectOption>
              <IonSelectOption value="Kalandi">Kalandi</IonSelectOption>
              <IonSelectOption value="Kalat">Kalat</IonSelectOption>
              <IonSelectOption value="Kamalia">Kamalia</IonSelectOption>
              <IonSelectOption value="Kamararod">Kamararod</IonSelectOption>
              <IonSelectOption value="Kamber">Kamber</IonSelectOption>
              <IonSelectOption value="Kamokey">Kamokey</IonSelectOption>
              <IonSelectOption value="Kanak">Kanak</IonSelectOption>
              <IonSelectOption value="Kandi">Kandi</IonSelectOption>
              <IonSelectOption value="Kandiaro">Kandiaro</IonSelectOption>
              <IonSelectOption value="Kanpur">Kanpur</IonSelectOption>
              <IonSelectOption value="Kapip">Kapip</IonSelectOption>
              <IonSelectOption value="Kappar">Kappar</IonSelectOption>
              <IonSelectOption value="Karak City">Karak City</IonSelectOption>
              <IonSelectOption value="Karodi">Karodi</IonSelectOption>
              <IonSelectOption value="Kashmor">Kashmor</IonSelectOption>
              <IonSelectOption value="Kasur">Kasur</IonSelectOption>
              <IonSelectOption value="Katuri">Katuri</IonSelectOption>
              <IonSelectOption value="Keti Bandar">Keti Bandar</IonSelectOption>
              <IonSelectOption value="Khairpur">Khairpur</IonSelectOption>
              <IonSelectOption value="Khanaspur">Khanaspur</IonSelectOption>
              <IonSelectOption value="Khanewal">Khanewal</IonSelectOption>
              <IonSelectOption value="Kharan">Kharan</IonSelectOption>
              <IonSelectOption value="kharian">kharian</IonSelectOption>
              <IonSelectOption value="Khokhropur">Khokhropur</IonSelectOption>
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
              <IonSelectOption value="Kot Sarae">Kot Sarae</IonSelectOption>
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
              <IonSelectOption value="Lower Dir">Lower Dir</IonSelectOption>
              <IonSelectOption value="Shadan Lund">Shadan Lund</IonSelectOption>
              <IonSelectOption value="Multan">Multan</IonSelectOption>
              <IonSelectOption value="Mandi Bahauddin">
                Mandi Bahauddin
              </IonSelectOption>
              <IonSelectOption value="Mansehra">Mansehra</IonSelectOption>
              <IonSelectOption value="Mian Chanu">Mian Chanu</IonSelectOption>
              <IonSelectOption value="Mirpur">Mirpur</IonSelectOption>
              <IonSelectOption value="Moro, Pakistan|Moro">
                Moro
              </IonSelectOption>
              <IonSelectOption value="Mardan">Mardan</IonSelectOption>
              <IonSelectOption value="Mach">Mach</IonSelectOption>
              <IonSelectOption value="Madyan">Madyan</IonSelectOption>
              <IonSelectOption value="Malakand">Malakand</IonSelectOption>
              <IonSelectOption value="Mand">Mand</IonSelectOption>
              <IonSelectOption value="Manguchar">Manguchar</IonSelectOption>
              <IonSelectOption value="Mashki Chah">Mashki Chah</IonSelectOption>
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
              <IonSelectOption value="Mirpur Khas">Mirpur Khas</IonSelectOption>
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
              <IonSelectOption value="Nawabshah">Nawabshah</IonSelectOption>
              <IonSelectOption value="Nazimabad">Nazimabad</IonSelectOption>
              <IonSelectOption value="Nowshera">Nowshera</IonSelectOption>
              <IonSelectOption value="Nagar Parkar">
                Nagar Parkar
              </IonSelectOption>
              <IonSelectOption value="Nagha Kalat">Nagha Kalat</IonSelectOption>
              <IonSelectOption value="Nal">Nal</IonSelectOption>
              <IonSelectOption value="Naokot">Naokot</IonSelectOption>
              <IonSelectOption value="Nasirabad">Nasirabad</IonSelectOption>
              <IonSelectOption value="Nauroz Kalat">
                Nauroz Kalat
              </IonSelectOption>
              <IonSelectOption value="Naushara">Naushara</IonSelectOption>
              <IonSelectOption value="Nur Gamma">Nur Gamma</IonSelectOption>
              <IonSelectOption value="Nushki">Nushki</IonSelectOption>
              <IonSelectOption value="Nuttal">Nuttal</IonSelectOption>
              <IonSelectOption value="Okara">Okara</IonSelectOption>
              <IonSelectOption value="Ormara">Ormara</IonSelectOption>
              <IonSelectOption value="Peshawar">Peshawar</IonSelectOption>
              <IonSelectOption value="Panjgur">Panjgur</IonSelectOption>
              <IonSelectOption value="Pasni City">Pasni City</IonSelectOption>
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
              <IonSelectOption value="Qazi Ahmad">Qazi Ahmad</IonSelectOption>
              <IonSelectOption value="Qila Abdullah">
                Qila Abdullah
              </IonSelectOption>
              <IonSelectOption value="Qila Ladgasht">
                Qila Ladgasht
              </IonSelectOption>
              <IonSelectOption value="Qila Safed">Qila Safed</IonSelectOption>
              <IonSelectOption value="Qila Saifullah">
                Qila Saifullah
              </IonSelectOption>
              <IonSelectOption value="Rawalpindi">Rawalpindi</IonSelectOption>
              <IonSelectOption value="Rabwah">Rabwah</IonSelectOption>
              <IonSelectOption value="Rahim Yar Khan">
                Rahim Yar Khan
              </IonSelectOption>
              <IonSelectOption value="Rajan Pur">Rajan Pur</IonSelectOption>
              <IonSelectOption value="Rakhni">Rakhni</IonSelectOption>
              <IonSelectOption value="Ranipur">Ranipur</IonSelectOption>
              <IonSelectOption value="Ratodero">Ratodero</IonSelectOption>
              <IonSelectOption value="Rawalakot">Rawalakot</IonSelectOption>
              <IonSelectOption value="Renala Khurd">
                Renala Khurd
              </IonSelectOption>
              <IonSelectOption value="Robat Thana">Robat Thana</IonSelectOption>
              <IonSelectOption value="Rodkhan">Rodkhan</IonSelectOption>
              <IonSelectOption value="Rohri">Rohri</IonSelectOption>
              <IonSelectOption value="Sialkot">Sialkot</IonSelectOption>
              <IonSelectOption value="Sadiqabad">Sadiqabad</IonSelectOption>
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
              <IonSelectOption value="Shadadkhot">Shadadkhot</IonSelectOption>
              <IonSelectOption value="Shahbandar">Shahbandar</IonSelectOption>
              <IonSelectOption value="Shahpur">Shahpur</IonSelectOption>
              <IonSelectOption value="Shahpur Chakar">
                Shahpur Chakar
              </IonSelectOption>
              <IonSelectOption value="Shakargarh">Shakargarh</IonSelectOption>
              <IonSelectOption value="Shangla">Shangla</IonSelectOption>
              <IonSelectOption value="Sharam Jogizai">
                Sharam Jogizai
              </IonSelectOption>
              <IonSelectOption value="Sheikhupura">Sheikhupura</IonSelectOption>
              <IonSelectOption value="Shikarpur">Shikarpur</IonSelectOption>
              <IonSelectOption value="Shingar">Shingar</IonSelectOption>
              <IonSelectOption value="Shorap">Shorap</IonSelectOption>
              <IonSelectOption value="Sibi">Sibi</IonSelectOption>
              <IonSelectOption value="Sohawa">Sohawa</IonSelectOption>
              <IonSelectOption value="Sonmiani">Sonmiani</IonSelectOption>
              <IonSelectOption value="Sooianwala">Sooianwala</IonSelectOption>
              <IonSelectOption value="Spezand">Spezand</IonSelectOption>
              <IonSelectOption value="Spintangi">Spintangi</IonSelectOption>
              <IonSelectOption value="Sui">Sui</IonSelectOption>
              <IonSelectOption value="Sujawal">Sujawal</IonSelectOption>
              <IonSelectOption value="Sukkur">Sukkur</IonSelectOption>
              <IonSelectOption value="Suntsar">Suntsar</IonSelectOption>
              <IonSelectOption value="Surab">Surab</IonSelectOption>
              <IonSelectOption value="Swabi">Swabi</IonSelectOption>
              <IonSelectOption value="Swat">Swat</IonSelectOption>
              <IonSelectOption value="Tando Adam">Tando Adam</IonSelectOption>
              <IonSelectOption value="Tando Bago">Tando Bago</IonSelectOption>
              <IonSelectOption value="Tangi">Tangi</IonSelectOption>
              <IonSelectOption value="Tank City">Tank City</IonSelectOption>
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
              <IonSelectOption value="Upper Dir">Upper Dir</IonSelectOption>
              <IonSelectOption value="Uthal">Uthal</IonSelectOption>
              <IonSelectOption value="Vehari">Vehari</IonSelectOption>
              <IonSelectOption value="Veirwaro">Veirwaro</IonSelectOption>
              <IonSelectOption value="Vitakri">Vitakri</IonSelectOption>
              <IonSelectOption value="Wadh">Wadh</IonSelectOption>
              <IonSelectOption value="Wah Cantt">Wah Cantt</IonSelectOption>
              <IonSelectOption value="Warah">Warah</IonSelectOption>
              <IonSelectOption value="Washap">Washap</IonSelectOption>
              <IonSelectOption value="Wasjuk">Wasjuk</IonSelectOption>
              <IonSelectOption value="Wazirabad">Wazirabad</IonSelectOption>
              <IonSelectOption value="Yakmach">Yakmach</IonSelectOption>
              <IonSelectOption value="Zhob">Zhob</IonSelectOption>
              <IonSelectOption value="Other">Other</IonSelectOption>
            </IonSelect>
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
          <AddWeekDaysCard name={"Monday"} />
          <AddWeekDaysCard name={"Tuesday"} />
          <AddWeekDaysCard name={"Wednesday"} />
          <AddWeekDaysCard name={"Thursday"} />
          <AddWeekDaysCard name={"Friday"} />
          <AddWeekDaysCard name={"Saturday"} />
          <AddWeekDaysCard name={"Sunday"} />
          <IonButton disabled={!anSubmit} type="submit">
            Add
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddClinic;
