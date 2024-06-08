import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsUsuarioPage } from './posts-usuario.page';

describe('PostsUsuarioPage', () => {
  let component: PostsUsuarioPage;
  let fixture: ComponentFixture<PostsUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
