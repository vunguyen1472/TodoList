import { ReactNode } from "react";
import { FlexAlignType, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type Props = {
    children?: ReactNode,
    direction?: "horizontal" | "vertical",
    alignItems?: FlexAlignType,
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | undefined,
    gap?: number | undefined,
    style?: StyleProp<ViewStyle>
}

const Stack = (props: Props) => {
    const {children, direction, style, alignItems, justifyContent, gap} = props;

    return <View
        style={[
            style,
            styles.stack,
            {
                flexDirection: direction === "horizontal" ? "row" : "column",
                alignItems: alignItems ?? "center",
                justifyContent: justifyContent ?? "flex-start",
                gap: gap 
            }
        ]}
    >
        {children}
    </View>
}
 
export default Stack;

const styles = StyleSheet.create({
    stack: {
        width: "100%"
    }
});