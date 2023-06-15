import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { IDoctorSchedule } from "./DoctorScheduleCardList";
import { format } from "date-fns";
import MyDatePicker from "../../components/datepicker/MyDatePicker";
import Toast from "../../components/custom-toast/Toast";
interface ScheduleCardProps {
  date: string;
  data: IDoctorSchedule[];
  forceRender: () => void;
}
export interface IDose {
  Id: number;
  Name: string;
  MinAge: number;
  MinGap: number;
  VaccineId: number;
}

const DoctorScheduleCard: React.FC<ScheduleCardProps> = ({
  date,
  data,
  forceRender,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDoseDate, setSelectedDoseDate] = useState<string>("");
  const [doses, setDoses] = useState<IDose[]>([]);
  const [singleScheduleData, setSingleScheduleData] =
    useState<IDoctorSchedule>();
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const fetchDoses = () => {
    fetch(`${import.meta.env.VITE_API_URL}alldoses`)
      .then((res) => res.json())
      .then((doses: IDose[]) => setDoses(doses));
  };

  useEffect(() => {
    fetchDoses();
  }, [date, data]);

  const filterDoses = (doseId: number): string | undefined => {
    const filteredDose: IDose | undefined = doses.find((d) => d.Id === doseId);
    return filteredDose?.Name;
  };

  const updateBulkDate = (user_selected_date: string) => {
    const data_to_update = [
      {
        path: "Date",
        op: "replace",
        from: date,
        value: user_selected_date.split("T")[0],
      },
    ];

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }api/DoctorSchedule/doctor_bulk_updateDate/${date}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_to_update),
      }
    )
      .then((res) => {
        if (res.status === 204) {
          setSuccessToast(true);
          setTimeout(() => {
            forceRender();
          }, 500);
        } else {
          setErrorToast(true);
        }
      })
      .catch((err) => setErrorToast(true));
  };
  const updateSingleDate = (user_selected_date: string) => {
    const data_to_be_sent = {
      ...singleScheduleData,
      Date: user_selected_date.split("T")[0],
    };
    fetch(
      `${import.meta.env.VITE_API_URL}api/DoctorSchedule/single_updateDate`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_to_be_sent),
      }
    )
      .then((res) => {
        if (res.status === 204) {
          forceRender();
          setSuccessToast(true);
        } else {
          setErrorToast(true);
        }
      })
      .catch((err) => setErrorToast(true));
  };
  return (
    <>
      {doses && (
        <IonCard>
          <Toast
            isOpen={successToast}
            setOpen={setSuccessToast}
            color="success"
            message="Date updated successfully"
          />
          <Toast
            isOpen={errorToast}
            setOpen={setErrorToast}
            color="danger"
            message="an Error occurred while updating date, please try again later"
          />
          <IonCardHeader>
            <IonItem lines="none">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <IonCardTitle style={{ marginRight: "20px" }}>
                  {format(new Date(date), "dd MMMM yyyy")}
                </IonCardTitle>
                <MyDatePicker
                  selectedDate={date || selectedDate}
                  onDateSelected={setSelectedDate}
                  updateBulkDate={updateBulkDate}
                  iconSize="23px"
                  executeFunc="bulkDate"
                />
              </div>
            </IonItem>
          </IonCardHeader>
          <IonCardContent>
            {data.map((item: IDoctorSchedule) => (
              <div key={item.Id}>
                <IonItem lines={data.length > 1 ? "inset" : "none"}>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonLabel style={{ fontSize: "17px" }}>
                          {filterDoses(item.DoseId)}
                        </IonLabel>
                      </IonCol>
                      <IonCol size="auto">
                        <p
                          onClick={() => setSingleScheduleData(item)}
                          style={{ fontSize: "16px" }}
                        >
                          <MyDatePicker
                            selectedDate={item.Date || selectedDoseDate}
                            onDateSelected={setSelectedDoseDate}
                            updateSingleDate={updateSingleDate}
                            executeFunc="singleDate"
                          />
                          <IonText>
                            {format(new Date(item.Date), "dd/MM/yyyy")}
                          </IonText>
                        </p>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonItem>
                {/* Render other data fields here */}
              </div>
            ))}
          </IonCardContent>
        </IonCard>
      )}
    </>
  );
};

export default DoctorScheduleCard;
