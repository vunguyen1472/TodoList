import { useState, useEffect } from "react";
import { StyleSheet, FlatList, Pressable } from "react-native";
import { ActivityIndicator, Button, Modal, Portal, Text } from "react-native-paper";
import { getCategories } from "../../../../providers/categoryProvider";
import { CategoryType } from "../../../../constants/types";
import { LightTheme } from "../../../../constants/theme";

type Props = {
    visible: boolean,
    setVisible: (visible: boolean) => void,
    onSelect: (id: number) => void
    categories: Array<CategoryType>
}

const CategoriesPickerModal = (props: Props) => {
    const { visible, setVisible, onSelect, categories} = props;

    return <Portal>
        <Modal
            visible={visible}
            onDismiss={() => { setVisible(false) }}
            contentContainerStyle={styles.modalContainer}
        >
            <FlatList
                data={categories}
                contentContainerStyle={styles.flatList}
                renderItem={({ item }) => (
                    <Button
                        mode="contained-tonal"
                        onPress={() => {
                            onSelect(item.id);
                            setVisible(false);
                        }}
                        style={styles.categoryContainer}
                    >
                        <Text>{item.name}</Text>
                    </Button>
                )}
            />

        </Modal>
    </Portal>
}

export default CategoriesPickerModal;

const styles = StyleSheet.create({
    modalContainer: {
        alignSelf: "center",
        backgroundColor: "white",
        width: "80%",
        maxHeight: "50%",
        padding: 16
    },
    flatList: {
        flexDirection: "column",
        gap: 8
    },
    categoryContainer: {
        borderRadius: 8
    }
})