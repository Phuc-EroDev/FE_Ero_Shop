import styled, { keyframes } from 'styled-components';

// Keyframes cho animation
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(198, 134, 66, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(198, 134, 66, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(198, 134, 66, 0);
  }
`;

export const SectionWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  background-color: #2a2929;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid #3b3a38;
  animation: ${fadeInUp} 0.8s ease-out;
  transition: all 0.3s ease;

  &:hover {
    border-color: #c68642;
    box-shadow: 0 4px 20px rgba(198, 134, 66, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 15px 0;
    margin: 15px 0;
  }
  
  @media (max-width: 480px) {
    padding: 10px 0;
    margin: 10px 0;
    border-radius: 6px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
  animation: ${slideInLeft} 0.6s ease-out 0.2s both;
  
  @media (max-width: 768px) {
    padding: 0 15px;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 0 10px;
    margin-bottom: 10px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #c68642;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:hover {
    color: #d79334;
    text-shadow: 0 0 10px rgba(198, 134, 66, 0.3);
    transform: translateX(5px);
  }
  
  @media (max-width: 992px) {
    font-size: 18px;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    letter-spacing: 0.8px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    letter-spacing: 0.5px;
    font-weight: 600;
  }
  
  @media (max-width: 375px) {
    font-size: 13px;
    letter-spacing: 0.3px;
  }
`;

export const ViewAllLink = styled.span`
  font-size: 14px;
  color: #c68642;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #d79334;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #d79334;
    transform: translateX(-5px);

    &::after {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 11px;
  }
  
  @media (max-width: 375px) {
    font-size: 10px;
  }
`;
export const ProductsContainer = styled.div`
  position: relative;
  padding: 0 20px;
  animation: ${slideInRight} 0.6s ease-out 0.4s both;
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
  
  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

// Animation for horizontal slide transition
const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const ProductsGrid = styled.div`
  display: ${(props) => (props.$ismultitype ? 'grid' : 'flex')};
  grid-template-columns: ${(props) => (props.$ismultitype ? 'repeat(6, 1fr)' : 'none')};
  grid-template-rows: ${(props) => (props.$ismultitype ? 'repeat(3, 1fr)' : 'none')};
  gap: 16px;
  overflow-x: ${(props) => (props.$ismultitype ? 'visible' : 'auto')};
  scroll-behavior: smooth;
  padding: 10px 0;
  animation: ${slideInFromRight} 0.4s ease-out;
  
  /* For non-multitype, make it a horizontal scroll with fixed card width */
  ${(props) =>
    !props.$ismultitype &&
    `
    flex-wrap: nowrap;
    align-items: stretch;
    overflow-x: auto;
    width: 100%;
    padding-bottom: 15px;
    `
  }

  /* Hide scrollbar for flex layout */
  ${(props) =>
    !props.$ismultitype &&
    `
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `}

  /* Responsive grid */
  @media (max-width: 1200px) {
    ${(props) =>
    props.$ismultitype &&
    `
      grid-template-columns: repeat(4, 1fr);
    `}
  }

  @media (max-width: 992px) {
    ${(props) =>
    props.$ismultitype &&
    `
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: auto;
    `}
  }

  @media (max-width: 768px) {
    gap: 12px;
    ${(props) =>
    props.$ismultitype &&
    `
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto;
    `}
  }

  @media (max-width: 480px) {
    gap: 8px;
    padding: 5px 0;
    
    ${(props) =>
    props.$ismultitype &&
    `
      grid-template-columns: repeat(2, 1fr);
    `}
  }
`;

export const NavigationContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  ${(props) => props.$position}: ${(props) => props.$position === 'left' ? '0' : '0'};
  opacity: 0;
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    ${(props) => props.$position}: ${(props) => (props.$position === 'left' ? '5px' : '5px')};
    opacity: 0.6;
    display: block;
  }
  
  @media (max-width: 480px) {
    ${(props) => props.$position}: ${(props) => (props.$position === 'left' ? '0' : '0')};
    display: ${(props) => (props.$position === 'right' ? 'block' : 'block')};
  }

  ${ProductsContainer}:hover & {
    opacity: 1;
  }
`;

export const NavigationButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: rgba(60, 60, 60, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #cccccc;
  transform: scale(0.9);

  &:hover:not(:disabled) {
    background-color: #c68642;
    color: #ffffff;
    transform: scale(1.1);
    animation: ${pulse} 1.5s infinite;
    box-shadow: 0 4px 15px rgba(198, 134, 66, 0.4);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
    animation: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
    background-color: rgba(60, 60, 60, 0.5);

    &:hover {
      transform: scale(0.9);
      animation: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
  }

  svg {
    font-size: 16px;
    transition: transform 0.3s ease;
  }

  &:hover:not(:disabled) svg {
    transform: translateX(${(props) => (props.$direction === 'right' ? '2px' : '-2px')});
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    
    svg {
      font-size: 14px;
    }
  }
  
  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    
    svg {
      font-size: 12px;
    }
  }
`;

// Animation for card hover
const cardFloat = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const cardGlow = keyframes`
  0% {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  50% {
    box-shadow: 0 8px 25px rgba(198, 134, 66, 0.3);
  }
  100% {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const CardWrapper = styled.div`
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  /* For non-multitype layout (horizontal scroll) */
  ${({ $ismultitype }) => !$ismultitype && `
    width: 200px;
    flex: 0 0 auto;
  `}

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(198, 134, 66, 0.1),
      transparent,
      rgba(198, 134, 66, 0.1),
      transparent
    );
    border-radius: 10px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    animation: ${cardFloat} 2s ease-in-out infinite;

    &::before {
      opacity: 1;
      animation: ${cardGlow} 2s ease-in-out infinite;
    }
  }

  &:active {
    transform: translateY(-4px) scale(1.01);
  }

  @media (max-width: 768px) {
    ${({ $ismultitype }) => !$ismultitype && `
      width: 180px;
    `}
  }

  @media (max-width: 480px) {
    ${({ $ismultitype }) => !$ismultitype && `
      width: 160px;
    `}
  }
`;
