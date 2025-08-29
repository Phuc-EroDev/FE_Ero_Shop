import styled from 'styled-components';

export const WrapperProducts = styled.div`
  width: 100%;

  .ant-row {
    margin: 0;
  }

  .ant-col {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }

  /* Ensure all Ant Design components have dark theme */
  .ant-empty {
    .ant-empty-description {
      color: #cccccc;
    }

    .ant-empty-image svg {
      opacity: 0.6;
    }
  }

  /* Loading components */
  .ant-spin {
    .ant-spin-dot-item {
      background-color: #c68642;
    }
  }

  .ant-pagination {
    background: linear-gradient(145deg, #3a3a3a 0%, #2a2a2a 100%);
    padding: 24px 30px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    border: 1px solid #444444;
    margin-top: 30px;

    .ant-pagination-total-text {
      color: #cccccc;
      font-weight: 500;
    }

    .ant-pagination-item {
      border: 1px solid #555555;
      background-color: #333333;
      border-radius: 8px;
      transition: all 0.3s ease;
      min-width: 40px;
      height: 40px;
      line-height: 38px;

      &:hover {
        border-color: #c68642;
        background-color: #404040;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(198, 134, 66, 0.25);
      }

      a {
        color: #cccccc;
        transition: color 0.3s ease;
        font-weight: 500;

        &:hover {
          color: #d4a574;
        }
      }
    }

    .ant-pagination-item-active {
      border-color: #c68642;
      background: linear-gradient(135deg, #c68642 0%, #d4a574 100%);
      box-shadow: 0 4px 15px rgba(198, 134, 66, 0.4);

      a {
        color: #fff;
        font-weight: 700;
      }

      &:hover {
        border-color: #c68642;
        background: linear-gradient(135deg, #b57a38 0%, #c68642 100%);
        transform: translateY(-2px);
      }
    }

    .ant-pagination-jump-prev:hover .ant-pagination-item-link-icon,
    .ant-pagination-jump-next:hover .ant-pagination-item-link-icon {
      color: #d4a574;
    }

    .ant-pagination-prev,
    .ant-pagination-next {
      .ant-pagination-item-link {
        background-color: #333333;
        border: 1px solid #555555;
        color: #cccccc;
        border-radius: 8px;
        transition: all 0.3s ease;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          color: #d4a574;
          border-color: #c68642;
          background-color: #404040;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(198, 134, 66, 0.25);
        }
      }
    }

    .ant-pagination-options {
      .ant-select-selector {
        background-color: #333333;
        border: 1px solid #555555;
        color: #cccccc;
        border-radius: 8px;
        transition: all 0.3s ease;
        height: 40px;

        &:hover,
        &:focus {
          border-color: #c68642;
          background-color: #404040;
          box-shadow: 0 0 0 2px rgba(198, 134, 66, 0.2);
        }

        .ant-select-selection-item {
          color: #cccccc;
          line-height: 38px;
        }
      }

      .ant-select-arrow {
        color: #cccccc;

        &:hover {
          color: #d4a574;
        }
      }
    }

    .ant-pagination-simple-pager {
      input {
        background-color: #333333;
        border: 1px solid #555555;
        color: #cccccc;
        border-radius: 6px;

        &:hover,
        &:focus {
          border-color: #c68642;
          background-color: #404040;
        }
      }
    }
  }
`;

export const WrapperTitle = styled.h2`
  color: #d4a574;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
  padding: 12px 30px;
  background: linear-gradient(145deg, #3a3a3a 0%, #2a2a2a 100%);
  border-radius: 12px;
  border: 1px solid #444444;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, #c68642, #d4a574);
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(198, 134, 66, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 24px;
    padding: 20px 20px;
  }

  @media (max-width: 576px) {
    font-size: 20px;
    margin-bottom: 20px;
    padding: 16px 15px;
  }
`;
