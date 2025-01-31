import { Component, EventEmitter, Output, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginationComponent implements AfterViewInit {
  pageSize = 5; // Itens por página
  currentPage = 0; // Página atual

  @Input() totalElements!: number;  // Adicionando o Input para totalElements
  @Output() pageChange = new EventEmitter<PageEvent>(); // Emitir evento de mudança de página
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.paginator) {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalElements;
      }
    });
  }

  onPageChange(event: PageEvent) {
    console.log('Evento de Paginação Disparado:', event);
    this.pageChange.emit(event); // Emite o evento com as novas informações de página
  }
}
