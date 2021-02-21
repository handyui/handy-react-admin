import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterAuth from './privateRouter'

const App: FC = () => {
  return (
    <>
     <Router> 
        <RouterAuth />
        {/* <Route path="/" exact render={()=><Redirect to="/login"/>} />
        <Route path="/login" component={LoginPage}/>
        <Route path="/" render={()=>
            <Layout>
              <PrivateRoute/>
            </Layout>
        }/> */}
     </Router>
    </>
  )
}

export default App
