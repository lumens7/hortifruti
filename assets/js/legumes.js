const imagetp = document.getElementById('foto_legumes');
const nome = document.getElementById('nome_legumes');
const descricao = document.getElementById('descricao_legumes');
const beneficios = document.getElementById('beneficios_legumes');
const receitasName = document.getElementById('nome_receita');
const receitasIngrediente = document.getElementById('ingredientes');
const receitasPreparo = document.getElementById('preparo');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const carouselList = document.getElementById('carouselList');
const items = document.querySelectorAll('.item');

let legumesDetails = [];
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
    const legumes = legumesDetails[index];

    nome.textContent = legumes.nome_legumes;
    descricao.innerHTML = formatTextWithLineBreaks(legumes.descricao_legumes);
    beneficios.innerHTML = formatTextWithLineBreaks(legumes.beneficios_legumes);
    imagetp.src = legumes.foto_legumes || "./assets/imgs/placeholder.png";

    updateDestaque(index);

    if (legumes.receitas_legumes) {
        receitasName.textContent = legumes.receitas_legumes.nome_receita || "Nome da receita não disponível";
        renderIngredients(legumes.receitas_legumes.ingredientes);
        receitasPreparo.innerHTML = formatTextWithLineBreaks(legumes.receitas_legumes.preparo);
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
    currentIndex = (currentIndex === 0) ? legumesDetails.length - 1 : currentIndex - 1;
    updateCarousel(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === legumesDetails.length - 1) ? 0 : currentIndex + 1;
    updateCarousel(currentIndex);
});

fetch('/json/profile.json')
    .then(response => response.json())
    .then(data => {
        legumesDetails = data.legumes.details;

        legumesDetails.forEach((legumes, index) => {
            const item = document.createElement('li');
            item.classList.add('item');
            if (index === 0) {
                item.classList.add('destaque');
            }
            const img = document.createElement('img');
            img.src = legumes.foto_legumes;
            img.alt = legumes.nome_legumes;
            item.appendChild(img);
            carouselList.appendChild(item);
        });

        if (legumesDetails.length > 0) {
            updateCarousel(currentIndex);
        }
    })
    .catch(error => {
        console.error('Erro ao carregar os dados:', error);
    });
