import styled from 'styled-components';

export const ProductDetailsContainer = styled.div`
  padding: 0 120px;
  margin: 0 auto;
  background-color: #333131;
  width: 100%;
  min-height: 100vh;
  
  @media (max-width: 1200px) {
    padding: 0 80px;
    margin-top: -8px;
  }
  
  @media (max-width: 768px) {
    padding: 0 40px;
    margin-top: -8px;
  }
  
  @media (max-width: 576px) {
    padding: 0 16px;
    margin-top: -8px;
  }
`;

export const BreadcrumbWrapper = styled.h5`
  padding: 8px 0;
  font-size: 16px;
  color: #e0e0e0;
`;

export const BreadcrumbLink = styled.span`
  color: #C68642;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
`;
