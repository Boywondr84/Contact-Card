// import src/js files
import "./form";
import "./submit";

// import src/css files
import "../css/index.css";

import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { initDB } from "./database.js";

// import src/images files
// import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";
import Bird from "../images/bird.jpg";

window.addEventListener('load', function() {
    initDB();
    document.getElementById('logo').src = Bird;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;

});