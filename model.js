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

  filters: {
    filterForCategories() {
      let i = 0
      model.avalibleProducts.forEach(item => {
        i++

        for (key in item.specs) {
          // console.log(key)
          // console.log(item.specs[key])

          if (!model.filterModel[key]) {
            model.filterModel[key] = {}
          }
          model.filterModel[key][`q${i}`] = 'o'

          // for (key2 in item.specs[key]) {
          //   // model.filterModel[key][key2] = {}
          //   console.log(key2)
          //   console.log(item.specs[key][key2])
          // }
        }
      })
      console.log(model.filterModel)
    },

    filterForVideoCardBrand() {
      let videocardCat = []
      const videoCard = 'Видеокарта'
      const brand = 'Бренд'
      model.avalibleProducts.forEach(item => {
        for (const key in item.specs?.[videoCard]?.brand) {
          videocardCat.push(item.specs?.[videoCard]?.brand)
        }
      })
      videocardCat = makeUniq(videocardCat)
      model.filterModel[videoCard][brand] = videocardCat
    },

    filterForVideoCardCapacity() {
      let videocardCapacity = []
      const videoCard = 'Видеокарта'
      const capacity = 'Обьем памяти'
      model.avalibleProducts.forEach(item => {
        for (const key in item.specs?.[videoCard]?.capacity) {
          videocardCapacity.push(item.specs?.[videoCard]?.capacity)
        }
      })
      videocardCapacity = makeUniq(videocardCapacity)
      model.filterModel[videoCard][capacity] = videocardCapacity
    },

    filterForCoolerBrands() {
      let coolerBrands = []
      const cooler = 'Кулер для процесора'
      const brand = 'Бренд'
      model.avalibleProducts.forEach(item => {
        if (item.specs[cooler]?.brand) {
          coolerBrands.push(item.specs[cooler]?.brand)
        }
      })
      coolerBrands = makeUniq(coolerBrands)
      model.filterModel[cooler][brand] = coolerBrands
    },

    filterForCoolerSize() {
      let coolerSize = []
      const cooler = 'Кулер для процесора'
      const size = 'Размер'
      model.avalibleProducts.forEach(item => {
        if (item.specs[cooler]?.size) {
          coolerSize.push(item.specs[cooler]?.size)
        }
      })
      coolerSize = makeUniq(coolerSize)
      model.filterModel[cooler][size] = coolerSize
    },

    filterForSsdBrands() {
      let ssdBrands = []
      const ssd = 'Накопитель SSD'
      const brand = 'Бренд'
      model.avalibleProducts.forEach(item => {
        if (item.specs[ssd]?.brand) {
          ssdBrands.push(item.specs[ssd].brand)
        }
      })
      ssdBrands = makeUniq(ssdBrands)
      model.filterModel[ssd][brand] = ssdBrands
    },

    filterForSsdCapacity() {
      let ssdCapacity = []
      const ssd = 'Накопитель SSD'
      const capacity = 'Обьем'
      model.avalibleProducts.forEach(item => {
        if (item.specs[ssd].capacity) {
          ssdCapacity.push(item.specs[ssd].capacity)
        }
      })
      ssdCapacity = makeUniq(ssdCapacity)
      model.filterModel[ssd][capacity] = ssdCapacity
    },

    filterForProcessorBrand() {
      let processorsBrands = []
      const processor = 'Процессор'
      const brand = 'Бренд'
      model.avalibleProducts.forEach(item => {
        if (item.specs[processor]?.brand) {
          processorsBrands.push(item.specs[processor].brand)
        }
      })
      processorsBrands = makeUniq(processorsBrands)
      model.filterModel[processor][brand] = processorsBrands
    },

    filterForProcessorFrequency() {
      let processorsFrequency = []
      const processor = 'Процессор'
      const frequency = 'Частота'
      model.avalibleProducts.forEach(item => {
        if (item.specs[processor]?.frequency) {
          processorsFrequency.push(item.specs[processor].frequency)
        }
      })
      processorsFrequency = makeUniq(processorsFrequency)
      model.filterModel[processor][frequency] = processorsFrequency
    },

    filterForMotherboardBrands() {
      let motherboardBrands = []
      const motherBoard = 'Материнская плата'
      const brand = 'Бренд'
      model.avalibleProducts.forEach(item => {
        if (item.specs[motherBoard]?.brand) {
          motherboardBrands.push(item.specs[motherBoard].brand)
        }
      })
      motherboardBrands = makeUniq(motherboardBrands)
      model.filterModel[motherBoard][brand] = motherboardBrands
    },

    filterForMotherboarPurpose() {
      let purposes = []
      const motherBoard = 'Материнская плата'
      const purpose = 'Тип памяти'
      model.avalibleProducts.forEach(item => {
        if (item.specs[motherBoard]?.purpose) {
          purposes.push(item.specs[motherBoard].purpose)
        }
      })
      purposes = makeUniq(purposes)
      model.filterModel[motherBoard][purpose] = purposes
    },

    filterForRamBrand() {
      let ramBrands = []
      const ram = 'Оперативная память'
      const brand = 'Бренд'
      model.avalibleProducts.forEach(item => {
        if (item.specs[ram]?.brand) {
          ramBrands.push(item.specs[ram].brand)
        }
      })
      ramBrands = makeUniq(ramBrands)
      model.filterModel[ram][brand] = ramBrands
    },

    filterForRamCapacity() {
      let ramCapacity = []
      const ram = 'Оперативная память'
      const capacity = 'Обьем'
      model.avalibleProducts.forEach(item => {
        if (item.specs[ram]?.capacity) {
          ramCapacity.push(item.specs[ram].capacity)
        }
      })
      ramCapacity = makeUniq(ramCapacity)
      model.filterModel[ram][capacity] = ramCapacity
    },

    filterForRamType() {
      let ramTypes = []
      const ram = 'Оперативная память'
      const ramType = 'Тип памяти'
      model.avalibleProducts.forEach(item => {
        if (item.specs[ram]?.type) {
          ramTypes.push(item.specs[ram].type)
        }
      })
      console.log()
      ramTypes = makeUniq(ramTypes)
      model.filterModel[ram][ramType] = ramTypes
    },

    filterForRamFrequency() {
      let ramFrequencys = []
      const ram = 'Оперативная память'
      const ramFrequency = 'Частота'
      model.avalibleProducts.forEach(item => {
        if (item.specs[ram]?.frequency) {
          ramFrequencys.push(item.specs[ram].frequency)
        }
      })
      ramFrequencys = makeUniq(ramFrequencys)
      model.filterModel[ram][ramFrequency] = ramFrequencys
    },

    filterForPowerUnitBrands() {
      let powerUnitBrands = []
      const powerUnit = 'Блок питания'
      const brand = 'Бренд'
      model.avalibleProducts.forEach(item => {
        if (item.specs[powerUnit]?.brand) {
          powerUnitBrands.push(item.specs[powerUnit].brand)
        }
      })
      powerUnitBrands = makeUniq(powerUnitBrands)
      model.filterModel[powerUnit][brand] = powerUnitBrands
    },

    filterForPowerUnitPower() {
      let powerUnitsPowers = []
      const powerUnit = 'Блок питания'
      const power = 'Мощность'
      model.avalibleProducts.forEach(item => {
        if (item.specs[powerUnit]?.power) {
          powerUnitsPowers.push(item.specs[powerUnit].power)
        }
      })
      powerUnitsPowers = makeUniq(powerUnitsPowers)
      model.filterModel[powerUnit][power] = powerUnitsPowers
    },

    filterForCaseBrands() {
      let carcasses = []
      const carcass = 'Корпус'
      const brand = 'Бренд'
      model.avalibleProducts.forEach(item => {
        if (item.specs[carcass]?.brand) {
          carcasses.push(item.specs[carcass].brand)
        }
      })
      carcasses = makeUniq(carcasses)
      model.filterModel[carcass][brand] = carcasses
    },
  },
}
