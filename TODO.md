🧨 убрать model из view.js и generators.js

🤔 Свойства фильтров рендерятся в разном порядке - свойства отсортировал, а значения нет)))

👀 В каталоге добавить возможность выводить по 5 10 15 25 товаров на странице - не получается отобразить погинацию с первой страницы, сейчас начинается с 0

!!!!исправить необходимость кликать 2 раза на кнопку "фильтровать" в некторых случаях. - типа сделал, не переопределяем макс прайс
исправить неработающий поиск при повторном поиске - типа сделал, не переопределяем макс прайс

🎉 починить поиск из параметра в урл ?search-query=оф - типа сделал
🎉если карточка товара была открыта без ?id=42, выводить 404 ошибку. - типа сделал
🎉Поставить 404 заглушку в карточку товара, если страницу открыли без ?id=42 - - типа сделал
🎉 Прикрутить datalist к строке поиска - прикрутил
🎉 в каталоге не кликются товары. - исправил, но не понял как))))))
🎉 При переключении страниц изменять страницу в searchParams index.html?page=1
🎉 Добавить в логотипе ссылку на главную - не работает относительнвый путь
🎉 Карточку товара открывать в новом окне target="\_blank" - ok
🎉 card.html исправить ошибку в разметке
🎉 !!usdCourse!!
🎉 Переименовать simUlarы
🎉 В пагинации подкрашивать текущую страницу - готово
🎉 Добавить свойство currentPage в model - сделал по своему
🎉 В карточке товара Добавить кнопку "добавить в сравнение"
🎉 Если при поиске ничего не найдено, исправить ошибку с price Infinity
🎉 Если при поиске ничего не найдено, выводить надпись "ничего не найдено"
🎉 Поиск внутри карточки товаров

addCheckedCheckboxes(checkedFilter) {
this.checkedFilters.push(checkedFilter)
},

removeCheckedCheckboxes(checkedFilter) {
const index = this.checkedFilters.indexOf(checkedFilter)
this.checkedFilters.splice(index, 1)
},

handleFilterCheckbox(id, actionAdd) {
if (actionAdd) {
model.addCheckedCheckboxes(id)
} else {
model.removeCheckedCheckboxes(id)
}
console.log(model.checkedFilters)
},

const urlParams = new URLSearchParams(location.search)
window.history.pushState('null','','?page=1')
window.history.pushState('null','','?' + urlParams)
urlParams.set('page', '3')
