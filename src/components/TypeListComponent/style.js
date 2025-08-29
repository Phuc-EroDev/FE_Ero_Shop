import styled from 'styled-components';

export const WrapperTypeList = styled.div`
  width: 100%;
  padding: 24px 16px;
  background: linear-gradient(145deg, #3a3a3a 0%, #2a2a2a 100%);
  border-radius: 12px;
  height: 100%;

  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

export const WrapperTitle = styled.h3`
  color: #d4a574;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(212, 165, 116, 0.3);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #c68642, #d4a574);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

export const WrapperTypeItem = styled.div`
  padding: 14px 20px;
  margin-bottom: 12px;
  background: ${(props) =>
    props.$isSelected
      ? 'linear-gradient(135deg, #C68642 0%, #D4A574 100%)'
      : 'linear-gradient(145deg, #404040 0%, #333333 100%)'};
  color: ${(props) => (props.$isSelected ? '#fff' : '#cccccc')};
  border-radius: 10px;
  cursor: pointer;
  font-weight: ${(props) => (props.$isSelected ? '600' : '500')};
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid ${(props) => (props.$isSelected ? '#C68642' : '#555555')};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: ${(props) =>
      props.$isSelected
        ? 'linear-gradient(135deg, #B57A38 0%, #C68642 100%)'
        : 'linear-gradient(145deg, #4a4a4a 0%, #3a3a3a 100%)'};
    transform: translateX(6px) scale(1.02);
    box-shadow: 0 8px 25px rgba(198, 134, 66, 0.15);
    border-color: #c68642;
    color: ${(props) => (props.$isSelected ? '#fff' : '#ffffff')};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateX(3px) scale(0.98);
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 13px;
    margin-bottom: 10px;

    &:hover {
      transform: translateX(3px) scale(1.01);
    }
  }
`;
