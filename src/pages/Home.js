import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import pattern from '../assets/pattern.svg';
import axios from 'axios';
import { Button } from '../components/Button';
import { HeaderContainer, Logo } from '../components/Header';
import { FooterContainer } from '../components/Footer';

const Nav = styled.nav`
  background: ${p => p.theme.colors.background} url(${pattern}) repeat;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
`;
const NavLink = styled(Link)`
  color: ${p => p.theme.colors.primary};
  font-weight: bold;
  text-decoration: none;
`;
const Hero = styled.section`
  background: ${p => p.theme.colors.background} url(${pattern}) repeat;
  text-align: center;
  padding: 4rem 1rem;
`;
const TitleHero = styled.h1`
  color: ${p => p.theme.colors.primary};
  margin: 0;
`;
const Main = styled.main`
  padding: 2rem;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;
const Card = styled.div`
  border: 1px solid ${p => p.theme.colors.primary};
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
`;
const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;
const CardContent = styled.div`
  padding: 1rem;
`;
const CardTitle = styled.h2`
  margin: 0 0 0.5rem;
  color: ${p => p.theme.colors.text};
`;
const CardDesc = styled.p`
  margin: 0 0 1rem;
  color: ${p => p.theme.colors.text};
`;

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://ebac-fake-api.vercel.app/api/efood/restaurantes')
      .then(res => setRestaurants(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando restaurantes…</p>;

  return (
    <>
      <Nav>
        <NavLink to="/">Restaurantes</NavLink>
        <NavLink to="/">
          <Logo src={require('../assets/logo.svg').default} alt="efood" />
        </NavLink>
        <NavLink to="/">0 produto(s) no carrinho</NavLink>
      </Nav>
      <Hero>
        <TitleHero>Viva experiências gastronômicas no conforto da sua casa</TitleHero>
      </Hero>
      <Main>
        <Grid>
          {restaurants.map(r => (
            <Card key={r.id}>
              <CardImage src={r.capa} alt={r.titulo} />
              <CardContent>
                <CardTitle>{r.titulo}</CardTitle>
                <CardDesc>{r.descricao}</CardDesc>
                <Button as={Link} to={`/restaurant/${r.id}`}>Saiba mais</Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Main>
      <FooterContainer />
    </>
  );
}
