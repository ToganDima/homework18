import './App.css';
import Timer from './components/Timer'; 

function App() {
  const defaultTimerSettings = {
    time: 10000,
    autostart: false,
    step: 1000,
    title: "Time: 10sec, step: 1sec, auostart: false",
    onTick: (time) => console.log("Залишилось часу: " + time),
    onTimeEnd: () => console.log("Час вийшов!"),
    onTimeStart: () => console.log("Таймер запущено!"),
    onTimePause: () => console.log("Таймер на паузі!")
  };

  const autostartTimerSettings = {
    time: 30000,
    autostart: true,
    step: 2000,
    title: "Time: 30sec, step: 2sec, auostart: true",
    onTick: (time) => console.log("Залишилось часу: " + time),
    onTimeEnd: () => console.log("Час вийшов!"),
    onTimeStart: () => console.log("Таймер запущено!"),
    onTimePause: () => console.log("Таймер на паузі!")
  };

  return (
    <div className="App">
      <div className="default-timer">
        <Timer timerSettings={defaultTimerSettings} />
      </div>
      <div className="autostart-timer">
        <Timer timerSettings={autostartTimerSettings} />
      </div>
    </div>
  );
}

export default App;
