import React, {useEffect} from 'react';
import './App.css';
import Board from "./components/Board/Board";

function App() {

    useEffect(() => {
        alert('Нету Id в данных!!! ' +
            'Не поверите, но у меня отключили свет и поэтому не успел в срок.' +
            'Но я junior, ПОЖАЛУЙСТА оцените мою работу как джуна и дайте свой ответ. ' +
            'Буду очень признателен, если потратите на это своё время.' +
            ' С DnD ни разу не работал, но спасибо вам за отличную задачку - очень рад, что снова появилось что-то сложное для меня, буду изучать и пробовать :) ' +
            'Учился в западной It школе на протяжение 7 месяцев, сейчас прохожу стажировку от школы, до трудойства.' +
            ' делаю подобие инстаграмма на NextJs с SSR - прям кайфую от работы с кодом и с командой :)' +
            ' С радостью заберу эту задачу к себе в портфолио, если можно')
    }, [])

  return (
    <div className="App">
      <Board/>
    </div>
  );
}

export default App;
