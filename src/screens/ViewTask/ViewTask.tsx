import { RouteProp, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { RootStackParamList } from "../../navigation/navigation";
import { useEffect, useState } from "react";
import { getTask } from "../../services/taskServices";

const ViewTask = () => {
    const route = useRoute<RouteProp<RootStackParamList>>();
    const [isTaskLoading, setTaskLoading] = useState<boolean>(true);

    useEffect(() => {
        const taskId = route.params?.taskId;

        getTask(taskId)
            .then(res => console.log(res))
            .catch(error => console.log(error))
            .finally(() => {
                setTaskLoading(false);
            })
    },[])

    if (isTaskLoading){
        return <ActivityIndicator />
    }

    return (  
        <View>
            <Text>View Task Page</Text>
        </View>
    );
}
 
export default ViewTask;