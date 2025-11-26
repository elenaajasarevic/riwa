  <!-- <template>
<div class="q-pa-md">
    <q-table
      title="Knjige"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div> -->

<template>
<q-table
  flat bordered
   :rows="books"
   :columns="columns"
      row-key="name"
      :wrap-cells=true
 >
<template v-slot:body-cell-slika="props1">
<q-td :props="props1">
<img :src="props1.row.slika" width="100px">
</q-td>
</template>
</q-table>

</template>

<script setup>


import { ref, onMounted } from 'vue'
import axios from 'axios';
let books = ref([])
onMounted(() => {
  loadBooks()
})
async function loadBooks() {
   await axios.get('http://localhost:3000/api/knjige/')
  .then(result => {
    console.log(result.data)
    books.value = result.data
    console.log(books.value[0].naslov)
})

  .catch(error => {
    console.error(error)
})
}
</script>


//   const columns = [
//  {
//       name:'id',
//       label:'Id',
//       field:'id',
//       align:'left',
//       sortable: true,
//       style: {
//         fontSize:'14px'
//       },
//       headerStyle: {
//         fontSize: '18px'
//       }
//     },
//     {
//       name:'naslov',
//       label:'Naslov',
//       field:'naslov',
//       align:'left',
//       sortable: true,
//       style: {
//         fontSize:'14px'
//       },
//       headerStyle: {
//         fontSize: '18px'
//       }
//     },
//     {
//       name:'autor',
//       label:'Autor',
//       field:'autor',
//       align:'left',
//       sortable: true,
//       style: {
//         fontSize:'14px'
//       },
//       headerStyle: {
//         fontSize: '18px'
//       }
//     },
//     {
//       name:'opis',
//       label:'Opis',
//       field:'opis',
//       align:'left',
//       sortable: true,
//       style: {
//         fontSize:'14px'
//       },
//       headerStyle: {
//         fontSize: '18px'
//       }
//     },
//     {
//       name:'slika',
//       label:'Slika',
//       field:'slika',
//       align:'left',
//       sortable: true,
//       style: {
//         fontSize:'14px'
//       },
//       headerStyle: {
//         fontSize: '18px'
//       }
//     },
//     {
//       name:'status',
//       label:'Status',
//       field:'status',
//       align:'left',
//       sortable: true,
//       style: {
//         fontSize:'14px'
//       },
//       headerStyle: {
//         fontSize: '18px'
//       }
//     }
// ]

// const rows = [
//   {
//     id: 1,
//     naslov: 'Na Drini ćuprija',
//     autor: 'Ivo Andrić',
//     opis: 'Roman koji opisuje život ljudi u Višegradu kroz nekoliko vjekova, prikazujući most na Drini kao svjedoka povijesnih promjena i ljudskih sudbina.',
//     slika: 'slika',
//     status: 'slobodna',
//   },
//   {
//     id: 2,
//     naslov: 'Prokleta avlija',
//     autor: 'Ivo Andrić',
//     opis: 'Alegorijski roman o zatvoru u Carigradu koji simbolizuje ljudsku sudbinu, pravdu i nepravdu, ispričan kroz susrete pripovjedača sa zatvorenicima različitih vjera i naroda.',
//     slika: 'slika',
//     status: 'zauzeta',
//   },
//   {
//     id: 3,
//     naslov: 'Seobe',
//     autor: 'Miloš Crnjanski',
//     opis: 'Epohalni roman o sudbini srpskih vojnika i njihovih obitelji tokom Velikog bečkog rata, prožet temama identiteta, patnje i traganja za smislom.',
//     slika: 'slika',
//     status: 'slobodna',
//   }
 
// ]

// export default {
//   setup () {
//     return {
//       columns,
//       rows
//     }
//   }
// }
