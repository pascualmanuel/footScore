const mongoose = require("mongoose")
module.exports = {
    isPM: (user) => user.role === "PM",
    isStandard: (user) => user.role === "STANDARD",
  }

//   cleanText: text => text.trim(),
//   capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
//   checkMongoID: id => mongoose.Types.ObjectId.isValid(id),
//   formatDate: date => {
//     let month = '' + (date.getMonth() + 1)
//     let day = '' + date.getDate()
//     let year = date.getFullYear()

//     if (month.length < 2) month = '0' + month;
//     if (day.length < 2) day = '0' + day;

//     return [year, month, day].join('-')
//   },
// module.exports = {
//   isPM: (user) => user.role === "PM",
//   //optional chaining, el "?" detiene la ejecución si isOwner es falsy
//   //   isOwner: (user, user) => user.isOwner?.equals(user._id),

// }