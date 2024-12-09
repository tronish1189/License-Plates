export default function Status({ match }) {
  return <p>{match ? "Solved" : "Not solved"}</p>;
}
