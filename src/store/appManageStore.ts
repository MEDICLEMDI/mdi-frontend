import { action, makeObservable, observable } from "mobx";

export interface IAppManage {
  companyGroup: [] | undefined;
  productGroup: [] | undefined;
}

class AppManageStore {
  appManage: IAppManage = {
    companyGroup: undefined,
    productGroup: undefined,
  }
  selectedGroup: number = 1;

  constructor() {
    makeObservable(this, {
      appManage: observable,
      selectedGroup: observable,
      init: action,
      getData: action,
      select: action,
      selected: action,
      reset: action,
    })
  }
  
  init = (data: IAppManage) => {
    this.appManage = data;

    return true;
  }

  select = (index: number) => {
    if (typeof index !== "number") index = Number(index);
    return this.selectedGroup = index;
  }

  selected = () => {
    return this.selectedGroup;
  }

  getData = () => {
    return this.appManage;
  }

  reset = () => {
    this.selectedGroup = 1;
    this.appManage = {
      companyGroup: undefined,
      productGroup: undefined,
    };

    return true;
  }
}

export default AppManageStore;