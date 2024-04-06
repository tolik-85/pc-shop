async function handleAvailibleProducts() {
  const products = await model.getProducts()
  model.setAvalibleProducts(products)
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

function renderWrapFilter() {
  for (const key in model.filterModel) {
    const filterCategory = generateFilterCategory(key)
    const elWrapFilter = document.querySelector('.wrap-filter')
    elWrapFilter.appendChild(filterCategory)
    for (const name in model.filterModel[key]) {
      const filterSubCategory = generateFilterSubCategory(name)
      const filterGroupWrappers = generateFilterGroupWrappers()
      filterCategory.appendChild(filterSubCategory)
      filterSubCategory.appendChild(filterGroupWrappers)
      for (let value of model.filterModel[key][name]) {
        const chBoxes = generateFilterWrapCheckBox(value)
        filterGroupWrappers.appendChild(chBoxes)
      }
    }
  }
}
