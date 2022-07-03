import axios from "axios";

const APIKEY = '25802236-9194df1bdaf419234840434ec';

axios.defaults.baseURL = 'https://pixabay.com/api/';


const params = new URLSearchParams({
    key:APIKEY,
    q:"cat",
    image_type:'photo',
    orientation:'horizontal',
    safesearch:true,
})

export class GetPixabayApi {

constructor() {}

async fetchImg() {
  const {data} = await axios.get(`?${params}`);
   return data;
}
}
