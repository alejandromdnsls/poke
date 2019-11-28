import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon, Pokemons } from './pokemon';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: []
})

export class TableComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'weight', 'height', 'types'];
  isLoadingResults = true;
  dataLoaded = false;
  pokemons: any[] = [{}];
  pokemonsInfo: any[] = [];
  dataSource: MatTableDataSource<Pokemon>;
  selection = new SelectionModel<Pokemon>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe((data: any) => {
      this.pokemons = data;
      for (const p of this.pokemons) {
        this.pokemonService.getInfoPokemon(p.name).subscribe((info: any) => {
          this.pokemonsInfo.push(info);
        });
      }
      this.dataLoaded = true;
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(this.pokemonsInfo);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Pokemon): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.id}`;
  }
}
