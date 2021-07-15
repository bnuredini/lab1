import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Role } from "../models/role";
import { v4 as uuid } from "uuid";

export default class RoleStore {
  roleRegistry = new Map<string, Role>();
  selectedRole: Role | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get roles() {
    return Array.from(this.roleRegistry.values());
  }

  loadRoles = async () => {
    try {
      const roles = await agent.Roles.list();

      roles.forEach((role) => {
        this.roleRegistry.set(role.id, role);
      });
      this.setLoadingInitial(false);
    } catch (err) {
      console.log(err);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingIntial = state;
  };

  selectRole = (id: string) => {
    this.selectedRole = this.roleRegistry.get(id);
  };
  

  cancelSelectedRole = () => {
    this.selectedRole = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectRole(id) : this.cancelSelectedRole();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createRole = async (role: Role) => {
    this.loading = true;
    role.id = uuid();

    try {
      await agent.Roles.create(role);

      runInAction(() => {
        this.roleRegistry.set(role.id, role);
        this.selectedRole = role;
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

  updateRole = async (role: Role) => {
    this.loading = true;

    try {
      await agent.Roles.update(role);

      runInAction(() => {
        this.roleRegistry.set(role.id, role);
        this.selectedRole = role;
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

  deleteRole = async (id: string) => {
    this.loading = true;

    try {
      await agent.Roles.delete(id);

      runInAction(() => {
        this.roleRegistry.delete(id);
        if (this.selectedRole?.id === id) this.cancelSelectedRole();
        this.loading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}