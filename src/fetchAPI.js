import axios from "axios";

const APIKEY = '25802236-9194df1bdaf419234840434ec';

axios.defaults.baseURL = 'https://pixabay.com/api/';




export class GetPixabayApi {
constructor(searchQuery) {
    this.searchQuery = '';
    this.page=1;
}

async fetchImg() {
    const params = new URLSearchParams({
        key:APIKEY,
        q:this.searchQuery,
        image_type:'photo',
        orientation:'horizontal',
        safesearch:true,
        page:this.page,
        per_page:40,
    })
    

  const {data} = await axios.get(`?${params}`);
  this.incrementPage();
   return data;
}
 get searchQueryRequest() {
    return this.searchQuery;
 }

 set searchQueryRequest(newSearchQuery) {
    this.searchQuery = newSearchQuery;
 }

incrementPage() {
    this.page+=1;
}

resetPage() {
    this.page=1;
}

}
