import './App.css';
import { Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import UserInputDataParent from './components/UserInputDataParent';

function App() {
  return (
    <div className="app">
      <NavBar />
      <UserInputDataParent />
    </div>
  );
}

export default App;