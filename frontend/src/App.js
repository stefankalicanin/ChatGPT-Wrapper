import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion"
import Admin from "./pages/Admin"
import { ChakraProvider } from '@chakra-ui/react'

export default function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/user' element={<AskQuestion/>}/>
            <Route path='/admin' element={<Admin/>}/>
          </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
