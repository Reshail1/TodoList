import { Directive,
         ElementRef,
         Renderer2,
         OnInit,
         HostListener,
         HostBinding,
         Input
         } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]'
})
export class HoverHighlightDirective {
  @Input('appHoverHighlight') highlightColor: {backgound:string, text:string};

  @HostBinding('style.color') textColor: string;

  constructor(private elRef: ElementRef,
              private renderer: Renderer2) { }

  @HostListener ('mouseenter') mouseOver(eventData: Event){
    this.renderer.setStyle(this.elRef.nativeElement, 'backgound-color',this.highlightColor.backgound);
    this.textColor =this.highlightColor.text
  }
  @HostListener ('mouseleave') mouseExit(eventData: Event){
    this.renderer.setStyle(this.elRef.nativeElement, 'backgound-color','transparent');
    this.textColor = "Black";
  }


}
