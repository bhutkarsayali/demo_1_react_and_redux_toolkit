import { Provider } from "react-redux";
import "./App.css";
import Home from "./Home";
import appStore from "./redux-store/store";
import Cart from "./Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainHome from "./MainHome";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<MainHome />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
