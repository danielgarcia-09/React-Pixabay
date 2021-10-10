import { useEffect, useState } from "react";
import Error from "./components/Error";
import Form from "./components/Form";
import ImageList from "./components/ImageList";

function App() {
  //* App state
  const [search, setSearch] = useState("");

  //* Images state
  const [images, updateImages] = useState([]);

  //* Page state
  const [actualpage, updateActualPage] = useState(1);

  //* Total Pages state
  const [totalpages, updateTotalPages] = useState(1);

  //! Error state
  const [ error, updateError ] = useState(false);

  useEffect(() => {
    const consultAPI = async () => {
      if (search === "") return;

      const imagesPerPage = 30;
      const key = "23781561-2c2e43f58738885ccd6eb12ba";
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&image_type=photo&per_page=${imagesPerPage}&page=${actualpage}`;

      const response = await fetch(url);
      const result = await response.json();

      //* Validating if there is photos
      if (result.total === 0 ) {
        updateError(true);
        return;
      }
      updateError(false);

      //* Setting images into image state
      updateImages(result.hits);

      //* Calculate total pages
      const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      updateTotalPages(calculateTotalPages);

      //* Moving screen smoothly
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });

    };
    consultAPI();
  }, [search, actualpage]);

  //* define last page
  const lastPage = () => {
    const newActualPage = actualpage - 1;
    if (newActualPage === 0) return;
    updateActualPage(newActualPage);
  };

  //* define next page
  const nextPage = () => {
    const newActualPage = actualpage + 1;
    if (newActualPage > totalpages) return;
    updateActualPage(newActualPage);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Form setSearch={setSearch} updateActualPage={updateActualPage} />
      </div>
      <div className="row justify-content-center">
        { error ? (
          <Error message="No hay fotos disponibles" />
        ) : (
          <ImageList images={images} />
        )}

        {actualpage === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={lastPage}
          >
            &laquo; Anterior
          </button>
        )}

        {actualpage === totalpages ? null : (
          <button type="button" className="btn btn-info" onClick={nextPage}>
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
