import { Outlet } from "react-router";
import AppNavbar from "../components/AppNavbar";
import '../App.css'; 

// Read the new global settings
const isReduceGlare = localStorage.getItem('reduceGlare') === 'true';
const isReduceMotion = localStorage.getItem('reduceMotion') === 'true';
const isLegibleText = localStorage.getItem('legibleText') === 'true';

function AppLayout() {
  return (
    // Apply the classes to the very top level of the app
    <div className={`app-wrapper 
      ${isReduceGlare ? 'theme-reduce-glare' : ''} 
      ${isReduceMotion ? 'theme-reduce-motion' : ''} 
      ${isLegibleText ? 'theme-legible-text' : ''}
    `}>
      <AppNavbar />
      <Outlet />
    </div>
  );
}

export default AppLayout;