PART 1 : Introductions and Terminologies.

- Redux : Redux is a pattern and library for managing and updating application state, using events
 called "actions"
- It serves as a centralized store for state that needs to be used across your entire application, 
with rules ensuring that the state can only be updated in a predictable fashion.
-  Redux guides you towards writing code that is predictable and testable, 

- Redux is more useful when:

You have large amounts of application state that are needed in many places in the app
The app state is updated frequently over time
The logic to update that state may be complex
The app has a medium or large-sized codebase, and might be worked on by many people

- # Redux libraries and tools. 
1. React-Redux : lets  React components interact with a Redux store by reading
 pieces of state and dispatching actions to update the store.

- # Redux ToolKit
1. It contains packages and functions that we think are essential for building a Redux app.

- # Redux DevTools Extension
1. The Redux DevTools Extension shows a history of the changes to the state in your Redux store over time.
 This allows you to debug your applications effectively,
  including using powerful techniques like "time-travel debugging".


# Reducx Terms and Concepts 

check code example here : https://redux.js.org/tutorials/essentials/part-1-overview-concepts (Counter)


What typically happens in a react basic component is this 

1. a simple react project always has a one way data flow : meaning : 
   - State : describes the condition of the app at a specific point in time 
   - UI gets rendered based off the state 
   - When an event is launched by client i.e. a  click of a button 
   - UI re-renders based off the new state 

However, the simplicity can break down when we have multiple components that need to share and 
use the same state, especially if those components are located in different parts of the application.
 Sometimes this can be solved by "lifting state up" to parent components, but that doesn't always help.

One way to solve this is to extract the shared state from the components,
and put it into a centralized location outside the component tree. 

By defining and separating the concepts involved in state management and enforcing rules that 
maintain independence between views and states, we give our code more structure and maintainability.

This is the basic idea behind Redux: 
a single centralized place to contain the global state in your application, 
and specific patterns to follow when updating that state to make the code predictable.

Lifting state up means  : sharing state is accomplished by moving it up to the closest common ancestor 
of the components that need it.

# Immutability : 
"Mutable" means "changeable". If something is "immutable", it can never be changed.

Redux expects that all state updates are done immutably.
 We'll look at where and how this is important a bit later, 
 as well as some easier ways to write immutable update logic.

 How do you update something that is immutable ? 
 1. JS objects and arrays are always mutable by default i.e. 
 if i create an object/array , I can change the contents of its fields/items. 

 i.e. 

check file changing objects and arrays changingObjectsArrays.js

This is called mutating the object or array.
 It's the same object or array reference in memory,'
 but now the contents inside the object have changed.


In order to update values immutably, 
your code must make copies of existing objects/arrays, and then modify the copies.

e.g. check changingImmutableObjectsArrays.js

# Redux Terminologies 
Actions : An action is a plain JavaScript object that has a type field. 
You can think of an action as an event that describes something that happened in the application.

The type field should be a string that gives this action a descriptive name, like "todos/todoAdded". 
We usually write that type string like "domain/eventName", where the first part is the 
feature or category that this action belongs to, and the second part is the specific thing that happened.

An action object can have other fields with additional information about what happened. 
By convention, we put that information in a field called payload.

A typical action object might look like this:

const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}

# Action Creators 
An action creator is a function that creates and returns an action object. 
We typically use these so we don't have to write the action object by hand every time:


const addTodo = text => {
  return {
    type: 'todos/todoAdded',
    payload: text
  }
}


#Reducers
A reducer is a function that receives the current state and an action object,
decides how to update the state if necessary,
and returns the new state: (state, action) => newState. 
You can think of a reducer as an event listener which handles events based on the received action (event) 
type.

Reducers Rules : 
1.They should only calculate the new state value based on the state and action arguments
2.They are not allowed to modify the existing state.
 Instead, they must make immutable updates, 
 by copying the existing state and making changes to the copied values.
