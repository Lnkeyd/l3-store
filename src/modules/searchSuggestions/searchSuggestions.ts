import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchSuggestions.tpl.html';
import { addElement } from '../../utils/helpers';

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
    this.view.root.innerHTML = 'Например, '

    this.suggestions.forEach((suggestion) => {

      const $suggestion = addElement(this.view.root, 'a', { className: 'suggestion'});
      $suggestion.setAttribute('href', '#')
      addElement($suggestion, 'span', {className: 'suggestion__text', innerText: suggestion})

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