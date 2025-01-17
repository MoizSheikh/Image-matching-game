import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Pressable, Text, View, Image } from "react-native";
export default function App() {
  const pictures = [
    {
      id: 1,
      visibility: false,
      url: "https://picsum.photos/id/0/300/300",
    },
    {
      id: 2,
      visibility: false,
      url: "https://picsum.photos/id/99/300/300",
    },
    {
      id: 3,
      visibility: false,
      url: "https://picsum.photos/id/22/300/300",
    },
    {
      id: 4,
      visibility: false,
      url: "https://picsum.photos/id/33/300/300",
    },
    {
      id: 5,
      visibility: false,
      url: "https://picsum.photos/id/44/300/300",
    },
    {
      id: 6,
      visibility: false,
      url: "https://picsum.photos/id/55/300/300",
    },
    {
      id: 7,
      visibility: false,
      url: "https://picsum.photos/id/66/300/300",
    },
    {
      id: 8,
      visibility: false,
      url: "https://picsum.photos/id/77/300/300",
    },
  ];
  const [randomPics, setRandomPics] = useState([]);
  const [clicked, setClicked] = useState("");
  const [matchClicked, setMatchClicked] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const timerRef = useRef(time);

  useEffect(() => {
    if (gameStarted) {
      timerRef.current = 0;
      const timerId = setInterval(() => {
        timerRef.current += 1;
        if (score === 8) {
          setTime(0);
        } else {
          setTime(timerRef.current);
        }
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    }
  }, [started, gameStarted]);

  const getRandomPics = () => {
    const arr1 = ran(pictures);
    const arr2 = ran(pictures);
    const ran3 = arr1.concat(arr2);
    setRandomPics([...ran3]);
  };

  const ran = (pictures) => {
    let shuffled = pictures
      .map((value) => ({ value, sort: Math.random(), visibility: false }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffled;
  };

  const hanglePress = (el, index) => {
    if (el.id === matchClicked) {
      setScore(score + 1);
      randomPics[index].visibility = true;
    }
    setClicked(index);
    setMatchClicked(el.id);
  };

  useEffect(() => {
    getRandomPics();
  }, []);
  useEffect(() => {
    if (score === 8) {
      setStarted(false);
    }
  }, [score]);

  const handleRestart = () => {
    setScore(0);
    setClicked("");
    setMatchClicked("");
    getRandomPics();
    setTime(0);
    setStarted(true);
  };
  return (
    <View style={styles.container}>
      <Text>Time : {time}</Text>
      <View style={styles.imgCon}>
        {randomPics.map((item, index) =>
          index === clicked || item.visibility ? (
            <Pressable key={index}>
              <Image
                style={{
                  width: 65,
                  height: 65,
                  borderWidth: 1,
                  borderColor: "black",
                }}
                source={{ uri: item.url }}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={(e) => gameStarted && hanglePress(item, index)}
              key={index}
            >
              <Image
                style={{
                  width: 65,
                  height: 65,
                  borderWidth: 1,
                  borderColor: "black",
                }}
                source={{
                  uri: "https://png.pngtree.com/thumb_back/fh260/background/20220524/pngtree-modeling-and-rendering-of-indoor-soft-mahjong-tables-and-chairs-and-image_1365054.jpg",
                }}
              />
            </Pressable>
          )
        )}
      </View>
      <Text style={styles.text}>
        Score:
        {score}
      </Text>
      <View style={styles.btnCon}>
        {/* {score === 8 ? (
          <Pressable onPress={(e) => handleRestart()} style={styles.button}>
            <Text>Restart</Text>
          </Pressable>
        ) : (
          <Text>Playing</Text>
        )} */}
        {!gameStarted ? (
          <Pressable
            onPress={(e) => setGameStarted(true)}
            style={styles.button}
          >
            <Text>Click to Start</Text>
          </Pressable>
        ) : null}
        {gameStarted ? (
          <Pressable
            onPress={(e) => {
              setGameStarted(false);
              getRandomPics();
              handleRestart();
            }}
            style={styles.button}
          >
            <Text>Restart</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  heading: {
    marginBottom: 30,
    fontSize: 30,
    textAlign: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    width: 120,
  },
  imgCon: {
    marginTop: 20,
    display: "flex",
    flexWrap: "wrap",
    // width: 50,
    // height: 50,
    width: 290,
    flexDirection: "row",
  },
});
