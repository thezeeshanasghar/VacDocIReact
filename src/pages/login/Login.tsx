import React, { FormEvent, useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  useIonRouter,
  IonCard,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
} from "@ionic/react";
import { mail, lockClosed, logIn } from "ionicons/icons";
import "./Login.css";
// import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";

const Login: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const navigation = useIonRouter();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // setShowLoading(true);
    event.preventDefault();
    navigation.push("/members", "root");
  };

  return (
    <>
      {/* <LoadingSpinner
        isOpen={showLoading}
        setOpen={setShowLoading}
        time={1000}
      /> */}
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>&nbsp;&nbsp;Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="wrapper">
            <IonCard className="login-card">
              <div className="form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="input-container">
                    <IonIcon icon={mail} id="myicon" />
                    <IonInput
                      type="number"
                      placeholder=" "
                      className="animated-input"
                      label="&nbsp;&nbsp;&nbsp; Mobile Number"
                      labelPlacement="floating"
                      color="light"
                    />
                  </div>
                  <div className="input-container">
                    <IonIcon icon={lockClosed} id="myicon" />
                    <IonInput
                      type="password"
                      placeholder=" "
                      className="animated-input"
                      label="&nbsp;&nbsp;&nbsp;&nbsp;Password"
                      labelPlacement="floating"
                      color="light"
                    />
                  </div>
                  <IonButton
                    type="submit"
                    expand="full"
                    strong
                    className="custom-button"
                  >
                    <IonIcon icon={logIn} color="light" />
                    &nbsp; Login
                  </IonButton>
                  <IonText
                    style={{ color: "#fff", marginTop: "10px" }}
                    onClick={() => navigation.push("/auth/reg_doc")}
                  >
                    don't have Account? &nbsp; Sign Up
                  </IonText>
                </form>
              </div>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Login;
