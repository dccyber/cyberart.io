export interface IWindowDimensions {
    height: number;
    width: number;
}

/**
 * Gets the width and height of the user's window.
 * @returns {{width: number | u.tabsRef.clientWidth, height: number}}
 */
export const getClientDimensions = (): IWindowDimensions => {
    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];

    return {
        height: w.innerHeight || e.clientHeight || g.clientHeight,
        width: w.innerWidth || e.clientWidth || g.clientWidth
    };
};
