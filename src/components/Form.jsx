import { useState } from 'react';
import Error from './Error';

const Form = ({searching}) => {

    const [ searchValue, updateSearchValue ] = useState('');
    
    const [error, updateError] = useState(false);

    const searchImages = e => {
        e.preventDefault();

        //* validate
        if( searchValue.trim() === '' ) {
            updateError(true);
            return;
        }

        updateError(false);

        //* send search value to app component
        searching(searchValue);
    }

    return (
        <form
            onSubmit={ searchImages }
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: futbol o cafe"
                        onChange={ e => updateSearchValue( e.target.value ) }
                    /> 
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    /> 
                </div>
            </div>

            { error ? <Error message="Agrega un termino de busqueda" /> : null}
        </form>
    );
}
 
export default Form;