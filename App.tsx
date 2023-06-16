import React, { useEffect, useState } from "react";
import { Person } from "./src/types/person";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import api from "./src/service/api";
import styles from "./styles";
import { Vehicle } from "./src/types/vehicle";
import { Film } from "./src/types/film";
import { Starship } from "./src/types/starship";
import { Specie } from "./src/types/specie";

function App(): JSX.Element {
  const [people, setPeople] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [person, setPerson] = useState<Person>();
  const [modalVisible, setModalVisible] = useState(false);
  const [homeWorld, setHomeWorld] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [species, setSpecies] = useState<Specie[]>([]);

  useEffect(() => {
    getPeopleOfStarWars();
  }, []);

  const getPeopleOfStarWars = async () => {
    try {
      setIsLoading(true);
      const characters = await api.get(`/people/?page=${page}`);
      setPeople([...people, ...characters.data.results]);
      setPage(page + 1);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMoreInfos();
  }, [person]);

  const getMoreInfos = () => {
    let filmsArray: Film[] = [];
    let vehiclesArray: Vehicle[] = [];
    let speciesArray: Specie[] = [];
    let starshipArray: Starship[] = [];

    const requestFilms = async (route: string) => {
      try {
        const response = await api.get(route);
        const resp: Film = {
          title: response.data.title,
          episode_id: response.data.episode_id,
        };
        filmsArray.push(resp);
      } catch (error) {
        console.error(error);
      }
    };

    person?.films.forEach((route) => {
      requestFilms(route);
    });

    const requestVehicles = async (route: string) => {
      try {
        const response = await api.get(route);
        const resp: Vehicle = {
          name: response.data.name,
          model: response.data.model,
        };

        vehiclesArray.push(resp);
      } catch (error) {
        console.error(error);
      }
    };

    person?.vehicles.forEach((route) => {
      requestVehicles(route);
    });

    const requestSpecies = async (route: string) => {
      try {
        const response = await api.get(route);
        const resp: Specie = {
          name: response.data.name,
          language: response.data.language,
        };

        speciesArray.push(resp);
      } catch (error) {
        console.error(error);
      }
    };

    person?.species.forEach((route) => {
      requestSpecies(route);
    });

    const requestStarships = async (route: string) => {
      try {
        const response = await api.get(route);
        const resp: Starship = {
          name: response.data.name,
          model: response.data.model,
          starship_class: response.data.starship_class,
        };

        starshipArray.push(resp);
      } catch (error) {
        console.error(error);
      }
    };

    person?.starships.forEach((route) => {
      requestStarships(route);
    });

    console.log("speciesArray: ", speciesArray);
    setVehicles(vehiclesArray);
    setFilms(filmsArray);
    setStarships(starshipArray);
    setSpecies(speciesArray);
  };

  const onChangeCharacter = async (item: Person) => {
    setPerson(item);

    const homeworld = await api.get(item.homeworld);
    setHomeWorld(homeworld.data.name);
    setModalVisible(!modalVisible);
  };

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => onChangeCharacter(item)}
        style={styles.button}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FFE81F" />
      </View>
    ) : null;
  };

  return (
    <View style={styles.mainPage}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logo}>
        <Text style={styles.logoText}>Star Wars - API</Text>
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/b6/af/5a/b6af5aeff0ee43a4253fc70c167bb6db.png",
          }}
          style={{ width: 200, height: 150 }}
        />
      </View>
      <FlatList
        data={people}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
        ListFooterComponent={renderLoader}
        onEndReached={getPeopleOfStarWars}
        onEndReachedThreshold={0}
      />
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.containerButton}>
                <Pressable
                  style={styles.buttonModal}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>X</Text>
                </Pressable>
              </View>
              <Text style={styles.modalText}>{person?.name}</Text>
              <ScrollView style={styles.details}>
                <Text style={styles.textDetails}>
                  Birth year: {person?.birth_year}
                </Text>
                <Text style={styles.textDetails}>
                  Eye color: {person?.eye_color}
                </Text>
                <Text style={styles.textDetails}>Gender: {person?.gender}</Text>
                <Text style={styles.textDetails}>
                  Hair color: {person?.hair_color}
                </Text>
                <Text style={styles.textDetails}>
                  Height: {person?.height} cm
                </Text>
                <Text style={styles.textDetails}>Homeworld: {homeWorld}</Text>
                <Text style={styles.textDetails}>Mass: {person?.mass}</Text>
                <Text style={styles.textDetails}>
                  Skin color: {person?.skin_color}
                </Text>
                <Text style={styles.textDetails}>Films: </Text>
                {films.map((film) => (
                  <>
                    <Text style={styles.textDetailsArray}>
                      Title: {film.title}
                    </Text>
                    <Text style={styles.textDetailsArray}>
                      Episode: {film.episode_id}
                    </Text>
                  </>
                ))}
                <Text style={styles.textDetails}>Vehicles: </Text>
                {vehicles.map((vehicle) => (
                  <>
                    <Text style={styles.textDetailsArray}>
                      Name: {vehicle.name}
                    </Text>
                    <Text style={styles.textDetailsArray}>
                      Model: {vehicle.model}
                    </Text>
                  </>
                ))}
                <Text style={styles.textDetails}>Species: </Text>
                {species.map((specie) => (
                  <>
                    <Text style={styles.textDetailsArray}>
                      Name: {specie.name}
                    </Text>
                    <Text style={styles.textDetailsArray}>
                      Language: {specie.language}
                    </Text>
                  </>
                ))}
                <Text style={styles.textDetails}>Starships: </Text>
                {starships.map((starship) => (
                  <>
                    <Text style={styles.textDetailsArray}>
                      Name: {starship.name}
                    </Text>
                    <Text style={styles.textDetailsArray}>
                      Model: {starship.model}
                    </Text>
                  </>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default App;
