import PropTypes from "prop-types";

const Button = ({ color, text }) => {
  return (
    <Button className="btn" style={{ backgroundColor: color }}>
      {text}
    </Button>
  );
};

Button.defaultProps = {
  color: "green",
  text: "search",
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Button;
