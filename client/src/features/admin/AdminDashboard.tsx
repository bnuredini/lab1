import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import AllergyDashboard from "../allergies/dashboard/AllergyDashboard";
import ChronicDiseaseDashboard from "../chronicDiseases/dashboard/ChronicDiseaseDashboard";
import CovidRestrictions from "../covidRestrictions/covidRestrictions";
import Doctor from "../doctor/doctor";
import DrugDashboard from "../drugs/dashboard/DrugDashboard";
import Location from "../location/location";
import PatientDashboard from "../patients/dashboard/PatientDashboard";
import PrivateCenterDashboard from "../privateCenters/dashboard/PrivateCenterDashboard";
import PublicCenterDashboard from "../publicCenters/dashboard/PublicCenterDashboard";
import ResultDashboard from "../result/dashboard/ResultDashboard";
import TestConfirmation from "../testConfirmation/testConfirmation";
import Treatment from "../treatment/Treatment";
import VaccineConfirmation from "../vaccineConfirmation/vaccineConfirmation";
import VaccineDashboard from "../vaccines/dashboard/VaccineDashboard";
import VariationDashboard from "../vatiations/dashboard/VariationDashboard";

export default class AdminDashboard extends Component {
  state = { activeItem: "privateCenters" };

  handleItemClick = (e: any, { name }: any) =>
    this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const panes = [
      {
        menuItem: "Semundjet Kronike",
        render: () => <ChronicDiseaseDashboard />,
      },
      { menuItem: "Qendrat Private", render: () => <PrivateCenterDashboard /> },
      { menuItem: "Qendrat Publike", render: () => <PublicCenterDashboard /> },
      { menuItem: "Vaksinat", render: () => <VaccineDashboard /> },
      { menuItem: "Variantet", render: () => <VariationDashboard /> },
      { menuItem: "Alergjite", render: () => <AllergyDashboard /> },
      { menuItem: "Trajtimet", render: () => <Treatment /> },
      { menuItem: "Doktoret", render: () => <Doctor /> },
      { menuItem: "Masat dhe kufizimet", render: () => <CovidRestrictions /> },
      { menuItem: "Komunat e Kosoves", render: () => <Location /> },
      { menuItem: "Ilaqet", render: () => <DrugDashboard /> },
      { menuItem: "Konfirmimet e testeve", render: () => <TestConfirmation /> },
      { menuItem: "Konfirmimet e vaksinave", render: () => <VaccineConfirmation /> },
      { menuItem: "Rezultatet", render: () => <ResultDashboard /> },
      { menuItem: "Pacientet", render: () => <PatientDashboard /> },
    ];
    return (
      <Tab
        className="admin-tab"
        menu={{ fluid: true, vertical: true }}
        active={activeItem}
        menuPosition="left"
        panes={panes}
        //  onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
      />
    );
  }
}
