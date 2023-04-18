import axios from "axios";

const weatherAPI = axios.create({
  baseURL: "https://restapi.amap.com/v3",
  timeout: 10000,
});

//暂无拦截器配置
export default weatherAPI;
