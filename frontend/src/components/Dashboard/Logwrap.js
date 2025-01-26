import { Suspense, useContext } from "react";
import { details } from "../../App";

function Logwrap({children}) {
    const isLogin=true;  //const {isLogin}=useContext(details);

    if(isLogin) {
        return (<>
            <Suspense fallback={<p>Loading...</p>}>
                {children}
            </Suspense>
        </>);
    }

   return (<>
       <h1>Session expired, Login again</h1>
   </>)
}


export default Logwrap;