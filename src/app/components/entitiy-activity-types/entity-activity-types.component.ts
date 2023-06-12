import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IActivitySubtype, IActivityType, IActivityTypesForView} from "../modal/modal.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-entity-activity-types',
  templateUrl: './entity-activity-types.component.html',
  styleUrls: ['./entity-activity-types.component.scss']
})
export class EntityActivityTypesComponent {
  @Input() activityTypesForView: IActivityTypesForView[] = [];
  @Input() activityTypes: IActivityType[] = [];
  @Input() activitySubtypes: IActivitySubtype[] = [];

  @Output() onSelectActivityType = new EventEmitter<IActivityType>();
  @Output() onDeleteActivityType = new EventEmitter<number>();
  @Output() onChoseActivityType = new EventEmitter<number | null>();
  @Output() onSelectActivitySubtype = new EventEmitter<IActivitySubtype>();
  @Output() onDeleteActivitySubtype = new EventEmitter<number>();

  public activityTypesTextFilter = new FormControl<string | null>('');
  public activitySubtypesTextFilter = new FormControl<string | null>('');

  public addActivityType(type: IActivityType): void {
    this.onSelectActivityType.next(type);
  }

  public deleteActivityType(activityTypeId: number): void {
    this.onDeleteActivityType.next(activityTypeId);
  }

  public choseActivityType(typeId: number): void {
    this.onChoseActivityType.next(typeId);
  }

  public addActivitySubtype(subtype: IActivitySubtype): void {
    this.onSelectActivitySubtype.next(subtype);
  }

  public deleteActivitySubtype(activitySubtypeId: number): void {
    this.onDeleteActivitySubtype.next(activitySubtypeId);
  }

  public get filteredActivityTypes(): IActivityType[] {
    if (this.activityTypesTextFilter.value)
      return this.activityTypes
        .filter(type => type.name
          .toLowerCase()
          .includes((this.activityTypesTextFilter.value as string).toLowerCase()));
    return this.activityTypes;
  }

  public get filteredActivitySubtypes(): IActivitySubtype[] {
    if (this.activityTypesTextFilter.value)
      return this.activitySubtypes
        .filter(subtype => subtype.name
          .toLowerCase()
          .includes((this.activitySubtypesTextFilter.value as string).toLowerCase()));
    return this.activitySubtypes;
  }
}
