import React, { useEffect,useState } from 'react';
import firebase from "firebase";
import {db} from "../../firebase.js";
import "../../index.css";
import { Table } from 'reactstrap';
import {
  Input,
  Modal
} from "reactstrap";
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    
  }
};
// Modal.setAppElement('#root');

const EmpDetail = () => {
  var subtitle;
 
  const[pname,setpname]=useState("");
  const [documents,setDocuments]=useState([]);
  const[filterdoc,setfilterdoc]=useState("");
  const [usedata,setData]=useState([]);
  const[document,setDocument]=useState({});
  const [modalIsOpen,setIsOpen] = React.useState(false);
 const[change,setChange]=useState(true);
 useEffect(()=>
 {
  db.collection("empData")
  .get()
  .then((querySnapshot) => {
    let arr = [];
    querySnapshot.docs.map((doc) =>
    
      arr.push({
           id: doc.id,
         name: doc.data().name,       
       })        
    )  
    setDocuments(arr);
    console.log("arr",arr);
    
  });
  
  db.collection("AssignProject")
  .get()
  .then((querySnapshot) => {
    let arr = [];
    querySnapshot.docs.map((doc) =>      
      arr.push({
           id: doc.id,
         pname: doc.data().Projectname,
         date1:doc.data(). estimatedate,
         date2:doc.data(). startdate,
         emp:doc.data(). Employee,
         status:doc.data(). status,
         task:doc.data().task,
         taskdisc:doc.data(). taskdisc,
       })
    )    
    setData(arr);
   setfilterdoc(arr);
    console.log("setDataarr",arr);
  });  

 },[]);
  console.log("pname",pname);
  console.log("usedata",usedata);
  console.log("documents",documents);

function openModal(document) {
  // console.log("doc",document);
  let doc=document;
  console.log("doc",doc);
  setDocument(doc);
  setIsOpen(true);
}
function afterOpenModal() {
  // references are now sync'd and can be accessed.
  subtitle.style.color = 'white';
}
function closeModal(){
  setIsOpen(false);
}
async function delete1()
{ 
    const del = await db.collection('AssignProject').doc(document.id).delete(); 
    console.log("delete",del);
}
function setField(e,name1)
{
  console.log("doc1",document);
  let doc=document;
  doc[name1]=e;
  console.log("doc2",doc);
  setDocument(doc);
  console.log(document);
  setChange(!change);
};
async function update()
{
  console.log("doc",document);
  const res=   db.collection('AssignProject')
  .doc(document.id);
  console.log(document.date2);
  const res1=await res.update({
   startdate:document.date2,
   estimatedate:document.date1,
   status:document.status,
   Projectname:document.pname,
   Employee:document.emp,
  });
  console.log("date2",document.date2);  
}
    return(
      <div className="form-group col-md-5">
      <label for="inputState">Employee</label>
      <Input type="select" name="select" id="exampleSelect3" onChange={(e)=>{       
         if(e.currentTarget.value=="")
         {
           setData(filterdoc);
         }
         else{
          let demo1=JSON.parse(e.currentTarget.value);
          var info1=filterdoc.filter((a)=>a.emp==demo1.name);            
          console.log("info",info1);
          setData(info1);
          console.log("onchange2",demo1);
         }       
            }}> 
              <option value="">All</option>                     
          { documents.map(dropdown => {           
        return <option key={dropdown} dropdown={dropdown}  value={JSON.stringify(dropdown)}>{dropdown.name}
           </option>;         
        })
    }         
       </Input>   
       <br></br>
       <br></br>
       <div>
  <Table >
    <thead >
        <tr >
        <td >Project Name</td> 
        <td>Starting Date </td>
          <td>Estimate Date</td>          
          <td>Employee Name</td>
          <td>Current Task</td>
          <td>Status</td>
          <td>Task Disc</td>
        </tr>
        </thead>
    <tbody>
      {usedata.map((document) => (     
        <tr key={document.id} onClick={()=>openModal(document)}>
         
           <td> {document.pname} </td>
           <td> {document.date2} </td>
          <td> {document.date1} </td>
          
          <td> {document.emp} </td>
          <td> {document.task} </td>
          <td> {document.status} </td>
          <td> {document.taskdisc} </td>        
        </tr>
     )) }
     
   </tbody>
      </Table>

   </div>
 <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onAfterOpen={afterOpenModal}
          contentLabel="Example Modal"
        >
            <form >
              <div className="form-group col-md-6">
            <label for="inputEmail4">Project</label>
            <input type="text" className="form-control" id="inputPro1" placeholder="project"
             value={document.pname}
             onChange={e=>{
             setField(e.currentTarget.value,"pname")}}/>
          </div>
          <div className="form-group col-md-6">
            <label for="inputEmail4">Employee</label>
            <input type="text" className="form-control" id="inputPro2" placeholder="emp"
             value={document.emp}
             onChange={e=>{
              setField(e.currentTarget.value,"emp")}}
             />
          </div>
          <div className="form-group col-md-6">
            <label for="inputEmail4">Task</label>
            <input type="textarea" className="form-control" id="inputPro" placeholder="Task"
             value={document.task}
             onChange={e=>{
            console.log("data",e.currentTarget.value);
           setField(e.currentTarget.value,"task")}}/>
          </div>
          <div className="form-group col-md-5">
          <label for="inputAddress2">Task Created Date</label>
          <input type="date" className="form-control" id="inputAddress4" placeholder=""
           value={document.date2}
           onChange={e=>
           setField(e.currentTarget.value,"date2")}/>
        </div>
        <div className="form-row pl-4">
        <div className="form-group col-md-5">
          <label for="inputAddress2">Task Completion Date</label>
          <input type="date" className="form-control" id="inputAddress5" placeholder="DD/MM/YYYY "
           value={document.date1}
           onChange={e=>
           setField(e.currentTarget.value,"date1")}/>
        </div>
        </div>
        <div className="form-group col-md-5">
      <label for="inputState">Status</label>    
      <Input type="select" name="select" id="exampleSelect1" onChange={e=>
             setField(e.currentTarget.value,"status")}> 
              <option value>{document.status}</option>                 
         <option value="start"  >start</option>
         <option value="progress">progress</option>
         <option value="end">end</option>            
       </Input>
    </div>  
            </form>
            <div className="div2">
           <button  onClick={closeModal} className="btn btn-primary">close</button>
           </div>
           <br></br>
           <div className="div2">
           <button  onClick={update}
      
           
          
           className="btn btn-primary">Update</button>
           </div>
           <br></br>
           <div className="div2">
           <button  onClick={delete1} className="btn btn-primary">Delete</button>
           </div>
        </Modal>
           
    </div>   
  )
}     

export default EmpDetail;
