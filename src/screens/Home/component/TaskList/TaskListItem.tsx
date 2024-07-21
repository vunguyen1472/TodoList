import React from "react";
import { TaskType } from "../../../../constants/types";
import { Swipeable } from "react-native-gesture-handler";
import { IconButton, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { LightTheme } from "../../../../constants/theme";
import { navigate } from "../../../../navigation/navigation";
import { removeTask } from "../../../../services/taskServices";
import { useStores } from "../../../../contexts/root-store-context";

type Props = {
    task: TaskType
}

const TaskListItem = (props: Props) => {
    const theme = useTheme();
    const { task } = props;
    const { taskStore } = useStores();

    const getTaskTimePeriod = (startTime: Date, endTime: Date) => {
        const prefix = new Date(startTime);
        const suffix = new Date(endTime);
        return prefix?.toLocaleTimeString("vi", { timeStyle: "short" }) + " - " + suffix?.toLocaleTimeString("vi", { timeStyle: "short" });
    }

    const leftSwipe = () => {
        return <View style={styles.leftSwipeSection}>
            <IconButton 
                icon={() => (<AntdIcon name="delete" size={20} color={theme.colors.primary}/>)}
                mode="outlined"
                onPress={handleDeleteTask}
                containerColor={theme.colors.onPrimary}
                style={styles.actionBtn}
            />
        </View>
    }

    const handleDeleteTask = () =>{
        if (!task.id){
            return;
        }

        removeTask(task.id)
            .then(res => {
                console.log("Success");
                taskStore.removeTask(task.id);
            })
            .catch(error => console.log("Error: ", error))
    }

    const handleViewTask = () => {
        navigate("ViewTask", {
            taskId: task.id
        });
    }

    const handleEditTask = () => {
        navigate("EditTask", {
            taskId: task.id
        })
    }

    return <Swipeable
        childrenContainerStyle={styles.taskItem}
        renderLeftActions={leftSwipe}
    >
        <View style={styles.taskItemLeft}>
            <Text variant="titleMedium">{task.name}</Text>
            <Text variant="bodyMedium">{getTaskTimePeriod(task.startTime, task.endTime)}</Text>
        </View>
        <View style={styles.taskItemRight}>
            <IconButton 
                icon={() => (<AntdIcon name="edit" size={20} color={theme.colors.primary}/>)}
                mode="outlined"
                onPress={handleEditTask}
                containerColor={theme.colors.onPrimary}
                style={styles.actionBtn}
            />
            <IconButton 
                icon={() => (<AntdIcon name="caretright" size={20} color={theme.colors.primary}/>)}
                mode="outlined"
                onPress={handleViewTask}
                containerColor={theme.colors.onPrimary}
                style={styles.actionBtn}
            />
        </View>
    </Swipeable>
}

export default TaskListItem;

const styles = StyleSheet.create({
    taskItem: {
        borderWidth: 0.5,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    taskItemLeft: {
        flex: 1,
        flexDirection: "column",
        gap: 8
    },
    taskItemRight: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    actionBtn: {
        borderRadius: 8,
    },
    leftSwipeSection: {
        alignItems: "center",
        justifyContent: "center",
        width: "20%",
        borderWidth: 0.5,
        borderEndWidth: 0,
        borderRadius: 8,
        backgroundColor: LightTheme.colors.errorContainer,
        borderColor: LightTheme.colors.errorContainer,
    },
    deleteBtn: {
        backgroundColor: LightTheme.colors.primaryContainer
    }
})