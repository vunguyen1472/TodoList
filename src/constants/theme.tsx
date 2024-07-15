import { MD3LightTheme } from "react-native-paper";

export const LightTheme = {
    ...MD3LightTheme,
    dark: false,
    colors: {
        ...MD3LightTheme.colors,
        primary: "rgb(33,37,41)",
        onPrimary: "rgb(255,255,255)",
        primaryContainer: "rgb(255,255,255)",

        secondary: "rgb(89,92,95)",
        onSecondary: "rgb(233,236,239)",
        secondaryContainer: "rgb(233,236,239)",

        tertiary: "rgb(144,146,148)",
        onTeritiary: "rgb(248,249,250)",
        tertiaryContainer: "rgb(248,249,250)",

        error: "rgb(186, 24, 48)",
        onError: "rgb(255, 255, 255)",
        errorContainer: "rgb(255, 218, 217)",
        onErrorContainer: "rgb(65, 0, 8)",

        background: "#F8F9FA",

        outline: "rgba(222,226,230, 0.6)",
        outlineVariant: "rgb(222,226,230)",

        elevation: {
            ...MD3LightTheme.colors.elevation,
            level1: 'rgb(233,236,239)',
            level2: 'rgb(248,249,250)'
        }
    }
}