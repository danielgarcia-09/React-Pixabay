import { useState } from "react";
import Form from "./components/Form";

function App() {

  //* App state
  const [ search, searching ] = useState('');

  return (
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Form 
              searching={searching}
          />
        </div>
      </div>
  );
}

export default App;
