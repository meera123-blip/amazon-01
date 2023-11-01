import { useState } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const Logo = styled.img`
  height: 4rem;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  margin-right: 1rem;
  list-style: none;
`;

const MobileMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenuList = styled.div`
  display: ${(props) => (props.menuOpen ? 'flex' : 'none')};
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-top: 1rem;
`;

const MenuButton = styled.button`
  display: block;
  @media (min-width: 769px) {
    display: none;
  }
`;

const MenuIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <NavbarContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo src="https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png" alt="logo" />

        <NavList>
          <NavItem>Features</NavItem>
          <NavItem>Exchanges</NavItem>
          <NavItem>How it Works?</NavItem>
          <NavItem>Blog</NavItem>
          <NavItem>About us</NavItem>
        </NavList>

        <MobileMenu>
          {/* <Logo src="https://www.koinx.com/_next/static/media/Logo.5f2ad8d5.svg" alt="logo" /> */}

          <MenuButton onClick={toggleMenu}>
            <MenuIcon
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </MenuIcon>
          </MenuButton>
        </MobileMenu>
      </div>

      <MobileMenuList menuOpen={menuOpen}>
        <div>Features</div>
        <div>Exchanges</div>
        <div>How it Works?</div>
        <div>Blog</div>
        <div>
          <button>Sign in</button>
        </div>
      </MobileMenuList>
    </NavbarContainer>
  );
};

export default Navbar;
