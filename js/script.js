// Объявляем функцию в глобальной области видимости
const navInit = () => {
    const navbarCollapsible = document.body.querySelector('#mainNav');

    if (!navbarCollapsible) return; // Защита от ошибки, если элемент не найден

    if (window.scrollY === 0) {
        navbarCollapsible.classList.remove('navbar-shrink');
    } else {
        navbarCollapsible.classList.add('navbar-shrink');
    }
    const links = document.querySelectorAll('.nav-link'); // ищем все навигационные ссылки
    const sections = document.querySelectorAll('section'); // ищем все секции

    sections.forEach(section => { // для каждой секции
        // проверяем, если страница прокручена больше, чем расстояние секции от начала страницы
        if (window.scrollY >= (section.offsetTop - 100)) {
            // отладка. удалить
            console.log(window.scrollY + " >= " + section.offsetTop + " " + section.id);

            // для каждой ссылки
            links.forEach(link => {
                // удаляем активный класс
                link.classList.remove('active');

                // проверяем, если href ссылки без # === id секции
                if (link.href.split('#').pop() === section.id) {
                    // console.log("I'm here");
                    link.classList.add('active'); // добавляем ссылке активный класс
                }
            });
        }
    });


};

function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.scrollX || document.documentElement.scrollLeft,
        scrollTop = window.scrollY || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

// анимация контента
const animItems = document.querySelectorAll('.animate');

if (animItems.length > 0) {
    function onEntry(params) {
        animItems.forEach(item => {
            const itemHeight = item.offsetHeight; // высота анимируемого объекта
            const itemOffset = item.offsetTop;    // позиция объекта от верхнего края
            const startPos = 2;                   // параметр регулирования старта анимации
            const animPoint = document.documentElement.clientHeight - itemHeight / startPos;

            if (itemHeight > document.documentElement.clientHeight) {
                const animPoint = document.documentElement.clientHeight - document.documentElement.clientHeight / startPos;
            }
            if ((scrollY > itemOffset - animPoint) && scrollY < itemOffset + itemHeight) {
                item.classList.add('show');
            } else {
                if (!item.classList.contains('no-hide')) {
                    item.classList.remove('show');
                }
            }


        });
    }
}
/*
function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('show');
        } else {
            change.target.classList.remove('show');
        }
    });
}

let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.animate');

for (let elm of elements) {
    observer.observe(elm);
}*/


// Инициализируем после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    onEntry();
    navInit();
});

// Навешиваем обработчики на события
window.addEventListener('scroll', () => {
    navInit();
    onEntry();
});

window.addEventListener('resize', () => {
    navInit();
});
