<template>
    <div id="app" style="width: 500px">
      <BarChart v-bind="barChartProps" :options="options" />
    </div>
</template>
  
  <script setup lang="ts">
  import { computed, ref } from "vue";
  import { Chart, registerables } from "chart.js";
  import { BarChart, useBarChart } from "vue-chart-3";
  Chart.register(...registerables);
  
  type ChartProps = {
    data: Array;
  };
  
  const props = defineProps<ChartProps>();
  
  const chartData = computed(() => ({
    labels: ["US", "UK", "FR", "JP", "AU", "CN"],
    datasets: [
      {
        data: props.data,
        backgroundColor: [
          "#77CEFF",
          "#0079AF",
          "#123E6B",
          "#97B0C4",
          "#A5C8ED",
          "#587aa3",
        ],
      },
    ],
  }));
  
  const { barChartProps, barChartRef } = useBarChart({
    chartData,
  });
  
  const options = ref({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Revenues (in USD) by countries",
      },
    },
  });
  </script>
  