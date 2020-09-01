import React,{Component} from 'react';
import axios from 'axios';
import '../App.css';

const buttons = [
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
const buttons1 = [
  { name: "true"},
  { name: "false" }
];
class FilterList extends Component{
	state = {
    launches: [],
    filterlaunches: []
  }
	componentDidMount(){
		axios.get('https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true')
		  .then(res => {
		  	const launches = res.data;
        	this.setState({ launches });
		    //console.log(res.data);
		  })
		  .catch(error => {
		    console.log(error);
		  });
	}
	handleClick = name => {
    let filterlaunches = [];
    if (name === "true") {
      	filterlaunches = this.state.launches.filter(
        launches => launches.launch_success === true);
    }
    else if (name === "false") {
      	filterlaunches = this.state.launches.filter(
        launches => launches.launch_success === false);
    }
    else{
      filterlaunches = this.state.launches.filter(
        launches => launches.launch_year === name
      );
    }
    this.setState({ filterlaunches });
  };

	render(){
		return(
			<div>
				<h2 className="mb5">SpaceX Launch Programs</h2>
		    	<section>
		        <div>
		          <div className="d-flex">
		            <div className="filterPNL">
		              <div className="sidebar-block">
		                <h3 className="sidebar-heading">Filters</h3>
		                <div className="fliterHead"><span>Launch Year</span></div>
		                <div className="sideBar-buttons d-flex flex-wrap justify-content-between">
		                  {buttons.map(({ name }) => (
	                        <button
	                          key={name}
	                          onClick={this.handleClick.bind(this, name)}
	                        >
	                          {name}
	                        </button>
	                      ))}
		                </div>

		                <div className="fliterHead"><span>Successfull Launch</span></div>
		                <div className="sideBar-buttons d-flex flex-wrap justify-content-between">
		                  {buttons1.map(({ name }) => (
	                        <button
	                          key={name}
	                          onClick={this.handleClick.bind(this, name)}
	                        >
	                          {name}
	                        </button>
	                      ))}
		                </div>
		                
		              </div>
		            </div>
		            <div className="productRPNL">
		              <div className="row d-flex flex-wrap">
		              	{this.state.filterlaunches.map(launches => 
		              		<div className="launchPNL">
		              		<img src={launches.links.mission_patch} className="launch_img" alt="img"/>
		              		<div className="mission_name">{launches.mission_name} #{launches.flight_number}</div>
		              		<div className="mb5">Mission_ids:
		              			<ul>
		              				<li>{launches.mission_id}</li>
		              			</ul>
		              		</div>
		              		<div className="mb5">Launch Year: {launches.launch_year}</div>
		              		<div className="mb5">Successfull Launch: {launches.launch_success}</div>
		              		<div>Successfull Landing: {launches.launch_success}</div>
		              		</div>
		              	)}
		              	                     
		              </div>  
		            </div>  
		          </div>
		        </div>
		    </section>
		</div>
		)
	}
}
export default FilterList;