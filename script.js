

const myEvent= new EventSource("http://localhost:5253/home")

var kafkaLatitude=54.149364069475126
var kafkaLongitude=-4.476154782560201
var map = L.map('map').setView([54.149326,-4.476032], 13);

// add the OpenStreetMap tiles
L.tileLayer('http://192.168.1.11/tile/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

// show the scale bar on the lower left corner
L.control.scale({imperial: true, metric: true}).addTo(map);
const markers = [
    L.marker([kafkaLatitude,kafkaLongitude]).bindPopup("marker1"),
    L.marker([kafkaLatitude+1,kafkaLongitude+1]).bindPopup("marker2"),
    L.marker([kafkaLatitude+2,kafkaLongitude+2]).bindPopup("marker3"),
]

for (var i =0; i <3; i++){
    markers[i].addTo(map)
}
myEvent.addEventListener("message",async (e)=>{
    data =JSON.parse(e.data)
    try{
        
        console.log("happening",data)
        const{bus_line_no,lat,long}=data
        // marker[bus_line_no].setLatLng([lat,long])
         if(bus_line_no == 1){
            console.log("processing bus line 1 ",)
            kafkaLatitude = lat
            kafkaLongitude = long
            // updateLatLong(0,kafkaLatitude,kafkaLongitude)
            await markers[0].setLatLng([kafkaLatitude,kafkaLongitude])
            //  L.marker([kafkaLatitude,kafkaLongitude]).bindPopup("marker1").addTo(map)
        }
        if(bus_line_no==2){
            kafkaLatitude = lat
            kafkaLongitude = long
            // updateLatLong(0,kafkaLatitude,kafkaLongitude)
            await markers[1].setLatLng([kafkaLatitude,kafkaLongitude])
            // L.marker([kafkaLatitude,kafkaLongitude]).bindPopup("marker2").addTo(map)

        }
        if(bus_line_no==3){
            kafkaLatitude = lat
            kafkaLongitude = long
            // updateLatLong(0,kafkaLatitude,kafkaLongitude)
           await  markers[2].setLatLng([kafkaLatitude,kafkaLongitude])
            // L.marker([kafkaLatitude,kafkaLongitude]).bindPopup("marker3").addTo(map)
            
        }
    }
    catch(error){
        console.log("couldnt",data)

    }
})  








