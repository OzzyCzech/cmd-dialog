declare module '*.css?inline' {
    import {CSSResult} from 'lit';
    const styles: CSSResult;
    export default styles;
}

declare module '*.html';