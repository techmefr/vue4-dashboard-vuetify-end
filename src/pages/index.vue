<template>
  <v-app>
    <!-- Top bar -->
    <v-app-bar class="px-3" color="grey-darken-4" flat density="compact">
      <v-spacer></v-spacer>
      <v-tabs v-model="selectedTab" centered color="grey-darken-1">
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </v-app-bar>
    <!-- Container -->
    <v-main>
      <v-container fluid>
        <v-row>
          <!-- Left col -->
          <v-col cols="12" sm="2">
            <!-- Field & Value filter -->
            <FilterBloc
              @searchValueChanged="updateSearchValue"
            />
          </v-col>
          <!-- Main col -->
          <v-col cols="12" sm="8">
            <v-sheet
              v-if="selectedTab == 0"
              min-height="70vh"
              rounded="lg"
              class="pa-4"
            >
              <!-- KPI overview -->
              <v-row>
                <v-col>
                  <KpiBloc
                    :isUp="false"
                    blocTitle="Total Android revenues"
                    :blocValue="getTotalOsRevenues('android')"
                  />
                </v-col>
                <v-col>
                  <KpiBloc
                    :isUp="true"
                    blocTitle="Total iOS revenues"
                    :blocValue="getTotalOsRevenues('ios')"
                  />
                </v-col>
                <v-col>
                  <KpiBloc
                    :isUp="true"
                    blocTitle="Total revenues"
                    :blocValue="getTotalOsRevenues('')"
                  />
                </v-col>
              </v-row>

              <v-divider class="mt-4"></v-divider>

              <h2 class="mt-4">Apps list:</h2>
              
              <v-data-table 
                v-if="groupedData"
                :items="groupedData" 
                :headers="headers"
                item-value="app"
                v-model:expanded="expanded"
                show-expand 
                :search="searchValue"
              >
                <template v-slot:header.app="{ column }">
                  {{ column.title.toUpperCase() }}
                </template>

                <template v-slot:expanded-row="{ columns, item }">
                  <tr>
                    <td :colspan="columns.length">
                      <div style="padding: 15px">
                        The country that generated the most revenue for
                        {{ item.app }} is {{ useGetBestCountry(item) }}
                        <br />
                        
                        <BarChart
                          class="d-flex mx-auto my-0"
                          :data="[
                            item.totalRevenuesUS,
                            item.totalRevenuesUK,
                            item.totalRevenuesFR,
                            item.totalRevenuesJP,
                            item.totalRevenuesAU,
                            item.totalRevenuesCN,
                          ]"
                        />

                        <br />
                        <v-row>
                          <v-col
                            >Total ads views: <b>{{ item.totalViews }}</b> <br />
                            Total conversions: <b>{{ item.totalConversions }}</b>
                            <br />
                            Conversions %:
                            <b
                              >{{
                                (
                                  (item.totalConversions * 100) /
                                  item.totalViews
                                ).toFixed(2)
                              }}
                              %</b
                            >
                            <br />
                            Total revenues:
                            <b>{{ useFormatRevenues(item.totalRevenues) }}</b>
                          </v-col>
                          <v-col
                            >Total banner revenues:
                            <b>{{ useFormatRevenues(item.banner) }}</b
                            ><br />
                            Total full-screen revenues:
                            <b>{{ useFormatRevenues(item.fullscreen) }}</b
                            ><br />
                            Total video revenues:
                            <b>{{ useFormatRevenues(item.video) }}</b
                            ><br />
                            Total rewarded revenues:
                            <b>{{ useFormatRevenues(item.rewarded) }}</b
                            ><br
                          /></v-col>
                        </v-row>
                      </div>
                    </td>
                  </tr>
                </template>
              </v-data-table>

            </v-sheet>
            <v-sheet v-else min-height="70vh" rounded="lg" class="pa-4">
              <AboutPage/>
            </v-sheet>
          </v-col>
          <!-- Right col -->
          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268" class="pa-3">
              <v-list-item-title class="text-h5 mb-1 mt-2"> Help </v-list-item-title>
              <p>Lorem ipsum dolor sit amet.</p>
              <p>06 06 06 06 06</p>
              <v-btn>Call</v-btn>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
// Imports
import { ref, watch, onMounted } from "vue";
import useGroupApps from "../functions/useGroupApps";
import useFormatRevenues from "../functions/useFormatRevenues";
import useGetBestCountry from "../functions/useGetBestCountry";
// Components
import BarChart from "../components/BarChart.vue";
import FilterBloc from "../components/FilterBloc.vue";
import AboutPage from "../components/AboutPage.vue";

// Variables
let selectedTab = ref(0);
const links = ref(["Dashboard", "About"]);
let apiResult = ref();
let groupedData = ref([]);
let expanded = ref([]);
let searchValue = ref("");

const headers = ref([
  { title: "App",   key: "app" },
  { title: "US",    key: "totalRevenuesUS" },
  { title: "UK",    key: "totalRevenuesUK" },
  { title: "FR",    key: "totalRevenuesFR" },
  { title: "JP",    key: "totalRevenuesJP" },
  { title: "CN",    key: "totalRevenuesCN" },
  { title: "AU",    key: "totalRevenuesAU" },
  { title: "Total", key: "totalRevenues" },
  { title: "",      key: "data-table-expand" },
]);

// Vue lifecycle
onMounted(async () => {
  fetchMonetizationApi();
});

// Vue func
watch(apiResult, (newValue) => {
  groupedData.value = useGroupApps(newValue.data);
});

// API
const fetchMonetizationApi = async () => {
  fetch('https://www.anthony-cardinale.fr/_placeholder/monetization-api.json')
  .then(response => response.json())
  .then(data => apiResult.value = data);
}

// Functions
const getTotalOsRevenues = (os = "") => {
  let total = 0;
  groupedData.value.forEach((app: any) => {
    if (os !== "") {
      total += app.platform == os ? app.totalRevenues : 0;
    } else {
      total += app.totalRevenues;
    }
  });

  return `${useFormatRevenues(total)}`;
};

const updateSearchValue = (val: any) => {
  searchValue.value = val;
};

</script>
