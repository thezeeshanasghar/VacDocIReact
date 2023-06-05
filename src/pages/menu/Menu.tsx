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
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  archiveSharp,
  home,
  alertOutline,
  mail,
  powerSharp,
  personAdd,
  man,
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
    title: "Message",
    url: "/page/Favorites",
    mdIcon: mail,
  },
  {
    title: "Archived",
    url: "/page/Archived",
    mdIcon: archiveSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <IonSplitPane contentId="main-content" style={{ width: "100vw" }}>
        <IonMenu contentId="main-content" type="overlay">
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Menu Content</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList id="inbox-list">
              {appPages.map((appPage, index) => {
                if (index === 3) {
                  return (
                    <React.Fragment key={index * 22}>
                      <IonItem>
                        <IonLabel color={"primary"} style={{ fontWeight: 500 }}>
                          doctor
                        </IonLabel>
                      </IonItem>
                    </React.Fragment>
                  );
                }
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
                        aria-hidden="true"
                        slot="start"
                        md={appPage.mdIcon}
                      />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              })}
            </IonList>
          </IonContent>
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
    </>
  );
};

export default Menu;
