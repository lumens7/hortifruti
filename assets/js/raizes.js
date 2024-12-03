const nome = document.getElementById('nome_raizes');
const imagetp = document.getElementById('foto_raizes');
const descricao = document.getElementById('descricao_raizes');
const beneficios = document.getElementById('beneficios_raizes');
const receitas = document.getElementById('receitas_raizes');
const receitasName = document.getElementById('nome_receita');
const receitasIngrediente = document.getElementById('ingredientes');
const receitasPreparo = document.getElementById('preparo');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let raizesDetails = [];
let currentIndex = 0;

function updateCarousel(index) {
    const raizes = raizesDetails[index];

    nome.textContent = raizes.nome_raizes;
    imagetp.src = raizes.foto_raizes || "./assets/imgs/placeholder.png";
    descricao.textContent = raizes.descricao_raizes || "Descrição não disponível";
    beneficios.textContent = raizes.beneficios_raizes || "Benefícios não disponíveis";

    
    if (raizes.receitas_raizes) {
        receitasName.textContent = raizes.receitas_raizes.nome_receita;
        receitasIngrediente.textContent = raizes.receitas_raizes.ingredientes;
        receitasPreparo.textContent = raizes.receitas_raizes.preparo; 
    } else {
        receitasName.textContent = "Receitas não disponíveis";
        receitasIngrediente.textContent = "Ingredientes não disponíveis";
        receitasPreparo.textContent = "Modo de preparo não disponível";
    }

}


prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? raizesDetails.length - 1 : currentIndex - 1;
    updateCarousel(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === raizesDetails.length - 1) ? 0 : currentIndex + 1;
    updateCarousel(currentIndex);
});

fetch('./profile.json')
    .then(response => response.json())
    .then(data => {
        raizesDetails = data.raizes.details;
        if (raizesDetails.length > 0) {
            updateCarousel(currentIndex);
        }
    })
    .catch(error => {
        console.error('Erro ao carregar os dados:', error);
    });
