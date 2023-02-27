declare module '*.css?inline' {
	import {type CSSResult} from 'lit';

	const styles: CSSResult;
	export default styles;
}

declare module '*.html';
