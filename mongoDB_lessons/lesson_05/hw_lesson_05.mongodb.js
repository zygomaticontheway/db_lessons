// Создайте коллекцию cars, добавьте в нее около 10 машин, пусть у некоторых совпадает год, а у некоторых бренд. Пример одного документа:

//   {
//     brand: "BMW",
//     price: 20000,
//     model: "X5",
//     year: 2015,
//     horsepower: 300,
//   }
// Copy
// попробуйте crud операции: добавления, чтения, обновления, удаления.
// сделайте по одной операции для одного и нескольких элементов
// попробуйте отображение с сортировку элементов через агрегатор: 
    // выведите все у кого цена меньше 20000, 
    // сортируйте в обратном порядке
// покажите случайный автомобиль.

use ("hw_lesson_05");

// ! CREATE
 db.cars.insertMany([
         {brand: "BMW", price: 100000, model: "X5", year: 2023, horsepower: 300},
         {brand: "BMW", price: 88000, model: "X3", year: 2022, horsepower: 150},
         {brand: "Mercedes", price: 100000, model: "E500", year: 2023, horsepower: 320},
         {brand: "Mercedes", price: 15000, model: "B200", year: 2015, horsepower: 110},
         {brand: "VW", price: 15000, model: "Golf", year: 2015, horsepower: 112},
         {brand: "VW", price: 86000, model: "Arteon", year: 2022, horsepower: 190},
         {brand: "Opel", price: 11000, model: "Insignia", year: 2014, horsepower: 194},
         {brand: "Fiat", price: 8000, model: "Punto", year: 2013, horsepower: 74},
         {brand: "Renault", price: 3800, model: "Scenic", year: 2011, horsepower: 86},
         {brand: "Lamborghini", price: 350000, model: "Diabolo", year: 2023, horsepower: 550},
        
     ]);

// ! UPDATE
 db.cars.updateMany(
     {price: {$gte: 15000}},
     {$inc: {price: 150}}
 );


// ! DELETE
 db.cars.deleteOne(
     {model: 'X3'}
 );

// ! READ
 db.cars.find(
     {brand: 'VW'}
 );

 db.cars.aggregate(
     [
         {$match: {}},
         {
             $project: {
                 _id: 0,
                 brand: 1,
                 model: 1,
                 price: 1
             }
         },
         {$sort: {price: 1}}
     ]
 );

 db.cars.aggregate(
     [
         {$match: {price: {$lt: 20000}}},
         {$sort: {price: -1}}
     ]
 );

db.cars.aggregate(
    [
        {$match: {price: {$lt: 20000}}},
        {$sample: {size: 2}}
    ]
);


 db.cars.find();