const container = document.querySelector('.container');
const busca = document.querySelector('.busca button');
const caixaClima = document.querySelector('.caixa-clima');
const climaDetalhes = document.querySelector('.clima-detalhes');
const error404 = document.querySelector('.not-found');

busca.addEventListener('click', () => {
    const APIKey = '72ad5c5e5d31e33ac5daa6c4f2f72e07';
    const city = document.querySelector('.busca input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                caixaClima.style.display = 'none';
                climaDetalhes.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.caixa-clima img');
            const temperatura = document.querySelector('.caixa-clima .temperatura');
            const descricao = document.querySelector('.caixa-clima .descricao');
            const umidade = document.querySelector('.clima-detalhes .umidade span');
            const vento = document.querySelector('.clima-detalhes .vento span');

            switch (json.weather[0].main) {
                case 'Clear':
                    document.body.style.background = '#f79a1d';
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    document.body.style.background = '#178aa5';
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    document.body.style.background = '#3a7bd5';
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    document.body.style.background = '#bdd9e5';
                    image.src = 'images/cloud.png';
                    break;

                case 'Mist':
                    document.body.style.background = '#DECBA4';
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            descricao.innerHTML = `${json.weather[0].description}`;
            umidade.innerHTML = `${json.main.humidity}%`;
            vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            caixaClima.style.display = '';
            climaDetalhes.style.display = '';
            caixaClima.classList.add('fadeIn');
            climaDetalhes.classList.add('fadeIn');
            container.style.height = '590px';
        });
});
