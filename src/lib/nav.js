/** Map a nav label to a landing section id (scroll targets on the home page). */
export const NAV_TARGET = { 'Work': 'work', 'About Me': 'about', 'Contact': 'contact' };

/** Nav labels that are pages of their own rather than landing sections. */
export const NAV_PAGE = { 'Brand Book': '/brand-book' };

/** Items shown in the Navbar and Footer. */
export const NAV_ITEMS = ['Work', 'Brand Book', 'About Me', 'Contact'];

/** Navigation from any page other than the landing: open the page, or the landing at its section. */
export const navigateTo = (label) => {
  if (NAV_PAGE[label]) window.location.href = NAV_PAGE[label];
  else if (NAV_TARGET[label]) window.location.href = '/#' + NAV_TARGET[label];
};
