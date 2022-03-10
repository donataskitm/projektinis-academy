import { PropTypes } from 'prop-types';

function ImageBin (props) {
  return (
    <img
      src="/pic/estimate.png"
      className='img-fluid hover-shadow'
      alt='samata'
      width={props.width}/>
  );
}

ImageBin.propTypes = {
  width: PropTypes.string,
};

ImageBin.defaultProps = {
  width: "17px",
};

export default ImageBin;