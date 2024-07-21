import React, { ReactNode } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from 'react-native-paper'
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { LightTheme } from "./constants/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./navigation/HomeTabs";
import { navigationRef, screenNames } from "./navigation/navigation";
import ViewTask from "./screens/ViewTask/ViewTask";
import EditTask from "./screens/EditTask/EditTask";
import { RootStore } from "./stores/root-store";
import { RootStoreProvider } from "./contexts/root-store-context";

// App setup
type Props = {
    children?: ReactNode;
}

const rootStore = new RootStore();

const AppSetup = ({ children }: Props) => {
    return (
        <RootStoreProvider value={rootStore}>
            <PaperProvider theme={LightTheme}>
                <GestureHandlerRootView>
                    <NavigationContainer ref={navigationRef}>
                        {children}
                    </NavigationContainer>
                </GestureHandlerRootView>
            </PaperProvider>
        </RootStoreProvider>
    );
}

// App
const Stack = createNativeStackNavigator();

const App = () => {
    return <AppSetup>
        <Stack.Navigator initialRouteName="HomeTabs">
            <Stack.Screen name={screenNames.homeTabs} component={HomeTabs} options={{ headerShown: false }} />

            {/* Routes not shown on home tabs */}
            <Stack.Screen name={screenNames.viewTask} component={ViewTask} options={{title: ""}}/>
            <Stack.Screen name={screenNames.editTask} component={EditTask} />
        </Stack.Navigator>
    </AppSetup>
}

export default App;