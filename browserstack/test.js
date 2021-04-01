const webdriver = require('selenium-webdriver')

const userName = 'lassejacobsen2'
const accessKey = 'mBqtLq8ffDpp1UFA5679'
const browserstackURL = 'https://' + userName + ':' + accessKey + '@hub-cloud.browserstack.com/wd/hub'

// Input capabilities
const capabilities = {
  os: 'Windows',
  os_version: '10',
  browserName: 'Chrome',
  browser_version: '80',
  name: "lassejacobsen2's First Test",
}

const driver = new webdriver.Builder().usingServer(browserstackURL).withCapabilities(capabilities).build()

driver.get('https://devcon.org').then(function () {
  driver
    .findElement(webdriver.By.id('overlay').getRect().getX())
    .then(el => {
      return el.getRect()
    })
    .then(rect => {
      return rect.getX()
    })
    .then(x => {
      console.log(x, 'X value of menu overlay')

      driver.quit()
      // driver.getTitle().then(function (title) {
      //   console.log(title)
      //   driver.quit()
      // })
    })
})
