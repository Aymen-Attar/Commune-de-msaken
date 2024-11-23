import React from "react";
import { Route, Routes } from "react-router-dom";
//import "./app.css"
import imgapp from "./Components/images/bg.jpg"
import Main from "./Components/main";
import Actualite from "./Components/actualite";
import Footer from "./Components/footer";
//import Navbartest from "./Components/navbartest";
import Home from './Components/Home';
import Refcom from './Components/pages/Refcom';
import Refvil from './Components/pages/Refvil';
import Rec from './Components/pages/Rec';
import Conmun from "./Components/pages/con-mun";
import Arr from "./Components/pages/arrondi";
import Org from "./Components/pages/org";
import Proto from "./Components/pages/proto";
import Histo from "./Components/pages/histo";
import Stat from "./Components/pages/stat";
import Nav from "./Components/nav";
import Enf from "./Components/pages/enf";
import Eta from "./Components/pages/etat-civ";
import Leg from "./Components/pages/lega";
//import Ma from "./Components/DropdownMenu";
import Copi from "./Components/pages/copie";
import Fisc from "./Components/pages/fisc";
import LanguageSwitch from './LanguageSwitch';
//import LoginForm from './Components/LoginForm';
//import Admin from './Components/admin';
import Pad from './Components/pages/pad';
import Addmin from './Components/admin/AdminSidebar';
import Aip from './Components/admin/pages-admin/aip';
import Reclamation from "./Components/pages/Reclamation";
import Contact from "./Components/pages/Contact";
import Demande  from "./Components/pages/Demande-info";
import Events from "./Components/admin/pages-admin/events"
import Calendar from "./Components/Calendar"
import Usermanagement from './Components/admin/pages-admin/user-management';
import Concours from './Components/admin/pages-admin/concours'
import Demandes from './Components/admin/pages-admin/demandes'
import Permis from './Components/admin/pages-admin/permis'
import Concourss from './Components/admin/pages-admin/concours-consult'
import Concoursu from './Components/pages/concours'
import User from './Components/user/usersidebar'
import Userreclamation from './Components/user/pages-user/Reclamation'
import UserSidebar from "./Components/user/usersidebar";
import Dai from './Components/user/pages-user/Dai'
import Perm from './Components/user/pages-user/Per'
import Userconc from './Components/user/pages-user/Conc'
import SignUpComponent from './Components/user/usersignup'
import LoginComponent from './Components/user/userlogin'
import Adminsignup from './Components/admin/adminsignup'
import Adminlogin from './Components/admin/adminlogin'
import Cr from './Components/admin/pages-admin/reclamationsa'
import MesDemandes from './Components/user/pages-user/Displaydai'
import Mesreclamations from './Components/user/pages-user/Displayrec'
import AdminSignup from "./Components/admin/adminsignup";
import Profile from './Components/admin/profile';
import Profil from './Components/admin/pages-admin/profil'
import Userpro from './Components/user/userprofile'
import Userprodis from './Components/user/pages-user/userpro'
import DetailedFormPage from './Components/admin/pages-admin/recdetails'
import Button from './Components/Button'


