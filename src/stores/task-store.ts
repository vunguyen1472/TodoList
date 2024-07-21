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

    @action addTask = (newTask: TaskType) => {
        if (!newTask.id){
            newTask.id = this.taskList.length;
        }

        this.taskList = [...this.taskList, newTask];
    }

    @action removeTask(taskId: number | undefined) {
        this.taskList = this.taskList.filter(task => task.id != taskId);
    }

    @action editTask(modifiedTask: TaskType) {
        this.taskList = this.taskList.map(task => {
            if (task.id != modifiedTask.id){
                return task
            }

            return modifiedTask
        })
    }
}

