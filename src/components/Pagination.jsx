import React from 'react';
import PropTypes from 'prop-types';
import MainActionButton from './MainActionButton';

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => (
  <div className="flex items-center justify-center space-x-4 py-4">
    <MainActionButton
      variant="secondary"
      onClick={onPrevious}
      disabled={currentPage <= 1}
    >
      Previous
    </MainActionButton>
    <span className="text-gray-700 font-medium">
      Page {currentPage} of {totalPages}
    </span>
    <MainActionButton
      variant="secondary"
      onClick={onNext}
      disabled={currentPage >= totalPages}
    >
      Next
    </MainActionButton>
  </div>
);

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
};

Pagination.defaultProps = {
  currentPage: 1,
  totalPages: 1,
  onPrevious: () => {},
  onNext: () => {},
};

export default Pagination;
