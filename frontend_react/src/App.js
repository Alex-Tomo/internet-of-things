import {BrowserRouter, Routes, Route} from "react-router-dom";
import Settings from "./components/Settings.js";
import Home from "./components/Home.js";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<h1>This is not the pig you are looking for...</h1>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
