// Angular Import
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GradientConfig } from 'src/app/app-config';
import { NavigationItem } from '../../navigation';

@Component({
  selector: 'app-nav-group',
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.scss']
})
export class NavGroupComponent implements OnInit {
  // public props
  @Input() item!: NavigationItem;
  @Input() layout1 = false;
  gradientConfig;

  // constructor
  constructor(private location: Location) {
    this.gradientConfig = GradientConfig;
  }

  // life cycle event
  ngOnInit() {
    // at reload time active and trigger link
    let current_url = this.location.path();
    // eslint-disable-next-line
    // @ts-ignore
    if (this.location['_baseHref']) {
      // eslint-disable-next-line
      // @ts-ignore
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const pre_parent = up_parent?.parentElement;
      const last_parent = up_parent?.parentElement?.parentElement?.parentElement?.parentElement;
      if (parent?.classList.contains('pcoded-hasmenu')) {
        if (GradientConfig.layout === 'vertical') {
          parent.classList.add('pcoded-trigger');
        }
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('pcoded-hasmenu')) {
        if (GradientConfig.layout === 'vertical') {
          up_parent.classList.add('pcoded-trigger');
        }
        up_parent.classList.add('active');
      } else if (pre_parent?.classList.contains('pcoded-hasmenu')) {
        if (GradientConfig.layout === 'vertical') {
          pre_parent.classList.add('pcoded-trigger');
        }
        pre_parent.classList.add('active');
      }

      if (last_parent?.classList.contains('pcoded-hasmenu')) {
        if (GradientConfig.layout === 'vertical') {
          last_parent.classList.add('pcoded-trigger');

          if (pre_parent?.classList.contains('pcoded-hasmenu')) {
            pre_parent.classList.add('pcoded-trigger');
          }
        }
        last_parent.classList.add('active');
      }
    }
  }
}
