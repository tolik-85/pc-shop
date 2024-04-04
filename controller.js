async function handleAvailibleProducts() {
  await model.getAvalibleProducts()
  model.avalibleProducts.forEach(el => {
    const URL = 'https://web-app.click/photos/products/computers/'
    const picture = el.photos.files[0]
    const purpose = el.purpose
    const caption = el.caption
    const price = el.price
    const image = `${URL}${picture}`
    renderContainerProducts(purpose, caption, price, image)
  })
}

function handleFilter() {
  for (const key in model.filterModel) {
    const filterCategory = generateFilterCategory(key)
    const form = document.querySelector('.wrap-filter>form')
    form.appendChild(filterCategory)
    for (const name in model.filterModel[key]) {
      const filterSubCategory = generateFilterSubCategory(name)
      filterCategory.appendChild(filterSubCategory)
      for (let value of model.filterModel[key][name]) {
        const chBoxes = generateCheckBox(value)
        filterSubCategory.appendChild(chBoxes)
      }
    }
  }
  renderFormSubmitBtn()
}
