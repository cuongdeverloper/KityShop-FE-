import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const MenuShop = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Function to handle mouse entering a dropdown
    const handleMouseEnter = (dropdownId) => {
        setOpenDropdown(dropdownId);
    };

    // Function to handle mouse leaving a dropdown
    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    return (
        <div className='d-flex flex-wrap navbar-outlay'>
            {/* Áo Dropdown */}
            <div 
                className="text-white px-3"
                onMouseEnter={() => handleMouseEnter('shirt-dropdown')}
                onMouseLeave={handleMouseLeave}
            >
                <NavDropdown 
                    title="Áo" 
                    id="shirt-dropdown" 
                    show={openDropdown === 'shirt-dropdown'}
                >
                    <NavDropdown.Item as={NavLink} to='/shop/product/Shirt'>Shirt</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Áo sơ mi</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Áo ba lỗ</NavDropdown.Item>
                </NavDropdown>
            </div>

            {/* Áo Khoác Dropdown */}
            <div 
                className="text-white px-3"
                onMouseEnter={() => handleMouseEnter('jacket-dropdown')}
                onMouseLeave={handleMouseLeave}
            >
                <NavDropdown 
                    title="Áo khoác" 
                    id="jacket-dropdown" 
                    show={openDropdown === 'jacket-dropdown'}
                >
                    <NavDropdown.Item as={NavLink} to='#'>Áo khoác</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Áo len</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Áo sweeter</NavDropdown.Item>
                </NavDropdown>
            </div>

            {/* Áo Thể Thao Dropdown */}
            <div 
                className="text-white px-3"
                onMouseEnter={() => handleMouseEnter('sports-dropdown')}
                onMouseLeave={handleMouseLeave}
            >
                <NavDropdown 
                    title="Áo thể thao" 
                    id="sports-dropdown" 
                    show={openDropdown === 'sports-dropdown'}
                >
                    <NavDropdown.Item as={NavLink} to='#'>Áo bóng đá nam</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Áo bóng đá nữ</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Áo giữ nhiệt</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Áo mùa hè</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Áo khoác giữ nhiệt</NavDropdown.Item>
                </NavDropdown>
            </div>

            {/* Quần Dropdown */}
            <div 
                className="text-white px-3"
                onMouseEnter={() => handleMouseEnter('pants-dropdown')}
                onMouseLeave={handleMouseLeave}
            >
                <NavDropdown 
                    title="Quần" 
                    id="pants-dropdown" 
                    show={openDropdown === 'pants-dropdown'}
                >
                    <NavDropdown.Item as={NavLink} to='#'>Quần jean</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Quần short</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Quần thể thao</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Quần bãi biển</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Quần kaki</NavDropdown.Item>
                </NavDropdown>
            </div>

            {/* Phụ Kiện Dropdown */}
            <div 
                className="text-white px-3"
                onMouseEnter={() => handleMouseEnter('accessories-dropdown')}
                onMouseLeave={handleMouseLeave}
            >
                <NavDropdown 
                    title="Phụ kiện" 
                    id="accessories-dropdown" 
                    show={openDropdown === 'accessories-dropdown'}
                >
                    <NavDropdown.Item as={NavLink} to='#'>Balo</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Nón</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Ví da</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Đồng hồ</NavDropdown.Item>
                </NavDropdown>
            </div>

            {/* Giày Dép Dropdown */}
            <div 
                className="text-white px-3"
                onMouseEnter={() => handleMouseEnter('shoes-dropdown')}
                onMouseLeave={handleMouseLeave}
            >
                <NavDropdown 
                    title="Giày dép" 
                    id="shoes-dropdown" 
                    show={openDropdown === 'shoes-dropdown'}
                >
                    <NavDropdown.Item as={NavLink} to='#'>Giày thể thao</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Giày đá bóng</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='#'>Dép</NavDropdown.Item>
                </NavDropdown>
            </div>
        </div>
    );
}

export default MenuShop;
