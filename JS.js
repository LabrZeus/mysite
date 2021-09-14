/* *************** Кнопка прокрутки вверх  / button scroll to top ************** */
document.querySelector('button').onclick = function(){
    window.scrollTo({top: 0, behavior: 'smooth'})
}

// вариант 2, но не докручивает до самого конца скролл
// document.querySelector('button').onclick = function(){
//     document.querySelector('.container').scrollIntoView({ behavior: 'smooth' })
// };

// скрывать кнопку в верхнем положении
// function hiddenButton(){
//     const buttonPosition = window.scrollY   

//     if(buttonPosition < 1000){
//         document.getElementById('buttonId').hidden = true;
//     }
//     else (buttonPosition > 1001)
//     {
//         document.getElementById('buttonId').hidden = false;
//     }    
// }
//  setInterval(hiddenButton, 2000)
/* *************** Анимация контента  / Animation content ************** */
const animItems = document.querySelectorAll('.anim-items');

if(animItems.length > 0){
    function animOnScroll(){
        window.addEventListener('scroll', animOnScroll)
        for (let index = 0; index < animItems.length; index++){
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;           //это старый способ вычислния координат, переписать по новому способу
                                                                    //https://learn.javascript.ru/coordinates-document
            const animItemOffset = offset(animItem).top  //позиция обьекта относительно вверха
            const animStart = 4;                        //кофициент который будет регулировать момент старта анимации при скроле

            const animItemPointer = window.innerHeight - animItemHeight / animStart;
            if(animItemHeight > window.innerHeight){
                animItemPointer = window.innerHeight - window.innerHeight / animStart;
            }

            if((pageYOffset > animItemOffset - animItemPointer)      //если мы прокрутили больше чем позиция обьекта - точка старта,
            && pageYOffset < (animItemOffset + animItemHeight)){     //но при этом прокрутили меньше чем позиция + высота
                animItem.classList.add('_active__hi');
            } else{
                if(!animItem.classList.contains('anim-no-hide')){   //если есть текущий клас, удаляем класс эктив
                   animItem.classList.remove('_active__hi') 
                }
            }
        }


        //функция по получению значений скролл
        function offset(el){
            const rect = el.getBoundingClientRect();
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
        }
    }
    setTimeout(() => {
        animOnScroll();
    }, 1000);
}
/* *************** Определение мобильного устройства  / mobile gadgets ************** */
const isMobile = {
    Android: function(){
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function(){
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function(){
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function(){
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function(){
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function (){
        return(
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
}

if (isMobile.any()){
    document.body.classList.add('_touch')

    let menuArrows = document.querySelectorAll('.menu__arrow')
    if(menuArrows.length > 0){
        for(let index = 0; index < menuArrows.length; index++){
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function(e){
                menuArrow.parentElement.classList.toggle('_active-menu')
            })
        }
    }
} else{
    document.body.classList.add('_pc')
}
/************************************************************************************/
/* *************** Меню бургер в мобильной версии  / mobile menu ************** */
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if(iconMenu){ 
    iconMenu.addEventListener('click', function(e){
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active_mobile_menu');
        menuBody.classList.toggle('_active_mobile_menu');
    })
}
/* *************** Прокрутка при клике  / scroll on click ************** */
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if(menuLinks.length > 0){
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick)
    })

    function onMenuLinkClick(e){
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

            if(iconMenu.classList.contains('_active_mobile_menu')){
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active_mobile_menu');
                menuBody.classList.remove('_active_mobile_menu');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault(); //отключение перехода ссылки
        }
    }
}
