import { BottomTabDescriptorMap, BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { CommonActions, NavigationHelpers, ParamListBase, TabNavigationState } from "@react-navigation/native";
import { BottomNavigation } from "react-native-paper";
import { EdgeInsets } from "react-native-safe-area-context";
import { LightTheme } from "../constants/theme";

type Props = {
    state: TabNavigationState<ParamListBase>;
    descriptors: BottomTabDescriptorMap;
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
    insets: EdgeInsets;
}

const BottomNavigationBar = (props: Props) => {
    const { state, descriptors, navigation, insets} = props;
    
    return (  
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
    );
}
 
export default BottomNavigationBar;