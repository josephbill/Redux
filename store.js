import { configureStore } from '@reduxjs/toolkit'
//getting the info 
const store = configureStore({ reducer: counterReducer })

console.log(store.getState())
// {value: 0}


//dipatch 
store.dispatch({ type: 'counter/increment' })

console.log(store.getState())
// {value: 1}

//calling using action creators 
const increment = () => {
    return {
      type: 'counter/increment'
    }
  }
  
  store.dispatch(increment())
  
  console.log(store.getState())
  // {value: 2}

