import {
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  home,
  alertOutline,
  powerSharp,
  personAdd,
  man,
  create,
  moon,
} from "ionicons/icons";
import "./Menu.css";
import Routes from "../../routes/Routes";
import React from "react";
interface AppPage {
  url: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Dashboard",
    url: "/members/dashboard",

    mdIcon: home,
  },
  {
    title: "Alert",
    url: "/members/alert/vaccine-alert",
    mdIcon: alertOutline,
  },
  {
    title: "Edit Profile",
    url: "/members/doctor/edit-profile",
    mdIcon: create,
  },
  {
    title: "Clinic",
    url: "/members/doctor/clinic",
    mdIcon: moon,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <IonPage>
        <IonSplitPane contentId="main-content" style={{ width: "100vw" }}>
          <IonMenu contentId="main-content" type="overlay">
            <IonHeader>
              <IonToolbar color="primary">
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList id="inbox-list"  style={{borderBottom: 'none'}}>
                {appPages.map((appPage, index) => {
                  return (
                    <IonMenuToggle key={index} autoHide={false}>
                      <IonItem
                        className={
                          location.pathname === appPage.url ? "selected" : ""
                        }
                        routerLink={appPage.url}
                        routerDirection="none"
                      >
                        <IonIcon
                          color="primary"
                          aria-hidden="true"
                          slot="start"
                          md={appPage.mdIcon}
                        />
                        <IonLabel>{appPage.title}</IonLabel>
                      </IonItem>
                      {index === 1 && (
                        <IonItem style={{marginTop: '3px'}}>
                          <IonLabel
                            color={"primary"}
                            style={{ fontWeight: 500, marginBottom: '0' }}
                          >
                            Doctor
                          </IonLabel>
                        </IonItem>
                      )}
                    </IonMenuToggle>
                  );
                })}
              </IonList>
            </IonContent>
            &nbsp;&nbsp;
            <IonLabel style={{ margin: ".5rem 1rem" }} color="primary">
              Child
            </IonLabel>
            <IonFooter>
              <IonMenuToggle autoHide={false}>
                <IonItem routerLink="/members/child" routerDirection="back">
                  <IonIcon icon={man} slot="start" color="primary" />
                  Patients
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem routerLink="/members/child/add" routerDirection="back">
                  <IonIcon icon={personAdd} slot="start" color="primary" />
                  Add
                </IonItem>
              </IonMenuToggle>
              <IonItem routerLink="/" routerDirection="back">
                <IonIcon icon={powerSharp} slot="start" color="primary" />
                Logout
              </IonItem>
            </IonFooter>
          </IonMenu>
          <Routes />
        </IonSplitPane>
      </IonPage>
    </>
  );
};

export default Menu;
