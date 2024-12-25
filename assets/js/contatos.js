function updateProfile(profileData) {

    const tel = document.getElementById('tel');
    tel.innerText = profileData.tel;
    tel.href = `tel:${tel}`;

    const mail = document.getElementById('mail');
    
    mail.innerText = profileData.mail;
    mail.href = `mailto:${mail}`;

    const github = document.getElementById('github');
    
    github.innerText = profileData.github;
    github.href = `${github}`;
}

(async () => {
    const profileData = await fetchProfileData();
    updateProfile(profileData);
})();