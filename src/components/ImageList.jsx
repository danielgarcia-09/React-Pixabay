import Image from "./Image";

const ImageList = ({images}) => {
    return (
        <div className="col-12 p-5 row">
            {images.map( img => (
                <Image
                    key={img.id}
                    image={img}
                />
            ))}
        </div>
    );
}
 
export default ImageList;