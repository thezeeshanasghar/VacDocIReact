import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./pages/menu/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/login/Login";
import DoctorSignUp from "./pages/doctor-signup/signup/DoctorSignUp";
import ClinicRegistration from "./pages/doctor-signup/add-clinic/ClinicRegistration";
import ClinicSchedule from "./pages/doctor-signup/doc_schedule/ClinicSchedule";
import { useEffect } from "react";

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    window.alert = function (message) {
      var alertContainer = document.createElement("div");
      alertContainer.className = "custom-alert";

      alertContainer.style.position = "fixed";
      alertContainer.style.top = "10px";
      alertContainer.style.right = "10px";
      alertContainer.style.width = "max-content";
      alertContainer.style.padding = "14px 20px";
      alertContainer.style.fontSize = "11px";
      alertContainer.style.backgroundColor = "#f44336";
      alertContainer.style.color = "white";
      alertContainer.style.borderRadius = "5px";
      alertContainer.style.opacity = "0";
      alertContainer.style.transition = "opacity 0.5s ease-in-out";

      alertContainer.textContent = message;

      document.body.appendChild(alertContainer);

      // Show the alert
      setTimeout(function () {
        alertContainer.style.opacity = "1";
      }, 100);
      setTimeout(function () {
        alertContainer.style.opacity = "0";
        setTimeout(function () {
          document.body.removeChild(alertContainer);
        }, 500);
      }, 3000);
    };
  });
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Login} />
          <Route path="/members" component={Menu} />
          <Route exact path={"/auth/reg_doc"} component={DoctorSignUp} />
          <Route
            exact
            path={"/auth/reg_clinic"}
            component={ClinicRegistration}
          />
          <Route
            exact
            path={"/auth/clinic_schedule"}
            component={ClinicSchedule}
          />
          {/* <Route path="*" component={NotFound} /> */}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
