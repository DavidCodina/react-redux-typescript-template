import React            from 'react';
import RepositoriesList from './components/RepositoriesList';
import './App.css';


const App: React.FC = () => {
  return (
    <React.Fragment>
      <h2 className="text-white-3d py-5 text-center">NPM Searcher</h2>
      <RepositoriesList />
    </React.Fragment>
  );
}


export default App;
