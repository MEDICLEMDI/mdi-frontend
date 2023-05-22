import AppManageStore from "./appManageStore";

class RootStore {
    appManageStore;

    constructor() {
      this.appManageStore = new AppManageStore();
    }
}

export default RootStore;
  