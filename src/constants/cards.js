import Card from "../model/Card";
import ranks from "./ranks";
import suites from "./suites";

let cards = [];

suites.forEach((suite) => {
  ranks.forEach((rank) => {
    const card = new Card(suite, rank);
    cards.push(card);
  });
});

export default cards;
