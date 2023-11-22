import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

/**
 * Reusuable Split View Component - Allows user to pass in two views and specify the span of each view
 */
const SplitView = ({
  leftSpan,
  rightSpan,
  leftView,
  rightView,
  leftViewStyle,
  rightViewStyle,
}) => (
  <Row>
    <Col span={leftSpan} style={leftViewStyle}>
      {leftView}
    </Col>
    <Col span={rightSpan} style={rightViewStyle}>
      {rightView}
    </Col>
  </Row>
);

SplitView.propTypes = {
  leftSpan: PropTypes.number,
  rightSpan: PropTypes.number,
  leftView: PropTypes.node.isRequired,
  rightView: PropTypes.node.isRequired,
  leftViewStyle: PropTypes.object,
  rightViewStyle: PropTypes.object,
};

SplitView.defaultProps = {
  leftSpan: 12,
  rightSpan: 12,
  leftViewStyle: {},
  rightViewStyle: {},
};

export default SplitView;
