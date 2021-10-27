import "./Card.css";

function Card() {
  const checkboxHandler = (event) => {
    const card = document.querySelector('.card');
    const caption = document.querySelector('.caption');
    const text = document.querySelector('.text');

    if (event.target.checked) {
      card.classList.add('darkCard');
      caption.classList.add('darkCaption');
      text.classList.add('darkText');
    } else {
      card.classList.remove('darkCard');
      caption.classList.remove('darkCaption');
      text.classList.remove('darkText');
    }
  };

  return (
    <div className="card">
      <h2 className="caption">Таблица цветов</h2>

      <input type="checkbox" id="one" onChange={checkboxHandler} />

      <hr color="#3f3f3f" className="line" />

      <p className="text">
        Для сохранения единообразия страниц, цвета в МедиаВики нужно
        использовать обдуманно. Яркие цвета в статьях должны использоваться
        только в виде исключения, когда это целесообразно по содержанию (на
        своей странице участника можете брызгать краской по своему вкусу :-). В
        порталах допускается более интенсивная раскраска, но ориентируйтесь на
        существующие примеры.
      </p>
    </div>
  );
}

export default Card;
