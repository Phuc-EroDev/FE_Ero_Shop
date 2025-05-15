import Slider from 'react-slick';
import styled from "styled-components";

export const WrapperSliderStyle = styled(Slider)`
    & .slick-dots {
        z-index: 1;
        bottom: -2px !important;
        li {
            button {
                &::before {
                    color: #C68642;
                }
            }
        }
    }
`