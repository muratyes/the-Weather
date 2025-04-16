const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const hata = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const ApiKey = '93bbbf1a54364548f7080778169453da';
    const sehir = document.querySelector('.search-box input').value;

    if(sehir === '') 
        return;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${sehir}&lang=tr&units=metric&appid=${ApiKey}`).then(response => response.json()).then(json => {
            if(json.cod === '404') {
                container.style.height = '420px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                hata.style.display = 'block';
                hata.classList.add('fadeIn');
                return;
            }

            hata.style.display = 'none';
            hata.classList.remove('fadeIn');

            const resim = document.querySelector('.weather-box img');
            const sicaklik = document.querySelector('.weather-box .temperature');
            const aciklama = document.querySelector('.weather-box .description');
            const nem = document.querySelector('.weather-details .humidity span');
            const ruzgar = document.querySelector('.weather-details .wind span');

            switch(json.weather[0].main){
                case 'Clear':
                    resim.src = 'https://www.freeiconspng.com/uploads/weather-icon-png-15.png';
                    break;
                case 'Rain':
                    resim.src = 'https://www.freeiconspng.com/uploads/cloud-rain-icon-2.png';
                    break;
                case 'Snow':
                    resim.src = 'https://www.freeiconspng.com/uploads/weather-icon-png-10.png';
                    break;
                case 'Clouds':
                    resim.src = 'https://www.freeiconspng.com/uploads/clouds-png-22.png';
                    break;
                case 'Haze':
                    resim.src = 'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3155576/clouds-clipart-md.png';
                    break;
                default:
                    resim.src = '';
            }

            sicaklik.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            aciklama.innerHTML = `${json.weather[0].description}`;   
            nem.innerHTML = `%${json.main.humidity}`;
            ruzgar.innerHTML = `${json.wind.speed} km/s`;   
            
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '605px';
        });
    

});
