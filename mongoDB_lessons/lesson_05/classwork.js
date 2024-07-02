use('lection_02');

// * CREATE
db.animals.insertMany([
  { kind: 'tiger', weight: 100, name: 'Alex', predatory: true },
  { kind: 'penguin', weight: 20, name: 'Kovalsky', predatory: false },
  { kind: 'zebra', weight: 70, name: 'Marty', predatory: false },
  { kind: 'capybara', weight: 35, name: 'Tony', predatory: false },
  { kind: 'shark', weight: 70, name: 'Sharp', predatory: true },
  { kind: 'panda', weight: 120, name: 'Po', predatory: false }
]);

// * CRUD операции (Create Read Update Delete)

// ! UPDATE
// Операторы: $set, $inc, $rename, $push, $pull, $unset

// Изменим свойство predatory у акул - на true
// UPDATE MANY - обновит все документы соответсвующие фильтру
// первый - параметр поиска
// второй - сами изменения

// $set оператор
// изменил поле predatory у всех акул на true
db.animals.updateMany({kind: "shark"}, {$set: {predatory: true}});

// $inc - увеличивает значение на указанную величину
// увеличиваем вес всех животных на три
db.animals.updateMany({}, {$inc: {weight: 5}});

// $rename - переименовать имя свойства
// переименуем у всех животных weight в kg
db.animals.updateMany({}, {$rename: {weight: "kg"}})

// update one - изменить одну запись - первый документ
// изменим имя конкретного объекта по ид
db.animals.updateOne(
  {name: 'Jaws'},
  {$set: {predatory: false}}
);

// создаем новый ключ с массивом значений

db.animals.updateMany(
  {kind: 'shark'},
  {$set: {foods: ['fish', 'plankton', 'squid']}}
)

// * обновить все элементы у кого имя Jaws, добавить новый элемент в массив

db.animals.updateMany(
  {name: 'Jaws'},
  {$push: {foods: 'human'}}
)

// * $pull - оператор удаления элементов из массива по ключу

db.animals.updateMany({ name: 'Sharp' }, { $pull: { foods: 'plankton' } });

// * $unset - оператор удаления ключей из коллекций по условию

db.animals.updateOne({ kind: 'zebra' }, { $unset: { predatory: '' } });

// ! DELETE

// deleteOne(), deleteMany()
// передаем в аргументе условие для поиска элемента, который нужно удалить

db.animals.deleteOne({ _id: ObjectId('6683b5f1aa43543334ee7ae6') });

db.animals.deleteOne({ name: 'Marty' });

db.animals.insertOne({kind: 'T-rex', name: 'Rex', kg: 5000, predatory: true})

db.animals.updateOne(
  {name: 'Rex'},
  {$set: {foods: ['zebra', 'lion', 'shark', 'triceratops']}}
)

// ! aggregate()
// * для выполнения сложных действий в одном запросе по цепочке

// * $match вывели в запросе всех, кто хищники
// * $sort отсортировали в обратном порядке по значению веса
// * $limit установили лимит выдачи в два элемента

db.animals.aggregate(
  [
    {$match: {predatory: true}},
    {$sort: {kg: -1}},
    {$limit: 2}
  ]
)

// * $skip - пропуск установленного кол-ва элементов в выдаче

db.animals.aggregate([
  { $match: { predatory: false } },
  { $sort: { kg: 1 } },
  {$skip: 1}
  // {$limit: 2}
]);

// * $project - выбирает нужные ключи для выдачи

db.animals.aggregate([
  { $match: { predatory: true } },
  {
    $project: {
      kind: 1,
      foods: 1
    }
  }
]);

db.animals.aggregate([
  { $match: { predatory: true } },
  {
    $project: {
      _id: 0,
      kind: 1,
      foods: 1
    }
  }
]);


db.animals.aggregate([
  { $match: { predatory: false } },
  {$count: 'number of non predatory'}
])

// * $ sample - выдает нам случайный элемент - в size указываем количество элементов в выдаче

db.animals.aggregate([
  {$sample: {size: 1}}
])

db.animals.aggregate([
  {$match: {kg: {$gte: 80}}},
  {$sample: {size: 1}}
])

// * 1. Create - insertOne(), insertMany()
// * 2. Read - findOne(), findMany() + aggregate([])
// * 3. Update - updateOne(), updateMany()
// * 4. Delete - deleteOne(), deleteMany()



