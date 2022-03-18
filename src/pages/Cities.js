import { useState }                                                         from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Modal } from "react-native";
import { Card }                                                             from "../components/Card";
import { FindCityModal }                                                    from "../components/FindCityModal";
import { Header }                                                           from "../components/Header";
import { useNavigate }                                                      from "react-router-native";
import { globalStyles }                                                     from "../globalStyles";
import { SearchBar }                                                        from "../components/SearchBar";

export const Cities = () => {
    const navigator = useNavigate();

    const [ modalFindCity, setModalFindCity ] = useState(false);
    const [ cities, setCities ] = useState([
        {
            name: "Ekaterinburg",
            nameRu: "Екатеринбург",
            lat: 123,
            lon: 321,
            country: "RU"
        }
    ]);

    function renderCard({ item }) {
        /**
         * {
            name: city.name,
            nameRu: city.local_names?.ru,
            lat: city.lat,
            lon: city.lon,
            country: city.country

         */
        return (
            <Card title={ item.nameRu ? item.nameRu : item.name }
                  description={ item.country }>
                {/*<Text style={ globalStyles.h2 }>{ item.temp } °C</Text>*/ }
            </Card>
        )
    }

    return (
        <>
            <Header>
                <TouchableOpacity onPress={ () => navigator(-1) }>
                    <Image source={ require("../../assets/arrow.png") } style={ globalStyles.icon }/>
                </TouchableOpacity>
                <Text style={ globalStyles.h1 }>Выбор города</Text>
                <View style={ globalStyles.icon }/>
            </Header>
            <View style={ styles.container }>
                <View style={ styles.cardContainer }>
                    <TouchableOpacity onPress={ () => setModalFindCity(true) }>
                        <SearchBar editable={ false }/>
                    </TouchableOpacity>
                    <FlatList data={ cities }
                              renderItem={ renderCard }
                              keyExtractor={ (item) => item.lat + item.lon }/>
                </View>
            </View>
            <Modal animationType={ "slide" }
                   transpanent={ true }
                   onRequestClose={ () => setModalFindCity(false) }
                   visible={ modalFindCity }>
                <FindCityModal onSelect={ city => {
                    setCities(prev => {
                        const temp = prev.slice(0);
                        temp.push(city);
                        return temp;
                    });
                    setModalFindCity(false);
                } }/>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 24,
    },

    cardContainer: {
        width: "70%",
    },
});
