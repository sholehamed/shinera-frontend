import {
  Directive,
  effect,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { PermissionService } from '../../core/services/permission.service';

@Directive({
  selector: '[appHasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  private readonly template = inject(TemplateRef<unknown>);
  private readonly view = inject(ViewContainerRef);
  private readonly permissions = inject(PermissionService);

  private key = '';
  private rendered = false;

  @Input()
  set appHasPermission(value: string) {
    this.key = value;
    this.render();
  }

  constructor() {
    effect(() => {
      this.permissions.has(this.key);
      this.render();
    });
  }

  private render(): void {
    const allowed = !!this.key && this.permissions.has(this.key);
    if (allowed && !this.rendered) {
      this.view.createEmbeddedView(this.template);
      this.rendered = true;
    } else if (!allowed && this.rendered) {
      this.view.clear();
      this.rendered = false;
    }
  }
}
