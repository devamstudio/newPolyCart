<template>
  <div id="app">
    <!-- <slot name="app-table"> -->
        <div class="tbf_object" data-title="Дипломы" data-description="Грамоты А4, 4+0, картон 300гр.">
          <table class="third-level table">
            <thead>
              <tr>
                <td>Тираж</td>
                <td>10</td>
                <td>30</td>
                <td>50</td>
                <td>100</td>
                <td>150</td>
                <td>200</td>
                <td>300</td>
                <td>500</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Формат А5</td>
                <td>2057</td>
                <td>4611</td>
                <td>6865</td>
                <td>11150</td>
                <td>14820</td>
                <td>17700</td>
                <td>23460</td>
                <td>33790</td>
              </tr>
              <tr>
                <td>Формат А4</td>
                <td>3275</td>
                <td>7920</td>
                <td>10620</td>
                <td>16640</td>
                <td>21870</td>
                <td>27240</td>
                <td>37368</td>
                <td>58060</td>
              </tr>
            </tbody>
          </table>
        </div>
    <!-- </slot> -->
    <div class="tbf_filter calculator">
      <h4 class="h3 mb-3 text-center">Расчет стоимости</h4>
      <div class="tbf_filter_form col-12 pb-3">
        <div class="row form-group py-1">
          <div class="col-5 text-right col-form-label" ref="title"></div>
          <select class="tbf_property tbf_property_edition col-7 form-control" v-model="selected" @change="price">
            <option v-for="(item, idx) in edition" :key="item" :value="idx">{{ item }}</option>
          </select>
        </div>
        <div class="row form-group py-1" v-if="show">
          <div class="col-5 text-right col-form-label">Формат</div>
          <select class="tbf_property tbf_property_attrib col-7 form-control" v-model="paperKind" @change="price">
            <option value="Формат_А5">Формат А5</option>
            <option value="Формат_А4">Формат А4</option>
          </select>
        </div>
      </div>
      <p class="text-center">
        Цена: <b class="text-primary"><span id="tbf_result" ref="price"></span> руб.</b>
      </p>
      <p class="text-center">
        <small id="tbf_result_description">Грамоты А4, 4+0, картон 300гр.</small>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      edition: [],
      a4Price: [],
      a5Price: [],
      show: false,
      paperKind: this.$store.state.secondItem,
      selected: this.$store.state.firstItem
    }
  },
  methods: {
    getData: function() {
      const editionHtml = Array.from(document.querySelector(".tbf_object").querySelector("table").querySelector("thead").querySelector("tr").querySelectorAll("td"))

      editionHtml.forEach((el, idx) => {
        if (idx === 0) {
          this.$refs.title.innerHTML = el.innerHTML
          return false
        }
        this.edition.push(el.innerHTML)
      })

      if (document.querySelector(".tbf_object").querySelector("table").querySelector("tbody").querySelectorAll("tr").length > 1) {
        this.show = true

        const a5PriceHtml = Array.from(document.querySelector(".tbf_object").querySelector("table").querySelector("tbody").querySelector("tr").querySelectorAll("td"))
        const a4PriceHtml = Array.from(document.querySelector(".tbf_object").querySelector("table").querySelector("tbody").querySelectorAll("tr")[1].querySelectorAll("td"))

        a5PriceHtml.forEach((el, idx) => {
          if (idx === 0) {
            return false
          }
          this.a5Price.push(el.innerHTML)
        })

        a4PriceHtml.forEach((el, idx) => {
          if (idx === 0) {
            return false
          }
          this.a4Price.push(el.innerHTML)
        })
      } else {
          const a4PriceHtml = Array.from(document.querySelector(".tbf_object").querySelector("table").querySelector("tbody").querySelector("tr").querySelectorAll("td"))

        a4PriceHtml.forEach((el, idx) => {
          if (idx === 0) {
            return false
          }
          this.a4Price.push(el.innerHTML)
        })
      }
    },
    price: function() {
          if (this.paperKind === 'Формат_А4') {
            this.a4Price.forEach((el, idx) => {
              if (idx === this.selected) {
                this.$refs.price.innerHTML = el
                this.$store.dispatch('setItem', idx)
                this.$store.dispatch('setItem2', this.paperKind)
              }
            })
        } else {
            this.a5Price.forEach((el, idx) => {
              if (idx === this.selected) {
                this.$refs.price.innerHTML = el
                this.$store.dispatch('setItem', idx)
                this.$store.dispatch('setItem2', this.paperKind)
              }
            })
        }
    }
  },
  mounted: function() {
    this.getData()
    this.price()
  }
};
</script>