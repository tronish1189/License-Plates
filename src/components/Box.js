import React from "react";
import Dragula from "react-dragula";
import "./Box.css";
import "react-dragula/dist/dragula.css";
import data from "../data/data";
import Status from "./Status";

export default function Box() {
  function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
      return array;
    }
  }

  function getRandomItem(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
  }

  //Get random plate from data
  const currentPlate = getRandomItem(data);

  // Set correct order
  const correctOrder = currentPlate.split("");
  console.log("The correct answer is: " + correctOrder);

  // Scramble letters
  let shuffledArray = correctOrder;
  shuffle(shuffledArray);
  console.log("The shuffled array is: " + shuffledArray);

  function runDragula() {
    var container = document.querySelector(".parentContainer");
    var container1 = document.querySelector(".parentContainer1");
    // Dragula([container], { direction: "horizontal" }).on("drop", function (el) {
    //   handleClick();
    // });
    Dragula([container, container1]);
    // Dragula([container1]);
  }
  const initialOrder = shuffledArray.map((el, i) => {
    return (
      <span className="container inconsolata-500" key={i}>
        {el}
      </span>
    );
  });

  const [match, setMatch] = React.useState(false);

  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  function handleClick() {
    const spanList = [
      ...document.querySelectorAll(".parentContainer span:not(.gu-mirror)"),
    ];
    console.log(spanList);
    let spanArray = [];
    spanList.forEach((span) => {
      spanArray.push(span.innerText);
    });
    setMatch(arraysEqual(currentPlate.split(""), spanArray));
  }

  return (
    <>
      <button onClick={runDragula}>Start</button>
      <button onClick={handleClick}>Submit</button>
      <div className="parentContainer"></div>
      <div className="parentContainer1">{initialOrder}</div>
      <Status match={match} />
    </>
  );
}
