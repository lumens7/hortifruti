const imagetp = document.getElementById('foto_fruta');
const nome = document.getElementById('nome_fruta');
const descricao = document.getElementById('descricao_fruta');
const beneficios = document.getElementById('beneficios_fruta');
const receitasName = document.getElementById('nome_receita');
const receitasIngrediente = document.getElementById('ingredientes');
const receitasPreparo = document.getElementById('preparo');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const carouselList = document.getElementById('carouselList');
const items = document.querySelectorAll('.item');

let frutaDetails = [];
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
    const fruta = frutaDetails[index];

    nome.textContent = fruta.nome_fruta;
    descricao.innerHTML = formatTextWithLineBreaks(fruta.descricao_fruta);
    beneficios.innerHTML = formatTextWithLineBreaks(fruta.beneficios_fruta);
    imagetp.src = fruta.foto_fruta || "./assets/imgs/placeholder.png";

    updateDestaque(index);

    if (fruta.receitas_fruta) {
        receitasName.textContent = fruta.receitas_fruta.nome_receita || "Nome da receita não disponível";
        renderIngredients(fruta.receitas_fruta.ingredientes);
        receitasPreparo.innerHTML = formatTextWithLineBreaks(fruta.receitas_fruta.preparo);
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
    currentIndex = (currentIndex === 0) ? frutaDetails.length - 1 : currentIndex - 1;
    updateCarousel(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === frutaDetails.length - 1) ? 0 : currentIndex + 1;
    updateCarousel(currentIndex);
});

fetch('/json/profile.json')
    .then(response => response.json())
    .then(data => {
        frutaDetails = data.frutas.details;

        frutaDetails.forEach((fruta, index) => {
            const item = document.createElement('li');
            item.classList.add('item');
            if (index === 0) {
                item.classList.add('destaque');
            }
            const img = document.createElement('img');
            img.src = fruta.foto_fruta;
            img.alt = fruta.nome_fruta;
            item.appendChild(img);
            carouselList.appendChild(item);
        });

        if (frutaDetails.length > 0) {
            updateCarousel(currentIndex);
        }
    })
    .catch(error => {
        console.error('Erro ao carregar os dados:', error);
    });
