import React, { useState, useEffect } from "react";
import { IonDatetime, IonIcon, IonItem, IonPopover, IonGrid, IonRow, IonCol, IonButton, IonImg } from "@ionic/react";
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
  childId: number;
  Id: number;
  date: string;
  Name: string;
  IsDone: boolean;
  IsSkip: boolean;
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
}) => {
  const [error, setError] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(date);
  const [success, setSuccess] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [isButtonsVisible, setButtonsVisible] = useState(true);
  const [isButtonVisible, setButtonVisible] = useState(true);
  const [doses, setDoses] = useState<IDose[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);

  const fetchDoses = () => {
    fetch(`${import.meta.env.VITE_API_URL}alldoses`)
      .then((res) => res.json())
      .then((doses: IDose[]) => setDoses(doses));
  };
  const fetchBrands = () => {
    fetch(`${import.meta.env.VITE_API_URL}BrandName`)
      .then((res) => res.json())
      .then((brands: IBrand[]) => setBrands(brands));
  };

  const handelonmouseover = (inputValue: string) => {
    const data1 = inputValue.split("T");
    const data2 = format(new Date(inputValue), "yyyy-MM-dd");
   
    setSelectedDate(data2);
  };

  const filterBrand = (brandId: number): string | undefined => {
        console.log("brand id", brandId);
        const filteredBrand: IBrand | undefined = brands.find(
          (b) => b.Id === brandId
        );
        console.log("brands, ", filteredBrand);
        return filteredBrand?.Name;
      };
      

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

  const postSingleDone = async () => {
    const isDone = !IsDone ? 1 : 0;
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
            isDone,
          }),
        }
      );
      if (res.status === 204) {

        setButtonVisible(!isButtonVisible);
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

  const toggleButtonVisibility = () => {
    // Toggle the visibility of all buttons and set isSkip to 0 (false)
    setButtonVisible(!isButtonVisible);
    postSingleDone(); // Update the database value of isSkip
  };

  useEffect(() => {
    // Update the visibility of buttons based on the database value of IsSkip
    setButtonsVisible(!IsSkip);
  }, [IsSkip]);

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
        message="An error occurred while updating doctor patient schedule. Please try again."
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
                  style={{ cursor: "pointer",
                  height: "30px",
                  display: "inline-block",
                  margin: "0px 10px" }}
                  onMouseOver={() => handelonmouseover(date)}
                />
              </IonCol>
              <IonCol size="auto">
                <IonImg
                  // size="small"
                  src={syringImage}
                  onClick={() => postSingleDone()}
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
                  {IsSkip ? "unSkip" : "skip"}
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
                unSkip
              </IonButton>
            </IonCol>
          )}
        {!isButtonVisible && ( // Show "undo" button when buttons are hidden
  <IonCol size="auto">
    <IonImg
      // size="small"
      src={emptySyringImage}
      onClick={toggleButtonVisibility}
      style={{
        textTransform: "lowercase",
        height: "30px",
        display: "inline-block",
        margin: "0px 10px"
      }}
      color="danger"
    >
      undo
    </IonImg>
  </IonCol>
)}

{IsDone ? (
  <p style={{ textAlign: "center" }}>
    Brand: {filterBrand(Id)}
  </p>
) : null}
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
