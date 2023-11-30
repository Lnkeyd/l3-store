import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchSuggestions.tpl.html';
import { Suggestion } from '../suggestion/suggestion';

export class SearchSuggestions {
  view: View;
  suggestions: string[];

  constructor() {
    this.suggestions = ['чехол iphone 13 pro', 'коляски agex', 'яндекс станция 2'];
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(suggestions: string[]) {
    this.suggestions = suggestions;
    this.render();
  }

  render() {
    this.view.root.innerHTML = 'Например, ';

    this.suggestions.forEach((suggestion) => {
      const suggestionComp = new Suggestion(suggestion);

      suggestionComp.attach(this.view.root);
      suggestionComp.render();

      // если элемент не последний (нам не нужна запятая в конце предложения)
      //   Например, чехол iphone 13 pro, коляски agex или яндекс станция 2,
      if (suggestion !== this.suggestions[this.suggestions.length - 1]) {
        //   если предпоследний элемент, то как в макете, ставим после него не "," а "или"
        //   Например, чехол iphone 13 pro, коляски agex или яндекс станция 2
        this.view.root.innerHTML += suggestion === this.suggestions[this.suggestions.length - 2] ? ' или ' : ', ';
      }
    });
  }
}
