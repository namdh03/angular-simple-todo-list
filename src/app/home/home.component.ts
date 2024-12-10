import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly router = inject(Router);
  readonly searchControl = new FormControl('', { nonNullable: true });

  private readonly searchSignal = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
  );

  private readonly _searchEffect = effect(() => {
    this.router.navigate([], { queryParams: { search: this.searchSignal() } });
  });
}
