import { observable, action, runInAction, flow, computed, remove} from "mobx"
import {  TaskType } from "../constants/types";
import { getTasks } from "../services/taskServices";
import { isTaskContainSelectedCategories } from "../helpers";

export class TaskStore {
    @observable accessor taskList: TaskType[] = [];
    @observable accessor isLoading: boolean = true;
    @observable accessor error: string | unknown = "";

    constructor() {
        this.fetchTasks();
    }

    @action fetchTasks() {
        this.isLoading = true;
        this.error = null;

        getTasks()
            .then(res => {
                runInAction(() => {
                    // console.log(res);
                    this.taskList = res;
                })
            })
            .catch(error => {
                runInAction(() => {
                    // console.log(error);
                    this.error = error;
                })
            })
            .finally(() => {
                runInAction(() => this.isLoading = false)
            })
    }

    // Mutations
    @action addTask = (newTask: TaskType) => {
        if (!newTask.id){
            newTask.id = this.taskList.length;
        }

        this.taskList = [...this.taskList, newTask];
    }

    // @action removeTask = (removeTaskId: number) => {
    //     this.taskList = this.taskList.filter(task => task.id != removeTaskId)
    // }

    // // runInActions
    // @action getTasks = async () => {
    //     this.isLoading = true;
    //     this.error = "null";
    //     try {
    //         const tasks = await getTasks();
    //         runInAction(() => {
    //             this.taskList = tasks;
    //             this.isLoading = false
    //         })
    //     } catch (error) {
    //         runInAction(() => {
    //             this.isLoading = false;
    //             this.error ="Failed"
    //         })
    //     }
    // }

    // // Computeds
    // @computed get filteredTaskList(): TaskType[] {
    //     return this.taskList.filter(task => isTaskContainSelectedCategories(task, this.filteredCategoryIds))
    // }
}

