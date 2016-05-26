'use strict';

function getEmoticon(identifier) {
    switch(identifier) {
    case "good":
        return '../../assets/img/good.png';
    case "great":
        return '../../assets/img/great.png';
    case "okay":
        return '../../assets/img/okay.png';
    case "poor":
        return '../../assets/img/poor.png';
    case "awful":
        return '../../assets/img/awful.png';
    default:
        return '../../assets/img/good.png';
    }
}