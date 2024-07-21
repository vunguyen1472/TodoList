import { CategoryType, TaskType } from "../constants/types";

export const dateUniform = (date: Date, startTime: Date, endTime: Date) => {
    const newStartTime = new Date(date);
    newStartTime.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(), startTime.getMilliseconds())

    const newEndTime = new Date(date);
    newEndTime.setHours(endTime.getHours(), endTime.getMinutes(), endTime.getSeconds(), endTime.getMilliseconds())

    return { date, newStartTime, newEndTime }
}

export const getCurrentDateString = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en-GB', {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

export const isTaskContainSelectedCategories = (task: TaskType, selectedCategories: number[]) => {
    if (selectedCategories.length == 0){
        return true;
    }
    
    for (var selectedCategoryId of selectedCategories) {
        if (!task.category){
            return false;
        }
        if (task.category.includes(selectedCategoryId)) {
            return true;
        }
    }   
    return false;
}