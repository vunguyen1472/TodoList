import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Task, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { TaskType } from "../../constants/types";
import TaskListItem from "./TaskListItem";
import { observer } from "mobx-react-lite";
import { useStores } from "../../contexts/root-store-context";
import { isTaskContainSelectedCategories } from "../../helpers";

type Props ={
    selectedCategories: number[]
}

const TaskList = (props: Props) => {
    const { selectedCategories } = props;

    const { taskStore } = useStores();
    const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            const filteredTasks = taskStore.taskList.filter(task => isTaskContainSelectedCategories(task, selectedCategories))
            setFilteredTasks(filteredTasks);
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [selectedCategories, taskStore.taskList])
    
    if (taskStore.isLoading){
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
 
export default observer(TaskList);

const styles = StyleSheet.create({
    list: {
        flexDirection: 'column',
        gap: 16,
        paddingBottom: 60
    }
})