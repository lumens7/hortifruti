const imagetp = document.getElementById('foto_legume');
const nome = document.getElementById('nome_legume');
const descricao = document.getElementById('descricao_legume');
const beneficios = document.getElementById('beneficios_legume');
const receitas = document.getElementById('receitas_legume');
const receitasName = document.getElementById('nome_receita');
const receitasIngrediente = document.getElementById('ingredientes');
const receitasPreparo = document.getElementById('preparo');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let legumeDetails = [];
let currentIndex = 0;

function updateCarousel(index) {
    const legume = legumeDetails[index];

    nome.textContent = legume.nome_legume;
    imagetp.src = legume.foto_legume || "./assets/imgs/placeholder.png";
    descricao.textContent = legume.descricao_legume || "Descrição não disponível";
    beneficios.textContent = legume.beneficios_legume || "Benefícios não disponíveis";

    
    if (legume.receitas_legume) {
        receitasName.textContent = legume.receitas_legume.nome_receita;
        receitasIngrediente.textContent = legume.receitas_legume.ingredientes;
        receitasPreparo.textContent = legume.receitas_legume.preparo; 
    } else {
        receitasName.textContent = "Receitas não disponíveis";
        receitasIngrediente.textContent = "Ingredientes não disponíveis";
        receitasPreparo.textContent = "Modo de preparo não disponível";
    }

}


prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? legumeDetails.length - 1 : currentIndex - 1;
    updateCarousel(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === legumeDetails.length - 1) ? 0 : currentIndex + 1;
    updateCarousel(currentIndex);
});

fetch('./profile.json')
    .then(response => response.json())
    .then(data => {
        legumeDetails = data.legumes.details;
        if (legumeDetails.length > 0) {
            updateCarousel(currentIndex);
        }
    })
    .catch(error => {
        console.error('Erro ao carregar os dados:', error);
    });
