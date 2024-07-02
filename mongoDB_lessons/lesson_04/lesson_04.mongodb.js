use ("lection_02")

// db.animals.insertMany([
//     {kind: "tiger", weight: 100, name: "Alex", predatory: true},
//     {kind: "penguin", weight: 20, name: "Kovalsky", predatory: false},
//     {kind: "zebra", weight: 70, name: "Marty", predatory: false},
//     {kind: "capybara", weight: 35, name: "Tony", predatory: false},
//     {kind: "shark", weight: 70, name: "Sharp", predatory: true},
//     {kind: "panda", weight: 120, name: "Po", predatory: false}
// ])

// db.animals.insertMany([
//     { kind: 'shark', weight: 110, name: 'Jaws', predatory: false }
//   ]);

// db.animals.updateMany(
//     {kind: 'shark'},
//     {$set: {predatory: true}}
// );
// db.animals.find();

// db.animals.updateMany(
//         {predatory: true}, {
//             $inc: {weight: -105}
//         }
//     );

//     db.animals.updateMany(
//         {predatory: true}, {
//             $inc: {weight: -105}
//         }
//     );

//!переименуем ключ weight у всех {} на kg
    // db.animals.updateMany(
    //     {}, {
    //         $rename: {weight: 'kg'}
    //     }
    // );

// db.animals.updateOne(
//     {_id: ObjectId('6683b6a08cf9267479449fd4')},
//     {$set: {name: 'Artem'}}
//     )

// db.animals.updateMany(
//     {kind: 'shark'},
//     {$set: {foods: [
//         'fish', 'plankton', 'squid'
//         ]}
//     }
//     );

//!добавить элемент human в массив ключа foods
// db.animals.updateMany(
//     {name: 'Jaws'},
//     {$push: {foods: 'human'}}
// );



//!удалить элемент plankton из массива ключа foods
// db.animals.updateMany(
//     {name: 'Jaws'},
//     {$pull: {foods: 'plankton'}}
// );

// db.animals.updateOne(
//     {kind: 'zebra'},
//     {$unset: {predatory: ''}}
//     );

// ! удалить всех зебр
// db.animals.deleteMany(
//     {kind: 'zebra'}
//     );

// ! удалить одну зебру
// db.animals.deleteOne(
//     {_id: ObjectId('6683b8319b460fecad7ab983')}
// );
// db.animals.insertMany([
//     { kind: 'T-rex', kg: 5000, name: 'Rex', predatory: true }
// ]);

// db.animals.updateMany(
//     {name: 'Rex'},
//     {$set: {foods: ['triceratops', 'zebra', 'pterodactyl']}}
// );

// ! aggregate ()
// для выполнения сложных действий в одном запросе 
// по цепочке. На вход подается [{массив},{...}, ...]
// db.animals.aggregate(
//     [
//         {$match: {predatory: true}},
//         {$sort: {kg: -1}}
//     ]
// );

// ! $skip - пропуск установленного кол-ва элементов в выдаче
// db.animals.aggregate(
//     [
//         {$match: {predatory: false}},
//         {$sort: {kg: 1}},
//         {$skip: 1} //пропускает один (первый) элемент
//     ]
// );

//!$project: выбирает нужные ключи для выдачи
// db.animals.aggregate(
//     [
//         {$match: {predatory: true}},
//         {
//             $project: {
//                 kind: 1,
//                 foods: 1
//             }
//         }
//     ]
// );

//! $project: выбирает нужные ключи для выдачи
// db.animals.aggregate(
//     [
//         {$match: {predatory: true}},
//         {
//             $project: {
//                 _id: 0, // 0 => не выводить
//                 kind: 1, // 1 => выводить
//                 foods: 1
//             }
//         }
//     ]
// );


// db.animals.aggregate([
//     { $match: { predatory: false } },
//     {$count: 'number of non predatory'}
//   ])

// ! $sample: выдает случайный элемент, 
//в size указываем количество эл-тов в выдаче
// db.animals.aggregate(
//     [
//         {$sample: {size: 2}}
//     ]
    
// );

db.animals.aggregate(
    [
        {$match: {kg: {$gte: 80}}},
        {$sample: {size: 2}}
    ]
    
);

    // db.animals.find();