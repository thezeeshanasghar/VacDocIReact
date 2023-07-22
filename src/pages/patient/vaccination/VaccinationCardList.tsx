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
  IonItem,
  IonLabel,
  IonPage,
  IonPopover,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
// import { groupBy } from "lodash";
import { calendar } from "ionicons/icons";
import { format } from "date-fns";
import axios from "axios";
import { saveAs } from 'file-saver';
import MyDatePicker from "../../../components/datepicker/MyDatePicker";
// import DoctorScheduleCard from "../../doctor-schedule/DoctorScheduleCard";
import Header from "../../../components/header/Header";
import syringImage from "../../../assets/injectionFilled.png";
import VaccinationCard from "./VaccinationCard";
import Toast from "../../../components/custom-toast/Toast";
interface IVaccine {
  DoseName: string;
  IsDone: boolean;
  IsSkip: boolean;
  ScheduleId: number;
  BrandName:string;
}

interface IVaccineData {
  [date: string]: IVaccine[];
}
const storedValue = JSON.parse(sessionStorage.getItem("docData"));
console.log(storedValue);

interface IParam {
    match: {
      params: {
        Id: number;
      };
    };
  }

  const searchParams = new URLSearchParams(location.search);
    const doctorId = searchParams.get("doctorId");

  const VaccinationCardList: React.FC<IParam> = ({
      match: {
        params: { Id: childId },
      },
     
    },
    ScheduleId,
    ) => {
      const router = useIonRouter();
  const [data, setData] = useState<IVaccine[]>([]);
  const [groupedData, setGroupedData] = useState<IVaccineData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [renderList, setRenderList] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [patientName, setPatientName] = useState<string>();

  const forceRender = () => {
    fetchDoseData();
  };

  useEffect(() => {
    fetchDoseData();
    fetchPatientData();
    // window.location.reload();
  },[]);

  const fetchPatientData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/Child/${childId}`); // Replace 'API_ENDPOINT' with the actual API endpoint URL
      const data = await response.json();
      console.log(data.Name)
      setPatientName(data.Name)
      // setBrandData(data);
    } catch (error) {
      console.error('Error fetching child data:', error);
    }
  };

  const fetchDoseData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/PatientSchedule/Patient_DoseSchedule?ChildId=${childId}&DoctorId=${storedValue.Id}`
      );
      if (response.ok) {
        const data = await response.json();

        setData(data);
        console.log(data);
        setIsLoading(false);
      } else {
        console.log("Error fetching data");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
    }
  };

  const handelonmouseover = (inputValue: string) => {
    const data1 = inputValue.split("T");
    const data2 = format(new Date(inputValue), "yyyy-MM-dd");
    setValue(data2);
    setSelectedDate(data2);
  };

  const handleDateChange = async (
    event: CustomEvent,
    key: string,
    inputValue: string
  ) => {
    console.log(value);
    closePopover();
    const data = event.detail.value;
    const data1 = data.split("T");
    const data2 = data1[0];
    console.log(data2);

    console.log(event.detail.value);

    

    
    try {
      setShowLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/PatientSchedule/patient_bulk_update_Date?ChildId=${childId}&DoctorId=${storedValue.Id}&oldDate=${value}&newDate=${data2}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        
        }
      );
      if (response.status === 204) {
        console.log(response.ok);
        setSuccess(true);
        setShowLoading(false);
        forceRender();
      } else if (!response.ok) {
        setError(true);
        setShowLoading(false);
      }
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


  // function setName(name: string) {
  //       setPatientName(name);
  //     }

  const handleDownload = () => {
        axios({
          url: `${import.meta.env.VITE_API_URL}api/PatientSchedule/pdf?ChildId=${childId}`, // Replace with the URL of your PDF file
          method: 'GET',
          responseType: 'blob', // Important! This tells axios to return a Blob object
        })
          .then((response) => {
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'downloaded.pdf'); // Specify the filename for the downloaded file
          })
          .catch((error) => {
            console.log(error);
          });
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
             {/* <IonToolbar color={"primary"}>
               <IonTitle>Vaccination</IonTitle>
             </IonToolbar> */}
             <IonToolbar style={{ padding: "0px 10px" }}>
               <IonButton size="small" slot="start" onClick={handleDownload}>
                 print
               </IonButton>
               <IonText slot="end">{patientName}</IonText>
            </IonToolbar>
          </IonHeader>
         
        <IonContent className="ion-padding">
          {Object.keys(data).map((date) => (
            <IonCard key={date}>
              
              <>
              <IonItem lines="none" className="centered-item">
      <IonRow className="ion-align-items-center">
        <IonCol>
          <IonText>
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </IonText>
        </IonCol>
        <IonCol>
          <IonImg
            src={syringImage}
            onClick={() =>
              router.push(
                `/members/child/vaccine/${childId}/bulk/${1}?oldDate=${date}&No=${data[date].length}`
              )
            }
            style={{
              height: "15px",
              display: "inline-block",
              margin: "0px 10px",
            }}
            className="ng-star-inserted md hydrated"
          />
        </IonCol>
        <IonCol>
          <IonIcon
            color="primary"
            onClick={() => setShowPopover(true)}
            icon={calendar}
            style={{ marginRight: "10px", cursor: "pointer" }}
            onMouseOver={() => handelonmouseover(date)}
          />
        </IonCol>
        <IonPopover isOpen={showPopover} onDidDismiss={closePopover}>
          <IonDatetime
            placeholder="Select Date"
            value={selectedDate || undefined}
            onIonChange={(e) => handleDateChange(e, date, inputValue)}
          ></IonDatetime>
        </IonPopover>
      </IonRow>
    </IonItem>
              {/* <IonText>{data[date].length}</IonText>  */}
                {data[date].map((item: IVaccine) => (
                  <VaccinationCard
                  // data={data[date].length}
                  childId={childId}
                    key={item.ScheduleId}
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
              </>
            </IonCard>
          ))}
        </IonContent>
      </IonPage>
    </>
  );
};

export default VaccinationCardList;
