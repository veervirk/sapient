import React,{Component} from 'react';
import axios from 'axios';
import '../App.css';

const buttons = [
  { name: "All", value: "All" },
  { name: "2006", value: "2006" },
  { name: "2007", value: "2007" },
  { name: "2008", value: "2008" },
  { name: "2009", value: "2009" },
  { name: "2010", value: "2010" },
  { name: "2011", value: "2011" },
  { name: "2012", value: "2012" },
  { name: "2013", value: "2013" },
  { name: "2014", value: "2014" },
  { name: "2015", value: "2015" },
  { name: "2016", value: "2016" },
  { name: "2017", value: "2017" },
  { name: "2018", value: "2018" },
  { name: "2019", value: "2019" },
  { name: "2020", value: "2020" }
];
class FilterList extends Component{
	state = {
    launches: [],
    filterlaunches: []
  }
	componentDidMount(){
		axios.get('https://api.spacexdata.com/v3/launches?100')
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
    if (name === "All") {
      filterlaunches = this.state.launches;
    } else {
      filterlaunches = this.state.launches.filter(
        launches => launches.launch_year === name
      );
    }

    this.setState({ filterlaunches });
  };
	render(){
		return(
			<div className="main-container">
				<h2 className="mb5">SpaceX Launch Programs</h2>
		    	<section>
		        <div>
		          <div className="d-flex flex-wrap">
		            <div className="filterPNL">
		              <div className="sidebar-block">
		                <h3 className="sidebar-heading">Filters</h3>
		                <div className="fliterHead"><span>Launch Year</span></div>
		                <div className="sideBar-buttons d-flex flex-wrap justify-content-between">
		                  {buttons.map(({ name, value }) => (
	                        <button
	                          key={name}
	                          value={value}
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
		              		<div>{launches.mission_name} #{launches.flight_number}</div>
		              		<div>Mission_ids:
		              			<ul>
		              				<li>{launches.mission_id}</li>
		              			</ul>
		              		</div>
		              		<div>Launch Year: {launches.launch_year}</div>
		              		<div>Successfull Launch: {launches.launch_success}</div>
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