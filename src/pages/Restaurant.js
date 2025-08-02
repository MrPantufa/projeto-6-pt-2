import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import pattern from '../assets/pattern.svg';
import peixeImg from '../assets/peixe.jpg';
import pizzaImg from '../assets/pizza.jpg';
import { Button } from '../components/Button';

// Dados estáticos
const restaurants = [
  {
    id: 1,
    name: 'Hioki Sushi',
    category: 'Japonesa',
    headerImg: peixeImg,
    dishes: Array(6).fill({
      id: 0,
      name: 'Tonkatsu de Peixe',
      image: peixeImg,
      description: 'Peixe empanado crocante servido sobre arroz temperado.',
      price: 'R$ 49,90',
      serves: 'Serve 1 pessoa'
    }).map((d, i) => ({ ...d, id: 101 + i }))
  },
  {
    id: 2,
    name: 'La Dolce Vita Trattoria',
    category: 'Italiana',
    headerImg: pizzaImg,
    dishes: Array(6).fill({
      id: 0,
      name: 'Pizza Marguerita',
      image: pizzaImg,
      description: 'A clássica Marguerita: molho de tomate, mussarela e manjericão.',
      price: 'R$ 60,90',
      serves: 'Serve 2-3 pessoas'
    }).map((d, i) => ({ ...d, id: 201 + i }))
  }
];

// Styled components (Navbar, Header, Grid, Modal...) reuse do anterior
const Nav = styled.nav`background: ${p => p.theme.colors.background} url(${pattern}) repeat;display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;`;
const NavLink = styled(Link)`color:${p => p.theme.colors.primary};font-weight:bold;text-decoration:none;`;
const LinkLogo = styled.img`height:40px;`;
const Header = styled.header`position:relative;height:250px;background-image:url(${p => p.bg});background-size:cover;background-position:center;`;
const CategoryTag = styled.span`position:absolute;top:1rem;left:1rem;color:#fff;opacity:0.8;font-size:1rem;`;
const Title = styled.h1`position:absolute;bottom:1.5rem;left:1rem;margin:0;color:#fff;font-size:2rem;`;
const Container = styled.div`padding:2rem;`;
const MenuGrid = styled.div`display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;`;
const Card = styled.div`background:${p => p.theme.colors.primary};border:3px solid ${p => p.theme.colors.primary};border-radius:8px;overflow:hidden;display:flex;flex-direction:column;`;
const Img = styled.img`width:100%;height:140px;object-fit:cover;`;
const Content = styled.div`padding:1rem;display:flex;flex-direction:column;flex:1;`;
const DishName = styled.h2`margin:0 0 0.5rem;font-size:1rem;color:#fff;`;
const Desc = styled.p`margin:0 0 1rem;font-size:0.85rem;color:#fff;flex:1;`;
const DetailsButton = styled(Button)`font-size:0.85rem;background:#fff;color:${p => p.theme.colors.primary};border:none;`;
const Backdrop = styled.div`position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;`;
const Modal = styled.div`background:${p => p.theme.colors.primary};border-radius:8px;padding:1.5rem;width:600px;color:#fff;position:relative;`;
const CloseButton = styled.button`position:absolute;top:0.5rem;right:0.5rem;background:transparent;border:none;font-size:1.25rem;color:#fff;cursor:pointer;`;
const ModalContent = styled.div`display:flex;gap:1.5rem;`;
const ModalImage = styled.img`width:250px;height:180px;object-fit:cover;border-radius:4px;`;
const ModalDetails = styled.div`flex:1;display:flex;flex-direction:column;`;
const ModalTitle = styled.h2`margin:0 0 0.5rem;`;
const ModalDesc = styled.p`flex:1;font-size:0.9rem;`;
const ModalInfo = styled.p`margin:0.5rem 0;font-weight:bold;`;
const ModalButton = styled(Button)`align-self:flex-start;margin-top:1rem;`;

export default function Restaurant() {
  const { id } = useParams();
  const [selected, setSelected] = useState(null);
  const resto = restaurants.find(r => r.id === Number(id));
  if (!resto) {
    return <p>Restaurante não encontrado</p>;
  }

  return (
    <>
      <Nav>
        <NavLink to="/">Restaurantes</NavLink>
        <NavLink to="/">
          <LinkLogo src={require('../assets/logo.svg').default} alt="efood" />
        </NavLink>
        <NavLink to="/">0 produto(s) no carrinho</NavLink>
      </Nav>

      <Header bg={resto.headerImg}>
        <CategoryTag>{resto.category}</CategoryTag>
        <Title>{resto.name}</Title>
      </Header>

      <Container>
        <MenuGrid>
          {resto.dishes.map(d => (
            <Card key={d.id}>
              <Img src={d.image} alt={d.name} />
              <Content>
                <DishName>{d.name}</DishName>
                <Desc>{d.description}</Desc>
                <DetailsButton onClick={() => setSelected(d)}>
                  Mais detalhes
                </DetailsButton>
              </Content>
            </Card>
          ))}
        </MenuGrid>
      </Container>

      {selected && (
        <Backdrop onClick={() => setSelected(null)}>
          <Modal onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setSelected(null)}>×</CloseButton>
            <ModalContent>
              <ModalImage src={selected.image} alt={selected.name} />
              <ModalDetails>
                <ModalTitle>{selected.name}</ModalTitle>
                <ModalDesc>{selected.description}</ModalDesc>
                <ModalInfo>{selected.serves}</ModalInfo>
                <ModalButton>
                  Adicionar ao carrinho – {selected.price}
                </ModalButton>
              </ModalDetails>
            </ModalContent>
          </Modal>
        </Backdrop>
      )}
    </>
  );
}
