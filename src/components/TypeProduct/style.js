import styled from 'styled-components';

export const TypeProductContainer = styled.div`
  padding: 0;
  background-color: #1a1a1a;
  border: 2px solid #c68642;
  border-radius: 16px;
  margin: 20px 0;
  
  @media (max-width: 768px) {
    border-radius: 12px;
    margin: 15px 0;
  }
  
  @media (max-width: 576px) {
    border-width: 1px;
    border-radius: 10px;
    margin: 10px 0;
  }
`;

export const TypeProductWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 0;
  
  @media (max-width: 768px) {
    padding: 20px 0;
  }
  
  @media (max-width: 576px) {
    padding: 15px 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #c68642;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: left;
  padding-left: 20px;
  
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 18px;
    letter-spacing: 0.8px;
    padding-left: 15px;
  }
  
  @media (max-width: 576px) {
    font-size: 16px;
    margin-bottom: 15px;
    letter-spacing: 0.5px;
    padding-left: 12px;
  }
`;

export const TypeProductGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
  padding: 5px 10px;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  
  &:after {
    content: '';
    padding-right: 10px;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  @media (max-width: 768px) {
    gap: 10px;
    padding: 5px 15px;
    justify-content: flex-start;
  }
  
  @media (max-width: 576px) {
    gap: 8px;
    padding: 5px 12px;
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
  flex: 0 0 auto;
  width: 100px;
  border: 1px solid #404040;

  &:hover {
    transform: translateY(-3px);
    background-color: #333333;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    border-color: #555555;
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 992px) {
    width: 90px;
    padding: 12px 8px;
  }

  @media (max-width: 768px) {
    width: 80px;
    padding: 10px 6px;
    border-radius: 10px;
  }
  
  @media (max-width: 576px) {
    width: 70px;
    padding: 8px 5px;
    border-radius: 8px;
  }
  
  @media (max-width: 375px) {
    width: 65px;
  }
`;

export const TypeProductImage = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #404040;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  ${TypeProductItem}:hover & img {
    transform: scale(1.05);
  }

  @media (max-width: 992px) {
    width: 55px;
    height: 55px;
    margin-bottom: 8px;
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    margin-bottom: 8px;
    border-radius: 6px;
  }
  
  @media (max-width: 576px) {
    width: 45px;
    height: 45px;
    margin-bottom: 6px;
    border-radius: 6px;
  }
  
  @media (max-width: 375px) {
    width: 40px;
    height: 40px;
  }
`;

export const TypeProductName = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  line-height: 1.2;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  @media (max-width: 576px) {
    font-size: 11px;
    line-height: 1.2;
  }
  
  @media (max-width: 576px) {
    font-size: 10px;
    line-height: 1.1;
  }
  
  @media (max-width: 375px) {
    font-size: 9px;
    -webkit-line-clamp: 1;
  }
`;
