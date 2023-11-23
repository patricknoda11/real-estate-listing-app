import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, List, Pagination, Row } from 'antd';
import { useSelector } from 'react-redux';

/**
 * Reusable Paginated List Component
 */
const PaginatedList = ({ visible, data }) => {
  const [currPage, setCurrPage] = useState(0);

  // On page-change handler:
  const onPageChange = useCallback((page) => setCurrPage(page), []);

  // Reset local state on visibility change:
  useEffect(() => {
    if (visible) return;
    setCurrPage(0);
  }, [visible]);

  return (
    <Row style={{ height: '100%' }}>
      <Col
        className="list-container"
        span={24}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div className="list" style={{ flex: 1, overflowY: 'auto' }}>
          <List
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
        <div
          className="pagination"
          style={{ justifyContent: 'center', paddingBottom: 10 }}
        >
          <Pagination
            current={currPage}
            total={data.length}
            onChange={onPageChange}
          />
        </div>
      </Col>
    </Row>
  );
};

PaginatedList.propTypes = {
  visible: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};

PaginatedList.defaultProps = {
  visible: false,
  data: [],
};

export default PaginatedList;
