import React from 'react';
import styled, { keyframes } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardWrapper = styled(CSSTransition)`
  .card-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  .card-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms, transform 300ms;
  }
`;

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
  width: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
  animation: ${slideIn} 0.3s ease;
`;

const Image = styled.img`
  height: 20rem;
  width: 100%;
  border-top-left-radius: 5px;
`;

const Title = styled.h3`
  font-size: 1.5em;
  margin: 10px 0;
`;

const Description = styled.p`
  color: #555;
`;

const Price = styled.p`
  font-weight: bold;
`;

const Category = styled.p`
  color: #888;
`;

const Cards = ({ item }) => {
  if (!item) {
    return null;
  }

  return (
    <CardWrapper in={true} appear={true} timeout={300}>
      <CardContainer>
        <Image src={item.image} alt={item.title} />
        <Title>{item.title}</Title>
        <Description>{item.description}</Description>
        <Price>Price: ${item.price}</Price>
        <Category>Category: {item.category}</Category>
      </CardContainer>
    </CardWrapper>
  );
};

export default Cards;
