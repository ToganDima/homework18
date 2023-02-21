import React from "react";
import '../components/Timer.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.timerSettings.time,
      step: props.timerSettings.step,
      autostart: props.timerSettings.autostart,
      working: props.timerSettings.autostart,
      onTick: props.timerSettings.onTick,
      onTimeEnd: props.timerSettings.onTimeEnd,
      onTimeStart: props.timerSettings.onTimeStart,
      onTimePause: props.timerSettings.onTimePause,
    };
    this.title = props.timerSettings.title;
    this.startStopTimer = this.startStopTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.intervalID = 0;
  }

  startStopTimer() {
    if (this.state.working) {
      clearInterval(this.intervalID);
      this.state.onTimePause();
    } else {
      this.intervalID = setInterval(this.countDown, this.state.step);
      this.state.onTimeStart();
    }
    this.setState({ working: !this.state.working });
  }

  componentDidMount() {
    if (this.state.autostart && this.intervalID === 0) {
      this.intervalID = setInterval(this.countDown, this.state.step);
      this.state.onTimeStart();
    }
  }

  componentWillUnmount() {
    if (!this.state.working && this.intervalID > 0) {
      clearInterval(this.intervalID);
    }
  }

  countDown() {
    this.state.onTick(this.state.time);
    let seconds = this.state.time - this.state.step;
    if (seconds < 0) {
      this.state.onTimeEnd();
      this.setState({ time: this.props.timerSettings.time });
      if (!this.state.autostart) {
        clearInterval(this.intervalID);
        this.setState({ working: !this.state.working });
      }
    } else {
      this.setState({ time: seconds });
    } 
  }

  render() {
    const progressStyle = {
      width: `${this.state.time / this.props.timerSettings.time * 100}%`
    };

    return (
      <div className="timer-container">
        <h2 className="timer-title">{this.title}</h2>
        <button id="start-btn" onClick={this.startStopTimer}>
          {this.state.working ? "Stop" : "Start"}
        </button>
        <h4 className="remaining-time">Time: {this.state.time / 1000}</h4>
        <div className="progress-bar">
          <div className="active-progress" style={progressStyle}></div>
        </div>
      </div>
    );
  }
}

export default Timer;