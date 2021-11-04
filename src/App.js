import Header from "./components/Header";
import Card from "./components/Card";

function App() {
  return (
    <div>
      <Header />
      <Card
        caption="Таблица цветов"
        text="Для сохранения единообразия страниц, цвета в МедиаВики нужно
        использовать обдуманно. Яркие цвета в статьях должны использоваться
        только в виде исключения, когда это целесообразно по содержанию (на
        своей странице участника можете брызгать краской по своему вкусу :-). В
        порталах допускается более интенсивная раскраска, но ориентируйтесь на
        существующие примеры."
        checked={false}
      />
    </div>
  );
}

export default App;
