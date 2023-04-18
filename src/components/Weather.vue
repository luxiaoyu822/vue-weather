<template>
  <div class="weather-component" v-if="weatherData.city">
    <div class="city">{{ weatherData.city }}</div>
    <div class="weather">
      <div class="temperature">{{ weatherData.temperature }} ℃</div>
      <div class="description">{{ weatherData.weather }}</div>
    </div>
    <div class="wind-air">
      <div class="wind">
        <div class="winddirection">风向：{{ weatherData.winddirection }}</div>
        <div class="windpower">风力：{{ transformWindPower }}级</div>
      </div>
      <div class="air">
        <div class="humidity">空气湿度：{{ weatherData.humidity }}</div>
      </div>
    </div>
    <div class="reporttime">更新时间：{{ weatherData.reporttime }}</div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from "vue";
import weatherAPI from "@/util/weatherAPI";

const weatherData = reactive({
  city: "",
  temperature: 0,
  weather: "",
  winddirection: "",
  windpower: "",
  humidity: "",
  reporttime: "",
});
const transformWindPower = computed(() => {
  if (weatherData.windpower.includes("≤")) {
    return weatherData.windpower.replace("≤", "小于");
  } else {
    return weatherData.windpower;
  }
});

async function getWeatherData(cityCode) {
  const key = "API key";
  const url = `/weather/weatherInfo?key=${key}&city=${cityCode}`;
  try {
    const response = await weatherAPI.get(url);
    const data = response.data.lives;
    let info;
    data.forEach((item) => {
      info = item;
    });
    weatherData.city = info.city;
    weatherData.temperature = info.temperature;
    weatherData.weather = info.weather;
    weatherData.winddirection = info.winddirection;
    weatherData.windpower = info.windpower;
    weatherData.humidity = info.humidity;
    weatherData.reporttime = info.reporttime;
  } catch (error) {
    console.log(error.message);
  }
}

async function getLocationCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const key = "API key";
        const location = `${position.coords.longitude},${position.coords.latitude}`;
        const url = `/geocode/regeo?location=${location}&key=${key}`;
        try {
          const respond = await weatherAPI.get(url);
          const data = respond.data.regeocode.addressComponent;
          getWeatherData(data.adcode);
        } catch (error) {}
      },
      (error) => {
        console.error(error.message);
      }
    );
  } else {
    const adcode = "110100";
    getWeatherData(adcode);
  }
}

onMounted(() => {
  getLocationCoords();
});
</script>

<style scoped lang="scss">
.weather-component {
  background-color: skyblue;
  .weather {
    display: flex;
    justify-content: center;
    .temperature {
      font-size: 40px;
      padding: 10px;
    }
    .description {
      padding: 10px;
    }
  }
  .wind-air {
    display: flex;
    justify-content: center;
    text-align: left;
    font-size: small;
    .wind {
      padding: 10px;
    }
    .air {
      padding: 10px;
    }
  }
  .reporttime {
    font-size: smaller;
    color: rgb(115, 117, 117);
  }
}
</style>
