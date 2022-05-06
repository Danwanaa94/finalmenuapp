import React, {useContext} from 'react'
import {AuthContext} from "../context/auth.Context"
import Header from "../components/Header";
import { MenuContext } from '../context/menu.context';
import { useNavigate } from 'react-router-dom';



function Home() { 
  const { user, success } = useContext(AuthContext);
  const { isPending, menus, error, getALLMenus } = useContext(MenuContext)
  
  const navigate = useNavigate()
  React.useEffect(() => {
    getALLMenus();
  }, []);


  React.useEffect(() => {
    if (!success) {
      navigate("/");
    }
  }, [success, navigate]);


  return (
      <>
      <Header />
      {isPending && <h2>loading...</h2>}
  {error && <h2>{error.toString()}</h2>}
      <div className='container'>
        {menus.map((menu) =>(
          <div key={menu._id} className="card border-primary m-3 p-2">
            <div className='card-header'>
              <h4 className='text-primary'>{menu.app}</h4>
            </div>
            <h4>{menu.type}</h4>
            <h4>{menu.time}</h4>
            <div className='ingredients-container'>
              {menu.ingredients.map((ing) => (
                <span className='badge bg-primary m-2'>{ing}</span>
 ))}
            </div>
            <div className='recipe-container'>
              {menu.recipe.map((rec) => (
                <span className='badge bg-primary m-2'>{rec}</span>
              ))}
            </div>
            </div>
        ))}
          </div>
      </>
  )
}

export default Home