import { createContext, lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Authentication/Home';
import Todobody from './components/Authentication/Todobody';
import Logwrap from './components/Dashboard/Logwrap';
import Today from './components/Dashboard/Today';
import AllTodo from './components/Dashboard/AllTodo';

//LazyLoading
const Login=lazy(() => import('./components/Authentication/Login'));
const Signup=lazy(() => import('./components/Authentication/Signup'));
const Dashboard=lazy(() => import('./components/Dashboard/Dashboard'));
const Upcoming=lazy(() => import('./components/Dashboard/Upcoming'));
const Completed=lazy(() => import('./components/Dashboard/Completed'));
const Pending=lazy(() => import('./components/Dashboard/Pending'));



export const details=createContext(); 

function App() {
  const [isLogin,setIsLogin]=useState(() => Boolean(localStorage.getItem("token"))); 
  const [loginInfo,setLoginInfo]=useState("");

  return (
    <details.Provider value={{isLogin,setIsLogin,loginInfo,setLoginInfo}}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' Component={Home}>
            <Route path='/' Component={Todobody} />
            <Route path='/login' element={<Suspense fallback={<p>Loading...</p>}>
                                            <Login/>
                                          </Suspense>} />
            <Route path='/signup' element={<Suspense fallback={<p>Loading...</p>}>
                                            <Signup/>
                                          </Suspense>} />
            <Route path='/dashboard' element={<Logwrap>
                                                <Dashboard/>
                                              </Logwrap> }>
              <Route path='/dashboard/all' Component={AllTodo}/>
              <Route path='/dashboard/today' Component={Today}/>
              <Route path='/dashboard/upcoming' Component={Upcoming}/>
              <Route path='/dashboard/completed' Component={Completed}/>
              <Route path='/dashboard/pending' Component={Pending}/>
            </Route> 
                                                    
            <Route path='*' Component={<h1>PAGE NOT FOUND</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    </details.Provider>
  );
}

export default App;