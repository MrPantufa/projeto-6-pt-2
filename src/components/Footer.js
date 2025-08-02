import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.background};
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.primary};
`;

export const SocialLinks = styled.div`
  margin: 0.5rem 0;
  a {
    margin: 0 0.5rem;
    color: ${props => props.theme.colors.primary};
    font-size: 1.25rem;
  }
`;

// Usage: <FaGithub />, <FaLinkedin />, <FaInstagram />