3.They must not do any asynchronous logic, calculate random values, or cause other "side effects"


The logic inside reducer functions typically follows the same series of steps:

1. Check to see if the reducer cares about this action
2. If so, make a copy of the state, update the copy with new values, and return it
Otherwise, return the existing state unchanged

- check simpleReducer.js for a quick example. 


#Stores 
The current Redux application state lives in an object called the store .
The store is created by passing in a reducer, 
and has a method called getState that returns the current state value:

- check store.js :  counterReducer is the function in the file simpleReducer.js

#Dispatch 
The Redux store has a method called dispatch. 
The only way to update the state is to call store.dispatch() and pass in an action object. 

- check store.js 

You can think of dispatching actions as "triggering an event" in the application.
 Something happened, and we want the store to know about it. 
Reducers act like event listeners, and when they hear an action they are interested in, 
they update the state in response.


# Selectors 

Selectors are functions that know how to extract specific pieces of information from a store state value.
 As an application grows bigger,
  this can help avoid repeating logic as different parts of the app need to read the same data:

  e.g.

  const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)

# Redux Data Flow 
For Redux specifically, we can break these steps into more detail:

1. Initial setup:

A Redux store is created using a root reducer function

The store calls the root reducer once, and saves the return value as its initial state

When the UI is first rendered,
UI components access the current state of the Redux store,and use that data to decide what to render. 
They also subscribe to any future store updates so they can know if the state has changed.

2. Updates:

Something happens in the app, such as a user clicking a button

The app code dispatches an action to the Redux store, like dispatch({type: 'counter/increment'})

The store runs the reducer function again with the previous state and the current action,
 and saves the return value as the new state

The store notifies all parts of the UI that are subscribed that the store has been updated

Each UI component that needs data from the store checks to see if the parts of the state 
they need have changed.
Each component that sees its data has changed forces a re-render with the new data,
 so it can update what's shown on the screen



-----------------------------------------------------------------------------------------------------------

PART TWO : APP STRUCTURE 

Counter APP example : https://redux.js.org/tutorials/essentials/part-2-app-structure
Project ReactRedux Example. 

1. The project is set up with all the required tools and files using react redux 
2. To test the app : ensure the react devtoolkit exetension is present in ur browser 
3. Open dev tools in browser, select the redux tab and click the state button to check on updates on the initial
state being tested. 
4. Toggle between the state and diff tab to check on updates 

In an active page as per our example 

1. The user clicks the + button to increment the value. In redux an action type i.e. sth like 
"counter/increment" is dispatched to the store 
2. When the action is dispatched the store looks for the reducer function and checks whether redux cares for it 
3. If not it proceeds to re-render using the intial state , if so it updates the state to new value 


# A project with redux will look like  : as per project template above 
/src 
  - index.js : starting point 
  - app.js : top level component
  - /app
     - store.js : creates the redux store instance 
  - /features 
     - /counter 
        - counter.js : react component for the counter feature 
        - counterSlice.js : redux logic for the counter feature  

# Creating a Redux Store 
  - Open up app/store.js in counter project : 

  import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
  (feature name)  counter: counterReducer (function name)
  }
})

1. A redux store is created using the configureStore from Redux toolkit 
2. configureStore requires we pass in the reducer as arguments
3. each feature in our app should have its own reducer function 

- In the project We have a file named features/counter/counterSlice.js that exports a reducer function for the
 counter logic. We can import that counterReducer function here, and include it when we create the store.

- configureStore automatically adds several middleware to the store setup by default to provide a good developer
 experience, and also sets up the store so that the Redux DevTools Extension can inspect its contents.

# Redux Slices 

- A "slice" is a collection of Redux reducer logic and actions for a single feature in your app,
 typically defined together in a single file. 
 The name comes from splitting up the root Redux state object into multiple "slices" of state.

 For example for a blog app a feature like a user posts will have the following store set up 

 --------------------------------------------------------------------

