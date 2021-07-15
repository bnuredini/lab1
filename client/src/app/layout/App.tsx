import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import TestDashboard from "../../features/tests/dashboard/TestDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import CountryDashboard from "../../features/stats/CountryDashboard";
import PatientDashboard from "../../features/patients/dashboard/PatientDashboard";
import PatientForm from "../../features/patients/form/PatientForm";
import TestErrors from "../../errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../errors/NotFound";
import ServerError from "../../errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import Stats from "../../features/covComponents/Stats";
import ScreeningTest from "../../features/screeningTest/ScreeningTest";
import AdminDashboard from "../../features/admin/AdminDashboard";
import VaccineDashboard from "../../features/vaccines/dashboard/VaccineDashboard";
import PublicCenterDashboard from "../../features/publicCenters/dashboard/PublicCenterDashboard";
import PrivateCenterDashboard from "../../features/privateCenters/dashboard/PrivateCenterDashboard";
import VariationDashboard from "../../features/vatiations/dashboard/VariationDashboard";
import ChronicDiseaseDashboard from "../../features/chronicDiseases/dashboard/ChronicDiseaseDashboard";
import Article from "../../features/articles/Article";
import ProfilePage from "../../features/profiles/ProfilePage";
import DrugDashboard from "../../features/drugs/dashboard/DrugDashboard";
import Treatment from "../../features/treatment/Treatment";
import VaccineApplications from "../../features/vaccineApplications/vaccineApplications";
import AllergyDashboard from "../../features/allergies/dashboard/AllergyDashboard";
import CovidRestrictions from "../../features/covidRestrictions/covidRestrictions";
import Doctor from "../../features/doctor/doctor";
import Location from "../../features/location/location";
import ResultDashboard from "../../features/result/dashboard/ResultDashboard";
import TestConfirmation from "../../features/testConfirmation/testConfirmation";
import VaccineConfirmation from "../../features/vaccineConfirmation/vaccineConfirmation";
        
        
        


function App() {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <NavBar />
      <ModalContainer />
      <ToastContainer position="bottom-right" hideProgressBar />

      <Container style={{ marginTop: "7em" }}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/screening-test" component={ScreeningTest} />
          <Route exact path="/stats" component={Stats} />
          <Route path="/tests" component={TestDashboard} />
          <Route path="/countries" component={CountryDashboard} />
          <Route path="/patients" component={PatientDashboard} />
          <Route path="/newPatient" component={PatientForm} />
          <Route path="/vaccines" component={VaccineDashboard} />
          <Route path="/treatments" component={Treatment}/>
          <Route path="/publicCenters" component={PublicCenterDashboard} />
          <Route path="/drugs" component={DrugDashboard} />
          <Route path="/privateCenters" component={PrivateCenterDashboard} />
          <Route path="/chronicDiseases" component={ChronicDiseaseDashboard} />
          <Route path="/variations" component={VariationDashboard} />
          <Route path="/errors" component={TestErrors} />
          <Route path="/profiles/:username" component={ProfilePage} />
          <Route path="/server-error" component={ServerError} />
          <Route path="/login" component={LoginForm} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/articles" component={Article} />
          <Route path="/applications" component={VaccineApplications} />
          <Route path="/allergies" component={AllergyDashboard}/>
          <Route path="/doctors" component={Doctor}/>
          <Route path="/covidrestrictions" component={CovidRestrictions} />
          <Route path="/locations" component={Location}/>
          <Route path="/results" component={ResultDashboard} />
         <Route path="/testconfirmation" component={TestConfirmation} />
          <Route path="/vaccineconfirmation" component={VaccineConfirmation} />
          <Route exact path="/loginpage" component={HomePage} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </>
  );
}

export default observer(App);
