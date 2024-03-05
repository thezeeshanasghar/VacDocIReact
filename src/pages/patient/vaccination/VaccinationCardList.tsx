import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonPage,
  IonPopover,
  IonRow,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { calendar, key } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { format, isValid, parse } from "date-fns";
import axios from "axios";
import { saveAs } from "file-saver";
import Header from "../../../components/header/Header";
import syringImage from "../../../assets/injectionEmpty.png";
import VaccinationCard from "./VaccinationCard";
import Toast from "../../../components/custom-toast/Toast";
import { useLocation } from "react-router";
import { v4 } from "uuid";
import LoadingSpinner from "../../../components/loading-spinner/LoadingSpinner";
interface IVaccine {
  DoseName: string;
  IsDone: boolean;
  IsSkip: boolean;
  DoseId: number;
  ScheduleId: number;
  BrandName: string;
}

interface IVaccineData {
  [date: string]: IVaccine[];
}
//@ts-ignore

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
  const [isButtonsVisible, setButtonsVisible] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [showButton1, setShowButton1] = useState(true);
  const [showButton2, setShowButton2] = useState(false);
  const [skipStates, setSkipStates] = useState<{ [date: string]: boolean }>({});
  const history = useHistory();
  const forceRender = () => {
    fetchDoseData();
    fetchPatientData();
  };

  const formatDate = (inputDate: string | null) => {
    if (!inputDate) {
      return null;
    }

    // List of possible date formats to try
    const possibleFormats = ["dd-MMM-yy", "yyyy-MM-dd", "M/d/yyyy", "yyyy-M-d"];

    let parsedDate = null;

    for (const formatString of possibleFormats) {
      parsedDate = parse(inputDate, formatString, new Date());
      if (isValid(parsedDate)) {
        break;
      }
    }

    // Check if the parsed date is valid
    if (!isValid(parsedDate)) {
      console.error("Error parsing date:", inputDate);
      return null;
    }

    // Format the parsed date to "yyyy-MM-dd"
    //@ts-ignore
    const formattedDate = format(parsedDate, "yyyy-MM-dd");
    return formattedDate;
  };

  useEffect(() => {
    fetchDoseData();
    fetchPatientData();
    //@ts-ignore
    const isDone =
      localStorage.getItem("isDone") && localStorage.getItem("isDone");
    if (isDone) setButtonVisible(isDone === "true" ? true : false);
    // window.location.reload();

    // Fetch vaccine data from your API
    // Example using fetch:
    //@ts-ignore
    const storedValue = JSON.parse(sessionStorage.getItem("docData"));
    const DoctorId = storedValue && storedValue.Id;
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }api/PatientSchedule/GetMissingDoses?ChildId=${childId}&DoctorId=${DoctorId}`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch vaccine data");
        }
      })
      .then()
      .catch((error) => console.error("Error fetching vaccine data:", error));
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
        }api/PatientSchedule/PatientSchedule_by_childid/${childId}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setData(data);
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

  const handleDateChange = async (event: CustomEvent) => {
    //@ts-ignore
    const storedValue = JSON.parse(sessionStorage.getItem("docData"));
    const DoctorID = storedValue && storedValue.Id;
    closePopover();
    const data = event.detail.value;

    try {
      setShowLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/PatientSchedule/patient_bulk_update_Date?ChildId=${childId}&DoctorId=${DoctorID}&oldDate=${value}&newDate=${data}`,
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
  const GoToNewDoses = () => {
    history.push(`/members/child/AddNewDosesList/${childId}`);
  };

  const handleDownload = () => {
    axios({
      url: `${
        import.meta.env.VITE_API_URL
      }api/PatientSchedule/DownLoad-Pdf?ChildId=${childId}`, // Replace with the URL of your PDF file
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
  console.log(data);
  return (
    <>
  <LoadingSpinner isOpen={isLoading} setOpen={setIsLoading} time={5000}/>
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

        {/* <IonHeader>
          <IonToolbar style={{ padding: "0px 10px" }}>
            <IonButton size="small" slot="start" onClick={handleDownload}>
              print
            </IonButton>
            <IonButton  size="small" slot="end" onClick={GoToNewDoses}>Add new Doses</IonButton>

            <IonText slot="end" class="ion-text-center">{patientName}</IonText>
          </IonToolbar>
        </IonHeader> */}
        <IonHeader>
          <IonToolbar>
            <IonGrid>
              <IonRow class="ion-align-items-center">
                <IonCol size="2">
                  <IonButton size="small" onClick={handleDownload}>
                    print
                  </IonButton>
                </IonCol>
                <IonCol size="8" class="ion-text-center">
                  <IonText>{patientName}</IonText>
                </IonCol>
                <IonCol size="2" class="ion-text-end">
                  <IonButton size="small" onClick={GoToNewDoses}>
                    Add new Doses
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {Object.keys(data).map((date) => {
            //@ts-ignore
            const isBulkSkip = data[date].every((item) => item.IsSkip === true);
            //@ts-ignore
            const isBulkDone = data[date].every((item) => item.IsDone === true);

            return (
              <React.Fragment>
                {!isBulkSkip && !isBulkDone && (
                  <IonItem lines="none" className="centered-item">
                    <IonText style={{ marginRight: "1rem" }}>{date}</IonText>

                    <IonImg
                      src={syringImage}
                      onClick={() =>
                        router.push(
                          `/members/child/vaccine/${childId}/bulk/${1}?oldDate=${date}&No=${
                            //@ts-ignore
                            data[date].filter((item) => item.IsSkip === false)
                              .length
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

                    <IonPopover
                      isOpen={showPopover}
                      onDidDismiss={closePopover}
                      showBackdrop={false}
                    >
                      <IonDatetime
                        placeholder="Select Date"
                        value={selectedDate || date}
                        onIonChange={handleDateChange}
                      ></IonDatetime>

                      {/* <IonInput
                        type="date"
                        value={
                          selectedDate || format(new Date(date), "yyyy-MM-dd")
                        }
                        onIonChange={handleDateChange}
                      /> */}
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
                      color={isBulkSkip ? "danger" : "primary"}
                      id="skip"
                    >
                      {isBulkSkip ? "UnSkip" : "Skip"}
                    </IonButton>
                  </IonItem>
                )}
                {isBulkSkip && ( // Show "unSkip" button when buttons are hidden
                  <IonItem lines="none" className="centered-item">
                    <IonText style={{ marginRight: "1rem" }}>{date}</IonText>

                    {/* <IonImg
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
                  /> */}

                    {/* <IonPopover
                      isOpen={showPopover}
                      onDidDismiss={closePopover}
                      showBackdrop={false}
                    >
                      <IonDatetime
                        placeholder="Select Date"
                        value={
                          selectedDate
                        }
                        onIonChange={handleDateChange}
                      ></IonDatetime>
                    </IonPopover> */}
                    <IonCol size="auto">
                      <IonButton
                        size="small"
                        onClick={() => toggleButtonsVisibility(date)}
                        style={{
                          textTransform: "lowercase",
                        }}
                        color={isBulkSkip ? "danger" : "primary"}
                      >
                        {isBulkSkip ? "UnSkip" : "Skip"}
                      </IonButton>
                    </IonCol>
                  </IonItem>
                )}
                {isBulkDone && (
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
                          marginLeft: "15px",
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
                  {data[date].map((item: IVaccine) => {
                    const uniqueId = v4();
                    return (
                      <VaccinationCard
                        // data={data[date].length}
                        childId={childId}
                        key={uniqueId}
                        date={date}
                        Id={item.ScheduleId}
                        Name={item.DoseName}
                        BrandName={item.BrandName}
                        DoseId={item.DoseId}
                        // MinAge={item.MinAge}
                        IsDone={item.IsDone}
                        IsSkip={item.IsSkip}
                        // VaccineId={item.VaccineId}
                        renderList={forceRender}
                      />
                    );
                  })}
                </IonCard>
              </React.Fragment>
            );
          })}
        </IonContent>
      </IonPage>
    </>
  );
};

export default VaccinationCardList;
