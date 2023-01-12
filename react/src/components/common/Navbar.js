import NavbarCSS from '../../modules/Navbar.module.css';

export default function Navbar() {
    return (
        <div className={NavbarCSS.Boxing}>
            <li>대분류1</li>
            <li>대분류2</li>
            <li>대분류3</li>
            <li>대분류4</li>
            <li>대분류5</li>
            <input type="text" placeholder="검색"/>
        </div>
    )
}