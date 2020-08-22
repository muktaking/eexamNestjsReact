import React from "react";

import { Pagination } from "react-bootstrap";

const pagination = ({ itemsCount, pageSize, onPageHandler, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const items = [];
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={() => {
          onPageHandler(number);
        }}
        active={number === currentPage}
      >
        {number}
      </Pagination.Item>
    );
  }
  return <Pagination>{items}</Pagination>;
};

export default pagination;
