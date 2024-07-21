import { createNavigationContainerRef } from "@react-navigation/native";

export const screenNames = {
    homeTabs: "HomeTabs",
    home: "Home",
    createTask: "CreateTask",
    viewTask: "ViewTask",
    editTask: "EditTask"
} as const;

type ScreenName = typeof screenNames[keyof typeof screenNames];

export type RootStackParamList = Record<ScreenName, any>;

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Navigation services
export const navigate = (screenName: ScreenName, params?: Record<string, any> ) => {
    if (!navigationRef.isReady()){
        // Actions when react navigation is not ready
    }

    if (navigationRef.isReady()){
        navigationRef.navigate(screenName, params);
    }
}   

export const goBack = () => {
    navigationRef.current?.goBack();
}