function App() {
  return (
    <>


      {window.location.pathname.includes("/admin") || window.location.pathname.includes("/user") || window.location.pathname.includes("/signup") || window.location.pathname.includes("/login") || window.location.pathname.includes("/admilogin") || window.location.pathname.includes("/admisignup") || window.location.pathname.includes("/profile") || window.location.pathname.includes("/usprofile") ? null :<LanguageSwitch />}
      
      {window.location.pathname.includes("/admin") || window.location.pathname.includes("/user") || window.location.pathname.includes("/signup") || window.location.pathname.includes("/login") || window.location.pathname.includes("/admilogin") || window.location.pathname.includes("/admisignup") || window.location.pathname.includes("/profile") || window.location.pathname.includes("/usprofile") ? null : <Nav />} {/* Hide the navbar in the admin section */}
      
      {window.location.pathname.includes("/admin") || window.location.pathname.includes("/user") || window.location.pathname.includes("/signup") || window.location.pathname.includes("/login") || window.location.pathname.includes("/admilogin") || window.location.pathname.includes("/admisignup") || window.location.pathname.includes("/profile") || window.location.pathname.includes("/usprofile") ? null :<Button />}
      <div className="container" >
      {/*<div className="calendar-wrapper">
            <Calendar />
  </div>*/}
        <div className="cadre" >

        <Routes>
        <Route path="/profile" element={<Profile  />} />
        <Route path="/admin/profile" element={<Profil />} />
          <Route path="/admin/*" element={<Addmin />} /> {/* Render the AdminSidebar component for all routes starting with "/admin" */}
          <Route path="/admin/investment-plan" element={<Aip />} />
          <Route path="/admin/events" element={<Events  />} />
          <Route path="/admin/contests" element={<Concours  />} />
          <Route path="/admin/reclamation" element={<Cr  />} />
          <Route path="/admin/form/:formId" component={DetailedFormPage} />
          <Route path="/admin/information-access" element={<Demandes  />} />
          <Route path="/admin/building-permits" element={<Permis  />} />
          <Route path="/admin/consult-contests" element={<Concourss  />} />
          <Route path="/admin/user-management" element={<Usermanagement  />} />
          <Route path="/admisignup" element={<Adminsignup  />} />
          <Route path="/admilogin" element={<Adminlogin  />} />

          <Route path="/user/*" element={<User/>} />
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/login" element={<LoginComponent />} />

          <Route path="/usprofile" element={<Userpro  />} />
          <Route path="/user/profile" element={<Userprodis/>} />
          <Route path="/user/reclamation" element={<Userreclamation/>} />
          <Route path="/user/mes-reclamations" element={<Mesreclamations/>} />
          <Route path="/user/Demandes" element={<Dai/>} />
          <Route path="/user/MesDemandes" element={<MesDemandes/>} />
          <Route path="/user/Permis" element={<Perm/>} />
          <Route path="/user/Concours" element={<Userconc/>} />

          <Route path="/" element={<Home />} />
          <Route path="/Situation-géographique" element={<Refvil />} />
          <Route path="/Msaken-en-chiffres" element={<Stat />} />
          <Route path="/Historique" element={<Histo />} />
          <Route path="/Relations-extérieurs" element={<Proto />} />
          <Route path="/Date-de-création" element={<Refcom />} />
          <Route path="/Organisation-municipale" element={<Org />} />
          <Route path="/Arrondissements-municipaux" element={<Arr />} />
          <Route path="/Conseil-municipal" element={<Conmun />} />
          <Route path="/Conseil-des-enfants" element={<Enf />} />
          <Route path="/Réclamation" element={<Reclamation />} />
          <Route path="/Concoursu" element={<Concoursu />} />
          <Route path="/Demande-accés-á-l'information" element={<Demande />} />
          <Route path="/Réalisations" element="" />
          <Route path="/Plan-annuel-d'investissement" element={<Pad />} />
          <Route path="/Etat-civil" element={<Eta />} />
          <Route path="/Légalisation-de-signature" element={<Leg />} />
          <Route path="/Certification-des-copies" element={<Copi />} />
          <Route path="/Permis-de-bâtir" element="" />
          <Route path="/Fiscalité-locale" element={<Fisc />} />
          <Route path="/Dossier-de-permis-de-bâtir" element="" />
          <Route path="/Consultation-des-commissions" element="" />
          <Route path="/Consultation-du-permis-de-bâtir" element="" />
          <Route path="/Plan-d'aménagement" element="" />
          <Route path="/Contact" element={<Contact />} />
          
        </Routes>
        </div>
      </div>
      {window.location.pathname.includes("/admin") ? <Addmin /> : null}
      
      {window.location.pathname.includes("/user") ? <UserSidebar/> : null}
      {window.location.pathname.includes("/admin") || window.location.pathname.includes("/user") || window.location.pathname.includes("/signup") || window.location.pathname.includes("/login") || window.location.pathname.includes("/admilogin") || window.location.pathname.includes("/admisignup") || window.location.pathname.includes("/profile") || window.location.pathname.includes("/usprofile") ? null : <Footer />} {/* Hide the footer in the admin section */}
    </>
  );
}

export default App;
