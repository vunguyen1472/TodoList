import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { TaskType } from "../../../constants/types";
import { getTasks } from "../../../providers/taskProvider";
import { ActivityIndicator } from "react-native-paper";
import TaskListItem from "./TaskListItem";

const TaskList = () => {
    const [tasks, setTasks] = useState<Array<TaskType>>([])
    const [isTasksLoading, setTasksLoading] = useState(true);

    useEffect(() => {
        setTasksLoading(true);

        getTasks()
        .then(res => setTasks(res))
        .catch(error => console.log(error))
        .finally(() => setTasksLoading(false))
    }, [])

    if (isTasksLoading){
        return <ActivityIndicator size={20} animating={true}/>
    }

    return <FlatList
        data={tasks}
        renderItem={({ item }) => (
            <View key={item.id}>
                <TaskListItem task={item}/>
            </View>
        )}
    />
}
 
export default TaskList;