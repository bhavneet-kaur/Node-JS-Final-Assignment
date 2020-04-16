const sequelize=require('sequelize');
const db=new sequelize("world","root","root",{
    host:"localhost",
    port:3306,
    dialect: 'mysql',
    storage: __dirname +'test.db'
})
const tasks=db.define('tasks',{
    id:{
        type: sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:sequelize.STRING(40),
        allowNull:false
    },
    description:{
        type:sequelize.STRING(40),
        allowNull:true
    },
    dueDate:{
        type:sequelize.DATE,
        allowNull:false
    },
    status:{
        type:sequelize.BOOLEAN
    },
    priority:{
        type:sequelize.STRING(40),
    }
})
const notes=db.define('notes',{
    note_id:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    note_text:{
        type:sequelize.STRING(50),
        allowNull:false
    },
})
notes.belongsTo(tasks);
module.exports={db,tasks,notes,sequelize};