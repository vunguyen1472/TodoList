import { View } from "react-native";
import { globalStyles } from "../../constants/globalStyles";
import { Header } from "./component/Header";
import TaskList from "../../components/TaskList/TaskList";
import CategoryFilter from "./component/CategoryFilter";
import { useEffect, useState } from "react";

const Home = () => {
    const [selectedCategories, setSelectedCategories] =  useState<Array<number>>([]);

    return (
        <View style={[globalStyles.screenWrapper]}>
            <Header />
            <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
            <TaskList selectedCategories={selectedCategories}/>
        </View>
    );
}

export default Home;

