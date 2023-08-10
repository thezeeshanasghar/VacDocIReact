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
import Toast from "../../components/custom-toast/Toast";

const Login: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const navigation = useIonRouter();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [mobileNumber, setmobileNumber] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      fetch(
        `${import.meta.env.VITE_API_URL}api/Doctor/login?MobileNumber=${mobileNumber}&Password=${password}`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          if (res.status === 200) {
            setSuccess(true);
            navigation.push("/members", "root");
            return res.json();
          } else {
            setError(true);
            throw new Error("An error occurred while logging in.");
          }
        })
        .then((data) => {
          console.log(data);
          sessionStorage.setItem("docData", JSON.stringify(data));
        })
        .catch((err: any) => {
          setError(true);
          console.error(err);
        })
        .finally(() => {
          setmobileNumber("");
          setpassword("");
        });
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  const canSubmit = password.length > 0 && mobileNumber.length > 0;

  return (
    <>
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        color="success"
        errMsg="Doctor Login successful"
      />
      <Toast
        isOpen={error}
        setOpen={setError}
        color="danger"
        errMsg="An error occurred while logging in. Please try again."
      />
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
                      value={mobileNumber}
                      onIonChange={(e) => setmobileNumber(e.detail.value!)}
                      required
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
                      value={password}
                      onIonChange={(e) => setpassword(e.detail.value!)}
                      required
                    />
                  </div>
                  <IonButton
                    type="submit"
                    expand="full"
                    strong
                    className="custom-button"
                    disabled={!canSubmit}
                  >
                    <IonIcon icon={logIn} color="light" />
                    &nbsp; Login
                  </IonButton>
                  <IonText
                    style={{
                      color: "#fff",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigation.push("/auth/reg_doc")}
                    id="sign"
                  >
                    Don't have an account? &nbsp; Sign Up
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
