import Nestable from "react-nestable";
import "react-nestable/dist/styles/index.css";

const items = [
  { id: 0, text: "Andy" },
  {
    id: 1,
    text: "Harry",
    children: [{ id: 2, text: "David" }],
  },
  { id: 3, text: "Lisa" },
];

const renderItem = ({ item }) => item.text;

export default function Home() {
  return <Nestable items={items} renderItem={renderItem} />;
}
