const imagetp = document.getElementById('foto_fruta');
const nome = document.getElementById('nome_fruta');
const descricao = document.getElementById('descricao_fruta');
const beneficios = document.getElementById('beneficios_fruta');
const receitas = document.getElementById('receitas_fruta');
const receitasName = document.getElementById('nome_receita');
const receitasIngrediente = document.getElementById('ingredientes');
const receitasPreparo = document.getElementById('preparo');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let frutasDetails = [];
let currentIndex = 0;

function updateCarousel(index) {
    const fruta = frutasDetails[index];

    nome.textContent = fruta.nome_fruta;
    descricao.textContent = fruta.descricao_fruta || "Descrição não disponível";
    beneficios.textContent = fruta.beneficios_fruta || "Benefícios não disponíveis";
    imagetp.src = fruta.foto_fruta || "./assets/imgs/placeholder.png";

    
    if (fruta.receitas_fruta) {
        receitasName.textContent = fruta.receitas_fruta.nome_receita || "Nome da receita não disponível";
        receitasIngrediente.textContent = fruta.receitas_fruta.ingredientes || "Ingredientes não disponíveis";
        receitasPreparo.textContent = fruta.receitas_fruta.preparo || "Modo de preparo não disponível";
    } else {
        receitasName.textContent = "Receitas não disponíveis";
        receitasIngrediente.textContent = "Receitas não disponíveis";
        receitasPreparo.textContent = "Receitas não disponíveis";
    }
}


prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? frutasDetails.length - 1 : currentIndex - 1;
    updateCarousel(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === frutasDetails.length - 1) ? 0 : currentIndex + 1;
    updateCarousel(currentIndex);
});

fetch('/json/profile.json')
    .then(response => response.json())
    .then(data => {
        frutasDetails = data.frutas.details;
        if (frutasDetails.length > 0) {
            updateCarousel(currentIndex);
        }
    })
    .catch(error => {
        console.error('Erro ao carregar os dados:', error);
    });
