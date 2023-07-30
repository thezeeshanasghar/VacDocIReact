import React, { useState, useEffect } from "react";
import { IonDatetime, IonIcon, IonItem, IonPopover, IonGrid, IonRow, IonCol, IonButton, IonImg , useIonRouter, IonCard} from "@ionic/react";
import { calendar } from "ionicons/icons";
import { format } from "date-fns";
import Toast from "../../../components/custom-toast/Toast";
import syringImage from "../../../assets/injectionFilled.png";
import emptySyringImage from "../../../assets/injectionEmpty.png";
interface IBrand {
    Id: number;
    Name: string;
    VaccineId: number;
  }
interface IDose{
  Id: number,
    Name: string,
    MinAge: number,
    VaccineId: number
}
interface IDoseSchedule {
  // data: string;
  childId: number;
  Id: number;
  date: string;
  Name: string;
  IsDone: boolean;
  IsSkip: boolean;
  BrandName:string;
  renderList: () => void;
}

const VaccinationCard: React.FC<IDoseSchedule> = ({
  Name,
  Id,
  date,
  renderList,
  childId,
  IsDone,
  IsSkip,
  BrandName
  // VaccineId,
}) => {
  const router = useIonRouter();
  const [error, setError] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(date);
  const [success, setSuccess] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [isButtonsVisible, setButtonsVisible] = useState(true);
  const [isButtonVisible, setButtonVisible] = useState(true);
  const[toDay,setToDay]=useState("")
  const [doses, setDoses] = useState<IDose[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const[brandsId,setBrandsId] = useState<number>();

  // const fetchDoses = () => {
  //   fetch(`${import.meta.env.VITE_API_URL}api/Dose/alldoses`)
  //     .then((res) => res.json())
  //     .then((doses: IDose[]) => setDoses(doses));
  // };
  // const fetchBrands = () => {
  //   fetch(`${import.meta.env.VITE_API_URL}api/Brand`)
  //     .then((res) => res.json())
  //     .then((brands: IBrand[]) => setBrands(brands));
  // };

  const formatDate = (dateString: string | null) => {
    const [month, day, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const handelonmouseover = (inputValue: string) => {
    // const data1 = inputValue.split("T");
    const data2 = format(new Date(inputValue), "yyyy-MM-dd");
   
    setSelectedDate(data2);
  };
  // const filterDoses = () => {
  //   const filteredDose: IDose | undefined = doses.find((d) => d.Name === Name);
  //   // console.log(filteredDose)
  //   if(filteredDose){
  //     setBrandsId(filteredDose.VaccineId)
  //   }

  // };

  // const filterBrand = (brandId: number): string | undefined => {
  //       // console.log("brand id", brandId);
  //       const filteredBrand: IBrand | undefined = brands.find(
  //         (b) => b.Id === brandId
  //       );
  //       // console.log("brands, ", filteredBrand);
  //       return filteredBrand?.Name;
  //     };
      

  const handleDateChange = async (event: CustomEvent<any>) => {
    const selectedValue = event.detail.value;
    const dataTobeSent = {
      Id: Id,
      date: selectedValue,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/PatientSchedule/single_updateDate?Id=${Id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataTobeSent),
        }
      );
      if (response.ok) {
        renderList();
        setSuccess(true);
        setShowPopover(false);
      } else {
        setError(true);
        renderList();
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setShowPopover(false);
    }
  };

  const closePopover = () => {
    setShowPopover(false);
  };

  const postSkip = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}api/PatientSchedule/single_update_Skip`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Id,
            isSkip: !IsSkip ? 1 : 0,
          }),
        }
      );
      if (res.status === 204) {
        // Toggle the visibility of buttons when skip is clicked
        setButtonsVisible(!isButtonsVisible);
        renderList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postSingleDone = async (date: String) => {
  const ndate=formatDate(date)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}api/PatientSchedule/single_updateDone`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Id,
            isDone:0,
            date:ndate,
            brandId:1,
          }),
        }
      );
      if (res.status === 204) {
        console.log("first");
        console.log("isButtonVisible before update:", isButtonVisible);
        setButtonVisible(!isButtonVisible);
        console.log("isButtonVisible after update:", !isButtonVisible);
        console.log("IsDone:", IsDone);
        renderList();
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  const toggleButtonsVisibility = () => {
    // Toggle the visibility of all buttons and set isSkip to 0 (false)
    setButtonsVisible(!isButtonsVisible);
    postSkip(); // Update the database value of isSkip
  };

  const toggleButtonVisibility = (date: String) => {
    // Toggle the visibility of all buttons and set isSkip to 0 (false)
    setButtonVisible(!isButtonVisible);
    postSingleDone(date); // Update the database value of isSkip
  };
  // useEffect(()=>{
  //   // filterDoses();
  //   // const currentDate = new Date();
  //   // const year = currentDate.getFullYear();
  //   // const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  //   // const day = String(currentDate.getDate()).padStart(2, '0');
    
  //   // const today = `${year}-${month}-${day}`;
    
    
  //   // setToDay(today)
  // })
  useEffect(() => {
    
    // fetchDoses();
    // fetchBrands();
  }, [date]);
  useEffect(() => {
    // Update the visibility of buttons based on the database value of IsSkip
    setButtonsVisible(!IsSkip);
  }, [IsSkip]);

  useEffect(() => {
    setButtonVisible(!IsDone);
  }, [IsDone]);

  return (
    <>
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        message="Single date of patient schedule updated successfully."
        color="success"
      />
      <Toast
        isOpen={error}
        setOpen={setError}
        message="An error occurred while updating patient schedule. Please try again."
        color="danger"
      />


   
      <IonGrid>
        <IonRow>
          <IonCol>
            <b>{Name}</b>
          </IonCol>
          {isButtonsVisible && isButtonVisible && (
            <>
              <IonCol size="auto">
              <IonIcon
  color="primary"
  onClick={() => setShowPopover(true)}
  icon={calendar}
  style={{
    cursor: "pointer",
    fontSize: "25px", // Increase the icon size as desired
    display: "inline-block",
    margin: "0px 10px"
  }}
  onMouseOver={() => handelonmouseover(date)}
/>
              </IonCol>
              <IonCol size="auto">
                <IonImg
                  // size="small"
                  src={syringImage}
                  onClick={() =>  router.push(`/members/child/vaccine/${childId}/fill/${Id}?oldDate=${date.toString()}`)}
                  style={{
                    textTransform: "lowercase",
                    height: "30px",
                    display: "inline-block",
                    margin: "0px 10px"
                  }}
                  color={IsDone ? "success" : "primary"}
                >
                  {IsDone ? "undo" : "done"}
                </IonImg>
              </IonCol>
              <IonCol size="auto">
                <IonButton
                // src={syringImage}
                  size="small"
                  onClick={() => postSkip()}
                  style={{
                    textTransform: "lowercase",  
                    height: "30px",
                    display: "inline-block",
                    margin: "0px 10px"        
                  }}
                  color={IsSkip ? "danger" : "primary"}
                >
                  {IsSkip ? "UnSkip" : "Skip"}
                </IonButton>
              </IonCol>
            </>
          )}
          {!isButtonsVisible && ( // Show "unSkip" button when buttons are hidden
            <IonCol size="auto">
              <IonButton
                size="small"
                onClick={toggleButtonsVisibility}
                style={{
                  textTransform: "lowercase",
                }}
                color="danger"
              >
                UnSkip
              </IonButton>
            </IonCol>
          )}
       {!isButtonVisible && (
  <>
    <IonCol size="auto" style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          color: "#6ebf8b", // Set the color of the date to light green
          height: "30px",
          display: "inline-block",
          margin: "0px 10px"
        }}
      >
        {new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        })}
      </span>
     
        <IonImg
          // size="small"
          src={emptySyringImage}
          onClick={()=>toggleButtonVisibility(date)}
          style={{
            textTransform: "lowercase",
            height: "30px",
            display: "inline-block",
            margin: "0px 10px"
          }}
          color="danger"
        >
          Undo
        </IonImg>
    
    </IonCol>
    {BrandName==null?"":<IonCol size="12">
      <p style={{ textAlign: "center" }}>
        Brand: {BrandName}
      </p>
    </IonCol>
}

</>
)}



        </IonRow>
      </IonGrid>
      <IonPopover isOpen={showPopover} onDidDismiss={closePopover}>
        <IonDatetime
          placeholder="Select Date"
          value={selectedDate}
          onIonChange={handleDateChange}
        ></IonDatetime>
      </IonPopover>
 
    </>
  );
};

export default VaccinationCard;
