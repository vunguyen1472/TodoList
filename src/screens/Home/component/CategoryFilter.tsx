import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Chip} from "react-native-paper";
import { CategoryType } from "../../../constants/types";
import { getCategories } from "../../../providers/categoryProvider";

type Props = {
    selectedCategories: Array<number>,
    setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>
}

const CategoryFilter = (props: Props) => {
    const {selectedCategories , setSelectedCategories} = props;

    const [categories, setCategories] = useState<Array<CategoryType>>([]);
    const [isCategoriesLoading, setCategoriesLoading] = useState(true);
   

    useEffect(() => {
        setCategoriesLoading(true);
        getCategories()
        .then(res => setCategories(res))
        .catch(error => console.log(error))
        .finally(() =>{setCategoriesLoading(false)})
    }, [])

    const handleCategoryPress = (selectedCategoryId: number) => {

        if (selectedCategories.includes(selectedCategoryId)){
            setSelectedCategories(prev => prev.filter(id => id != selectedCategoryId))
            return;
        }

        setSelectedCategories(prev =>[
            ...prev,
            selectedCategoryId
        ])
    }

    if (isCategoriesLoading){
        return <ActivityIndicator />
    }

    return (  
        <View style={styles.container}>
            <ScrollView horizontal={true} contentContainerStyle={styles.filterBar}>
                {categories.map(category => {
                    const isSelected = selectedCategories.includes(category.id);
                    return <Chip 
                        key={category.id}
                        mode="outlined"
                        selected={isSelected}
                        onPress={() => handleCategoryPress(category.id)}
                    >
                        {category.name}
                    </Chip>
                })}
            </ScrollView>
        </View>
    );
}
 
export default CategoryFilter;

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    filterBar: {
        gap: 8
    }
})