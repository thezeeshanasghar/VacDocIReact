import {
  IonIcon,
  IonPopover,
  IonList,
  IonItem,
  IonLabel,
  IonDatetime,
} from "@ionic/react";
import { calendar } from "ionicons/icons";
import { useState } from "react";

interface DatePickerProps {
  selectedDate: string;
  onDateSelected: (date: string) => void;
  updateBulkDate?: (user_selected_date: string) => void;
  updateSingleDate?: (user_selected_date: string) => void;
  iconSize?: string;
  executeFunc: string;
}

const MyDatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateSelected,
  updateBulkDate,
  updateSingleDate,
  iconSize,
  executeFunc,
}) => {
  const [showPopover, setShowPopover] = useState(false);

  const handleDateSelected = (event: CustomEvent) => {
    const selectedDate = event.detail.value;
    //@ts-ignore
    executeFunc === "bulkDate" && updateBulkDate(event.detail.value);
    //@ts-ignore
    executeFunc === "singleDate" && updateSingleDate(event.detail.value);
    onDateSelected(selectedDate);
    setShowPopover(false);
  };

  return (
    <>
      <IonIcon
        icon={calendar}
        color="primary"
        onClick={() => setShowPopover(true)}
        style={{ fontSize: iconSize ? iconSize : "" }}
      ></IonIcon>

      <IonPopover
        isOpen={showPopover}
        onDidDismiss={() => setShowPopover(false)}
      >
        <IonList>
          <IonItem>
            <IonDatetime
              // displayFormat="DD/MM/YYYY"
              //   pickerFormat="MM/DD/YYYY"
              value={selectedDate.split("T")[0] || undefined}
              onIonChange={handleDateSelected}
            />
          </IonItem>
        </IonList>
      </IonPopover>
    </>
  );
};

export default MyDatePicker;
