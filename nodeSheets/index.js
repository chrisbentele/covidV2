
const Data = require('./data.json')

axios = require('axios')

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

const insertUpdate = update => api.post(`/updates`, update)
const getUpdates = () => api.get(`/updates`)


// Data.data.forEach(async update => {
//     await insertUpdate(update).then(res =>{
//         console.log(res)
//     }).catch(err => {
//         console.log(err)
//     })
// })
// async function getAllUpdates(){
//     await getUpdates().then(res => {
//         let updates = res.data.data
//         for(var i = 0 ; i < updates.length - 1; i++){
//             for(var j = i+1 ; j < updates.length ; j++){
//                 if(updates[i].date === updates[j].date){
//                     console.log(`fecha 1: ${updates[i].date} - fecha 2: ${updates[j].date}`)
//                 }
//             }
//         }
//     }).catch(err =>{
//         console.log(err)
//     })
// }
// getAllUpdates()