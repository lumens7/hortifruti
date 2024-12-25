const logo = document.getElementById('logo');
const roleta = document.getElementById('roleta');
const logo_frutas = document.getElementById('logo_frutas');
const logo_legumes = document.getElementById('logo_legumes');
const logo_folhas = document.getElementById('logo_folhas');
const logo_raizes = document.getElementById('logo_raizes');
const github = document.getElementById('github');
const mail = document.getElementById('mail');
const tel = document.getElementById('tel');

function updateProfile(profileData) {
    
    logo.src = profileData.logo;
    logo.alt = "LOGO";

    if(profileData.roleta){
        roleta.src = profileData.roleta;
        roleta.alt = "Roleta";

    }

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

    
    if(profileData.tel){
        tel.textContent = profileData.tel;
        tel.href = `tel:${profileData.tel}`;
        tel.innerHTML = `telefone`;

    }
    if(profileData.mail){
        mail.textContent = profileData.mail;
        mail.href = `mailto:${profileData.mail}`;
        mail.innerHTML = `mail`;

    }
    if(profileData.github){
        github.textContent = profileData.github;
        github.href = profileData.github;
        github.innerHTML = `github`;

    }

    
}


async function loadProfile() {
    try {
        const data = await fetchProfileData();
        updateProfile({
            logo: data.logo,
            roleta: data.roleta,
            logo_frutas: data.frutas?.logo_frutas,
            logo_legumes: data.legumes?.logo_legumes,
            logo_folhas: data.folhas?.logo_folhas,
            logo_raizes: data.raizes?.logo_raizes,
            tel: data.tel,
            mail: data.mail,
            github: data.github,
            name: "Lumens Profile"
        });
    } catch (error) {
        console.error('Erro ao carregar o JSON:', error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
});

