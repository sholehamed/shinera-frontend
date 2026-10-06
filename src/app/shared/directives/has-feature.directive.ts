import {
  Directive,
  effect,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { FeatureService } from '../../core/services/feature.service';

@Directive({
  selector: '[appHasFeature]',
  standalone: true
})
export class HasFeatureDirective {
  private readonly template = inject(TemplateRef<unknown>);
  private readonly view = inject(ViewContainerRef);
  private readonly features = inject(FeatureService);

  private key = '';
  private rendered = false;

  @Input()
  set appHasFeature(value: string) {
    this.key = value;
    this.render();
  }

  constructor() {
    effect(() => {
      this.features.entitlements();
      this.render();
    });
  }

  private render(): void {
    const allowed = !!this.key && this.features.has(this.key);
    if (allowed && !this.rendered) {
      this.view.createEmbeddedView(this.template);
      this.rendered = true;
    } else if (!allowed && this.rendered) {
      this.view.clear();
      this.rendered = false;
    }
  }
}
