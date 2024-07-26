import axios from 'axios'


const getNearByPlace=(category,lat,lng)=>axios.get('/api/google-nearby-place?category='+
    category+"&lat="+lat+"&lng="+lng);

export default{
    getNearByPlace
}
