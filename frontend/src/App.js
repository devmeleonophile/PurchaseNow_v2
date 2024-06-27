import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Container } from "react-bootstrap";
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
      </>
    </div>
  );
}
export default App;
