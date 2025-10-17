import "./App.css";
import { TwitterFollowCart } from "./TwitterFollowCart";

const users = [
  {
    userName: "midudev",
    name: "Miguel Ángel Durán",
    isFollowing: true,
  },
  {
    userName: "osmelpa86",
    name: "Osmel Pérez Alzola",
    isFollowing: true,
  },
  {
    userName: "pheralb",
    name: "Pablo H.",
    isFollowing: false,
  },
  {
    userName: "grleyvaj",
    name: "Gloria Raquel Leyva Jerez",
    isFollowing: true,
  },
];

function App() {
  return (
    <section className="App">
      {users.map((user) => {
        const { userName, name, isFollowing } = user;
        return (
          <TwitterFollowCart
            userName={userName}
            initialIsFollowing={isFollowing}
            key={userName}>
            {name}
          </TwitterFollowCart>
        );
      })}
    </section>
  );
}

export default App;
