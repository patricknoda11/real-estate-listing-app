import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, List, Pagination, Row } from 'antd';
import ListingEntry from './ListingEntry';

// Constants:
const PAGE_SIZE = 5;

/**
 * Reusable Paginated List Component
 */
const PaginatedList = ({ visible, data }) => {
  const [currPage, setCurrPage] = useState(1);

  // Currently displayed listings, based off current page:
  const displayedListings = useMemo(
    () => data.slice((currPage - 1) * PAGE_SIZE, currPage * PAGE_SIZE),
    [data, currPage]
  );

  // On page-change handler:
  const onPageChange = useCallback((page) => {
    // page is 1-indexed:
    setCurrPage(page);
  }, []);

  // Reset local state on visibility change OR if data displayed on map changes:
  useEffect(() => {
    setCurrPage(1);
  }, [visible, data]);

  return (
    <Row style={{ height: '100%' }}>
      <Col
        className="list-container"
        span={24}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div className="list" style={{ flexGrow: 1, overflowY: 'auto' }}>
          <List
            dataSource={displayedListings}
            renderItem={(listing) => <ListingEntry>{listing}</ListingEntry>}
          />
        </div>
        <div
          className="pagination"
          style={{ justifyContent: 'center', paddingBottom: 10 }}
        >
          <Pagination
            defaultPageSize={PAGE_SIZE}
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
