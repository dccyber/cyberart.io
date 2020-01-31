/**
 * Gets the width and height of the user's window.
 * @returns {{width: number | u.tabsRef.clientWidth, height: number}}
 */
export const getClientDimensions = () => {
    let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];

    return {
        width: w.innerWidth || e.clientWidth || g.clientWidth,
        height: w.innerHeight || e.clientHeight || g.clientHeight
    };
};
