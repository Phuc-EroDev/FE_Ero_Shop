import styled from 'styled-components';

export const TypeProductContainer = styled.div`
  padding: 0;
  background-color: #1a1a1a;
  border: 2px solid #c68642;
  border-radius: 16px;
  margin: 20px 0;
`;

export const TypeProductWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 0;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #c68642;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const TypeProductGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: nowrap;
  overflow: hidden;
  width: 100%;

  @media (max-width: 1200px) {
    overflow-x: auto;
    justify-content: flex-start;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 768px) {
    gap: 8px;
    padding: 0 5px;
  }
`;

export const TypeProductItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px;
  border-radius: 12px;
  background-color: #2a2a2a;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  flex: 1;
  max-width: 110px;
  min-width: 90px;
  border: 1px solid #404040;

  &:hover {
    transform: translateY(-3px);
    background-color: #333333;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    border-color: #555555;
  }

  @media (max-width: 1200px) {
    flex: 0 0 auto;
    min-width: 100px;
  }

  @media (max-width: 768px) {
    padding: 12px 8px;
    min-width: 85px;
    max-width: 85px;
  }
`;

export const TypeProductImage = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #404040;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${TypeProductItem}:hover & img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

export const TypeProductName = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;
