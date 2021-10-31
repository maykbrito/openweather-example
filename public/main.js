const fetchWeather = async city => {
  const url = `/api?q=` + city

  const data = await fetch(url).then(res => res.json())

  if (data.status < 200 || data.status > 209) {
    return undefined
  }

  return { temp: data.main.temp }
}

const kelvinToCelsius = temp => Math.ceil(Number(temp) - 273.15)

window.onkeydown = e => (e.key === 'Enter' ? updateDOM() : null)
city.onkeydown = e => (e.key === 'Enter' ? city.blur() : undefined)

const updateDOM = async () => {
  const data = await fetchWeather(city.textContent)

  let timeout

  if (data === undefined) {
    clearInterval(timeout)

    errorMessage.style.display = 'block'
    timeout = setTimeout(() => (errorMessage.style.display = 'none'), 3000)

    return
  }

  weatherDisplay.textContent = kelvinToCelsius(data.temp)
}
