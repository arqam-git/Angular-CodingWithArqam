import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appScoreColor]',
})
export class ScoreColorDirective implements OnChanges {
  @Input() score: number = 10;
  maxScore: number = 10;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('onchanges called', this.element.nativeElement);
    const score: string = changes.score.currentValue;
    // isDefined
    if (!(typeof score === 'undefined' || score === null)) {
      this.addScoreClass(Number(score));
    }
  }

  private addScoreClass(score: number) {
    let className = '';
    const s = score;
    switch (true) {
      case s <= 10:
        className = 'score-low';
        break;
      case s <= 20:
        className = 'score-medium';
        break;
      case s >= 30:
        className = 'score-high';
        break;
    }
    this.renderer.addClass(this.element.nativeElement, className);
    // this.element.nativeElement.addClass(className); // not working
  }
}
