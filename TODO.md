🧨 Прикрутить datalist к строке поиска
При переключении страниц изменять страницу в searchParams index.html?page=1
Поставить 404 заглушку в карточку товара, если страницу открыли без ?id=42
🤔 Свойства фильтров рендерятся в разном порядке

🎉 Добавить в логотипе ссылку на главную - не работает относительнвый путь
🎉 Карточку товара открывать в новом окне target="\_blank" - ok
🎉 card.html исправить ошибку в разметке
🎉 !!usdCourse!!
🎉 Переименовать simUlarы
🎉 В пагинации подкрашивать текущую страницу - готово
🎉 Добавить свойство currentPage в model - сделал по своему
🎉 В каталоге добавить возможность выводить по 5 10 15 25 товаров на странице - не получается отобразить погинацию с первой страницы, сейчас начинается с 0
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
