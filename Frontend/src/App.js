import logo from './logo.svg';
import './App.css';
import Home from './component/page/home';
import Region from './component/template/region';
import { decrement, increment } from './features/counter/counterSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const value = useSelector((state)=>state.counter.value)
  const dispatch = useDispatch()
  return (
        // <Region></Region>
        // <Home></Home>
        <div>
          <button onClick={()=> dispatch(decrement())}>-</button> 
          <label>{value}</label>
          <button onClick={()=> dispatch(increment())}>+</button>
        </div>
   
  );
}

export default App;
