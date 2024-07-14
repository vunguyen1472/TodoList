import React from "react";
import { TaskType } from "../../../constants/types";
import { Swipeable } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";

type Props = { 
    task: TaskType
}

const TaskListItem = (props: Props) => {
    const { task } = props;
    
    const getTaskTimePeriod = (startTime: Date, endTime: Date) => {
        const prefix = new Date(startTime);
        const suffix = new Date(endTime);
        return prefix?.toLocaleTimeString("vi", {timeStyle: "short"}) + " - " + suffix?.toLocaleTimeString("vi", {timeStyle: "short"}); 
        // return ""
    }

    return <Swipeable
        containerStyle={styles.container}
    >
        <Text>{task.name}</Text>
        <Text>{getTaskTimePeriod(task.startTime, task.endTime)}</Text>
    </Swipeable>
}
 
export default TaskListItem;

const styles = StyleSheet.create({
    container: {

    }
})