import React, { ReactNode } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from 'react-native-paper'
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { LightTheme } from "./constants/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./navigation/HomeTabs";
import { navigationRef } from "./navigation/navigation";

// App setup
type Props = {
    children?: ReactNode;
}

const AppSetup = ({ children }: Props) => {
    return (
        <PaperProvider theme={LightTheme}>
            <GestureHandlerRootView>
                <NavigationContainer ref={navigationRef}>
                    {children}
                </NavigationContainer>
            </GestureHandlerRootView>
        </PaperProvider>
    );
}

// App
const Stack = createNativeStackNavigator();

const App = () => {
    return <AppSetup>
        <Stack.Navigator initialRouteName="HomeTabs">
            <Stack.Screen name="HomeTabs" component={HomeTabs} options={{headerShown: false}}/>
        </Stack.Navigator>
    </AppSetup>
}

export default App;