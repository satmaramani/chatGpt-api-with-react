import { NavLink, Outlet } from "react-router-dom";

// import { NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
        <li>
            <NavLink to="/GetModels" activeClassName="active-link">Get Open AI Models</NavLink>
          </li>
          <li>
            <NavLink to="/" activeClassName="active-link">Text Completion</NavLink>
          </li>
          <li>
            <NavLink to="/learnings" activeClassName="active-link">Learnings</NavLink>
          </li>
          <li>
            <NavLink to="/translation" activeClassName="active-link">Translation</NavLink>
          </li>
          <li>
            <NavLink to="/textcorrection" activeClassName="active-link">Text Correction</NavLink>
          </li>
          <li>
            <NavLink to="/explainCode" activeClassName="active-link">Explain Code</NavLink>
          </li>
          <li>
            <NavLink to="/codeCorrection" activeClassName="active-link">Code Correction</NavLink>
          </li>
          
          <li>
            <NavLink to="/image" activeClassName="active-link">Image</NavLink>
          </li>
          <li>
            <NavLink to="/imageUpdate" activeClassName="active-link">Image Edit</NavLink>
          </li>
          <li>
            <NavLink to="/ImageVariations" activeClassName="active-link">Image Variations</NavLink>
          </li>
          <li>
            <NavLink to="/TextToSpeech" activeClassName="active-link">TextToSpeech</NavLink>
          </li>

          <li>
            <NavLink to="/spellMistakes" activeClassName="active-link">Spell mistake fix</NavLink>
          </li>
          <li>
            <NavLink to="/ChatBot" activeClassName="active-link">ChatBot</NavLink>
          </li>
          
        </ul>
      </nav>

      <Outlet />
    </>
  )
};



export default Layout;