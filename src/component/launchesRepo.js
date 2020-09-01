import axios from 'axios'

export const getLaunchesListRepo = (data) => {
    return axios({
        method : 'GET',
        url : 'https://api.spacexdata.com/v3/launches',
        params : data
    })
}

export default getLaunchesListRepo;