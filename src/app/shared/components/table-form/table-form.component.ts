import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {formSize, tableSize} from '../../animations/basic-animations';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss'],
  animations: [
    formSize, tableSize
  ]
})
export class TableFormComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() icon: string;
  @Input() loading = false;
  @Input() addbuttonurl: string;
  @Input() addbutton: string;
  @Input() formTitle: string;
  // @Input() addPermission: string;
  @Input() helpText: string;

  @Input() viewDetails = false;
  @Input() editForm = false;
  @Input() viewForm = false;
  @Input() hideAdd = false;
  @Input() smallForm = true;
  @Input() hideBreadcrumb = false;

  @Output() addItem = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @Input() darkerLayout = false;
  @Input() lighterBodyLayout = false;
  @Input() lighterBodyTitle: string;
  @Input() animationSize: 'eighty' | 'sixty' | 'largeForm' | 'full' = 'sixty';
  constructor() { }

  ngOnInit() {
  }


  closeForm() {
    this.onClose.emit();
  }

  add() {
    this.addItem.emit();
  }
}
