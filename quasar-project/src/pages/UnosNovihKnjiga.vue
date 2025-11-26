<template>
  <q-form class="q-gutter-md">
  <q-input color="grey-3" v-model="naslov" label="Naslov knjige" />
  <q-input color="grey-3" v-model="autor" label="Autor" />
  <q-input color="grey-3" v-model="opis" label="Opis" />
  <q-input color="grey-3" v-model="slika" label="URL slike" />
  <q-input color="grey-3" v-model="stanje" label="Broj knjiga" />
<div>
  <q-btn label="Submit" type="submit" color="primary" @click="insertBook()" />
  <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
</div>
  </q-form>

</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
const naslov = ref('')
const autor = ref('')
const opis = ref('')
const slika = ref('')
const stanje = ref('')

async function insertBook() {
  let formData = {
    "naslov": naslov.value,
    "autor": autor.value,
    "opis": opis.value,
    "slika": slika.value,
    "stanje": stanje.value 
  } 
  console.log("test" +formData.autor)
  await axios.post('http://localhost:3000/api/unos_knjige', formData)
    .then(result => {
    console.log(result)
  })
    .catch(error => {
       console.log(error)
     })
}

</script>


<!-- <template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 600px; margin: 0 auto;">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h6">Unos nove knjige</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="novaKnjiga.naslov" label="Naslov" filled />
          <q-input v-model="novaKnjiga.autor" label="Autor" filled class="q-mt-sm" />
          <q-input v-model="novaKnjiga.opis" label="Opis" type="textarea" filled class="q-mt-sm" />

          <q-file
            v-model="novaKnjiga.slika"
            label="Odaberi sliku"
            accept="image/*"
            filled
            class="q-mt-sm"
          />

          <q-select
            v-model="novaKnjiga.status"
            :options="statusOpcije"
            label="Status"
            filled
            class="q-mt-sm"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Spremi" color="primary" @click="spremiKnjigu" />
          <q-btn label="Odustani" color="negative" flat @click="odustani" />
        </q-card-actions>
      </q-card>

      <!-- Prikaz spremljenih knjiga 
      <div class="q-mt-lg">
        <div class="text-h6 q-mb-md">Popis knjiga</div>
        <div class="row q-col-gutter-md">
          <div
            v-for="knjiga in knjige"
            :key="knjiga.id"
            class="col-12 col-sm-6 col-md-4"
          >
            <q-card>
              <q-card-section>
                <div><strong>ID:</strong> {{ knjiga.id }}</div>
                <div><strong>Naslov:</strong> {{ knjiga.naslov }}</div>
                <div><strong>Autor:</strong> {{ knjiga.autor }}</div>
                <div><strong>Opis:</strong> {{ knjiga.opis }}</div>
                <div><strong>Status:</strong> {{ knjiga.status }}</div>
                <div v-if="knjiga.slika">
                  <strong>Slika:</strong> {{ knjiga.slika.name }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const knjige = ref([])
const idBrojac = ref(1)
const statusOpcije = ['Slobodna', 'Zauzeta']

const novaKnjiga = ref({
  id: null,
  naslov: '',
  autor: '',
  opis: '',
  slika: null,
  status: ''
})

function spremiKnjigu() {
  const nova = { ...novaKnjiga.value, id: idBrojac.value }
  knjige.value.push(nova)
  idBrojac.value++
  odustani()
}

function odustani() {
  novaKnjiga.value = {
    id: null,
    naslov: '',
    autor: '',
    opis: '',
    slika: null,
    status: ''
  }
}
</script> -->
