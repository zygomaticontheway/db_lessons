use("student_db")

// db.users.insert({"name":"Alex"})

// db.users.insertOne({name:"Anna"});

// db.users.insertMany([
//     {name:"Steve", hobbies: ['pranking', 'joking', 'tatooing']},
//     {name:"Johnnie", hobbies: ['figting', 'hiking', 'drinking']}
// ])

db.users.find()


//добавить/изменить в объекте с _id "6682782ce3de4ed64ef2626d" значение "age"
// db.users.updateOne({_id: ObjectId("6682782ce3de4ed64ef2626d")}, {$set:{age : 27}})

// db.users.find({_id: ObjectId("6682782ce3de4ed64ef2626d")})

// db.users.updateOne(
//     {name: "Ben"},
//     {$set:{age : 46}}
//     )
// db.users.updateOne(
//     {name: "Tony"},
//     {$set:{age : 31}}
//     )    

//условные операторы для работы с числами:
// $lte less then or equals
// $lt less then 
// $gt greater then 
// $gte greater then or equals
// $eq =

db.users.find({age: {$lte: 45}})