import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
} from "@ionic/react";
import React, { useState } from "react";
import WeekDaysCard, { ISession } from "./WeekDaysCard";
import Header from "../../components/header/Header";

const AddClinic: React.FC = () => {
  const [clinicName, setClinicName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [sessions, setSessions] = useState<ISession[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform submit logic with clinicName, phoneNumber, address, and sessions data
    console.log(sessions);
  };

  return (
    <IonPage>
      <IonContent>
        <Header pageName="Add Clinic" />
        <form noValidate className="ion-padding" onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating" color="primary">
              Name
            </IonLabel>
            <IonInput
              type="text"
              required
              value={clinicName}
              onIonChange={(e) => setClinicName(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="primary">
              Phone Number
            </IonLabel>
            <IonInput
              type="text"
              required
              value={phoneNumber}
              onIonChange={(e) => setPhoneNumber(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="primary">
              Address
            </IonLabel>
            <IonTextarea
              required
              value={address}
              onIonChange={(e) => setAddress(e.detail.value!)}
            ></IonTextarea>
          </IonItem>

          <WeekDaysCard name={"Monday"} SessionArray={setSessions} />
          <WeekDaysCard name={"Tuesday"} SessionArray={setSessions} />
          <WeekDaysCard name={"Monday"} SessionArray={setSessions} />
          <WeekDaysCard name={"Wednesday"} SessionArray={setSessions} />
          <WeekDaysCard name={"Thursday"} SessionArray={setSessions} />
          <WeekDaysCard name={"Friday"} SessionArray={setSessions} />
          <WeekDaysCard name={"Saturday"} SessionArray={setSessions} />
          <WeekDaysCard name={"Sunday"} SessionArray={setSessions} />

          <IonItem style={{ minHeight: "300px" }}>
            <div
              className="map"
              style={{
                minHeight: "300px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Google Maps component or placeholder */}
            </div>
          </IonItem>
          <IonButton type="submit">Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddClinic;

//   IonButton,
//   IonContent,
//   IonInput,
//   IonItem,
//   IonLabel,
//   IonPage,
//   IonTextarea,
// } from "@ionic/react";
// import React from "react";
// import WeekDaysCard from "./WeekDaysCard";
// import Header from "../../components/header/Header";

// const AddClinic: React.FC = () => {

//   return (
//     <IonPage>
//       <IonContent>
//         <Header pageName="Add Clinic" />
//         <form noValidate className="ion-padding">
//           <IonItem>
//             <IonLabel position="floating" color="primary">
//               Name
//             </IonLabel>
//             <IonInput type="text" required />
//           </IonItem>
//           <IonItem>
//             <IonLabel position="floating" color="primary">
//               Phone Number
//             </IonLabel>
//             <IonInput type="text" required />
//           </IonItem>
//           <IonItem>
//             <IonLabel position="floating" color="primary">
//               Address
//             </IonLabel>
//             <IonTextarea required></IonTextarea>
//           </IonItem>
//           <WeekDaysCard name="Monday" />
//           <WeekDaysCard name="Tuesday" />
//           <WeekDaysCard name="Wednesday" />
//           <WeekDaysCard name="Thursday" />
//           <WeekDaysCard name="Friday" />
//           <WeekDaysCard name="Satureday" />
//           <WeekDaysCard name="Sunday" />
//           <IonItem style={{ minHeight: "300px" }}>
//             <div
//               className="map"
//               style={{
//                 minHeight: "300px",
//                 position: "relative",
//                 overflow: "hidden",
//               }}
//             >
//               {/* Google Maps component or placeholder */}
//             </div>
//           </IonItem>
//           <IonButton type="submit" disabled>
//             Submit
//           </IonButton>
//         </form>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default AddClinic;
