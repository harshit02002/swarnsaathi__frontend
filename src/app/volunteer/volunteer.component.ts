import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { BackendService } from '../services/backend.service';


interface NavList {
  name: string;
  url:string;
  children?: NavList[];
}
 
const TREE_DATA: NavList[] = [
  {
    name:'Profile',
    url:'/volunteer'
  },
  {
    name:'Bookings',
    url:'/volunteer/bookings'
  },
  {
    name:'Logout',
    url:''
  },
];
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss']
})
export class VolunteerComponent {
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
