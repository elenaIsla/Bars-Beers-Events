import React, {Component} from "react";
import FilterForm from '../components/FilterForm';
import appService from "../lib/AppService";


class FilterBars extends Component {
    state = {
        barlist: [],
    }
    componentDidMount() {
       this.getlistBars();
    }
    getlistBars = () => {
        appService
        .listBars()
        .then(barlist => {
          this.setState({
            barlist,
            isLoaded: true,
          });
        })
        .catch((error) => {
          this.setState({  
              isLoaded: true,
              error
          });
        });
    }

    render() {
      return (
        <div>
          <FilterForm data = {this.state.barlist}/>
        </div>
      )
    }
};

export default FilterBars;

  

