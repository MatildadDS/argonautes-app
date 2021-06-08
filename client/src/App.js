import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  const [argoName, setArgoName] = useState('');
  const [argoGender, setArgoGender] = useState('');
  const [argoList, setArgoList] = useState([]);


  useEffect(() => {
    Axios.get("http://localhost:3005/api/get").then((response) => {
      for(let i = 0; i < 50 ; i++)
      setArgoList(response.data);
    });
  }, [])



  const submitReview = () => {
    Axios.post('http://localhost:3005/api/insert', {
      argoName: argoName,
      argoGender: argoGender
    }).then(() => {
      alert('success')
    });
  };



  return (
    <div className="App">

      <header className="App-header">
        <h1>The Argonauts</h1>
        <img src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png" alt="Wild Code School logo" />
      </header>

      <main className="main-container">

        <h2>Add an Argonaut</h2>

        <form className="new-member-form">
          <label htmlFor="argo-label">Name</label>
          <input type="text" onChange={(e) => {
            setArgoName(e.target.value)
          }}/>

          <label htmlFor="argo-label">Gender</label>
          <input type="text" onChange={(e) => {
            setArgoGender(e.target.value)
          }}/>

          <button onClick={submitReview} type="submit">Submit</button>
        </form>

  
        <h2>Members on board</h2>
        <section className="member-list">
          <div className="member-item">
            {argoList.map((val, index) => {
            return <li key ={index}>{val.argo_name} - {val.argo_gender}</li>
          })}</div>
        </section>

      </main>

      <footer>
        <p>Made by Jason in Anthesterion of the year 515 BC  |  Coded with &hearts; by Matildad in Paris 2500 years later</p>
      </footer>

    </div>
  );
}

export default App;
