import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import SettingsIcon from '@material-ui/icons/Settings';
import { emphasize } from '@material-ui/core';




const Header = () => {

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const [role, setRole] = useState(localStorage.getItem("role"));
    

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const email = localStorage.getItem("email");
    

    return(

        
        <div>

            

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/dashboard">Movie Reservation</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item active">
                    {/* <a class="nav-link" href="/movie-list">Movie List </a> */}
                    {role==="movie_admin" && <Link to='movie-list'><a class="nav-link">Movie List </a></Link>}
                </li>
                <li class="nav-item">
                    <Link to='movie-store'><a class="nav-link">Movie Store</a></Link>
                </li>
                </ul>
            </div>

            <div className='float-end'>
                {email}
                <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                    <SettingsIcon/>
                </Button>
                <Menu id="fade-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} TransitionComponent={Fade}>
                    <Link to='/profile'><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>
                        <button  className='bg-transparent'>Log Out</button>
                    </MenuItem>
                </Menu>
            </div>


            
            </nav>            

        </div>
    )
}

export default Header;