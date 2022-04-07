const input = document.querySelector('.input');
const textResults = document.querySelector('.text-results');
const imageResults = document.querySelector('.image-results');
const preloader = document.querySelector('.preloader');
const searchResults = document.querySelector('.search-results');
const tabs = document.querySelectorAll('.tabs__item');
const onlySearch = document.getElementById('search');
const images = document.getElementById('images');

const options = {
    method: 'GET',
    headers: {
        'X-User-Agent': 'desktop',
        'X-Proxy-Location': 'EU',
        'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
        'X-RapidAPI-Key': '764a9ba74bmsh562d5c7e4af4174p16d725jsn9e2f684041ba'
    }
}

tabs.forEach(el => {
    el.addEventListener('click', () => {
        tabs.forEach(tab => {
            tab.classList.remove('active');
        })
        el.classList.add('active');
        const text = input.value;
        find(text)
    })
})

window.addEventListener('keypress', (e) => {
    if(e.key == 'Enter' && input.value.length >= 1){
        const text = input.value;
        find(text)
    }
})

function search(){
    const text = input.value;
    find(text)
}

function find(text){
    if(text.length >= 1){
        searchResults.classList.remove('active');
        preloader.classList.add('show');
        textResults.innerHTML = '';
        imageResults.innerHTML = '';

        //text search
        if(onlySearch.classList.contains('active')){
            textSearch(text)
        }
        
        //image
        else if(images.classList.contains('active')){
            imageSearch(text)
        }
    }
}

//text search
function textSearch(text){
    fetch(`https://google-search3.p.rapidapi.com/api/v1/search/q=${text}`, options)
        .then(res => res.json())
        .then(data => {
            const result = data.results;
            searchResults.classList.add('active')
            searchResults.innerHTML = `Результатов: примерно ${data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} (${data.ts.toFixed(2)} сек.)`
            preloader.classList.remove('show');
            result.forEach(el => {
                textResults.innerHTML += `<div class="text-result">
                    <a href="${el.link}" class="text-result__link">${el.title}</a>
                    <p class="text-result__desc">${el.description}</p>
                </div>`
            })
        })
        .catch(error => console.log(error));
}

//image search
function imageSearch(text){
    fetch(`https://google-search3.p.rapidapi.com/api/v1/image/q=${text}`, options)
        .then(res => res.json())
        .then(data => {
            const result = data.image_results
            preloader.classList.remove('show');
            result.forEach(el => {
                imageResults.innerHTML += `<a href="${el.link.href}" class="image-result">
                    <img src="${el.image.src}" alt="${el.link.title}" class="image-result__img">
                    <div class="image-result__alt">
                        <span>${el.link.title}</span>
                    </div>
                </a>`
            })
        })
        .catch(error => console.log(error));
}



