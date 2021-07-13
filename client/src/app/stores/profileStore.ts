import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile, UserAllergy, UserChronicDisease, UserVaccine } from "../models/profile";
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
    loadingAllergies = false;
    loadingVaccines = false;
    loadingChronicDiseases = false;

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

}