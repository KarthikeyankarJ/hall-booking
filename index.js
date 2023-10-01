const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
 app.use(express.json())

 let hallinfo = [
  {
    id : "1",
    numberofSeat: 50,
    amenities: ["AC", "Reclain Seat", "Breakfast"],
    RoomName:"SuperDeluxe",
    price:3000,
    ifBooked:false,
    customerName:"",
    date:"",
    startTime:"",
    EndTime:"",
    RoomID:""
  },
  {
    id : "2",
    numberofSeat: 25,
    amenities: ["AC", "Sleeper", "Breakfast"],
    RoomName:"LuxuryPlus",
    price:4000,
    ifBooked:false,
    customerName:"",
    date:"",
    startTime:"",
    EndTime:"",
    RoomID:""
  }
 ]


 // Hall availability 
 app.get("/hall/available", (req, res)=>{
  let returnData = hallinfo.map((val)=> ({ID:val.id, NumberofSeat: val.numberofSeat, Amenities: val.amenities, RoomType:val.RoomName, Price:val.price}));
  res.json({data : returnData});
})

// Customer check in detail
app.post("/hall/add", (req, res)=>{
  const newbook = req.body;
  hallinfo.push(newbook);
  res.status(201).json({data:hallinfo})
  console.log(hallinfo)
})

// Here we can see all the detail of customer and hall availablity
app.get("/hall/all", (req, res)=>{
  let returnData = hallinfo
  res.json({data: returnData})

})

// Here We can find the full Detail of the Customer
app.get("/hall/booked",(req, res)=>{
  let booked = hallinfo.filter(val => val.ifBooked == true)
  res.json({Detail: booked})
})
app.get("/hall/booked/room",(req, res)=>{
  let booked = hallinfo.filter(val => val.ifBooked == true)
  let returnData = booked.map((val)=> ({RoomName :val.RoomName, bookedStatus : val.ifBooked, CustomerName: val.customerName, Date:val.date, StartTime:val.startTime, EndTime: val.EndTime}));
  res.json({Booked_Customer_Detail: returnData})
})
app.get("/hall/booked/customer",(req, res)=>{
  let booked = hallinfo.filter(val => val.ifBooked == true)
  let returnData = booked.map((val)=> ({ CustomerName: val.customerName,RoomName :val.RoomName, Date:val.date, StartTime:val.startTime, EndTime: val.EndTime}));
  res.json({Booked_Customer_Detail: returnData})
})
app.get("/hall/:name" ,(req, res)=>{
  const {name} = req.params;
    const selectedData = hallinfo.find((val)=>val.customerName === name)
     res.status(200).json({selectedData})
  })


app.delete("/hall/remove/:name", (req, res)=>{
  const {name} = req.params;
  console.log(name)
  const newhallist = hallinfo.filter((val)=>val.customerName!==name);
  hallinfo = newhallist
  res.status(200).send({message:`${name} is deleted sucessfully`})
   
})




app.listen(9002, () => console.log(`Server started in localhost:9002`));