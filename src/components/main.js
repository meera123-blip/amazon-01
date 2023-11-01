import React, { useState } from 'react';
import Data from '../Data.json';
import Cards from './cards';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

// Styled components
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 768px) {
    flex-direction: row;
    margin-top: 10px;
    padding: 2px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const SidebarItem = styled.div`
  margin: 10px;
  @media (max-width: 768px) {
    margin: 0 10px;
  }
`;

const PageNumbers = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  justify-content: center;
  margin: 20px 0;
`;

const PageNumberItem = styled.li`
  margin: 0 5px;
  cursor: pointer;
  border: 1px solid #4caf50;
  border-radius: 5px;
  padding: 5px 10px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #4caf50;
    color: #ffffff;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
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
const Checkbox = styled.input`
  margin-right: 8px; 
  width: 15px;
  height: 15px;
  border: 2px solid #4caf50;
  border-radius: 3px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
 
`;

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const itemsPerPage = 6;

  const filteredData = selectedCategory === 'All' ? Data : Data.filter(item => item.category === selectedCategory);

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortType === 'asc') {
      return a.price - b.price;
    } else if (sortType === 'desc') {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(sortedData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === 'All') {
      setSortType(null);
    }
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <PageNumberItem
        key={number}
        id={number}
        onClick={handleClick}
      >
        {number}
      </PageNumberItem>
    );
  });
  const categories = ['All', 'Electronics', 'Clothing', 'Home & Kitchen', 'Beauty'];

  const handleSortChange = (type) => {
    setSortType(type);
  };

  return (
    <MainContainer>
      <SidebarContainer>
        <SidebarItem>
          {categories.map((category, index) => (
            <label key={index}>
              <Checkbox
                type="checkbox"
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </SidebarItem>
        <SidebarItem>
          <Select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="">Sort by</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </Select>
        </SidebarItem>
      </SidebarContainer>
      <Container>
        {currentItems.map((item, index) => (
          <CardWrapper key={index} in={true} appear={true} timeout={300}>
            <Cards item={item} />
          </CardWrapper>
        ))}
      </Container>
      <PageNumbers>{renderPageNumbers}</PageNumbers>
    </MainContainer>
  );
};

export default Main;
