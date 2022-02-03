import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ZoomImage = (props)=> {

  const renderTooltip = (settings) => (
    <Tooltip id="image-tooltip" {...settings}>
      <img className="img-fluid"
        src={props.src}
        alt={props.alt} />
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}>
      <img className="img"
        width="50"
        height="50"
        src={props.src}
        alt={props.alt} />
    </OverlayTrigger>

  );
};

ZoomImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ZoomImage;