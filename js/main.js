const mntoggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');

mntoggle.addEventListener('click',function(){
    nav.classList.toggle('menushow');
    mntoggle.classList.toggle('checked');
})

document.querySelectorAll('nav ul li a').forEach(link => {
    link.onclick = () => {
        nav.classList.toggle('menushow');
        mntoggle.classList.toggle('checked');
    }
})

document.querySelectorAll('.galeriHobi img').forEach(image => {
    image.onclick = () => {
        document.querySelector('.popup-image').style.display = 'block';
        document.querySelector('.popup-image img').src = image.getAttribute('src');
    }
})

document.querySelector('.popup-image span').onclick = () => {
    document.querySelector('.popup-image').style.display = 'none';
}