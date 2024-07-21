import React, { useEffect, useState } from "react";
import { View, StyleSheet, GestureResponderEvent } from "react-native";
import { ActivityIndicator, Chip } from "react-native-paper";
import AntdIcon from 'react-native-vector-icons/AntDesign'
import CategoriesPickerModal from "./CategoriesPickerModal";
import { CategoryType } from "../../../../constants/types";
import { getCategories } from "../../../../services/categoryServices";

type CategoriesPickerProps = {
    value: Array<number>,
    onChange: (...event: any[]) => void,
}

type AddCategoryChipProps = {
    onPress?: (e: GestureResponderEvent) => void;
}

type CategoryChipType = {
    item: CategoryType,
    onRemove: (id: number) => void
}

const AddCategoryChip = (props: AddCategoryChipProps) => {
    const { onPress } = props;

    return <Chip 
        mode="outlined" 
        icon={({ color, size}) => <AntdIcon name="plus" color={color} size={size}/>}
        onPress={onPress}
    >
        New category
    </Chip>
}

const CategoryChip = (props: CategoryChipType) => {
    const { item, onRemove } = props;

    return <Chip 
        closeIcon={({color, size}) => <AntdIcon name="close" color={color} size={size}/>}
        onClose={() => onRemove(item.id)}
    >
        {item.name}
    </Chip>
}

const CategoriesPicker = (props: CategoriesPickerProps) => {
    const {value, onChange} = props; 
    const [selectedCategories, setSelectedCategories] = useState<Array<number>>([])
    const [isCategoriesPickerModalOpen, setCategoriesPickerModelOpen] = useState(false);
    const [categories, setCategories] = useState<Array<CategoryType>>([]);
    const [isCategoriesLoading, setCategoriesLoading] = useState(true);
    
    useEffect(() => {
        setCategoriesLoading(true);

        getCategories().then(res =>
            setCategories(res)
        ).catch(error =>
            console.log(error)
        ).finally(() => setCategoriesLoading(false))
    }, [])
    
    useEffect(() => {
        onChange(selectedCategories);
    }, [selectedCategories])
    
    const handleSelectCategory = (newCategoryId: number) => {
        setSelectedCategories(prev => [
            ...prev,
            newCategoryId
        ])
    }

    const handleRemoveCategory = (removeCategoryId: number) => {
        setSelectedCategories(prev => prev.filter(val => val != removeCategoryId))
    }

    const getUnselectedCategory = () => {
        return categories.filter(category => !selectedCategories.includes(category.id))
    }

    if (isCategoriesLoading) {
        return <ActivityIndicator />
    }

    return <View style={styles.chipContainer}>
        {selectedCategories.map(categoryId => {
            return categories.filter(item => item.id == categoryId).map(category => (
                <CategoryChip key={category.id} item={category} onRemove={handleRemoveCategory}/>
            ))
        })}
        <AddCategoryChip onPress={() => setCategoriesPickerModelOpen(true)}/>
        <CategoriesPickerModal 
            visible={isCategoriesPickerModalOpen} 
            setVisible={setCategoriesPickerModelOpen}
            onSelect={handleSelectCategory}    
            categories={getUnselectedCategory()}
        />
    </View>
}
 
export default CategoriesPicker;

const styles = StyleSheet.create({
    chipContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8
    }
});