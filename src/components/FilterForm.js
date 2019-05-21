
import React, {Component} from "react";
import FilterOptions from '../components/FilterOptions';
import FilterItems from '../components/FilterItems';


class FilterForm extends Component {
    
    state = {
      data: this.props.data,
      draftBeer: '',
      bottleBeer: '',
      barType: '',
      price: '',
      multiple: false
    }
  
  checked = (e) => {
    this.setState({multiple: e.target.value});
  }

  filterItems = (val, type) => {
     switch (type) {
      case 'draftBeer':
        this.setState({draftBeer: val});
        break;
      case 'bottleBeer':
        this.setState({bottleBeer: val});
        break;
      case 'barType': 
        this.setState({barType: val});
        break;
      case 'price':
        this.setState({price: val});
        break;
      default:
        break;
    }
  }
  render () {
    var filteredItems = this.props.data;
    var state = this.state;
    var filterProperties = ["draftBeer", "bottleBeer", "barType", "price"];
    filterProperties.forEach((filterBy) => {
      var filterValue = state[filterBy];
      if (filterValue) {
        filteredItems = filteredItems.filter((item) =>{
          return item[filterBy] === filterValue;
        });
      }
    });
    var draftBeerArray = filteredItems.map((item) => { 
        return item.draftBeer.map((beer) => {
            return beer.name;
        }) });
    var bottleBeerArray = filteredItems.map((item) => { 
            return item.bottleBeer.map((beer) => {
                return beer.name;
            }) });
    console.log(draftBeerArray)
    
    var barTypeArray = this.props.data.map((item) => { return item.barType });
    var priceArray = this.props.data.map((item) => { return item.price });

    draftBeerArray.unshift("");
    bottleBeerArray.unshift("");
    barTypeArray.unshift("");
    priceArray.unshift("");

    return (
      <div className="padding">


        <FilterOptions 
            data={this.state.data} 
            draftBeerOptions={draftBeerArray} 
            bottleBeerOptions={bottleBeerArray}
            barTypeOptions={barTypeArray}
            priceOptions={priceArray}
            changeOption={this.filterItems} />
        <div className="filter-form">
     
        <h3>YOUR SEARCH RESULT:</h3>
          <FilterItems data={filteredItems} />
        </div>
      </div>
    )
  }
};



//   React.render(
//     <FilterForm data={filterData} />,
//     document.getElementById('filter')
//   );

/*if (val) {
      filteredItems = this.props.data.filter(function(item) {
        return item[type] === val;
      });
    } else {
      filteredItems = this.props.data;
    }*/
    //this.setState({data: filteredItems});

export default FilterForm;