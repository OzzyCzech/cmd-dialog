export interface Action {
  id: string;
  title: string;
  description?: string;
  hotkey?: string;
  img?: string;
  handler: Function
  tags?: string[];
  target?: string;
  url?: string;
}