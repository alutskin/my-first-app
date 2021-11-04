import { useState } from "react";

import "./Card.css";

function Card(props) {
  let classNames = require('classnames');
  const [checked, setChecked] = useState(props.checked);

  const checkboxHandler = (event) => {
    if (event.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  return (
    <div className={classNames('card', {darkCard: checked})}>
      <h2 className={classNames('caption', {darkCaption: checked})}>Таблица цветов</h2>

      <input type="checkbox" id="one" onChange={checkboxHandler} checked={checked} />

      <hr color={checked ? '#C0C0C0' : '#3f3f3f'} className="line" />

      <p className={classNames('text', {darkText: checked})}>
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
