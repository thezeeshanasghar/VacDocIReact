import {
  IonCard,
  IonCardTitle,
  IonToggle,
  IonCardContent,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonInput,
  IonCardHeader,
} from "@ionic/react";
import React, { useState } from "react";

type WeekDayCard = {
  name: string;
};

const Test: React.FC<WeekDayCard> = ({ name = "SUnday" }) => {
  const [showSession1, setShowSession1] = useState(true);
  const [showSession2, setShowSession2] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [mstart, setMStart] = useState();
  const [mend, setMEnd] = useState();
  const [mstart2, setMStart2] = useState();
  const [mend2, setMEnd2] = useState();

  const handleToggleSession1 = (e) => {
    setShowSession1(e.detail.checked);
  };

  const handleToggleSession2 = (e) => {
    setShowSession2(e.detail.checked);
  };

  const handleToggleCard = (e) => {
    setShowCard(e.detail.checked);
  };

  const handleTimeChange = (e, input) => {
    const { value } = e.target;
    if (input === "start") {
      setMStart(value);
    } else if (input === "end") {
      setMEnd(value);
    } else if (input === "start2") {
      setMStart2(value);
    } else if (input === "end2") {
      setMEnd2(value);
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <IonCardTitle>{name}</IonCardTitle>
          <IonToggle checked={showCard} onIonChange={handleToggleCard} />
        </div>
      </IonCardHeader>

      {showCard && (
        <IonCardContent>
          <IonItem lines="none">
            <IonLabel>Session: 1</IonLabel>
            <IonToggle
              checked={showSession1}
              onIonChange={handleToggleSession1}
            />
          </IonItem>

          {showSession1 && (
            <IonRow>
              <IonCol>
                <IonItem>
                  <label htmlFor="startTime">Start Time</label>
                  <IonInput
                    id="startTime"
                    type="time"
                    value={mstart}
                    onIonChange={(e) => handleTimeChange(e, "start")}
                  />
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <label htmlFor="endTime">End Time</label>
                  <IonInput
                    id="endTime"
                    type="time"
                    value={mend}
                    onIonChange={(e) => handleTimeChange(e, "end")}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
          )}

          <IonItem lines="none">
            <IonLabel>Session: 2</IonLabel>
            <IonToggle
              checked={showSession2}
              onIonChange={handleToggleSession2}
            />
          </IonItem>

          {showSession2 && (
            <IonRow>
              <IonCol>
                <IonItem>
                  <label htmlFor="startTime2">Start Time</label>
                  <IonInput
                    id="startTime2"
                    type="time"
                    value={mstart2}
                    onIonChange={(e) => handleTimeChange(e, "start2")}
                  />
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <label htmlFor="endTime2">End Time</label>
                  <IonInput
                    id="endTime2"
                    type="time"
                    value={mend2}
                    onIonChange={(e) => handleTimeChange(e, "end2")}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
          )}
        </IonCardContent>
      )}
    </IonCard>
  );
};

export default Test;
