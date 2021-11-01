import Header from "./components/Header";
import Card from "./components/Card";

function App() {
  return (
    <div>
      <Header />
      <Card checked={false} />
    </div>
  );
}

export default App;
