async function fetchProfileData() {
    const url = 'https://raw.githubusercontent.com/lumens7/hortifruti/refs/heads/main/json/profile.json';
    const fetching = await fetch(url);
    return await fetching.json();
}
  
function updateProfile(profileData) {
    tel.innerText = profileData.tel;
    tel.href = `tel:${profileData.tel}`;

    mail.innerText = profileData.mail;
    mail.href = `mailto:${profileData.mail}`;

    github.innerText = profileData.github;
    github.href = profileData.github;

    logo.src = profileData.logo;
    roleta.src = profileData.roleta;
    
}

async function loadProfile() {
    try {
        const data = await fetchProfileData();
        updateProfile(data);
        console.log(data);
    } catch (error) {
        console.error('Erro ao carregar o JSON:', error);
    }
}

loadProfile();
