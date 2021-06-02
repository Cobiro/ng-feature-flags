import {Directive, EmbeddedViewRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef,} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FeatureFlagsState} from '../core/application/feature-flags.state';

@Directive({
  selector: '[libFeatureFlags]',
})
export class FeatureFlagsDirective implements OnInit, OnDestroy {
  protected destroy$ = new Subject<void>();
  private elementViewRef: EmbeddedViewRef<any>;
  private elseTpl: TemplateRef<any>;

  @Input() libFeatureFlags: string[];

  @Input()
  set libFeatureFlagsElse(templateRef: TemplateRef<any> | null) {
    this.elseTpl = templateRef;
  }

  constructor(
    private vcr: ViewContainerRef,
    private tpl: TemplateRef<any>,
    private featureFlagsState: FeatureFlagsState,
  ) {}

  private showElement(tpl: TemplateRef<any>): void {
    if (!this.elementViewRef) {
      this.elementViewRef = this.vcr.createEmbeddedView(tpl);
    }
  }

  private hideElement(): void {
    this.vcr.clear();
    this.elementViewRef = null;
    if (this.elseTpl) {
      this.elementViewRef = this.vcr.createEmbeddedView(this.elseTpl);
    }
  }

  ngOnInit(): void {
    if (this.libFeatureFlags[0] === undefined) {
      this.showElement(this.tpl);
      return;
    }
    this.featureFlagsState
      .hasFlags(this.libFeatureFlags)
      .pipe(takeUntil(this.destroy$))
      .subscribe(hasFlags => {
        hasFlags ? this.showElement(this.tpl) : this.hideElement();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
