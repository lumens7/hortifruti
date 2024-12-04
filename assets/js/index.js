let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
   menu.classList.toggle('fa-times');
   navbar.classList.toggle('active');
}


window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}


function changetype(type){
    const pratos = document.getElementById('pratos')

    pratos.classList = ''
    pratos.classList.add(type)

    const body = document.querySelector('body')
    body.style.backgroundColor = `var(--${type}-background)`
    const circle = document.getElementById('circle')
    circle.style.backgroundColor = `var(--${type}-circle)`
}
