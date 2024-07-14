import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text, TextInput, TextInputProps, useTheme } from "react-native-paper";
import DateTimeInput from "./DateTimeInput";
import { Noop } from "react-hook-form";
import CategoriesPicker from "./CategoriesPicker/CategoriesPicker";

type Props = {
    title: string,
    value: string | Date | Array<number>,
    type: "text" | "date" | "time" | "select" | "textarea",
    onChange: (...event: any[]) => void,
    onBlur: Noop,
    style?: StyleProp<ViewStyle>
}

const FormItem = (props: Props) => {
    const {title, value, onChange, onBlur, style, type} = props;
    const theme = useTheme();

    const renderInputComponent = () => {
        if (type === "text" && typeof(value) === "string"){
            return <TextInput 
                mode="outlined"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
            />
        }

        if ((type === "date" || type === "time") && value instanceof Date) {
            return <DateTimeInput
                mode={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
        }

        if (type === "select" && value instanceof Array){
            return <CategoriesPicker 
                value={value}
                onChange={onChange}
            />
        }

        if (type === "textarea" && typeof(value) === "string"){
            return <TextInput 
                mode="outlined"
                numberOfLines={4}
                multiline={true}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={{ paddingVertical: 16}}
            />
        }

        return undefined
    }

    return <View style={[styles.formItem, style]}>
        <Text 
            variant="titleSmall" 
            style={{ color: theme.colors.tertiary }}
        >
            {title}
        </Text>
        {renderInputComponent()}
       
    </View>
}
 
export default FormItem;

const styles = StyleSheet.create({
    formItem: {
        flexDirection: "column",
        gap: 8
    },
    
})