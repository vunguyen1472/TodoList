import React, {useState, useEffect} from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { navigate, RootStackParamList } from "../../navigation/navigation";
import { editTask, getTask } from "../../services/taskServices";
import { TaskType } from "../../constants/types";
import { Controller, useForm } from "react-hook-form";
import { globalStyles } from "../../constants/globalStyles";
import FormItem from "../CreateTask/components/FormItem";
import Stack from "../../components/Stack";
import { LightTheme } from "../../constants/theme";
import { dateUniform } from "../../helpers";
import { useStores } from "../../contexts/root-store-context";

type FormValues = {
    title: string,
    description: string,
    date: Date,
    startTime: Date,
    endTime: Date,
    categories: Array<number>
}

const EditTask = () => {
    const {taskStore} = useStores();
    const route = useRoute<RouteProp<RootStackParamList>>();
    const [isTaskLoading, setTaskLoading] = useState(true);
    const [task, setTask] = useState<TaskType>();
    const taskId = route.params?.taskId;


    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors }
    } = useForm<FormValues>();

    useEffect(() => {
        setTaskLoading(true);

        getTask(taskId)
            .then(res => {
                setTask(res);

                setValue('title', res.name);
                setValue('description', res.description);
                setValue('date', new Date(res.date));
                setValue('startTime', new Date(res.startTime));
                setValue('endTime', new Date(res.endTime));
                setValue('categories', res.category)
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setTaskLoading(false);
            })
    }, [])

    const handleEditTask = (data: FormValues) => {
        const { date, newStartTime, newEndTime } = dateUniform(data.date, data.startTime, data.endTime);

        const modifiedTask: TaskType = {
            id: taskId,
            name: data.title,
            description: data.description,
            date: date,
            startTime: newStartTime,
            endTime: newEndTime,
            category: data.categories,
            status: true
        }

        editTask(modifiedTask)
            .then(res => {
                taskStore.editTask(modifiedTask)
               navigate("Home")
            })
            .catch(error => console.log(error))
    }

    if (isTaskLoading){
        return <ActivityIndicator />
    }

    return (  
        <ScrollView style={[globalStyles.screenWrapper]} contentContainerStyle={{ paddingBottom: 60 }} >
            <Controller control={control}
                name="title"
                rules={{
                    required: {value: true, message: "Task's name required!"}
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.formItem}>
                        <FormItem type="text" title="Title" value={value} onChange={onChange} onBlur={onBlur}/>
                        {errors.title && <Text variant={"bodySmall"} style={styles.formErrorMessage}>{errors.title?.message}</Text>}
                    </View>
                )}
            />

            <Controller control={control}
                name="date"
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.formItem}>
                        <FormItem type="date" title="Date" value={value} onChange={onChange} onBlur={onBlur} />
                    </View>
                )}
            />
            
            <View style={styles.formItem}>
                <Stack direction="horizontal" gap={32}>
                    <Controller control={control}
                        name="startTime"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormItem
                                type="time"
                                title="Start time"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                style={{ flex: 1 }}
                            />
                        )}
                    />
                    <Controller control={control}
                        name="endTime"
                        rules={{
                            min: {value: getValues("startTime")?.getTime() + 60000, message: "Invalid start/end time!"}
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormItem
                                type="time"
                                title="End time"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                style={{ flex: 1 }}
                            />
                        )}
                    />
                </Stack>
                {errors.endTime && <Text variant={"bodySmall"} style={styles.formErrorMessage}>{errors.endTime?.message}</Text>}
            </View>

            <Controller control={control}
                name="description"
                rules={{
                    maxLength: {value: 256, message: "Description's length should be less than 256"}
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.formItem}>
                        <FormItem type="textarea" title="Description" value={value} onChange={onChange} onBlur={onBlur}/>
                        {errors.description && <Text variant={"bodySmall"} style={styles.formErrorMessage}>{errors.description?.message}</Text>}
                    </View>
                )}
            />

            <Controller control={control}
                name="categories"
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.formItem}>
                        <FormItem
                            type="select"
                            title="Categories"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                    </View>
                )}
            />

            <Button
                mode="contained"
                onPress={handleSubmit(handleEditTask)}
                style={styles.formSubmitBtn}
            >
                Press me
            </Button>
        </ScrollView>
    );
}
 
export default EditTask;

const styles = StyleSheet.create({
    formItem: {
        marginBottom: 24,
    },
    formSubmitBtn: {
        borderRadius: 8,
        paddingVertical: 4,
    },
    formErrorMessage: {
        marginTop: 8,
        fontStyle: "italic",
        color: LightTheme.colors.error
    }
})