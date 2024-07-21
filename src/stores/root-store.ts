import { makeObservable, observable } from "mobx";
import { TaskStore } from "./task-store";

export class RootStore {
    @observable accessor taskStore: TaskStore;

    constructor() {
        this.taskStore = new TaskStore();
    }
}