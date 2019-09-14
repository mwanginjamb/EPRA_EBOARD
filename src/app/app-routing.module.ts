import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'subfolders', loadChildren: './subfolders/subfolders.module#SubfoldersPageModule' },
  { path: 'files', loadChildren: './files/files.module#FilesPageModule' },
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarPageModule' },
  { path: 'create-annotation', loadChildren: './create-annotation/create-annotation.module#CreateAnnotationPageModule' },
  { path: 'annotations', loadChildren: './annotations/annotations.module#AnnotationsPageModule' },
  { path: 'splash', loadChildren: './splash/splash.module#SplashPageModule' },
  { path: 'my-annotations', loadChildren: './my-annotations/my-annotations.module#MyAnnotationsPageModule' },
  { path: 'update-annotation', loadChildren: './update-annotation/update-annotation.module#UpdateAnnotationPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
