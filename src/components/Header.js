import styled from 'styled-components';
import logo from '../assets/logo.svg';

export const HeaderContainer = styled.header`
  background: ${props => props.theme.colors.background};
  padding: 2rem 1rem;
  text-align: center;
`;

export const Logo = styled.img`
  height: 48px;
`;