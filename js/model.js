const model = {
  UsdCourse: {
    rate: '',
  },
  products: [],
  filtratedProducts: [],
  filter: {},
  // checkedFilters: [],
  checkedFilters: [
    // 'Накопитель SSD_brand_Kingston',
    // 'Материнская плата_brand_Asus',
    // 'Оперативная память_capacity_16Gb',
  ],

  addCheckedCheckboxes(checkedFilter) {
    this.checkedFilters.push(checkedFilter)
  },

  removeCheckedCheckboxes(checkedFilter) {
    const index = this.checkedFilters.indexOf(checkedFilter)
    this.checkedFilters.splice(index, 1)
  },

  setProducts(products) {
    this.products = products
  },
  getProductsNames() {
    const products = this.getProducts()
    const productsNames = []
    products.forEach(product => {
      productsNames.push(product.caption)
    })
    return productsNames
  },
  getProducts() {
    return this.products
  },

  getFiltratedProducts() {
    return this.filtratedProducts
  },

  getFilter() {
    return this.filter
  },

  async updateProducts() {
    const products = await api.loadProducts()
    this.setProducts(products)
    this.makeFilter()
    this.filtrateProducts()
  },
  async updateCourse() {
    const course = await api.loadCourse()
    this.setUsdCouse(course)
  },
  setUsdCouse(course) {
    course.forEach(item => {
      for (key in item) {
        if (item[key] === 840) {
          this.UsdCourse.rate = item.rate
        }
      }
    })
  },

  filtrateProducts(i = 5) {
    this.filtratedProducts = this.products.filter(product => {
      let count = 0

      this.checkedFilters.forEach(cf => {
        let param = cf.split('_')
        console.log(param)
        if (product.specs[param[0]]?.[param[1]] === param[2]) {
          count += 1
        }
      })

      console.log(count)
      console.log(this.checkedFilters.length === count)

      return this.checkedFilters.length === count

      // console.log(product.specs)
      // console.log(param[0])
      // console.log(product.specs[param[0]])
      // console.log(product.specs[param[0]][param[1]])

      // this.checkedFilters.forEach(el => {
      //   param = el.split('_')
      //   for (key in product.specs) {
      //     if (key === param[0]) {
      //       // console.log(key === param[0])
      //       for (key2 in product.specs[key]) {
      //         // console.log(key2 === product.specs[key])
      //         if (key2 === param[1]) {
      //           for (key3 in product.specs[key][key2]) {
      //             if (product.specs[key][key2] === param[2]) {
      //               console.log(product.specs[key][key2] === param[2])
      //               return true
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // })
      // console.log(product.specs[param[0]][param[1]])
      // return product.specs[param[0]][param[1]] === param[2]
      // return Math.random() - 0.5 > 0
      // return true
    })

    // console.log(this.filtratedProducts)

    // .filter(item => {
    //   for (key in item.specs) {
    //     for (key2 in item.specs[key]) {
    //       // console.log(`${key}__${key2}__${item.specs[key][key2]}`)
    //     }
    //   }
    // })
  },

  makeFilter() {
    this.products.forEach(item => {
      for (key in item.specs) {
        if (!this.filter[key]) {
          this.filter[key] = {}
        }
        for (key2 in item.specs[key]) {
          if (!this.filter[key][key2]) {
            this.filter[key][key2] = []
          }
          for (key3 of item.specs[key][key2]) {
            if (!this.filter[key][key2].includes(item.specs[key][key2])) {
              if (item.specs[key][key2].includes('???')) {
                item.specs[key][key2] = item.specs[key][key2].replace('???', '')
              }
              this.filter[key][key2].push(item.specs[key][key2])
            }
          }
        }
      }
    })
  },
}
