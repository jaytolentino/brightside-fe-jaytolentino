import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import PatientsListPage from './PatientsListPage';
import Nav from './Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient()

const Container = ({ children }) => <div className='h-screen overflow-auto bg-gray-400'>{children}</div>;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path='/' element={<PatientsListPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </QueryClientProvider>
  );
}

export default App;



