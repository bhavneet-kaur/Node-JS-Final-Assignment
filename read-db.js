const {db,tasks,notes,sequelize}=require('./common-db')
tasks.hasMany(notes)
async function getData(){
    await db.sync();
    const result= await tasks.findAll({
        include:[notes]
    })
    return(JSON.stringify(result));
}
module.exports={getData};