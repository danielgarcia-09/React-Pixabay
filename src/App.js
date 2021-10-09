import { useEffect, useState } from "react";
import Form from "./components/Form";
import ImageList from "./components/ImageList";

function App() {

  //* App state
  const [ search, searching ] = useState('');

  //* Images state
  const [ images, updateImages ] = useState([]);

  useEffect(()=>{
    
    const consultAPI = async() =>{
      if( search === '' ) return;

      const imagesPerPage = 30;
      const key = '23781561-2c2e43f58738885ccd6eb12ba';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&image_type=photo&per_page=${imagesPerPage}`;

      const response = await fetch(url);
      const result = await response.json();

      updateImages(result.hits);

    }
    consultAPI();
  }, [search])

  return (
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Form 
              searching={searching}
          />
        </div>
        <div className="row justify-content-center">
          <ImageList
            images={images}
          />
        </div>
      </div>
  );
}

export default App;
