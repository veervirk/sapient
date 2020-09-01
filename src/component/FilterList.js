import React,{Component} from 'react';
import axios from 'axios'
import '../App.css';
import {getLaunchesListRepo} from './launchesRepo'

const buttonsList = [
  { name: "2006" },
  { name: "2007" },
  { name: "2008" },
  { name: "2009" },
  { name: "2010" },
  { name: "2011" },
  { name: "2012" },
  { name: "2013" },
  { name: "2014" },
  { name: "2015" },
  { name: "2016" },
  { name: "2017" },
  { name: "2018" },
  { name: "2019" },
  { name: "2020" }
];
const IsLaunchButtons = [
  { name: "True", value: true},
  { name: "False", value: false }
];
class FilterList extends Component{
state = {
    launches: [],
    launchsData: [],
    loader: false
  }

getLaunchesList(paramValues){
let message = null
this.setState({
loader: true,
launchsData: [],
message
}, ()=> {
   getLaunchesListRepo(paramValues)
   .then( response => {
       if( response && response.data && response.data.length> 0) {
        this.setState({ launchsData: response.data, loader: false});
       }else if( response && response.data && response.data.length < 1) {
        message = 'Not Data Found'
        this.setState({ message, loader: false});
       }
   })
   .catch(err => {
    console.log(err);
    this.setState({loader: false});
   })
} )

}

componentDidMount(){
let params = {}
params.limit = 100
this.getLaunchesList(params)
this.setState({
params
})

 
}
handleClick = (name, clickedFrom) => {
let params = this.state.params || {}
if (clickedFrom == 'launchStatus') {
params.launch_success = name
}else if(clickedFrom == 'year') {
params.launch_year = name
}else if (clickedFrom == 'landingStatus') {
params.land_success = name
}

this.getLaunchesList(params)
this.setState({
params
})
 
  };
  missionIdList(missionIdList){
  let list = []
  missionIdList.map((obj,index)=> {
  list.push(<li key={Math.random()}>{missionIdList[index]}</li>)
  } )
  return list
  }

render(){

return(
<div>
<h2 className="mb5">SpaceX Launch Programs</h2>
       <div>
         <div className="d-flex d-mb-column">
           <div className="filterPNL">
             <div className="sidebar-block">
               <h3 className="sidebar-heading">Filters</h3>
               <div className="fliterHead"><span>Launch Year</span></div>
               <div className="sideBar-buttons d-flex flex-wrap justify-content-between">
                 {buttonsList.map(({ name }) => (
                       <button
                         key={name}
                         onClick={this.handleClick.bind(this, name, 'year')}
                       >
                         {name}
                       </button>
                     ))}
               </div>

               <div className="fliterHead"><span>Successfull Launch</span></div>
               <div className="sideBar-buttons d-flex flex-wrap justify-content-between">
                 {IsLaunchButtons.map((obj) => (
                       <button
                         key={obj.name}
                         onClick={this.handleClick.bind(this, obj.value, 'launchStatus')}
                       >
                         {obj.name}
                       </button>
                     ))}
               </div>



               <div className="fliterHead"><span>Successfull Landing</span></div>
               <div className="sideBar-buttons d-flex flex-wrap justify-content-between">
                 {IsLaunchButtons.map((obj) => (
                       <button
                         key={obj.name}
                         onClick={this.handleClick.bind(this, obj.value, 'landingStatus')}
                       >
                         {obj.name}
                       </button>
                     ))}
               </div>

               
             </div>
           </div>
           <div className="productRPNL">
             <div className="row d-flex flex-wrap">
              {this.state.launchsData.map(launches =>
              <div className="launchPNL" key={launches.flight_number}>
              <img src={launches.links.mission_patch} className="launch_img" alt="img"/>
              <div className="mission_name">{launches.mission_name} #{launches.flight_number}</div>
              <div className="mb5">Mission_ids:
              <ul>
              {this.missionIdList(launches.mission_id)}
             
              </ul>
              </div>
              <div className="mb5">Launch Year: {launches.launch_year}</div>
              <div className="mb5">Successfull Launch: {String(launches.launch_success)}</div>
              <div>Successfull Landing: {String(launches.rocket.first_stage.cores[0].land_success)}</div>
              </div>
              )}
             
              {this.state.message && <p className="loader">{this.state.message}</p> }    
              {this.state.loader && <p className="loader">Loading...</p> }    
             </div>  
           </div>  
         </div>
       </div>
</div>
)
}
}
export default FilterList;