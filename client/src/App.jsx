// client/src/App.jsx
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3 container mx-auto px-4">
        {/* Outlet renders the page content based on the URL */}
        <Outlet /> 
      </main>
    </>
  );
};

export default App;