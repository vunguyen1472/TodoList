import React from "react";

import { Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

import { globalStyles } from "../../constants/globalStyles";
import { LightTheme } from "../../constants/theme";
import { Controller, Form, useForm } from "react-hook-form";
import FormItem from "./components/FormItem";
import Stack from "../../components/Stack";
import { dateUniform } from "../../constants/helpers";
import { createTask } from "../../providers/taskProvider";
import { TaskType } from "../../constants/types";

type FormValues = {
    title: string,
    description: string,
    date: Date,
    startTime: Date,
    endTime: Date,
    categories: Array<number>
}

const CreateTask = () => {
    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(Date.now() + 60000),
            categories: [],
            description: ""
        }
    });

    const handleCreateTask = (data: FormValues) => {
        const { date, newStartTime, newEndTime } = dateUniform(data.date, data.startTime, data.endTime);

        const newTask: TaskType = {
            name: data.title,
            description: data.description,
            date: date,
            startTime: newStartTime,
            endTime: newEndTime,
            category: data.categories,
            status: true
        }

        createTask(newTask)
        .then(() => {
            
            console.log("Create task successfully")
        })
        .catch(error => console.log(error))
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
                            min: {value: getValues("startTime").getTime() + 60000, message: "Invalid start/end time!"}
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
                onPress={handleSubmit(handleCreateTask)}
                style={styles.formSubmitBtn}
            >
                Press me
            </Button>
        </ScrollView>
    );
}

export default CreateTask;

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