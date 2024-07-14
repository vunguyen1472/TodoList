import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { globalStyles } from "../../constants/globalStyles";
import TaskList from "./components/TaskList";

const ViewTasks = () => {
    return ( 
        <View style={[globalStyles.screenWrapper]}>
            <TaskList />
        </View>    
    );
}
 
export default ViewTasks;

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backgroundColor: "white",
        padding: 16
    }
})