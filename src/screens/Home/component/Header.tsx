import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { getCurrentDateString } from "../../../helpers";
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { navigate } from "../../../navigation/navigation";

export const Header = () => {
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Text variant="titleLarge" style={styles.headerLeftText}>Today's Tasks</Text>
                <Text variant="bodyLarge">{getCurrentDateString()}</Text>
            </View>
            <View style={styles.headerRight}>
                <Button
                    icon={({ size, color }) => (<AntdIcon name="plus" color={color} size={size} />)}
                    mode="elevated"
                    onPress={() => navigate("CreateTask")}
                    style={styles.headerRightBtn}
                >
                    New Task
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24
    },
    headerLeft: {
        flex: 1,
        flexDirection: "column",
        gap: 8,
    },
    headerLeftText: {
        fontWeight: 700
    },
    headerRight: {
        flex: 1,
    },
    headerRightBtn: {
        borderRadius: 8,
        alignSelf: "flex-end",
    }
})