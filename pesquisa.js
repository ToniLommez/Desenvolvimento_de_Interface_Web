const API_KEY = '4ada71e02f874335dbacca8bdd0787e8';

function exibeNoticias(data) { //data é a propria pesquisa
    let divTela = document.getElementById('pesquisaFilmes');
    let texto = '';

    // Montar texto HTML dos filmes
    let dados = JSON.parse(data.target.response); //data é um json gigantesco, mas o que importa ta em data.target.response, entao nessa linha eu peguei só o que importa

    console.log(dados); //isso é pra ver a estrutura do JSON, pra buscar os dados la

    if (dados.results.length == 0) {
        alert('Nenhum resultado encontrado!');
    }
    for (i = 0; i < dados.results.length; i++) {
        let id = dados.results[i].id;
        let flyer = dados.results[i].poster_path ? 'https://image.tmdb.org/t/p/w500' + dados.results[i].poster_path : 'imgs/notFound.png';
        let nome = dados.results[i].title;
        let data = dados.results[i].release_date;
        let descricao = dados.results[i].overview;
        let link = `https://www.themoviedb.org/movie/${dados.results[i].id}&language=pt-BR`;

        texto = texto + `
        <div class="col-12 col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xxl-2">
            <div class="card">
                <img src="${flyer}" class="card-img-top" alt="filme1">
                <div class="card-body">
                    <p class="card-text"><b style="color: #212529;">${nome}</b></p>
                    <p class="card-date">${data}</p>
                    <p class="card-content">${descricao}</p>
                </div>
                <div class="button-link" style="text-align: center;">
                    <a href="${link}" type="button" class="btn btn-config"><b>Leia mais!</b></a>
                </div>
            </div>
        </div>
        `;
    }

    // preencher a DIV com o texto HTML
    divTela.innerHTML = texto;
}

function executaPesquisa() { //lembra de checar se o tem alguma coisa a ser pesquisada, porque a pessoa pode só clicar no botao sem escrever nada, isso vai dar um erro no console
    let query = document.getElementById('search-box').value;
    console.log(query)

    let xhr = new XMLHttpRequest();
    xhr.onload = exibeNoticias;
    xhr.onerror = showError;
    xhr.open('GET', `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`, true);
    xhr.send();
}

function showError() { //precisa criar uma funcao separada, se nao o alert é chamado sozinho
    alert('Erro ao fazer a pesquisa');
}


document.getElementById('search-button').addEventListener('click', executaPesquisa);