import { IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Dashboard from "../pages/dashboard/Dashboard";
import Alert from "../pages/alert/Alert";
import Test from "../pages/Test";

const Routes: React.FC = () => {
  return (
    <>
      <IonRouterOutlet id="main-content" style={{ width: "100%" }}>
        <Route exact path="/members/dashboard" component={Dashboard} />
        <Route exact path="/members/alert/vaccine-alert" component={Alert} />

        <Route exact path={"/members/test"} component={Test} />
        <Route exact path="/members">
          <Redirect to="/members/dashboard" />
        </Route>
      </IonRouterOutlet>
    </>
  );
};

export default Routes;
