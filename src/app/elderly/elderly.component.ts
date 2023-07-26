import { MediaMatcher } from '@angular/cdk/layout';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

interface NavList {
  name: string;
  url:string;
  children?: NavList[];
}
 
const TREE_DATA: NavList[] = [
  {
    name:'Profile',
    url:'/elderly'
  },
  {
    name:'Find Volunteer',
    url:'/elderly/find-volunteer'
  },
  {
    name:'My Bookings',
    url:'/elderly/my-bookings'
  },
  {
    name:'Logout',
    url:''
  },
];

@Component({
  selector: 'app-elderly',
  templateUrl: './elderly.component.html',
  styleUrls: ['./elderly.component.scss']
})
export class ElderlyComponent {
  treeControl = new NestedTreeControl<NavList>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavList>();
 
  hasChild = (_: number, node: NavList) => !!node.children && node.children.length > 0;
 
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
 
  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private readonly router:Router,
    private readonly backendService:BackendService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.dataSource.data = TREE_DATA;
  }
 
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
 
  logout(){
   this.backendService.logout() 
   this.router.navigate([''])
  }
  nav(node:NavList){
    if(node.url){
      this.router.navigate([node.url]);
    }
    else{
      this.logout();
    }
  }


}
