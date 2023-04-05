import { Suspense } from 'react';
import { Container, Header, Link } from 'components/App.styled';
import { Outlet } from 'react-router-dom';
import Spinner from 'components/Loader/Loader';
export const Layout = () => {
  return (
    <Container>
      <Header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
        </nav>
      </Header>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </Container>
  );
};
