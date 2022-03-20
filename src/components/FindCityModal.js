import axios                                            from "axios";
import { useEffect, useRef, useState }                  from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import { Card }                                         from "./Card";
import { SearchBar }                                    from "./SearchBar";

const urlAPI = "http://api.openweathermap.org/geo/1.0/direct";
const keyAPI = "c620e70db8c6dd36dc1e728ce583d185";

export const FindCityModal = ({ onSelect }) => {
    const [ cityString, setCityString ] = useState("");
    const [ supposeCities, setSupposeCities ] = useState([]);
    const searchBarRef = useRef(null);

    useEffect(() => {
        searchBarRef.current.focus();
    }, [])

    useEffect(() => {
        getSupposeCities(cityString)
            .then(res => {
                setSupposeCities(supposeCitiesFormat(res.data));
            })
            .catch(e => {
                console.warn("При получении городов произошла ошибка: ", e);
            })
    }, [ cityString ])

    function renderCard({ item }) {
        return (
            <TouchableOpacity onPress={ () => onSelect(item) }>
                <Card title={ item.nameRu ? item.nameRu : item.name }
                      description={ item.country }>
                    <View style={ { height: 64 } }/>
                </Card>
            </TouchableOpacity>
        )
    }

    async function getSupposeCities(cityString) {
        if (!cityString) {
            return new Promise(() => []);
        }

        return axios.get(urlAPI, {
            params: {
                q: cityString,
                appid: keyAPI,
                limit: 10
            }
        })
    }

    function supposeCitiesFormat(cities) {
        return cities.map(city => ({
            name: city.name,
            nameRu: city.local_names?.ru,
            lat: city.lat,
            lon: city.lon,
            country: city.country
        }))
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.cardContainer }>
                <SearchBar ref={ searchBarRef } onChangeText={ e => setCityString(e) }/>
                <FlatList data={ supposeCities }
                          renderItem={ renderCard }
                          keyExtractor={ (city) => city.lat + city.lon }/>
            </View>
        </View>
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
