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
      const { barType, name, categoryType, street, neighbourhood, city, draftBeer, bottleBeer, price } = bar;
      return this.appService
        .post("/bars&events/createBar", { barType, name, categoryType, street, neighbourhood, city, draftBeer, bottleBeer, price })
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

  getupdateBar = (params) => {
    const { id } = params;
    return this.appService
      .get(`/bars&events/${id}/updateBar`)
      .then(response =>response.data)
  }

  putupdateBar = (params, barType, name, categoryType, street, neighbourhood, city, draftBeer, bottleBeer, price) =>{  
    const {id} = params;
      return this.appService
        .put(`/bars&events/${id}`, { barType, name, categoryType, street, neighbourhood, city, draftBeer, bottleBeer, price })
        .then(({ data }) => data);
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

  deleteBeer = (id) => {
    return this.appService
      .post(`/bars&events/${id}/deleteBeer`)
      .then(response =>response.data)
  }

  // USER methods API 

  listUsers() {
    return this.appService
      .get("/bars&events/users")
      .then(response => response.data);
  }

  getSingleUser = (params) => {
    const { id } = params;
    console.log(id);
    return this.appService
      .get(`/bars&events/users/${id}`)
      .then(response =>response.data)
  }

  deleteUser = (id) => {
    return this.appService
      .post(`/bars&events/${id}/deleteUser`)
      .then(response =>response.data)
  }



  // Review methods API

  createReview(review) {
    const { id, title, comment, ratingBeer, ratingToilet, ratingMusic } = review;
    return this.appService
      .post(`/bars&events/newReview/${id}`, { title, comment, ratingBeer, ratingToilet, ratingMusic })
      .then(response =>response.data)
  }

  listReviews() {
    return this.appService
      .get("/bars&events/reviews")
      .then(response => response.data);
  }

  deleteReview = (id) => {
    return this.appService
      .post(`/bars&events/${id}/deleteReview`)
      .then(response =>response.data)
  }

}

const appService = new AppService();

export default appService;