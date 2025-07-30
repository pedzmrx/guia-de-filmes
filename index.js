let movieNameRef = document.getElementById('movie-name');
let searchBtn = document.getElementById('search-btn');
let result = document.getElementById('result');

// função para chamar a API do OMDB
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`; // Monta a URL da API com o nome do filme e a chave da API
    
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Por favor, insira o nome de um filme.</h3>`;
    }
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            // Se o filme existir na database
            if (data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="./images/star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Details:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                    <h3>Director:</h3>
                    <p>${data.Director}</p>
                `;
            }

           // Se o filme não existir na base de dados
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
            // Se ocorrer um erro na chamada da API
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};

searchBtn.addEventListener('click', getMovie); // Adiciona o evento de clique ao botão de pesquisa
