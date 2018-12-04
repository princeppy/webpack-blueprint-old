import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class Greeting extends React.Component {
  render() {
    return <div>Hello, {this.props.name}</div>;
  }
}

// Specifies the default values for props:
Greeting.defaultProps = {
  name: 'Webpack BluePrint : Started 123'
};

Greeting.propTypes = {
  name: PropTypes.element.string
};

ReactDOM.render(<Greeting />, document.getElementById('app'));

module.hot.accept();
