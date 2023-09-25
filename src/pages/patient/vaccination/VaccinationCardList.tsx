import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonPage,
  IonPopover,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { calendar, key } from "ionicons/icons";
import { format } from "date-fns";
import axios from "axios";
import { saveAs } from "file-saver";
import Header from "../../../components/header/Header";
import syringImage from "../../../assets/injectionFilled.png";
import VaccinationCard from "./VaccinationCard";
import Toast from "../../../components/custom-toast/Toast";
import { useLocation } from "react-router";
interface IVaccine {
  DoseName: string;
  IsDone: boolean;
  IsSkip: boolean;
  ScheduleId: number;
  BrandName: string;
}

interface IVaccineData {
  [date: string]: IVaccine[];
}
//@ts-ignore
const storedValue = JSON.parse(sessionStorage.getItem("docData"));

interface IParam {
  match: {
    params: {
      Id: number;
    };
  };
}

const searchParams = new URLSearchParams(location.search);
const doctorId = searchParams.get("doctorId");

const VaccinationCardList: React.FC<IParam> = (
  {
    match: {
      params: { Id: childId },
    },
  },
  ScheduleId
) => {
  const router = useIonRouter();
  const location = useLocation();
  const [data, setData] = useState<IVaccine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [patientName, setPatientName] = useState<string>();
  const [isButtonsVisible, setButtonsVisible] = useState(true);
  const [isButtonVisible, setButtonVisible] = useState(true);
  const [showButton1, setShowButton1] = useState(true);
  const [showButton2, setShowButton2] = useState(false);
  const [skipStates, setSkipStates] = useState<{ [date: string]: boolean }>({});

  const forceRender = () => {
    fetchDoseData();
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return null;
    }
    const [month, day, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  useEffect(() => {
    fetchDoseData();
    fetchPatientData();
    // window.location.reload();
  }, [location]);

  const fetchPatientData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/Child/${childId}`
      ); // Replace 'API_ENDPOINT' with the actual API endpoint URL
      const data = await response.json();

      setPatientName(data.Name);
      // setBrandData(data);
    } catch (error) {
      console.error("Error fetching child data:", error);
    }
  };

  const fetchDoseData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/PatientSchedule/Patient_DoseSchedule?ChildId=${childId}&DoctorId=${
          storedValue.Id
        }`
      );
      if (response.ok) {
        const data = await response.json();

        setData(data);
        const initialSkipStates = data.reduce(
          (
            acc: { [x: string]: any },
            item: { Date: string | number; IsSkip: any }
          ) => {
            acc[item.Date] = item.IsSkip;
            return acc;
          },
          {}
        );
        setSkipStates(initialSkipStates);

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
    }
  };

  const handelonmouseover = (inputValue: string) => {
    const data2 = format(new Date(inputValue), "yyyy-MM-dd");
    setValue(data2);
    setSelectedDate(data2);
  };

  const handleDateChange = async (
    event: CustomEvent,
    key: string,
    inputValue: string
  ) => {
    closePopover();
    const data = event.detail.value;

    try {
      setShowLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/PatientSchedule/patient_bulk_update_Date?ChildId=${childId}&DoctorId=${
          storedValue.Id
        }&oldDate=${value}&newDate=${data}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      setShowLoading(false);
      forceRender();
    } catch (error) {
      console.error(error);
      setError(true);
      setShowLoading(false);
    }
  };

  const openPopover = () => {
    setShowPopover(true);
  };

  const closePopover = () => {
    setShowPopover(false);
  };

  const postSkip = async (date: string, data: boolean) => {
    const newdate = formatDate(date);
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/PatientSchedule/patient_bulk_update_IsSkip?childId=${childId}&date=${newdate}&IsSkip=${data}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 204) {
        setButtonsVisible(!isButtonsVisible);
        setShowButton1(false);
        setShowButton2(true);
        setSkipStates((prevSkipStates) => ({
          ...prevSkipStates,
          [date]: !prevSkipStates[date],
        }));

        forceRender();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = () => {
    axios({
      url: `${
        import.meta.env.VITE_API_URL
      }api/PatientSchedule/pdf?ChildId=${childId}`, // Replace with the URL of your PDF file
      method: "GET",
      responseType: "blob", // Important! This tells axios to return a Blob object
    })
      .then((response) => {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        saveAs(pdfBlob, "downloaded.pdf"); // Specify the filename for the downloaded file
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleButtonsVisibility = (date: string) => {
    // Toggle the visibility of all buttons and set isSkip to 0 (false)
    setButtonsVisible(!isButtonsVisible);
    postSkip(date, false); // Update the database value of isSkip
  };

  return (
    <>
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        message="Bulk date of patient schedule update successfully."
        color="success"
      />
      <Toast
        isOpen={error}
        setOpen={setError}
        message="An error occurred while update patient schedule. plz try again"
        color="danger"
      />
      <IonPage>
        <Header pageName="Vaccination" />

        <IonHeader>
          <IonToolbar style={{ padding: "0px 10px" }}>
            <IonButton size="small" slot="start" onClick={handleDownload}>
              print
            </IonButton>
            <IonText slot="end">{patientName}</IonText>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {Object.keys(data).map((date) => (
            <>
              {isButtonsVisible && isButtonVisible && (
                <IonItem lines="none" className="centered-item">
                  <IonText>{date}</IonText>

                  <IonImg
                    src={syringImage}
                    onClick={() =>
                      router.push(
                        `/members/child/vaccine/${childId}/bulk/${1}?oldDate=${date}&No=${
                          //@ts-ignore
                          data[date].length
                        }`
                      )
                    }
                    style={{
                      height: "30px",
                      display: "inline-block",
                      margin: "0px 10px",
                      cursor: "pointer",
                    }}
                    className="ng-star-inserted md hydrated"
                    id="done"
                  />

                  <IonIcon
                    color="primary"
                    onClick={openPopover}
                    icon={calendar}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onMouseOver={() => handelonmouseover(date)}
                    id="bulk"
                  />

                  <IonPopover isOpen={showPopover} onDidDismiss={closePopover}>
                    <IonInput
                      placeholder="Select Date"
                      type="date"
                      value={selectedDate || undefined}
                      onIonChange={(e) => handleDateChange(e, date, inputValue)}
                    ></IonInput>
                  </IonPopover>

                  <IonButton
                    // src={syringImage}
                    size="small"
                    onClick={() => postSkip(date, true)}
                    style={{
                      textTransform: "lowercase",
                      height: "30px",
                      display: "inline-block",
                      margin: "0px 10px",
                      color: "primary",
                      cursor: "pointer",
                    }}
                    color={skipStates[date] ? "danger" : "primary"}
                    id="skip"
                  >
                    {skipStates[date] ? "UnSkip" : "Skip"}
                  </IonButton>
                </IonItem>
              )}
              {!isButtonsVisible && ( // Show "unSkip" button when buttons are hidden
                <IonItem lines="none" className="centered-item">
                  <IonText>
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </IonText>

                  <IonImg
                    src={syringImage}
                    onClick={() =>
                      router.push(
                        `/members/child/vaccine/${childId}/bulk/${1}?oldDate=${date}&No=${
                          //@ts-ignore
                          data[date].length
                        }`
                      )
                    }
                    style={{
                      height: "30px",
                      display: "inline-block",
                      margin: "0px 10px",
                    }}
                    className="ng-star-inserted md hydrated"
                  />

                  <IonIcon
                    color="primary"
                    onClick={() => setShowPopover(true)}
                    icon={calendar}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onMouseOver={() => handelonmouseover(date)}
                    id="bulk"
                  />

                  <IonPopover
                    isOpen={showPopover}
                    onDidDismiss={closePopover}
                    showBackdrop={false}
                  >
                    <IonDatetime
                      placeholder="Select Date"
                      value={selectedDate || undefined}
                      onIonChange={(e) => handleDateChange(e, date, inputValue)}
                    ></IonDatetime>
                  </IonPopover>
                  <IonCol size="auto">
                    <IonButton
                      size="small"
                      onClick={() => toggleButtonsVisibility(date)}
                      style={{
                        textTransform: "lowercase",
                      }}
                      color={skipStates[date] ? "danger" : "primary"}
                    >
                      {skipStates[date] ? "UnSkip" : "Skip"}
                    </IonButton>
                  </IonCol>
                </IonItem>
              )}
              {!isButtonVisible && (
                <>
                  <IonCol
                    size="auto"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <span
                      style={{
                        color: "#6ebf8b", // Set the color of the date to light green
                        height: "30px",
                        display: "inline-block",
                        margin: "0px 10px",
                      }}
                    >
                      {date}
                    </span>
                  </IonCol>
                </>
              )}
              <IonCard>
                {/* <IonText>{data[date].length}</IonText>  */}
                {/* @ts-ignore */}
                {data[date].map((item: IVaccine) => (
                  <VaccinationCard
                    // data={data[date].length}
                    childId={childId}
                    key={item.ScheduleId + childId}
                    date={date}
                    Id={item.ScheduleId}
                    Name={item.DoseName}
                    BrandName={item.BrandName}
                    // MinAge={item.MinAge}
                    IsDone={item.IsDone}
                    IsSkip={item.IsSkip}
                    // VaccineId={item.VaccineId}
                    renderList={forceRender}
                  />
                ))}
              </IonCard>
            </>
          ))}
        </IonContent>
      </IonPage>
    </>
  );
};

export default VaccinationCardList;
