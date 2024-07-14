import React, { ReactNode } from "react";

import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { BottomNavigation, PaperProvider } from 'react-native-paper'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AntdIcons from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { LightTheme } from "./constants/theme";

import CreateTask from "./screens/CreateTask/CreateTask";
import ViewTasks from "./screens/ViewTasks/ViewTasks";

// App setup
type Props = {
    children?: ReactNode;
}

const AppSetup = ({ children }: Props) => {
    return (
        <PaperProvider theme={LightTheme}>
            <GestureHandlerRootView>
                <NavigationContainer>
                    {children}
                </NavigationContainer>
            </GestureHandlerRootView>
        </PaperProvider>
    );
}

// App
const Tab = createBottomTabNavigator();

const App = () => {
    return <AppSetup>
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                // headerShown: false
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name, route.params),
                                target: state.key,
                            });
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                            return options.tabBarIcon({ focused, color, size: 24 });
                        }

                        return null;
                    }}
                    getLabelText={({ route }) => {
                        const { options } = descriptors[route.key];
                        const label =
                          options.tabBarLabel !== undefined
                            ? options.tabBarLabel.toString()
                            : options.title !== undefined
                            ? options.title
                            : route.name;
            
                        return label;
                    }}
                    style={{
                        backgroundColor: "white",
                        borderTopWidth: 0.2,
                        borderTopColor: LightTheme.colors.secondary
                    }}
                />
            )}
        >
            <Tab.Screen
                name="Home"
                component={ViewTasks}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size}) => (
                        <AntdIcons name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="NewTask"
                component={CreateTask}
                options={{
                    tabBarLabel: "New Task",
                    tabBarIcon: ({ color, size}) => (
                        <AntdIcons name="plus" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    </AppSetup>
}

export default App;