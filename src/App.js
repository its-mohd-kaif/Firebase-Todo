import LandingPage from "./Components/LandingPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import DisplayTodo from "./Components/DisplayTodo";
function App() {
  return (
    <div>
      <Provider store={store}>
        <LandingPage />
        <DisplayTodo />
      </Provider>
    </div>
  );
}

export default App;
