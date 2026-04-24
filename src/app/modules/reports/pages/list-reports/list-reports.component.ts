import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ReportsService } from '../../services/reports.service';
import { ReportSummary } from '../../models/report.model';
import { CatalogOption, CatalogsService } from '../../../../core/services/catalogs.service';
import { TokenService } from '../../../../core/services/token.service';

@Component({
  selector: 'app-list-reports',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-reports.component.html',
  styleUrl: './list-reports.component.css'
})
export class ListReportsComponent implements OnInit {
  private readonly reportsService = inject(ReportsService);
  private readonly catalogsService = inject(CatalogsService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  protected readonly filtersForm = this.fb.nonNullable.group({
    weekId: ['']
  });

  protected reports: ReportSummary[] = [];
  protected weeks: CatalogOption[] = [];

  protected loading = false;
  protected downloading: string | null = null;
  protected errorMessage = '';
  protected successMessage = '';
  protected isProfesor = false;

  ngOnInit(): void {
    this.successMessage = history.state?.successMessage ?? '';
    this.isProfesor = this.tokenService.getRoles().includes('PROFESOR');
    this.catalogsService.getWeeks().subscribe({
      next: (weeks) => (this.weeks = weeks)
    });
    this.loadReports();
  }

  protected loadReports(): void {
    this.loading = true;
    this.errorMessage = '';

    const { weekId } = this.filtersForm.getRawValue();

    this.reportsService.listReports(weekId || undefined).subscribe({
      next: (response) => {
        this.reports = response.reports;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'No fue posible cargar los reportes.';
        this.loading = false;
      }
    });
  }

  protected clearFilters(): void {
    this.filtersForm.reset({ weekId: '' });
    this.loadReports();
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

  protected goToGenerate(): void {
    this.router.navigate(['/reports/generate']);
  }

  protected getWeekLabel(weekId: string): string {
    return this.weeks.find((w) => w.id === weekId)?.label ?? weekId;
  }

  protected formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
