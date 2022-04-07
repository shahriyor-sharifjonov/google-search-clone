const input = document.querySelector('.input');
const results = document.querySelector('.results');
const preloader = document.querySelector('.preloader');
const searchResults = document.querySelector('.search-results');

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

async function find(text){
    if(text.length >= 1){
        searchResults.classList.remove('active');
        preloader.classList.add('show');
        results.innerHTML = '';
        await fetch(`https://google-search3.p.rapidapi.com/api/v1/search/q=${text}`, {
            method: 'GET',
            headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'EU',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
                'X-RapidAPI-Key': '764a9ba74bmsh562d5c7e4af4174p16d725jsn9e2f684041ba'
            }})
            .then(res => res.json())
            .then(data => {
                const result = data.results;
                searchResults.classList.add('active')
                searchResults.innerHTML = `Результатов: примерно ${data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} (${data.ts.toFixed(2)} сек.)`
                preloader.classList.remove('show');
                result.forEach(el => {
                    results.innerHTML += `<div class="result">
                        <a href="${el.link}" class="result__link">${el.title}</a>
                        <p class="result__desc">${el.description}</p>
                    </div>`
                })
            })
            .catch(error => console.log(error));
    }
}