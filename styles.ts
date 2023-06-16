import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainPage: {
    backgroundColor: "#000",
  },
  logo: {
    alignItems: "center",
  },
  logoText: {
    marginTop: 15,
    fontSize: 30,
    color: "#FFE81F",
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    margin: 5,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  container: {
    justifyContent: "space-around",
  },
  text: {
    fontSize: 20,
    color: "#FFE81F",
    fontWeight: "bold",
  },
  loading: {
    marginVertical: 16,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "#DDDCE5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: "90%",
  },
  containerButton: {
    alignItems: "flex-end",
    marginTop: 15,
    marginRight: 15,
  },
  buttonModal: {
    alignItems: "center",
    borderRadius: 100,
    width: 50,
    backgroundColor: "#000",
  },
  textStyle: {
    color: "#FFE81F",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginTop: 15,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 4,
  },
  details: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  textDetails: {
    marginTop: 5,
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
  },
  textDetailsArray: {
    marginVertical: 2,
    color: "#000",
    fontSize: 16,
  },
});

export default styles;
