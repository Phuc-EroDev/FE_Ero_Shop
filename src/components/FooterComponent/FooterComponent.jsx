import React from 'react';
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import {
  FooterBottom,
  FooterContact,
  FooterContent,
  FooterDescription,
  FooterLink,
  FooterLinkItem,
  FooterLinks,
  FooterSection,
  FooterSocial,
  FooterSubtitle,
  FooterTitle,
  FooterWrapper,
  SocialIcon,
} from './style';

const FooterComponent = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <FooterTitle>ERO-SHOP</FooterTitle>
          <FooterDescription>
            Cửa hàng thương mại điện tử hàng đầu, mang đến sản phẩm chất lượng cao, giá cả cạnh tranh, dịch vụ tận tâm.
          </FooterDescription>
          <FooterSocial>
            <SocialIcon>
              <FacebookOutlined />
            </SocialIcon>
            <SocialIcon>
              <InstagramOutlined />
            </SocialIcon>
            <SocialIcon>
              <YoutubeOutlined />
            </SocialIcon>
          </FooterSocial>
        </FooterSection>

        <FooterSection>
          <FooterSubtitle>Liên kết nhanh</FooterSubtitle>
          <FooterLinks>
            <FooterLinkItem>
              <FooterLink href="/">Trang chủ</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink>Giới thiệu</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink>Sản phẩm</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink>Liên hệ</FooterLink>
            </FooterLinkItem>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterSubtitle>Dịch vụ</FooterSubtitle>
          <FooterLinks>
            <FooterLinkItem>
              <FooterLink>Kinh doanh các sản phẩm chất lượng cao</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink>Dịch vụ phần mềm</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink>Tư vấn nhiệt tình, chuyên nghiệp</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink>Chính sách hậu mãi, bảo hành dài hạn</FooterLink>
            </FooterLinkItem>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterSubtitle>Liên hệ</FooterSubtitle>
          <FooterContact>
            <p>+84 123 456 789</p>
            <p>phucvo140902@gmail.com</p>
            <p>144 Nguyễn Lương Bằng, Đà Nẵng</p>
          </FooterContact>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>&copy; 2025. Bản quyền thuộc về ERO-SENNIN.</p>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default FooterComponent;
