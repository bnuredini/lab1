import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { TestConfirmation } from "../models/testConfirmation";
import {v4 as uuid} from 'uuid'

export default class TestConfirmationStore {
    testConfirmationRegistry = new Map<string, TestConfirmation>();
    selectedTestConfirmation: TestConfirmation | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get testConfirmations() {
        return Array.from(this.testConfirmationRegistry.values());
    }

    loadTestConfirmation = async () => {
        try{
            const testConfirmations = await agent.TestConfirmations.list();
            runInAction(() => {
                testConfirmations.forEach(testConfirmation => {
                    this.testConfirmationRegistry.set(testConfirmation.id, testConfirmation);
                  })         
            })
            this.setLoadingInitial(false);
        }catch (error) {
            console.log(error);
                this.loadingInitial = false;
            
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    
    selectTestConfirmation = (id: string) => {
        this.selectedTestConfirmation = this.testConfirmationRegistry.get(id)
    }

    cancelSelectedTestConfirmation = () => {
        this.selectedTestConfirmation = undefined;
    }

    openForm = (id?: string) => {
        id? this.selectTestConfirmation(id) : this.cancelSelectedTestConfirmation();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createTestConfirmation = async (testConfirmation: TestConfirmation) => {
        this.loading = true;
        testConfirmation.id = uuid();
    
        try {
          await agent.TestConfirmations.create(testConfirmation);
    
          runInAction(() => {
            this.testConfirmationRegistry.set(testConfirmation.id, testConfirmation);
            this.selectedTestConfirmation = testConfirmation;
            this.editMode = false;
            this.loading = false;
          });
        } catch (err) {
          console.log(err);
    
          runInAction(() => {
            this.loading = false;
          });
        }
      };

    updateTestConfirmation = async (testConfirmation: TestConfirmation) => {
        this.loading = true;
        try{
            await agent.TestConfirmations.update(testConfirmation);
            runInAction(() => {
                this.testConfirmationRegistry.set(testConfirmation.id, testConfirmation);
                this.selectedTestConfirmation = testConfirmation;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteTestConfirmation = async (id: string) => {
        this.loading = true;
        try{
            await agent.TestConfirmations.delete(id);
            runInAction(() => {
                this.testConfirmationRegistry.delete(id)
                if(this.selectedTestConfirmation?.id === id) this.cancelSelectedTestConfirmation();
                this.loading = false;
            })
        } catch (error) {
            console.log('response: ', error.response.data);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}
