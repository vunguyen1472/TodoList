import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { getTasks } from "../../providers/taskProvider";
import { ActivityIndicator, Text } from "react-native-paper";
import { TaskType } from "../../constants/types";
import TaskListItem from "./TaskListItem";

type Props = {
    selectedCategories: number[]
}

const TaskList = (props: Props) => {
    const { selectedCategories } = props;

    const [tasks, setTasks] = useState<Array<TaskType>>([]);
    const [isTasksLoading, setTasksLoading] = useState(true);
    const [filteredTasks, setFilteredTasks] = useState<Array<TaskType>>([]);

    const isTaskContainSelectedCategories = (task: TaskType) => {
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

    useEffect(() => {
        setTasksLoading(true);

        getTasks()
        .then(res => {
            setFilteredTasks(res);
            setTasks(res);
        })
        .catch(error => console.log(error))
        .finally(() => setTasksLoading(false))
    }, [])

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setFilteredTasks(tasks.filter(task => isTaskContainSelectedCategories(task)))
        }, 800);
        return () => clearTimeout(timeOutId);
    }, [selectedCategories])

    if (isTasksLoading){
        return <ActivityIndicator size={20} animating={true}/>
    }

    if (filteredTasks.length == 0){
        return <Text>No tasks found</Text>
    }

    return (
        <FlatList 
            data={filteredTasks}
            contentContainerStyle={styles.list}
            style={{ flex: 1}}
            renderItem={({ item }) => (
                <View key={item.id}>
                    <TaskListItem task={item}/>
                </View>
            )}
        />
    );
}
 
export default TaskList;

const styles = StyleSheet.create({
    list: {
        flexDirection: 'column',
        gap: 16
    }
})