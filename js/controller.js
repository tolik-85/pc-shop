const controller = {
  async handleUpdateProducts(isLoad) {
    if (isLoad) {
      await Promise.all([model.updateCourse(), model.updateProducts()])
      model.pagination(0)
      view.renderContainerProducts(model.paginatedProducts)
      view.renderPagination()
      view.paginationBoldfirstElOnload()
    } else {
      model.filtrateProducts()
      this.handlePriceFilter()
      view.renderContainerProductsClear()
      model.sortedProducts = model.pricedProducts
      model.pagination(0)
      view.renderContainerProducts(model.paginatedProducts)

      view.rednerPaginationClear()
      view.renderPagination()
      view.renderSortSelect()
      view.paginationBoldfirstElOnload()
      if (model.paginatedProducts.length === 0) {
        view.renderContainerProductsOnZeroSearch()
      }
    }
  },
  onChangeElSelectPaginationHandler(itemsOnPage) {
    if (itemsOnPage > 0) {
      model.setProductsOnPage(itemsOnPage)
      view.renderContainerProductsClear()
      model.sortedProducts = model.pricedProducts
      model.pagination(0)
      view.renderContainerProducts(model.paginatedProducts)
      view.rednerPaginationClear()
      view.renderPagination()
      view.renderSortSelect()
      view.paginationBoldfirstElOnload()
    }
  },

  onClickPaginationHandler(pageNum) {
    model.pagination(pageNum)
    view.renderContainerProductsClear()
    view.renderContainerProducts(model.paginatedProducts)
  },

  handlePriceFilter() {
    const priceFrom = document.querySelector('#priceFrom').value
    const priceTo = document.querySelector('#priceTo').value
    model.filtrateProductsByPrice(priceFrom, priceTo)
  },

  handleFilterCheckbox(id, actionAdd) {
    if (actionAdd) {
      model.addCheckedCheckboxes(id)
    } else {
      model.removeCheckedCheckboxes(id)
    }
    console.log(model.checkedFilters)
  },
  handlerElSelect(elSelectValue) {
    model.sortProducts(elSelectValue)
    model.pagination(0)
    view.renderContainerProductsClear()
    view.renderContainerProducts(model.paginatedProducts)
    view.paginationBoldfirstElOnload()
  },

  handleFilter() {
    model.makeFilter()
    const filter = model.getFilter()
    view.renderElWrapCheckboxClear()
    view.renderWrapFilter(filter)
  },

  // ??? 🧨 //

  searchHandler(query) {
    model.setSearchQuery(query)
    model.searchProducts()
    model.filtrateProducts()
    model.filtrateProductsByPrice(0, 20000000)
    model.sortedProducts = model.pricedProducts
    model.pagination(0)

    view.renderContainerProductsClear()
    view.renderContainerProducts(model.paginatedProducts)

    this.handleFilter()
    view.renderRangeWrapOnSearch(model.getMaxPriceUAH(), model.getMinPriceUAH())
    view.rednerPaginationClear()
    view.renderPagination()
    view.paginationBoldfirstElOnload()
    view.renderFilterCheckboxes()
    view.renderSortSelect()

    if (model.paginatedProducts.length === 0) {
      view.renderContainerProductsOnZeroSearch()
    }
  },

  async handleUpdateProduct(id) {
    await model.updateProduct(id)
    await model.updateCourse()
  },

  handleRenderProduct() {
    const product = model.getProduct()
    cardGenerator.generateProductCard(product)
    view.renderMain(product)
  },

  async handleSimilarProducts(id) {
    await model.updateSimilarProductsIdList(id)
  },

  async handleSimilarProductsSection() {
    await model.updateSimilarProducts()
    model.similarProducts.forEach(similarProduct => {
      view.renderSimilarProducts(similarProduct)
    })
  },
  async handleCardProductSearch(cardSearchQuery) {
    await Promise.all([model.updateCourse(), model.updateProducts()])
    model.setCardSearchQuery(cardSearchQuery)
    model.cardSearchProducts()
    view.renderCardMainClear()
    view.renderCardMainOnsearch(model.searchedProducts)
  },
}
