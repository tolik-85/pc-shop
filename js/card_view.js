const card_view = {
  index: 0,

  async onLoadedCard() {
    await card_controller.handleUpdateProduct('13')
    card_controller.handleRenderProduct()
    this.setFirstRadioCheckked()
    // this.show_slide(this.index)
  },
  setFirstRadioCheckked() {
    const radio0 = document.querySelector('#name8')
    radio0.setAttribute('checked', 'true')
    radio0.checked = true
    // console.log(radio0)
  },
  renderMain(product) {
    const elMain = document.querySelector('main')
    const productCard = cardGenerator.generateProductCard(product)
    elMain.appendChild(productCard)
  },
  // show_slide(index) {
  //   //increment/decrement slide index
  //   this.index = this.index++

  //   //grab all the images
  //   let images = document.querySelectorAll('.image')
  //   // console.log(images)
  //   //grab all the dots
  //   let dots = document.querySelectorAll('.dot')

  //   // hide all the images
  //   for (i = 0; i < images.length; i++) images[i].style.display = 'none'

  //   // remove the active class from the dot
  //   for (i = 0; i < dots.length; i++)
  //     dots[i].className = dots[i].className.replace(' active', '')

  //   // only display the image that's next or previous
  //   // console.log(images[this.index].style.display)
  //   // images[this.index].style.display = 'block'
  //   // only make the current dot active
  //   // dots[index].className += ' active'
  // },  // if index is greater than the amount of images (set it to zero)
  //   if (this.index > images.length - 1) index = 0

  //   // if index is less than zero (set it to the length of images)
  //   if (this.index < 0) index = images.length - 1

  // showPrevImg() {
  //   this.show_slide(-1)
  // },
  // shoNextImg() {
  //   this.show_slide(1)
  // },
}
document.addEventListener(
  'DOMContentLoaded',
  card_view.onLoadedCard.bind(card_view)
)
