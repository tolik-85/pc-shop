const viewCart = {
  async onLoadFavorites() {
    await model.updateProductsAndUsdCourse()
    model.makefavoritesProductsArr()
    this.renderFavoritesProducts()
  },
  renderFavoritesProducts() {
    const elFavoritesMain = document.querySelector('.main-favorites')
    model.favoritesProducts.forEach(product => {
      const favoriteProduct = generateProduct(product)
      elFavoritesMain.appendChild(favoriteProduct)
    })
  },
}
if (location.pathname.toLowerCase().includes('/favorites.html')) {
  document.addEventListener(
    'DOMContentLoaded',
    viewCart.onLoadFavorites.bind(viewCart)
  )
}
