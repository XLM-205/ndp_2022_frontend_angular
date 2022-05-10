import { Component, Input, OnInit } from '@angular/core';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { ListService } from './services/list.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  tableIsLoaded: boolean = false;

  constructor(private listService: ListService, private router: Router) { }

  list: IProject[] = [];

  ngOnInit(): void {
    
    this.getProjects();
  }

  getProjects() {
    this.listService.getProjects().subscribe(
      (response: IProject[]) => {
        this.list = response;
        this.buildTable();
        this.tableIsLoaded = true;
      }
    )
  }

  deleteProject(id: string | undefined) {
    this.listService.deleteProject(id).subscribe(
      (response) => {
        // Rebuild the table without the deleted entry
        this.list = this.list.filter(project => project.id != id);
        this.buildTable();
      }
    )
  }

  buildTable() {
    let idClient = localStorage.getItem("user.id");
    this.list = this.list.filter((el: IProject) => el.idClient === idClient);
  }

  redirectTo(url:string) {
    this.router.navigateByUrl(url);
  }

  redirectToWithParams(url:string, id:string | undefined) {
    const dataParams: NavigationBehaviorOptions = {
      state: {
        id: id
      }
    };
    this.router.navigate([`/${url}`], dataParams);
  }
}
