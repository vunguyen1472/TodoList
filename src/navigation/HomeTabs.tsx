import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screenNames } from "./navigation";
import Home from "../screens/Home/Home";
import CreateTask from "../screens/CreateTask/CreateTask";
import BottomNavigationBar from "../components/BottomNavigationBar";
import AntdIcons from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
    return (  
        <Tab.Navigator
            initialRouteName={screenNames.home}
            tabBar={({ state, navigation, descriptors, insets}) => (
                <BottomNavigationBar state={state} navigation={navigation} descriptors={descriptors} insets={insets}/>
            )}
            screenOptions={{ unmountOnBlur: true }}
        >
            <Tab.Screen 
                name={screenNames.home} 
                component={Home} 
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size}) => (
                        <AntdIcons name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name={screenNames.createTask}
                component={CreateTask}
                options={{
                    tabBarLabel: "New Task",
                    tabBarIcon: ({ color, size}) => (
                        <AntdIcons name="plus" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}
 
export default HomeTabs;