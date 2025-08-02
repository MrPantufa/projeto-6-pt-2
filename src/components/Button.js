import styled from 'styled-components';

export const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 2rem;
  font-family: ${props => props.theme.fonts.body};
  cursor: pointer;
  font-size: 1rem;
`;