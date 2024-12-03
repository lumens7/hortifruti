const nome = document.getElementById('nome_folhas');
const imagetp = document.getElementById('foto_folhas');
const descricao = document.getElementById('descricao_folhas');
const beneficios = document.getElementById('beneficios_folhas');
const receitas = document.getElementById('receitas_folhas');
const receitasName = document.getElementById('nome_receita');
const receitasIngrediente = document.getElementById('ingredientes');
const receitasPreparo = document.getElementById('preparo');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let folhasDetails = [];
let currentIndex = 0;

function updateCarousel(index) {
    const folhas = folhasDetails[index];

    nome.textContent = folhas.nome_folhas;
    imagetp.src = folhas.foto_folhas || "./assets/imgs/placeholder.png";
    descricao.textContent = folhas.descricao_folhas || "Descrição não disponível";
    beneficios.textContent = folhas.beneficios_folhas || "Benefícios não disponíveis";

    
    if (folhas.receitas_folhas) {
        receitasName.textContent = folhas.receitas_folhas.nome_receita;
        receitasIngrediente.textContent = folhas.receitas_folhas.ingredientes;
        receitasPreparo.textContent = folhas.receitas_folhas.preparo; 
    } else {
        receitasName.textContent = "Receitas não disponíveis";
        receitasIngrediente.textContent = "Ingredientes não disponíveis";
        receitasPreparo.textContent = "Modo de preparo não disponível";
    }

}


prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? folhasDetails.length - 1 : currentIndex - 1;
    updateCarousel(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === folhasDetails.length - 1) ? 0 : currentIndex + 1;
    updateCarousel(currentIndex);
});

fetch('./profile.json')
    .then(response => response.json())
    .then(data => {
        folhasDetails = data.folhas.details;
        if (folhasDetails.length > 0) {
            updateCarousel(currentIndex);
        }
    })
    .catch(error => {
        console.error('Erro ao carregar os dados:', error);
    });
