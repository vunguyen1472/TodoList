import { useState } from "react";

import { View } from "react-native";
import { Text, TextInput, TextInputProps } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";


type Props = {
    value: Date,
    mode?: "date" | "time",
    onChange: (...event: any[]) => void,
    onBlur: () => void,
}

const DateTimeInput = (props: Props) => {
    const [isDateTimePickerOpen, setDateTimePickerOpen] = useState(false);
    const { value, mode, onChange, onBlur } = props;

    return <View>
        <TextInput
            mode="outlined"
            value={mode === "time" ? value?.toLocaleTimeString("vi", {timeStyle: "short"}) : value?.toDateString()}
            onPress={() => {
                setDateTimePickerOpen(true);
            }}
        />
        {isDateTimePickerOpen && 
            <DateTimePicker
                minimumDate={new Date()}
                mode={mode}
                display="spinner"
                value={new Date()}
                onChange={(event, date) => {
                    setDateTimePickerOpen(false);
                    onChange(date)
                }}
            />
        }
    </View>
}

export default DateTimeInput;