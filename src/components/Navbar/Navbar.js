import {Link} from 'react-router-dom';
import './styles.css';


const Navbar = (props) => {
	
	return (
		<div className="navbar">
			<Link to="/" className="link link_1">Misc<sup>&reg;</sup></Link>
			<ul>
				<li><Link to="/game" className="link link_2">Game</Link></li>
				<li><Link to="/calculator" className="link link_3">Calculator</Link></li>
				<li><Link to="/feed" className="link link_4">Feed</Link></li>
			</ul>
		</div>
	);
};

export default Navbar;