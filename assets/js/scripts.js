import { utcToZonedTime } from 'date-fns-tz'

class Clock {
  constructor(element) {
    this.clockEL = element;
    this.UI = {}
    this.intializeClock()
  }

  updateClock = () => {
    // getting time
    const date = new Date()
    const now = utcToZonedTime(date, this.clockEL.dataset.locale)
    const seconds = (now.getSeconds() + now.getMilliseconds() / 1000) / 60 * 360
    const minutes = (now.getMinutes() + now.getSeconds() / 60) / 60 * 360
    const hours = (now.getHours() + now.getMinutes() / 60) / 12 * 360


    // UI update
		this.UI.date.textContent = now.getDate()
		this.UI.am_pm.textContent = now.getHours() > 12 ? 'PM' : 'AM'
    this.UI.second.style.transform = `rotate(${seconds}deg)`
    this.UI.minute.style.transform = `rotate(${minutes}deg)`
    this.UI.hour.style.transform = `rotate(${hours}deg)`

    requestAnimationFrame(this.updateClock)
  }

  intializeClock() {
    this.clockEL.innerHTML = `
    <svg class="clockface" width="300" height="300" viewBox="-150 -150 300 300">
            <circle class="ring ring--seconds" cx="0" cy="0" r="145" pathlength="60" />
            <circle class="ring ring--hours" cx="0" cy="0" r="145" pathlength="12" />

            <line class="hand hand--minute" x1="0" y1="2" x2="0" y2="-110" />
            <line class="hand hand--hour" x1="0" y1="2" x2="0" y2="-60" />
            <circle class="ring ring--center" cx="0" cy="0" r="3" />
            <line class="hand hand--second" x1="0" y1="12" x2="0" y2="-130" />
            <text x="50" y="-5" class="date">24</text>
            <text x="50" y="10" class="am-pm">pm</text>
          </svg>
    `
    this.UI.date = this.clockEL.querySelector('.date')
    this.UI.am_pm = this.clockEL.querySelector('.am-pm')
    this.UI.second = this.clockEL.querySelector('.hand--second')
    this.UI.minute = this.clockEL.querySelector('.hand--minute')
    this.UI.hour = this.clockEL.querySelector('.hand--hour')
    requestAnimationFrame(this.updateClock)
  }

}

const clocks = document.querySelectorAll('.clock')

clocks.forEach(el =>  new Clock(el))


