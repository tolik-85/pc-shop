// const makeUniq = arr => {
//   return arr.filter((el, id) => arr.indexOf(el) === id)
// }

// function makeUniq(arr) {
//   let set = [...new set(arr)]
//   return set
// }

const makeUniq = arr => {
  const uniqSet = new Set(arr)
  return [...uniqSet]
}
// <!-- <div class="wrap-props">
//   <h3>Бренд</h3>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="brand"
//       id="brand_01"
//       value="ASUS"
//     />
//     <label for="brand_01">ASUS</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="brand"
//       id="brand_02"
//       value="Acer"
//     />
//     <label for="brand_02">Acer</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="brand"
//       id="brand_03"
//       value="Apple"
//     />
//     <label for="brand_03">Apple</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="brand"
//       id="brand_04"
//       value="Dell"
//     />
//     <label for="brand_04">Dell</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="brand"
//       id="brand_05"
//       value="HP"
//     />
//     <label for="brand_05">HP</label>
//   </div>
// </div>
// <div class="wrap-props">
//   <h3>Цена</h3>
//   <div class="wrap-range">
//     <label for="01">От:</label>
//     <input
//       type="range"
//       max="100"
//       value="10"
//       name="price_from"
//     />
//   </div>
//   <div class="wrap-range">
//     <label for="02">До:</label>
//     <input type="range" max="100" value="90" name="price_to" />
//   </div>
// </div>
// <div class="wrap-props">
//   <h3>Процессор</h3>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="cpu"
//       id="cpu_01"
//       value="Ryzen3"
//     />
//     <label for="cpu_01">AMD Ryzen 3</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="cpu"
//       id="cpu_02"
//       value="Ryzen5"
//     />
//     <label for="cpu_02">AMD Ryzen 5</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="cpu"
//       id="cpu_03"
//       value="Ryzen7"
//     />
//     <label for="cpu_03">AMD Ryzen 7</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="cpu"
//       id="cpu_04"
//       value="Corei5"
//     />
//     <label for="cpu_04">Intel Core i5</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="cpu"
//       id="cpu_05"
//       value="Corei7"
//     />
//     <label for="cpu_05">Intel Core i7</label>
//   </div>
// </div>
// <div class="wrap-props">
//   <h3>ОЗУ</h3>
//   <div class="wrap-checkbox">
//     <input type="checkbox" name="ram" id="ram_01" value="4Gb" />
//     <label for="ram_01">4 Gb</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input type="checkbox" name="ram" id="ram_02" value="8Gb" />
//     <label for="ram_02">8 Gb</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="ram"
//       id="ram_03"
//       value="16Gb"
//     />
//     <label for="ram_03">16 Gb</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="ram"
//       id="ram_04"
//       value="32Gb"
//     />
//     <label for="ram_04">32 Gb</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="ram"
//       id="ram_05"
//       value="64Gb"
//     />
//     <label for="ram_05">64 Gb</label>
//   </div>
// </div>
// <div class="wrap-props">
//   <h3>Видеокарта</h3>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="gpu"
//       id="gpu_01"
//       value="RadeonHD"
//     />
//     <label for="gpu_01">Radeon HD</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="gpu"
//       id="gpu_02"
//       value="RadeonR"
//     />
//     <label for="gpu_02">Radeon R</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="gpu"
//       id="gpu_03"
//       value="RadeonRX"
//     />
//     <label for="gpu_03">Radeon RX</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="gpu"
//       id="gpu_04"
//       value="GeForceGTX"
//     />
//     <label for="gpu_04">GeForce GTX</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="gpu"
//       id="gpu_05"
//       value="GeForceRTX"
//     />
//     <label for="gpu_05">GeForce RTX</label>
//   </div>
// </div>
// <div class="wrap-props">
//   <h3>Накопитель</h3>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="ssd"
//       id="ssd_01"
//       value="250Gb"
//     />
//     <label for="ssd_01">250 Gb</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input
//       type="checkbox"
//       name="ssd"
//       id="ssd_02"
//       value="500Gb"
//     />
//     <label for="ssd_02">500 Gb</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input type="checkbox" name="ssd" id="ssd_03" value="1Tb" />
//     <label for="ssd_03">1 Tb</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input type="checkbox" name="ssd" id="ssd_04" value="2Tb" />
//     <label for="ssd_04">2 Tb</label>
//   </div>
//   <div class="wrap-checkbox">
//     <input type="checkbox" name="ssd" id="ssd_05" value="4Tb" />
//     <label for="ssd_05">4 Tb</label>
//   </div>
// </div> -->
// <!-- <div class="wrap-props">
//   <div>
//     <input type="submit" value="Фильтровать" class="btn" />
//   </div>
// </div> -->
