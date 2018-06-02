export function getStyle(ele, attr) {
	if (ele.currentStyle) {
		return ele.currentStyle[attr];
	} else {
		return getComputedStyle(ele, false)[attr];
	}
}

export function hasClass(ele, className) {
	let reg = new RegExp('(^|\\s+)' + className + '(\\s+|$)');
	return reg.test(ele.className);
}

export function addClass(ele, className) {
	if (hasClass(ele, className)) {
		return;
	}
	let newClass = ele.className.split(' ');
	newClass.push(className);
	ele.className = newClass.join(' '); 

}
export function removeClass(ele, className) {
	if (!hasClass(ele, className)) {
		return;
	}
	let newClass = ele.className.split(' ');
	newClass.splice(newClass.findIndex(item => item == className), 1);
	ele.className = newClass.join(' '); 
}