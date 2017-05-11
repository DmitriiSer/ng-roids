import {
  Injectable,
  Type,
  ComponentRef, ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';

import { BulletComponent } from 'app/components/ship/bullet/bullet.component';

@Injectable()
export class SpaceService {

  private bulletHost: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver) { }

  setBulletHostContainer(bulletHost: ViewContainerRef) {
    this.bulletHost = bulletHost;
  }

  createBullet(): ComponentRef<BulletComponent> {
    return this.create(BulletComponent);
  }

  private create(component: Type<any>): ComponentRef<any> {
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(component);

    const componentRef = this.bulletHost.createComponent(componentFactory, 0);

    return componentRef;
  }

}
