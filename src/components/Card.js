import { useState } from "react";

import "./Card.css";

function Card() {
  const [cardClass, setCardClass] = useState('card');
  const [captionClass, setCaptionClass] = useState('caption');
  const [textClass, setTextClass] = useState('text');
  const [lineColor, setLineColor] = useState('#3f3f3f');

  const checkboxHandler = (event) => {
    if (event.target.checked) {
      setCardClass('card darkCard');
      setCaptionClass('caption darkCaption');
      setTextClass('text darkText');
      setLineColor('#C0C0C0');
    } else {
      setCardClass('card');
      setCaptionClass('caption');
      setTextClass('text');
      setLineColor('#3f3f3f');
    }
  };

  return (
    <div className={cardClass}>
      <h2 className={captionClass}>Таблица цветов</h2>

      <input type="checkbox" id="one" onChange={checkboxHandler} />

      <hr color={lineColor} className="line" />

      <p className={textClass}>
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
