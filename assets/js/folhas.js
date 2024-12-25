const imagetp = document.getElementById('foto_folhas');
const nome = document.getElementById('nome_folhas');
const descricao = document.getElementById('descricao_folhas');
const beneficios = document.getElementById('beneficios_folhas');
const receitasName = document.getElementById('nome_receita');
const receitasIngrediente = document.getElementById('ingredientes');
const receitasPreparo = document.getElementById('preparo');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const carouselList = document.getElementById('carouselList');
const items = document.querySelectorAll('.item');

let folhasDetails = [];
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
    const folhas = folhasDetails[index];

    nome.textContent = folhas.nome_folhas;
    descricao.innerHTML = formatTextWithLineBreaks(folhas.descricao_folhas);
    beneficios.innerHTML = formatTextWithLineBreaks(folhas.beneficios_folhas);
    imagetp.src = folhas.foto_folhas || "./assets/imgs/placeholder.png";

    updateDestaque(index);

    if (folhas.receitas_folhas) {
        receitasName.textContent = folhas.receitas_folhas.nome_receita || "Nome da receita não disponível";
        renderIngredients(folhas.receitas_folhas.ingredientes);
        receitasPreparo.innerHTML = formatTextWithLineBreaks(folhas.receitas_folhas.preparo);
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
    currentIndex = (currentIndex === 0) ? folhasDetails.length - 1 : currentIndex - 1;
    updateCarousel(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === folhasDetails.length - 1) ? 0 : currentIndex + 1;
    updateCarousel(currentIndex);
});

fetch('/json/profile.json')
    .then(response => response.json())
    .then(data => {
        folhasDetails = data.folhas.details;

        folhasDetails.forEach((folhas, index) => {
            const item = document.createElement('li');
            item.classList.add('item');
            if (index === 0) {
                item.classList.add('destaque');
            }
            const img = document.createElement('img');
            img.src = folhas.foto_folhas;
            img.alt = folhas.nome_folhas;
            item.appendChild(img);
            carouselList.appendChild(item);
        });

        if (folhasDetails.length > 0) {
            updateCarousel(currentIndex);
        }
    })
    .catch(error => {
        console.error('Erro ao carregar os dados:', error);
    });
