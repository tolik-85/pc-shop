// filterModel: [
//   {
//     'Накопитель SSD': {
//       Бренд: [
//         'Kingston',
//         'GoodRAM',
//         'Corsair',
//         'Samsung',
//         'Apacer',
//         'Anatolii',
//       ],
//       Обьем: ['120Gb', '250Gb', '240Gb', '500Gb', '480Gb', '500Gb,', '512Gb'],
//     },
//   },
//   {
//     'Материнская плата': {
//       Бренд: [
//         'Asus',
//         'Gigabyte',
//         'MSI',
//         'ASRock',
//         'LGA1700',
//         'AsRock',
//         'AM5',
//         'LGA1200',
//       ],
//       'Тип памяти': ['DDR4'],
//     },
//   },
//   {
//     Процессор: {
//       Бренд: ['AMD', 'Intel', 'LGA1700', 'INTEL'],
//       Частота: [
//         'x6*3.7 Ghz',
//         'x4*3.6 Ghz',
//         'x4*3.8Ghz',
//         'x6*3.9 Ghz',
//         'x4*3.7Ghz',
//         'x6*2.9 ???Ghz',
//         'x6*3.6 Ghz',
//         'x6*3.6Ghz',
//         'x6*2.6Ghz',
//         'x6*2.5 Ghz',
//         'x6*3.5 Ghz',
//         'x10*3.7 Ghz',
//         'x6*4.7 Ghz',
//         'x8*3.8 ???Ghz',
//         'x8*3.6Ghz',
//         'x16*3.4 Ghz',
//         'x12*3.6 Ghz',
//         'x8*2.5Ghz',
//         'x2*3.5 Ghz',
//         'x4*3.2 Ghz',
//         'x14*3.5 Ghz',
//         'x12*4.7 Ghz',
//         'x6*4.1 ???Ghz',
//       ],
//     },
//   },
//   {
//     'Оперативная память': {
//       Бренд: [
//         'Patriot',
//         'Kingston',
//         'GoodRAM',
//         'Team',
//         'Corsair',
//         'G.Skill',
//         'Dato',
//       ],
//       Обьем: ['4Gb', '8Gb', '16Gb', '32Gb', '64Gb'],
//       'Тип памяти': ['DDR4', 'DDR5'],
//       Частота: [
//         '2666Mhz',
//         '3200Mhz',
//         '3600Mhz',
//         '3733Mhz',
//         '5200Mhz',
//         '5600Mhz',
//         '6000Mhz',
//       ],
//     },
//   },
//   {
//     'Блок питания': {
//       Бренд: [
//         'GameMax',
//         'CHIEFTEC',
//         'Chieftec',
//         'Zalman',
//         'Chiefteс',
//         'Gigabyte',
//         'Asus',
//       ],
//       Мощность: ['500W', '600W', '650W', '750W', 'P750W', '850W', '1000W'],
//     },
//   },
//   {
//     Корпус: {
//       Бренд: [
//         'GameMax',
//         'CHIEFTEC',
//         'Chieftec',
//         'Zalman',
//         'Chiefteс',
//         'Gigabyte',
//         'Asus',
//       ],
//     },
//   },
//   {
//     Видеокарта: {
//       Бренд: [
//         'Asus',
//         'MSI',
//         'AsusGeForce',
//         'Gigabyte',
//         'Palit',
//         'Zotac',
//         'Biostar',
//       ],
//       'Обьем памяти': ['4Gb', '6Gb', '8Gb', '12Gb', '16Gb', '10Gb', '24Gb'],
//     },
//   },
//   {
//     'Кулер для процесора': {
//       Бренд: ['ID-Cooling', 'Arctic', 'NZXT'],
//       Размер: ['120мм'],
//     },
//   },
// ],

const model = {
  avalibleProducts: [],
  filterModel: {},

  setAvalibleProducts(avalibleProducts) {
    this.avalibleProducts = avalibleProducts
  },

  async getAvalibleProducts() {
    const productList = await api.loadProducts()
    this.setAvalibleProducts(productList)
  },

  filterForCategories() {
    model.avalibleProducts.forEach(item => {
      for (key in item.specs) {
        if (!model.filterModel[key]) {
          model.filterModel[key] = {}
        }
        for (key2 in item.specs[key]) {
          if (!model.filterModel[key][key2]) {
            model.filterModel[key][key2] = []
          }
          for (key3 of item.specs[key][key2]) {
            if (!model.filterModel[key][key2].includes(item.specs[key][key2])) {
              model.filterModel[key][key2].push(item.specs[key][key2])
            }
          }
        }
      }
    })
    console.log(model.filterModel)
  },
}
