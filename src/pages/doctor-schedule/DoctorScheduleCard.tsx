import React, { useState, useEffect } from "react";
import {
  IonDatetime,
  IonIcon,
  IonItem,
  IonPopover,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonText,
  IonLabel,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonInput,
  IonButton,
} from "@ionic/react";
import { calendar } from "ionicons/icons";

import { format } from "date-fns";
import Toast from "../../components/custom-toast/Toast";

interface IDoseSchedule {
  key: string;
  scheduleKey: string;
  date: any;
  data: any;
  renderList: () => void;
}

const DoctorScheduleCard: React.FC<IDoseSchedule> = ({
  // Name,
  // Id,
  scheduleKey,
  date,
  data,
  renderList,
}) => {
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [showPopover2, setShowPopover2] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(date); // Initialize with the `date` prop value
  const [singleId, setSingleId] = useState("");

  const [success, setSuccess] = useState(false);

  //@ts-ignore
  const storedValue = JSON.parse(sessionStorage.getItem("docData"));
  
  const handelonmouseover2 = (inputValue: string) => {
    // const data1 = inputValue.split("T");
    const data2 = format(new Date(inputValue), "yyyy-MM-dd");
    console.log(data2);
    setValue(data2);
    setSelectedDate(data2);
  };

  const handleDateChange2 = async (
    event: CustomEvent,
    key: string,
    value: string
  ) => {
    console.log(value);
    // closePopover();
    const data = event.detail.value;
    // const data1 = data.split("T");
    // const data2 = data1[0];
    // console.log(data2);

    console.log(event.detail.value);

    // const dataTobeSent = [
    //   {
    //     path: "Date",
    //     op: "replace",
    //     from: value,
    //     value: data,
    //   },
    // ];

    // console.log("object item date : ", dataTobeSent);
    try {
      // setShowLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/DoctorSchedule/doctor_bulk_update_Date?DoctorId=${
          storedValue.Id
        }&oldDate=${value}&newDate=${data}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(dataTobeSent),
        }
      );
      if (response.status === 204) {
        console.log(response.ok);
        renderList();
        setSuccess(true);
        setShowPopover2(false);
        // setShowLoading(false);
      } else if (!response.ok) {
        setError(true);
        // setShowLoading(false);
      }
    } catch (error) {
      console.error(error);
      setShowPopover2(false);
      setError(true);
      // setShowLoading(false);
    }
  };

  const handelonmouseover = (inputValue: string, Id: string) => {
    // const data1 = inputValue.split("T");
    console.log(Id);
    console.log(inputValue);
    const data2 = format(new Date(inputValue), "yyyy-MM-dd");
    setSingleId(Id);
    setSelectedDate(data2);
  };
  // useEffect(() => {
  //   const storedValue = JSON.parse(sessionStorage.getItem("docData"));
  //   console.log(storedValue);
  // }, []);
  const handleDateChange = async (event: CustomEvent<any>) => {
    console.log(storedValue);
    
    const selectedValue = event.detail.value;
    console.log(selectedValue);
    const dataTobeSent = {
      date: selectedValue,
      doseId: singleId,
      doctorId: storedValue.Id,
    };
    console.log(dataTobeSent);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/DoctorSchedule/single_updateDate?doseId=${singleId}&doctorId=${
          storedValue.Id
        }`,
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
        // setShowPopover(false);
        setShowPopover(false);
      } else {
        setError(true);
        renderList();
      }
    } catch (error) {
      console.error(error);
      setError(true);
      // setShowPopover(false);
      setShowPopover(false);
      false;
    }
  };

  const closePopover = () => {
    setShowPopover(false);
  };
  const closePopover2 = () => {
    setShowPopover2(false);
  };

  return (
    <>
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        message="Date updated successfully"
        color="success"
      />
      <Toast
        isOpen={error}
        setOpen={setError}
        message="an Error occurred while updating date, please try again later"
        color="danger"
      />
      <IonCard key={scheduleKey}>
        <>
          <IonItem lines="none" className="centered-item">
            
            <IonLabel style={{ textAlign: "center" }}>
              <div
                style={{ textAlign: "center", padding: 0 }}
              >
                <IonIcon
                  color="primary"
                  onClick={() => setShowPopover2(true)}
                  icon={calendar}
                  style={{ marginRight: "10px", PointerEvent: "cursor" }}
                  onMouseOver={() => handelonmouseover2(date)}
                  id="bulk"
                />
                {/* <IonText>{format(new Date(date), "yyyy-MM-dd")}</IonText> */}
                <IonText>{date}</IonText>
                <IonPopover isOpen={showPopover2} onDidDismiss={closePopover2}>
                  <IonDatetime
                    placeholder="Select Date"
                    value={selectedDate || undefined}
                    onIonChange={(e) => handleDateChange2(e, date, value)}
                  ></IonDatetime>
                </IonPopover>
              </div>
            </IonLabel>
          </IonItem>
          {data.map((item: any) =>
            item !== null ? (
              <>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <b>{item.Name}</b>
                    </IonCol>
                    <IonCol size="auto">
                      <>
                        <IonIcon
                          color="primary"
                          onClick={() => setShowPopover(true)}
                          icon={calendar}
                          onMouseOver={() => handelonmouseover(date, item.Id)}
                          id="single"
                        />
                      </>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <IonPopover isOpen={showPopover} onDidDismiss={closePopover} showBackdrop={false}>
                  <IonDatetime
                    placeholder="Select Date"
                    value={selectedDate}
                    onIonChange={handleDateChange}
                  ></IonDatetime>
                </IonPopover>
              </>
            ) : (
              ""
            )
          )}
        </>
      </IonCard>
    </>
  );
};

export default DoctorScheduleCard;

