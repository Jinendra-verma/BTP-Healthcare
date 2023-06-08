import React, { useState, useEffect, useMemo, useContext } from "react";
import Axios from "axios";
import Scrollbar from "react-scrollbars-custom";
import { AuthContext } from "../Auth/AuthContext";
import { FaMapMarkerAlt } from 'react-icons/fa';
// import { ListGroup, ListGroupItem } from "reactstrap";

import {
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  Label,
} from "reactstrap";

import Trie from "./Trie.js";
import specialization from "./specialization";
import { Link, Redirect } from "react-router-dom";

const Search = () => {
  const [text, setText] = useState(); 
  const [suggestions, setSuggestions] = useState([]);
  const { token } = useContext(AuthContext);
  const [Doctor, setDoctor] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [doc, setDoc] = useState(null);


  const [selectedOption, setSelectedOption] = useState("Specialization");

  const memoized_trie = useMemo(() => {
    const trie = new Trie();

    // Insert
    if(selectedOption === "Specialization"){
      for (let i = 0; i < specialization.length; i++) {
        trie.insert(specialization[i].toLowerCase());
      }
    }else{
      console.log(Doctor);
      for (let i = 0; i < Doctor.length; i++) {
        trie.insert(Doctor[i].dr_name.toLowerCase());
      }
    }

    return trie;
  }, [selectedOption]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  function onTextChanged(e) {
    let value = e.target.value;
    setText(value);
    fetchDoctor();
    value = value.toLowerCase();
    if (value !== "") setSuggestions(memoized_trie.find(value));
    else setSuggestions([]);
  }

  function suggestionSelected(value) {
    setText(value);
    setSuggestions([]);
  }

  function renderSuggestions() {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <InputGroup>
        <ul className="list-group dropdown-menu pt-0 pb-0">
          {suggestions.map((item) => (
            <li
              className="list-group-item list-group-item-action"
              onClick={() => suggestionSelected(item)}
              key={item}
            >
              {item} 
            </li>
          ))}
        </ul>
      </InputGroup>
    );
  }

  const fetchDoctor = async () => {
    const config = { 
      headers: {
        Authorization: `token ${token}`,
      },
    };

    await Axios.get(`${process.env.REACT_APP_SERVER_URL}/patient/get-dr/`, config)
    .then(response => {
      const { data } = response;
      setDoctor(data);
      //console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  const UpdateDisplay = (text) => {
    setDoctor((Doctor) => {
      return Doctor.filter(
        (doctor) => selectedOption==="Specialization" ? doctor.specialization.toLowerCase() === text.toLowerCase() : doctor.dr_name.toLowerCase() === text.toLowerCase()
      );
    });
    console.log(Doctor);
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  const handleRedirect = (doc) => {
    setDoc(doc);
    setRedirect(true);
  }

  if(redirect){
    return <Redirect
      to={{
        pathname: "/patient/viewdoc",
        state: {
          doctor: doc,
          link: '/patient/searchdoctor',
        },
      }}
    />
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h3 style={{color: '#002db3'}}>Search Doctor</h3>
      {/* <Link to={{ pathname: "/patient/showmap" }}>
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid black', padding: '3px' }}>
        <FaMapMarkerAlt size={24} color="red" />
        <h5 style={{ color: '#002db3', marginLeft: '8px', marginTop: '8px' }}>Show in Map</h5>
      </div>
      </Link> */}
      </div>
      <hr style={{backgroundColor: 'black', height:'2px'}}></hr>
      <br></br>
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <Input
              value={text}
              type="text"
              placeholder="Search Your Doctor"
              onChange={onTextChanged}
              className="mb-1"
            />
            <div style={{ height: 10 }} className="">
              <InputGroupAddon addonType="append"> 
                <Button
                  className="h-10 d-inline-block"
                  color="primary"
                  onClick={() => UpdateDisplay(text)}
                >
                  Search Doctor
                </Button>
              </InputGroupAddon>
            </div>
            <div style = {{marginLeft: '10px', backgroundColor: 'white', height: 37, borderRadius: 5, paddingRight: 5, paddingLeft: 5 }}>
              <Label>Search By: </Label>
              <label>
                <input
                  style = {{margin: '10px'}}
                  type="radio"
                  value="Specialization"
                  checked={selectedOption === "Specialization"}
                  onChange={handleOptionChange}
                />
                Specialization
              </label>
              <label>
                <input
                  style = {{margin: '10px'}}
                  type="radio"
                  value="Doctor Name"
                  checked={selectedOption === "Doctor Name"}
                  onChange={handleOptionChange}
                />
                Doctor Name
              </label>
            </div>
          </InputGroup>
          {renderSuggestions()}
        </Col>
      </Row>

      {/* <ListGroup> */}
      <Scrollbar
        noScrollX
        style={{ position: "", height: "64vh", width: "144vh" }}
        className="col-12 col-md-12"
      >
        <div className="row">
          {Doctor.map((doc) => (
            // <ListGroupItem key={doc.id} className="mb-3">
            <div className="col-sm-6 mb-2" key={doc.dr_id}>
              <div className="card" style={{width: '25vw', borderColor: '#0099cc'}}>
                <div className="card-body">
                  <div className="text-info">
                    <h6>
                      Doctor Name:
                      <span className="text-uppercase"> {doc.dr_name}</span>
                    </h6>
                  </div>
                  <div>Specialization : {doc.specialization}</div>
                  <div>Phone Number : {doc.mobile}</div>
                  <div>Fees per Session : {doc.feesperSession}</div>
                  <br></br>
                  <div className="row mb-0 pb-0">
                    <div
                      className=" col align-self-end col-md-2 inline"
                      style={{ textAlign: "center" }}
                    ><Link to={{ pathname: "/patient/selectdate", doctor: { doctor: doc } }}>
                      <button className="btn btn-sm btn-primary"
                     
                      >  Book</button> </Link>
                    </div>
                    <div
                      className=" col align-self-end inline"
                      style={{ textAlign: "center" }}
                    >
                      <button className="btn btn-sm btn-primary" onClick={() => handleRedirect(doc)}> View Profile</button>
                    </div>
                  </div>

                  {/* </ListGroupItem> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Scrollbar>
      {/* </ListGroup> */}
    </div>
  );
};

export default Search;
