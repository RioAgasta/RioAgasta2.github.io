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

// Data Table
let table = $('#dataScraping').DataTable({
    ajax: {url: 'python/headlines.json', dataSrc: ''},
    columnDefs: [
        {
            searchable: false,
            orderable: false,
            targets: 0
        }
    ],
    order: [[0, 'asc']],
    columns: [
        { 
            data: null,
            className: 'dt-body-center',
            render: function ( data, type, row, meta ) {
                return meta.row + 1;
            }
        },
        { data: 'judul' },
        { data: 'kategori' },
        { data: 'waktuPublish' },
        { data: 'waktuScraping' }
    ]
})

table
    .on('draw.dt', function () {
        let counter = 1;
        table
            .column(0, { search: 'applied', order: 'applied' })
            .nodes()
            .each(function (cell, i) {
                cell.innerHTML = counter++;
            });
    })
    .draw();