import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile, UserAllergy, UserVaccineApplication, UserChronicDisease, UserDoctor, UserDrug, UserResult, UserTreatment, UserVaccine } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    uploading = false;
    loading = false;
    loadFollowings = false;
    activeTab = 0;
    userAllergies: UserAllergy[] = [];
    userVaccines: UserVaccine[] = [];
    userChronicDiseases: UserChronicDisease[] = [];
    userResults: UserResult[] = [];
    userDoctors: UserDoctor[] = [];
    userDrugs: UserDrug[] = [];
    userTreatments: UserTreatment[] = [];
    userVaccineApplications: UserVaccineApplication[] = [];
    loadingAllergies = false;
    loadingVaccines = false;
    loadingChronicDiseases = false;
    loadingResults = false;
    loadingDoctors = false;
    loadingDrugs = false;
    loadingTreatments = false;
    loadingVaccineApplications = false;

    constructor() {
        makeAutoObservable(this);

        // reaction(
        //     () => this.activeTab
        //     activeTab => {
        //         if (activeTab === 3 || activeTab === 4) {
        //             const predicate = activeTab === 3 ? 'allergies' : 'vaccines';
        //             this.loadVaccines(predicate);
        //         } else {
        //             this.userAllergies = [];
        //         }
            
        // )
    }

    setActiveTab = (activeTab: any) => {
        this.activeTab = activeTab;
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    updateProfile = async (profile: Partial<Profile>) => {
        this.loading = true;
        try {
            await agent.Profiles.updateProfile(profile);
            runInAction(() => {
                if (profile.displayName && profile.displayName !== store.userStore.user?.displayName) {
                    store.userStore.setDisplayName(profile.displayName);
                }
                this.profile = {...this.profile, ...profile as Profile};
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    loadUserAllergies = async (username: string, predicate?: string) => {
        this.loadingAllergies = true;
        try {
            const allergies = await agent.Profiles.listAllergies(username, predicate!);
            runInAction(() => {
                this.userAllergies = allergies;
                this.loadingAllergies = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingAllergies = false;
            })
        }
    }

    loadUserVaccines = async (username: string, predicate?: string) => {
        this.loadingVaccines = true;
        try {
            const vaccines = await agent.Profiles.listVaccines(username, predicate!);
            runInAction(() => {
                this.userVaccines = vaccines;
                this.loadingVaccines = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingVaccines = false;
            })
        }
    }

    loadUserChronicDiseases = async (username: string, predicate?: string) => {
        this.loadingChronicDiseases = true;
        try {
            const chronicDiseases = await agent.Profiles.listChronicDisease(username, predicate!);
            runInAction(() => {
                this.userChronicDiseases = chronicDiseases;
                this.loadingChronicDiseases = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingChronicDiseases = false;
            })
        }
    }
    loadUserResults = async (username: string, predicate?: string) => {
        this.loadingResults = true;
        try {
            const results = await agent.Profiles.listResults(username, predicate!);
            runInAction(() => {
                this.userResults = results;
                this.loadingResults = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingResults = false;
            })
        }
    }
    loadUserVaccineApplications = async (username: string, predicate?: string) => {
        this.loadingVaccineApplications = true;
        try {
            const applications = await agent.Profiles.listVaccineApplications(username, predicate!);
            runInAction(() => {
                this.userVaccineApplications = applications;
                this.loadingVaccineApplications = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingVaccineApplications = false;
            })
        }
    }
    loadUserTreatments = async (username: string, predicate?: string) => {
        this.loadingTreatments = true;
        try {
            const treatment = await agent.Profiles.listTreatments(username, predicate!);
            runInAction(() => {
                this.userTreatments = treatment;
                this.loadingTreatments = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingTreatments = false;
            })
        }
    }
    loadUserDrugs = async (username: string, predicate?: string) => {
        this.loadingResults = true;
        try {
            const drugs = await agent.Profiles.listDrugs(username, predicate!);
            runInAction(() => {
                this.userDrugs = drugs;
                this.loadingDrugs = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingDrugs = false;
            })
        }
    }
    loadUserDoctors = async (username: string, predicate?: string) => {
        this.loadingDoctors = true;
        try {
            const doctors = await agent.Profiles.listDoctors(username, predicate!);
            runInAction(() => {
                this.userDoctors = doctors;
                this.loadingDoctors = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingDrugs = false;
            })
        }
    }

}