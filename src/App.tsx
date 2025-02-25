import "./App.css";
import Header from "./Components/Header";
import Form from "./Components/Form";
import Todos from "./Components/Todos";
import Section from "./Components/Section";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Form />
        <Todos />
        <Section />
      </main>
      <Footer />
    </>
  );
}

export default App;
