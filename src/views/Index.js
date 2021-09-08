import { useHistory } from "react-router-dom";
import { useState } from "react";
import AuthFooter from "components/Footers/AuthFooter.js";
import React from "react";
import AdminNavbar from"../components/Navbars/AdminNavbar.js";
import Getdata2 from "./examples/Getdata2.js";


import {
  Button,
  Card,
 
  CardBody,

  Row,
  
  Container
} from "reactstrap";


// import Header from "components/Headers/Header.js";
import firebase from "firebase";
import Getdata from "./examples/Getdata";

const Index = () => {
  const[documents,setDocuments]=useState([]);
  React.useEffect(() => {
    db.collection("proview")
      .get()
      .then((querySnapshot) => {
        let arr = [];                                                   
        querySnapshot.docs.map((doc) =>
        
          arr.push({
               id: doc.id,
             pname: doc.data().pname,
           })
            
        )
       
        setDocuments(arr);
        console.log("hii",arr);
      });
  }, []);
  const history=useHistory();

  const db = firebase.firestore();
  
  const user=firebase.auth().currentUser;
  if(user)
  {
    console.log(user);
  }
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("data",user.email);
      console.log("data",user.uid);
      // console.log("data",user.ProviderId);
     console.log("user is same");
     
    } else {
    history.push("/auth/login")
    }
  })
  const onOut=()=>
  {
    firebase.auth().signOut().then(function() {
     alert("you are log out");
    }, function(error) {
     alert("you are logged in");
    });
    history.push("/auth/login");
  }

  return (    
      <Container className="mt--8 pb-5 ml--30">
        <AdminNavbar/>
          <Row className="justify-content-center">
          <Container className="mt--5" fluid>   
          <div>
          <div className="row" >
            {documents.map((document=> 
            
             <div className="column">
        <Card className="bg-secondary shadow border-0 card1">
          <CardBody className="px-lg-5 py-lg-5">          
            <br></br>
            <h1>{document.pname}</h1>
            <br>
            </br>
           
          </CardBody>
        </Card>   
          
        </div> 
      
      ))}
       </div> 
      </div>
     
      {/* <div class="column">
     
        <Card className="bg-secondary shadow border-0 card1">
          <CardBody className="px-lg-5 py-lg-5">          
            <br></br>
            <h1>Project 2</h1>
            <br>
            </br>
           
          </CardBody>
        </Card>     
      
      </div> */}
      {/* <div class="column">
     
        <Card className="bg-secondary shadow border-0 card1">
          <CardBody className="px-lg-5 py-lg-5">          
            <br></br>
            <h1>Project 3</h1>
            <br>
            </br>
           
          </CardBody>
        </Card>     
      
      </div> */}
      {/* </div> 
      </div> */}
      {/* <div className="neta">
      <div className="row" >
          <div class="column">
     
        <Card className="bg-secondary shadow border-0 card1">
          <CardBody className="px-lg-5 py-lg-5">          
            <br></br>
            <h1>Project 4</h1>
            <br>
            </br>
           
          </CardBody>
        </Card>     
      
      </div>
      <div class="column">
     
        <Card className="bg-secondary shadow border-0 card1">
          <CardBody className="px-lg-5 py-lg-5">          
            <br></br>
            <h1>Project 5</h1>
            <br>
            </br>
           
          </CardBody>
        </Card>     
      
      </div>
      <div class="column">
     
        <Card className="bg-secondary shadow border-0 card1">
          <CardBody className="px-lg-5 py-lg-5">          
            <br></br>
            <h1>Project 6</h1>
            <br>
            </br>
           
          </CardBody>
        </Card>     
      
      </div>
      </div> 
      </div> */}
 </Container>
          </Row>
         <diV>
          <Button  onClick={onOut} className="my" color="primary" type="button">
                  LogOut
                </Button>
                </diV>
        </Container>
       
  //  </div>
     


     
  );
};

export default Index;


