const {mongoose}= require('../server/db/mongoose');

const {Users}= require('../server/models/User');

const {Todo}= require('../server/models/Todo');


Todo.findByIdAndRemove("5b843027c81503614db6f66f").then((result)=>{
    console.log(result);
});
//Todo.findOneAndRemove
//Todo.findByIdAndRemove



