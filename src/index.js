import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import style from './index.scss';

class Greeting extends React.Component {
  render() {
    return <div className={style.dv}>Hello, {this.props.name}</div>;
  }
}

// Specifies the default values for props:
Greeting.defaultProps = {
  name: 'Webpack BluePrint : Started 123'
};

Greeting.propTypes = {
  name: PropTypes.string
};

ReactDOM.render(<Greeting />, document.getElementById('app'));

module.hot.accept();
