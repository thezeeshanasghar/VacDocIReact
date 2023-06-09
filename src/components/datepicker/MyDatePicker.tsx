import { IonIcon, IonPopover, IonList, IonItem, IonLabel, IonDatetime } from "@ionic/react";
import { calendar } from "ionicons/icons";
import { useState } from "react";

interface DatePickerProps {
  selectedDate: string;
  onDateSelected: (date: string) => void;
}

const MyDatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateSelected,
}) => {
  const [showPopover, setShowPopover] = useState(false);

  const handleDateSelected = (event: CustomEvent) => {
    const selectedDate = event.detail.value;
    onDateSelected(selectedDate);
    setShowPopover(false);
  };

  return (
    <>
      <IonIcon icon={calendar} onClick={() => setShowPopover(true)}></IonIcon>

      <IonPopover
        isOpen={showPopover}
        onDidDismiss={() => setShowPopover(false)}
      >
        <IonList>
          <IonItem>
            <IonLabel>Date</IonLabel>
            <IonDatetime
              // displayFormat="DD/MM/YYYY"
              // pickerFormat="MM/DD/YYYY"
              value={selectedDate || undefined}
              onIonChange={handleDateSelected}
            />
          </IonItem>
        </IonList>
      </IonPopover>
    </>
  );
};

export default MyDatePicker;