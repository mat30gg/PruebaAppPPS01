import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFavorito]',
  standalone: true
})
export class FavoritousuarioDirective {

  constructor(
    private elementRef: ElementRef,
  ) { 
  }

  @Input() set appFavorito(estaFav: boolean) {
    if( estaFav ) {
      this.elementRef.nativeElement.style.color = 'gold'
    } else {
      this.elementRef.nativeElement.style.color = '#000'
    }
  }

}
