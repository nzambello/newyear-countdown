import React, { Component } from 'react'
import './index.scss'

const _second = 1000
const _minute = _second * 60
const _hour = _minute * 60
const _day = _hour * 24

class App extends Component {
  constructor() {
    super()

    const now = new Date()
    let imWaitingForDrinking = true // of course default to true
    let year = now.getFullYear() + 1
    let countdownData = {}

    if (now.getMonth() === 0 && now.getDate() === 1) {
      imWaitingForDrinking = false
      year = now.getFullYear()
    } else {
      countdownData = this.getMissingTime(now)
    }

    this.state = {
      isNewYear: !imWaitingForDrinking,
      newYear: year,
      countdownID: null,
      countdownData: countdownData
    }
  }

  getMissingTime = (now) => {
    const newYear = now.getFullYear() + 1

    if (this.state && this.state.newYear && this.state.newYear === now.getFullYear()) {
      this.setState({
        isNewYear: true
      })

      return this.state.countdownData
    } else {
      const midnight = new Date(newYear, 0, 1, 0, 0, 0, 0)
      const delta = midnight - now

      return {
        days: Math.floor(parseFloat(delta / _day)),
        hours: Math.floor(parseFloat((delta % _day) / _hour)),
        minutes: Math.floor(parseFloat((delta % _hour) / _minute)),
        seconds: Math.floor(parseFloat((delta % _minute) / _second))
      }
    }
  }

  updateCountdown = () => {
    this.setState({
      countdownData: this.getMissingTime(new Date())
    })
  }

  componentDidMount() {
    this.setState({
      countdownID: setInterval(this.updateCountdown, 1000)
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.countdownID)
  }

  render() {
    const { isNewYear, newYear, countdownData } = this.state

    const getCountdownMarkup = (data, label) => {
      if (data === 0) {
        return null
      }

      let number = `${data}`
      if (number.length < 2) {
        number = `0${number}`
      }

      return (
        <span className={`countdown-item ${label}`} key={label}>
          {`${number} ${label}`}
        </span>
      )
    }

    return (
      <div className="app-wrapper">
        {isNewYear && (
          <React.Fragment>
            <div className="text-wrapper im-drinking">
              <p>Happy New Year!</p>
              <p className="welcome">
                Welcome to <span className="welcome-newyear">{newYear}</span>!
              </p>
            </div>
            <div className="pyro">
              <div className="before" />
              <div className="after" />
            </div>
          </React.Fragment>
        )}
        {!isNewYear && (
          <div className="text-wrapper">
            <p>Countdown to {newYear}</p>
            <div className="countdown">
              {getCountdownMarkup(countdownData['days'], 'd')}
              {getCountdownMarkup(countdownData['hours'], 'h')}
              {getCountdownMarkup(countdownData['minutes'], 'm')}
              {getCountdownMarkup(countdownData['seconds'], 's')}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
