import axios from "axios";

class AppService {
  constructor() {
    this.appService = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }
  
  // BAR methods API 

  createBar(bar) {
      const { barType, name, categoryType, street, neighbourhood, city } = bar;
      return this.appService
        .post("/bars&events/createBar", { barType, name, categoryType, street, neighbourhood, city })
        .then(({ data }) => data);
  }
  
  listBars() {
    return this.appService
      .get("/bars&events/bars")
      .then(response => response.data);
  }

  getSingleBar = (params) => {
    const { id } = params;
    return this.appService
    .get(`/bars&events/bars/${id}`)
    .then(response =>response.data)
  }

  updateBar = (params, bar) => {
    const { id } = params;
    const { barType, name, categoryType, street, neighbourhood, city } = bar;
    return this.appService
    .post(`/bars&events/${id}/updateBar`, { barType, name, categoryType, street, neighbourhood, city })
    .then(response =>response.data)
  }

  deleteBar = (params) => {
    const { id } = params;
    return this.appService
    .post(`/bars&events/${id}/deleteBar`)
    .then(response =>response.data)
  }

  // BEER methods API 

  createBeer(beer) {
    const { name, description, beerlogoImage } = beer;
    return this.appService
      .post("/bars&events/createBeer", { name, description, beerlogoImage })
      .then(({ data }) => data);
  }

  listBeers() {
    return this.appService
      .get("/bars&events/beers")
      .then(response => response.data);
  }

  // USER methods API 

  listUsers() {
    return this.appService
      .get("/bars&events/users")
      .then(response => response.data);
  }
}

const appService = new AppService();

export default appService;