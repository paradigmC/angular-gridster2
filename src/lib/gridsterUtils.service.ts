import {Injectable} from '@angular/core';

import {GridsterComponentInterface} from './gridster.interface';

@Injectable()
export class GridsterUtils {

  static merge(obj1: any, obj2: any, properties: any) {
    for (const p in obj2) {
      if (obj2.hasOwnProperty(p) && properties.hasOwnProperty(p)) {
        if (typeof obj2[p] === 'object') {
          obj1[p] = GridsterUtils.merge(obj1[p], obj2[p], properties[p]);
        } else {
          obj1[p] = obj2[p];
        }
      }
    }

    return obj1;
  }

  static debounce(func: Function, wait: number) {
    let timeout: any;
    return function () {
      const context = this, args = arguments;
      const later = function () {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static checkTouchEvent(e: any): void {
    if (e.clientX === undefined && e.touches) {
      if (e.touches && e.touches.length) {
        e.clientX = e.touches[0].clientX;
        e.clientY = e.touches[0].clientY;
      } else if (e.changedTouches && e.changedTouches.length) {
        e.clientX = e.changedTouches[0].clientX;
        e.clientY = e.changedTouches[0].clientY;
      }
    }
  }

  static checkContentClassForEvent(gridster: GridsterComponentInterface, e: any): boolean {
    if (gridster.$options.draggable.ignoreContent) {
      if (!GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.dragHandleClass)) {
        return true;
      }
    } else {
      if (GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.ignoreContentClass)) {
        return true;
      }
    }
    return false;
  }

  static checkContentClassForEmptyCellClickEvent(gridster: GridsterComponentInterface, e: any): boolean {
    return GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.ignoreContentClass)
      || GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.dragHandleClass);
  }

  static checkContentClass(target: any, current: any, contentClass: string): boolean {
    if (target === current) {
      return false;
    }
    if (target.classList && target.classList.contains(contentClass)) {
      return true;
    } else {
      return GridsterUtils.checkContentClass(target.parentNode, current, contentClass);
    }
  }
}
