import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterOutlet,
  ActivatedRoute,
} from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  form = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.form.controls.search.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value) => {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { search: value },
            queryParamsHandling: 'merge',
          });
        },
      });
  }
}
