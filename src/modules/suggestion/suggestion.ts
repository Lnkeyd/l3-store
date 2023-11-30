import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './suggestion.tpl.html';

export class Suggestion {
  view: View;
  suggestion: string;

  constructor(suggestion: string) {
    this.suggestion = suggestion;
    this.view = new ViewTemplate(html).cloneView();
    console.log(this.view)
  }

  attach($root: HTMLElement) {
    console.log(this.view.root);
    $root.appendChild(this.view.root);
  }

  render() {
    this.view.root.appendChild(this.view.suggestion)
    this.view.suggestion.innerText = this.suggestion;
  }
}
