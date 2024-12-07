const logo = document.getElementById('logo');
const roleta = document.getElementById('roleta');
const logo_frutas = document.getElementById('logo_frutas');
const logo_legumes = document.getElementById('logo_legumes');
const logo_folhas = document.getElementById('logo_folhas');
const logo_raizes = document.getElementById('logo_raizes');

function updateProfile(profileData) {
    logo.src = profileData.logo;
    logo.alt = profileData.name;

    roleta.src = profileData.roleta;
    roleta.alt = profileData.name;

    if (profileData.logo_frutas) {
        logo_frutas.src = profileData.logo_frutas;
        logo_frutas.alt = "Frutas";
    }
    if (profileData.logo_legumes) {
        logo_legumes.src = profileData.logo_legumes;
        logo_legumes.alt = "Legumes";
    }
    if (profileData.logo_folhas) {
        logo_folhas.src = profileData.logo_folhas;
        logo_folhas.alt = "Folhas";
    }
    if (profileData.logo_raizes) {
        logo_raizes.src = profileData.logo_raizes;
        logo_raizes.alt = "Raízes";
    }
}

fetch('/json/profile.json')
    .then(response => response.json())
    .then(data => {
        updateProfile({
            logo: data.logo,
            roleta: data.roleta,
            logo_frutas: data.frutas.logo_frutas,
            logo_legumes: data.legumes.logo_legumes,
            logo_folhas: data.folhas.logo_folhas,
            logo_raizes: data.raizes.logo_raizes,
            name: "Lumens Profile"
        });
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