import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import postsReducer from '../features/posts/postsSlice'
import commentsReducer from '../features/comments/commentsSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer
  }
})

-------------------------------------------------------------------------

# Creating slice reducers and actions 

In our counter example the counterReducer function specifies the different actions which were written by hand 
i.e. typed out , this can get tiresome for complex apps. 

Redux Toolkit has a function called createSlice, which takes care of the work of generating action type strings,
action creator functions, and action objects.

All you have to do is define a name for this slice, write an object that has some reducer functions in it,
and it generates the corresponding action code automatically. 

In addition to the name field, createSlice needs us to pass in the initial state value for the reducers,
so that there is a state the first time it gets called

- remember redux expects u change state using Immutability concepts 
- createSlice uses a library called Immer inside.
 Immer uses a special JS tool called a Proxy to wrap the data you provide, 
and lets you write code that "mutates" that wrapped data.

so instead of code looking like this : 


function handwrittenReducer(state, action) {
  return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue
        }
      }
    }
  }
}


-------------------------------------------------------------------

we get this 

function reducerWithImmer(state, action) {
  state.first.second[action.someId].fourth = action.someValue
}

---------------------------------------------------------------------

You can only write "mutating" logic in Redux Toolkit's createSlice and createReducer because they use Immer inside!
 If you write mutating logic in reducers without Immer, it will mutate the state and cause bugs!



# Writing Async Logic with Thunks 

-  all the logic in our application has been synchronous. 
- actions are dispatched -> store runs the reducer -> calculates the new state -> dispatch function finishes 
- apps will normally have async proccess like fetching data from an API 

-A thunk is a specific kind of Redux function that can contain asynchronous logic. 
Thunks are written using two functions:

1. An inside thunk function, which gets dispatch and getState as arguments
2. The outside creator function, which creates and returns the thunk function

example function

----------------------------------------------------------------------------------

// The function below is called a thunk and allows us to perform async logic.
// It can be dispatched like a regular action: `dispatch(incrementAsync(10))`.
// This will call the thunk with the `dispatch` function as the first argument.
// Async code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

We can use them the same way we use a typical Redux action creator:

store.dispatch(incrementAsync(5))



----------------------------------------------------------------------------------


- React-Redux allows React components to interact with a Redux store

. We can extract pieces of data we need from a redux store using the useSelector hook .
. In the store files, selector functions take states as arguments and returns some part of the state values. 
. Our counterSlice.js file has a selector function to pick the counter value i.e. 

------------------------------------------------------------------------------------

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value

-------------------------------------------------------------------------------------

Similarly, we know that if we had access to a Redux store, we could dispatch actions using action creators,
 like store.dispatch(increment())

 The useDispatch hook does that for us, and gives us the actual dispatch method from the Redux store:

sth like : 

const dispatch = useDispatch()



- In order for us to use the Redux Store or communicate to the store with our components 
 Wrapping the app with <Provider store={store}> enables all components to use the store

 in index.js sth like : 

 import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'  //allows all components to access the React store. 
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)


Conclusion : 

- Global state should go in the Redux store, local state should stay in React components

In a React + Redux app, your global state should go in the Redux store,
 and your local state should stay in React components.

If you're not sure where to put something,
 here are some common rules of thumb for determining what kind of data should be put into Redux:

1. Do other parts of the application care about this data?
2. Do you need to be able to create further derived data based on this original data?
3. Is the same data being used to drive multiple components?
4. Is there value to you in being able to restore this state to a given point in time (ie, time travel debugging)?
5. Do you want to cache the data (ie, use what's in state if it's already there instead of re-requesting it)?
6. Do you want to keep this data consistent while hot-reloading UI components
 (which may lose their internal state when swapped)?

Hot reloading allows you to see the changes that you have made in the code without reloading your entire app. 


-------------------------------------------------------------------------------------------------------------------














