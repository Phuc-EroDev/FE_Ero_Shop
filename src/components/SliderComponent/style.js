import Slider from 'react-slick';
import styled from "styled-components";

export const WrapperSliderStyle = styled(Slider)`
    margin-bottom: 30px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    
    & .slick-slide {
        img {
            object-fit: cover;
            max-height: 400px;
            width: 100%;
            
            @media (max-width: 768px) {
                max-height: 300px;
            }
            
            @media (max-width: 576px) {
                max-height: 200px;
            }
        }
    }
    
    & .slick-dots {
        z-index: 1;
        bottom: 10px !important;
        
        li {
            margin: 0 3px;
            
            button {
                &::before {
                    color: #C68642;
                    opacity: 0.7;
                    font-size: 10px;
                }
            }
            
            &.slick-active {
                button {
                    &::before {
                        color: #C68642;
                        opacity: 1;
                    }
                }
            }
        }
        
        @media (max-width: 576px) {
            bottom: 5px !important;
            
            li {
                margin: 0 2px;
                
                button {
                    &::before {
                        font-size: 8px;
                    }
                }
            }
        }
    }
    
    @media (max-width: 768px) {
        margin-bottom: 20px;
    }
    
    @media (max-width: 576px) {
        margin-bottom: 15px;
    }
`