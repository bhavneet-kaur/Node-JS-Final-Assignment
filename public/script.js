function genNotes(){
   var existingDiv=document.getElementById("notesDiv");
   if(!(existingDiv===null)){
      document.getElementById("form").removeChild(existingDiv);
   }
      let mainDiv=document.getElementById("form");
      let noteDiv=document.createElement("div");
      noteDiv.setAttribute("id","notesDiv");
      let label=document.createElement("label");
      label.textContent="Notes";
      label.setAttribute("class","notes");
      label.setAttribute("style","display:flex");
      let NotesArea=document.createElement("textarea");
      NotesArea.setAttribute("cols","30");
      NotesArea.setAttribute("rows","10");
      NotesArea.setAttribute("id","notesArea");
      let button=document.createElement("button");
      button.setAttribute("class","notes");
      button.setAttribute("style","display:flex");
      button.setAttribute("onclick","readNotes(0)");
      button.textContent="Want to add more notes ?"
      noteDiv.appendChild(label);
      noteDiv.appendChild(NotesArea);
      noteDiv.appendChild(button);
      mainDiv.appendChild(noteDiv);
}
function addTask(){
   if(validate()){
      let task={
         title:document.getElementById("taskTitle").value,
         description:document.getElementById("desc").value,
         date:document.getElementById("dueDate").value,
         status:document.getElementById("status").checked,
         priority:function(){
            if(document.getElementById("high").checked)
               return "high";
            else if(document.getElementById("medium").checked)
               return "medium";
            else 
               return "low";
         }(),
         notesArr:readNotes(1)
         
      }//end of task object
      const url='http://localhost:9000/todos';
      const param={
          headers:{"content-type":"application/json; charset=UTF-8"},
          body:JSON.stringify(task),
          method:"POST"
      }
      fetch(url,param)
      //.then(data=>{return data.json()})
      .catch(error=>{console.log(error)})
      showData();
   }
   emptyForm();
}
function validate(){
      let taskElement=document.getElementById("taskTitle");
      let task=taskElement.value;
      if(task.length==0){
          taskElement.setAttribute("placeholder","Title Cannot be empty");
          taskElement.setAttribute("style","border-color: red");
           return false;      
      }
      else{
          taskElement.setAttribute("placeholder","   Title   ")
          taskElement.setAttribute("style","border-color: none");        
          return true;
      }
  
}
let notesList=[];
function readNotes(a){
   if(document.getElementById("notesArea")){
      let noteText=document.getElementById("notesArea").value;
      notesList.push(noteText);
      if(a==0)
         genNotes();
      else 
         return notesList;
   }//end of if
   if(a==1) return null;
}
function emptyForm(){
   document.getElementById("taskTitle").value=" ";
   document.getElementById("desc").value="";
   document.getElementById("status").checked=false;
   document.getElementById("medium").checked="checked"; 
   setDefaultDate();
   if(!(existingDiv===null)){
      document.getElementById("form").removeChild(existingDiv);
   }
}
function setDefaultDate(){
   let d=document.getElementById("dueDate");
        let curr=new Date();
        curr.setDate(curr.getDate()+1);
        let nextDate;
        if((curr.getMonth()+"").length==1)
            nextDate=curr.getFullYear()+"-"+"0"+(curr.getMonth()+1)+"-"+curr.getDate();
        else
            nextDate=curr.getFullYear()+"-"+0+(curr.getMonth()+1)+"-"+curr.getDate();
        d.value=nextDate;
}
function showData(){
   const url='http://localhost:9000/todos';
   const param={
       headers:{"content-type":"application/json; charset=UTF-8"},
       method:"GET"
   }
   fetch(url,param)
   .then(data=>{return data.json()})
   .catch(error=>{console.log(error)})
   showData();  
}