const imagetp = document.getElementById('foto_raizes');
const nome = document.getElementById('nome_raizes');
const descricao = document.getElementById('descricao_raizes');
const beneficios = document.getElementById('beneficios_raizes');
const receitasName = document.getElementById('nome_receita');
const receitasIngrediente = document.getElementById('ingredientes');
const receitasPreparo = document.getElementById('preparo');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const carouselList = document.getElementById('carouselList');
const items = document.querySelectorAll('.item');

let raizesDetails = [];
let currentIndex = 0;

function formatTextWithLineBreaks(text) {
    return text ? text.replace(/\. /g, '.<br>') : "Informação não disponível";
}

function renderIngredients(ingredientesTexto) {
    const ingredientesContainer = document.getElementById('ingredientes');
    const ingredientesLista = ingredientesTexto.split('. ').filter(item => item.trim() !== '');

    const ul = document.createElement('ul');
    ul.style.listStyle = "none"; 

    ingredientesLista.forEach(ingrediente => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.marginRight = '8px';

        const label = document.createElement('label');
        label.textContent = ingrediente;

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                label.style.textDecoration = 'line-through'; 
                label.style.color = '#343a40'; 
            } else {
                label.style.textDecoration = 'none'; 
                label.style.color = '#fff'; 
            }
        });

        li.appendChild(checkbox);
        li.appendChild(label);
        ul.appendChild(li);
    });

    ingredientesContainer.innerHTML = "";
    ingredientesContainer.appendChild(ul);
}

function updateCarousel(index) {
    const raizes = raizesDetails[index];

    nome.textContent = raizes.nome_raizes;
    descricao.innerHTML = formatTextWithLineBreaks(raizes.descricao_raizes);
    beneficios.innerHTML = formatTextWithLineBreaks(raizes.beneficios_raizes);
    imagetp.src = raizes.foto_raizes || "./assets/imgs/placeholder.png";

    updateDestaque(index);

    if (raizes.receitas_raizes) {
        receitasName.textContent = raizes.receitas_raizes.nome_receita || "Nome da receita não disponível";
        renderIngredients(raizes.receitas_raizes.ingredientes);
        receitasPreparo.innerHTML = formatTextWithLineBreaks(raizes.receitas_raizes.preparo);
    } else {
        receitasName.textContent = "Receitas não disponíveis";
        receitasIngrediente.textContent = "Receitas não disponíveis";
        receitasPreparo.textContent = "Receitas não disponíveis";
    }
}

const updateDestaque = (index) => {
    const items = document.querySelectorAll('.item');
    items.forEach((item, i) => {
        item.classList.remove('destaque');
        if (i === index) {
            item.classList.add('destaque');
        }
    });
};

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? raizesDetails.length - 1 : currentIndex - 1;
    updateCarousel(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === raizesDetails.length - 1) ? 0 : currentIndex + 1;
    updateCarousel(currentIndex);
});

fetch('/json/profile.json')
    .then(response => response.json())
    .then(data => {
        raizesDetails = data.raizes.details;

        raizesDetails.forEach((raizes, index) => {
            const item = document.createElement('li');
            item.classList.add('item');
            if (index === 0) {
                item.classList.add('destaque');
            }
            const img = document.createElement('img');
            img.src = raizes.foto_raizes;
            img.alt = raizes.nome_raizes;
            item.appendChild(img);
            carouselList.appendChild(item);
        });

        if (raizesDetails.length > 0) {
            updateCarousel(currentIndex);
        }
    })
    .catch(error => {
        console.error('Erro ao carregar os dados:', error);
    });
