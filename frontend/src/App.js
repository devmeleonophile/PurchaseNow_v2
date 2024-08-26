import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Container } from "react-bootstrap";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";
function App() {

return (
    <div className="App">
      <>
        <Header/>
        <main className="py-3">
        <Container >
          <Outlet/>
        </Container>
        </main>
        <Footer/>
        <ToastContainer/>

      </>
    </div>
  );
}
export default App;
