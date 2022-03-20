import { useEffect, useState }        from "react";
import {
    StyleSheet, View, Text, Image,
    TouchableOpacity, FlatList,
    Modal, TouchableHighlight, Button
}                                     from "react-native";
import { Card }                       from "../components/Card";
import { FindCityModal }              from "../components/FindCityModal";
import { Header }                     from "../components/Header";
import { useNavigate }                from "react-router-native";
import { globalStyles }               from "../globalStyles";
import { SearchBar }                  from "../components/SearchBar";
import AsyncStorage
                                      from '@react-native-async-storage/async-storage';
import { GeoService }                 from "../services/GeoService";
import { geoService } from "../services/global";
import {
    deleteCityFromAsyncStorage,
    getCurrentCityFromAsyncStorage,
    setCityToAsyncStorage,
    setCurrentCityToAsyncStorage
}                                     from "../utils";

export const Cities = () => {
    const navigator = useNavigate();

    const [ modalFindCity, setModalFindCity ] = useState(false);
    const [ cities, setCities ] = useState([]);
    const [ currentCity, setCurrentCity ] = useState();

    useEffect(() => {
        getCurrentCityFromAsyncStorage(setCurrentCity);
    }, [])

    useEffect(() => {
        AsyncStorage.getItem("cities")
                    .then(cities => {
                        if (cities) {
                            const _cities = JSON.parse(cities);
                            setCities(_cities);
                        }
                    })
                    .catch(e => {
                        console.log("При получении списка городов из хранилища произошла ошибка: ", e);
                    })
    }, [])

    function onSelectCity(city) {
        geoService.coords = {
            latitude: city.lat,
            longitude: city.lon
        };

        setCurrentCityToAsyncStorage(city, () => navigator(-1));
    }

    function onDeleteCity(city) {
        deleteCityFromAsyncStorage(city, cities => {
            setCities(cities);

            if (city.id === currentCity.id) {
                if (cities.length > 0) {
                    setCurrentCityToAsyncStorage(cities[0], () => {
                        setCurrentCity(cities[0]);
                        navigator(-1);
                    });
                    geoService.coords = {
                        latitude: cities[0].lat,
                        longitude: cities[0].lon
                    }
                } else {
                    geoService.updateCurrentLocation()
                              .then(() => {
                                  GeoService.getCityByCoords(geoService.coords)
                                            .then(c => setCurrentCityToAsyncStorage(c[0]))
                                            .catch(e => console.log("При получении города по координатам произошла ошибка: ", e));

                              });
                }
            }
        })
    }

    function renderCard({ item }) {
        return (
            <TouchableHighlight onPress={ () => onSelectCity(item) }>
                <Card title={ item.nameRu ? item.nameRu : item.name }
                      description={ item.country }>
                    <Button onPress={ () => onDeleteCity(item) }
                            title={ "delete" }/>
                </Card>
            </TouchableHighlight>
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
                              keyExtractor={ (item) => "" + item.lat + item.lon }/>
                </View>
            </View>
            <Modal animationType={ "slide" }
                   transpanent={ true }
                   onRequestClose={ () => setModalFindCity(false) }
                   visible={ modalFindCity }>
                <FindCityModal onSelect={ city => {
                    const cityWithId = Object.assign({ id: "" + city.lat + city.lon }, city);
                    setCityToAsyncStorage(cityWithId, setCities);
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
