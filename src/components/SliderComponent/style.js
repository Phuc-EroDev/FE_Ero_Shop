import Slider from 'react-slick';
import styled from "styled-components";

export const WrapperSliderStyle = styled(Slider)`
    position: relative;
    border-radius: 8px;
    overflow: hidden; /* keep dots and images inside rounded corners */

    /* ensure inner list respects radius */
    .slick-list {
      border-radius: inherit;
    }

    & .slick-dots {
        z-index: 1;
        bottom: 12px !important;
        li {
            margin: 0 3px;
            
            button {
                &::before {
                    color: #C68642;
                    opacity: 0.7;
                    font-size: 10px;
                }
            }
        }
    }
    
        .slide-item {
            padding: 0; /* remove bottom padding that pushed dots below image */
        }
    
        .slide-image {
            height: 420px !important;
        }

        @media (max-width: 992px) {
            .slide-image {
                height: 360px !important;
            }
        }

        @media (max-width: 768px) {
            .slide-image {
                height: 260px !important;
            }
        }

        @media (max-width: 576px) {
            .slide-image {
                height: 200px !important;
            }
            & .slick-dots {
                bottom: 8px !important; /* still inside on mobile */
            }
        }
`