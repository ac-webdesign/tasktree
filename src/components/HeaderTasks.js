
// import { NavLink } from "react-router-dom";
// import React from "react";
// import { useLocation } from "react-router-dom";
// import '../styles/header.css'; // Add your header styles here

// function HeaderTasks() {
//     const location = useLocation();

//     const getHeaderContent = () => {
//         switch (location.pathname) {
//             case '/':
//                 return (
//                     <div className="home-header">
//                         <div className="navigation">
//                             <div className="tasks">Welcome home, <br />Guest</div>
//                             <div className="icon-home"></div>    
//                         </div>            
//                     </div>
//                 );
//             case '/mytasks':
//                 return (
//                     <div className="task-header">
//                       <div className="navigation">
//                           <div className="arrow-tasks">
//                           <NavLink to="/" exact className="arrow" activeClassName="active"></NavLink>

//                               <div className="tasks">Your tasks</div>
//                           </div>
//                           <div className="icon"></div>    
//                        </div>            
//                     </div>
//                 );
//             case '/settings':
//                 return (
//                     <div className="settings-header">
//                       <div className="navigation">
//                           <div className="arrow-tasks">
//                             <NavLink to="/" exact className="arrow" activeClassName="active"></NavLink>
//                               <div className="tasks">Settings</div>
//                           </div>
//                           <div className="icon-settings"></div>    
//                        </div>            
//                     </div>
//                 );
//             case '/generate-ai':
//                 return (
//                     <div className="ai-header">
//                       <div className="navigation">
//                           <div className="arrow-tasks">
//                           <NavLink to="/" exact className="arrow" activeClassName="active"></NavLink>
//                               <div className="tasks">AI generator</div>
//                           </div>
//                           <div className="icon-ai"></div>    
//                        </div>            
//                     </div>
//                 );
//             default:
//                 return (
//                     <></>
//                 );
//         }
//     };

//     return (
//         <div className="task-header">
//             {getHeaderContent()}
//         </div>
//     );
// }

// export default HeaderTasks;

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import '../styles/header.css'; // Add your header styles here

function HeaderTasks() {
  const location = useLocation();

  const getHeaderContent = () => {
    switch (location.pathname) {
      case '/':
        return (
          <div className="home-header">
            <div className="navigation">
              <div className="tasks">Welcome home, <br />Guest</div>
              <div className="icon-home"></div>
            </div>
          </div>
        );
      case '/mytasks':
        return (
          <div className="task-header">
            <div className="navigation">
              <div className="arrow-tasks">
                <NavLink to="/" className={({ isActive }) => isActive ? 'arrow active' : 'arrow'}></NavLink>
                <div className="tasks">Your tasks</div>
              </div>
              <div className="icon"></div>
            </div>
          </div>
        );
      case '/settings':
        return (
          <div className="settings-header">
            <div className="navigation">
              <div className="arrow-tasks">
                <NavLink to="/" className={({ isActive }) => isActive ? 'arrow active' : 'arrow'}></NavLink>
                <div className="tasks">Settings</div>
              </div>
              <div className="icon-settings"></div>
            </div>
          </div>
        );
      case '/generate-ai':
        return (
          <div className="ai-header">
            <div className="navigation">
              <div className="arrow-tasks">
                <NavLink to="/" className={({ isActive }) => isActive ? 'arrow active' : 'arrow'}></NavLink>
                <div className="tasks">AI generator</div>
              </div>
              <div className="icon-ai"></div>
            </div>
          </div>
        );
      default:
        return (
          <></>
        );
    }
  };

  return (
    <div className="task-header">
      {getHeaderContent()}
    </div>
  );
}

export default HeaderTasks;

