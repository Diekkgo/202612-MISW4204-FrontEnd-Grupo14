import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ReportsService } from '../../services/reports.service';
import { GenerateReportsResponse, ReportSummary } from '../../models/report.model';
import { CatalogOption, CatalogsService } from '../../../../core/services/catalogs.service';

@Component({
  selector: 'app-generate-reports',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generate-reports.component.html',
  styleUrl: './generate-reports.component.css'
})
export class GenerateReportsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly reportsService = inject(ReportsService);
  private readonly catalogsService = inject(CatalogsService);
  private readonly router = inject(Router);

  protected readonly form = this.fb.nonNullable.group({
    week_id: ['', Validators.required]
  });

  protected weeks: CatalogOption[] = [];
  protected result: GenerateReportsResponse | null = null;
  protected loading = false;
  protected downloading: string | null = null;
  protected errorMessage = '';

  ngOnInit(): void {
    this.catalogsService.getWeeks().subscribe({
      next: (weeks) => (this.weeks = weeks)
    });
  }

  protected submit(): void {
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.result = null;

    const { week_id } = this.form.getRawValue();

    this.reportsService.generateReports(week_id).subscribe({
      next: (response) => {
        this.result = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'No fue posible generar los reportes.';
        this.loading = false;
      }
    });
  }

  protected download(report: ReportSummary): void {
    this.downloading = report.report_id;
    this.errorMessage = '';

    this.reportsService.downloadReport(report.report_id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `reporte-${report.user_name}-${report.week_id}.pdf`;
        anchor.click();
        window.URL.revokeObjectURL(url);
        this.downloading = null;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          'No fue posible descargar el reporte.';
        this.downloading = null;
      }
    });
  }

  protected hasError(controlName: 'week_id'): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  protected goToList(): void {
    this.router.navigate(['/reports']);
  }
}
