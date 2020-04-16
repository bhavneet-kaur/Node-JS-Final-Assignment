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
const {Op}=require('sequelize')
async function writeDb(body){
    await db.sync({alter:true})
    console.log("notes are --------------------------------"+`${body.notesArr}`);
    await tasks.create(
        {
            title:`${body.title}`,
            description:`${body.description}`,
            dueDate:`${body.date}`,
            status:`${body.status}`,
            priority:`${body.priority}`
        })
        const abc=await tasks.findOne({
            attributes:['id'],
            where:{
                title:{[Op.eq]:`${body.title}`}
            }
        })
        let currTaskId=`${abc.id}`;
        for(let i=0;i<body.notesArr.length;i++)
        {
            await notes.create(
                {
                    note_text:`${body.notesArr[0]}`,
                    taskId:currTaskId
                })  
        }
        
}
module.exports={writeDb};