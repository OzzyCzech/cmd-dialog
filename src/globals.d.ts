declare module "*.css?inline" {
	const styles: string;
	export default styles;
}

declare module "tinykeys" {
	export function tinykeys(target: Window | HTMLElement, keyBindingMap: Record<string, (event: KeyboardEvent) => void>, options?: { event?: string }): () => void;
}

declare module "*.html";
