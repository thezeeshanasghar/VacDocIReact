import React, { useState, useEffect } from "react";
import {
  IonDatetime,
  IonIcon,
  IonItem,
  IonPopover,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonImg,
  useIonRouter,
  IonCard,
} from "@ionic/react";
import { calendar } from "ionicons/icons";
import { format } from "date-fns";
import Toast from "../../../components/custom-toast/Toast";
import syringImage from "../../../assets/injectionFilled.png";
import emptySyringImage from "../../../assets/injectionEmpty.png";
import { useLocation } from "react-router";
import LoadingSpinner from "../../../components/loading-spinner/LoadingSpinner";
interface IBrand {
  Id: number;
  Name: string;
  VaccineId: number;
}
interface IDose {
  Id: number;
  Name: string;
  MinAge: number;
  VaccineId: number;
}
interface IDoseSchedule {
  // data: string;
  childId: number;
  Id: number;
  date: string;
  Name: string;
  IsDone: boolean;
  IsSkip: boolean;
  DoseId: number;
  BrandName: string;
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
  DoseId,
  BrandName,
  // VaccineId,
}) => {
  const router = useIonRouter();
  let location = useLocation();
  let urlParams = new URLSearchParams(location.search);
  let DOB = urlParams.get("DOB");
  let doctorId = urlParams.get("doctorId");
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(date);
  const [success, setSuccess] = useState(false);
  const [isButtonsVisible, setButtonsVisible] = useState(true);
  const [isButtonVisible, setButtonVisible] = useState(true);

  const formatDate = (dateString: string | null) => {
    //@ts-ignore
    const [month, day, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const handelonmouseover = (inputValue: string) => {
    // const data1 = inputValue.split("T");
    const data2 = format(new Date(inputValue), "yyyy-MM-dd");

    setSelectedDate(data2);
  };

  const handleDateChange = async (event: CustomEvent<any>) => {
    const selectedValue = event.detail.value;
    const dataTobeSent = {
      Id: Id,
      date: selectedValue,
    };
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/PatientSchedule/single_updateDate?Id=${Id}`,
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
        `${
          import.meta.env.VITE_API_URL
        }api/PatientSchedule/single_update_Skip?Id=${Id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Id,
            DoseId,
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
    //@ts-ignore\
    const ndate = formatDate(date);
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
            isDone: 0,
            date: ndate,
            brandId: 1,
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

  const toggleButtonVisibility = (date: String) => {
    // Toggle the visibility of all buttons and set isSkip to 0 (false)
    setButtonVisible(!isButtonVisible);
    postSingleDone(date); // Update the database value of isSkip
  };

  useEffect(() => {
    // Update the visibility of buttons based on the database value of IsSkip
    setButtonsVisible(!IsSkip);
  }, [IsSkip]);

  useEffect(() => {
    setButtonVisible(!IsDone);
  }, [IsDone]);
  useEffect(() => {
    //@ts-ignore
    localStorage.setItem(
      "query",
      `?DOB=${DOB?.toString()}&doctorId=${doctorId?.toString()}`
    );
  }, []);

  const clickedImage = async (Id: any) => {
    try {
      console.log(Id);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}api/PatientSchedule/${Id}?isDone=false`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Id: Id, isDone: false }),
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }

    router.push(
      `/members/child/vaccine/${childId}?DOB=${DOB}&docterId=${doctorId}`
    );
    setShowLoading(true);
  };
  return (
    <>
      <LoadingSpinner
        isOpen={showLoading}
        setOpen={setShowLoading}
        time={1000}
      />
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
          {!IsSkip && !IsDone && (
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
                    margin: "0px 10px",
                  }}
                  onMouseOver={() => handelonmouseover(date)}
                  id="single"
                />
              </IonCol>
              <IonCol size="auto">
                <IonImg
                  // size="small"
                  src={emptySyringImage}
                  onClick={() =>
                    router.push(
                      `/members/child/vaccine/${childId}/fill/${Id}?oldDate=${date.toString()}&DOB=${DOB}&doctorId=${doctorId}`
                    )
                  }
                  style={{
                    textTransform: "lowercase",
                    height: "32px",
                    display: "inline-block",
                    margin: "0px 10px",
                  }}
                  color={IsDone ? "success" : "primary"}
                  id="done1"
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
                    margin: "0px 10px",
                  }}
                  color={IsSkip ? "danger" : "primary"}
                  id="skip1"
                >
                  {IsSkip ? "UnSkip" : "Skip"}
                </IonButton>
              </IonCol>
            </>
          )}
          {IsSkip &&
            !IsDone && ( // Show "unSkip" button when buttons are hidden
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
          {IsDone && (
            <>
              {BrandName == null ? (
                ""
              ) : (
                <div>
                  <IonCol size="">
                    <p>Brand: {BrandName}</p>
                  </IonCol>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    textAlign: "center",
                    color: "#6ebf8b", // Set the color of the date to light green
                    height: "30px",
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    margin: "5px 10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: "1px 0px  0 10px",
                    }}
                  >
                    <IonImg
                      // size="small"
                      src={syringImage}
                      onClick={() => clickedImage(Id)}
                      style={{
                        textTransform: "lowercase",
                        height: "32px",
                        display: "inline-block",
                        margin: "1px 20px  0 10px",
                      }}
                      color={IsDone ? "success" : "primary"}
                      id="done1"
                    >
                      {IsDone ? "undo" : "done"}
                    </IonImg>
                  </div>
                  <div>{date}</div>
                </div>
              </div>
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
